let token = localStorage.getItem('userToken');

new Vue({
    el: '#post',
    data() {
        return {
            postId: null,
            post: null,
            comment: null,
            total: 0,
            loading: false,
            error: null,
            errorDetails: null,
        }
    },
    created() {
        this.fetchPosts();
    },
    methods: {
        fetchPosts() {
            this.loading = true;
            this.error = null;

            axios
                .get('http://8.148.233.225:8081/posts')
                .then(response => {
                    console.log('完整响应数据:', response.data);

                    // 检查响应状态
                    if (response.data.code === 200) {
                        this.post = response.data.data.rows;
                        this.total = response.data.data.total;
                    } else {
                        this.error = `服务器返回错误: ${response.data.message || '未知错误'}`;
                    }
                    this.loading = false;
                })
                .catch(err => {
                    this.loading = false;
                    this.error = '网络请求失败';

                    // 详细错误信息
                    if (err.response) {
                        this.errorDetails = `状态码: ${err.response.status}, 响应: ${JSON.stringify(err.response.data)}`;
                    } else if (err.request) {
                        this.errorDetails = '未收到服务器响应，请检查网络';
                    } else {
                        this.errorDetails = err.message;
                    }
                    console.error('请求错误:', err);
                });
        },
        // 格式化时间显示
        formatTime(timeString) {
            if (!timeString) return '';
            // 将ISO时间格式转换为本地时间
            const date = new Date(timeString);
            return date.toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        viewPost(post) {
            this.postId = post.id;
            // 填充帖子详情内容

            document.getElementById('longPost').style.display = 'none';
            document.getElementById('singlePost').style.display = 'block';
            document.getElementById('singlePost_topic_in').textContent = post.title;
            document.getElementById('singlePost_user_information_userName').textContent = post.userId;
            document.getElementById('singlePost_user_information_time').textContent = this.formatTime(post.createdTime);
            document.getElementById('singlePost_content').textContent = post.content || '暂无内容';

            this.getComment(post.id);
        },
        viewBackPostList() {
            alert("返回帖子列表")
            document.getElementById('longPost').style.display = 'block';
            document.getElementById('singlePost').style.display = 'none';
        },
        getComment(postId) {
            axios
                .get(`http://8.148.233.225:8081/comment/${postId}`)
                .then(response => {
                    console.log('完整响应数据:', response.data);
                    this.comment = response.data.data.rows;
                })
                .catch(err => {
                    alert(`请求错误: ${err.response.data.message}`);
                });
        },
        addComment() {
            axios
                .post(`http://8.148.233.225:8081/comment/${this.postId}`, {
                        content: document.getElementById('reply-content').value
                    }, {
                        headers: {
                            'token': token
                        }
                    }
                )
                .then(response => {
                    alert('评论成功');
                    this.getComment(this.postId);
                })
                .catch(err => {
                    alert(`请求错误: ${err.response.data.message}`);
                });
        },


    }
})
new Vue({
    el: '#header_right',
    data() {
        return {}
    },

    methods: {
        login() {
            document.getElementById('container').style.display = "block";
            document.querySelector('.cancel').style.display = "block";
            document.getElementById('screen').style.display = "block";
        }
    }
})
new Vue({
    el: '#cancel',
    data() {
        return {
            username: '',
            password: '',
            error: null
        }
    },
    methods: {
        cancel() {
            document.getElementById('container').style.display = "none";
            document.getElementById('cancel').style.display = "none";
            document.getElementById('screen').style.display = "none";
        },

    }
})
new Vue({
    el: '#container',
    data() {
        return {
            registerInfo: {
                username: '',
                password: '',
                email: ''
            },
            loginInfo: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        goRegister() {
            document.getElementById('container').classList.add('right-paner-active')

        },
        goLogin() {
            document.getElementById('container').classList.remove('right-paner-active')
        },
        Register() {
            this.registerInfo.username = document.getElementById('registerUsername').value;
            this.registerInfo.password = document.getElementById('registerPassword').value;
            this.registerInfo.email = document.getElementById('userEmail').value;
            axios
                .post('http://8.148.233.225:8081/auth/register', this.registerInfo)
                .then(response => {
                    alert('注册成功')
                })
                .catch(err => {
                    alert(`请求错误: ${err.response.data.message}`);

                });
        },
        Login() {
            this.loginInfo.username = document.getElementById('userName').value;
            this.loginInfo.password = document.getElementById('password').value;
            axios
                .post('http://8.148.233.225:8081/auth/login', this.loginInfo)
                .then(response => {
                    alert('登录成功')
                    token = response.data.data;
                    localStorage.setItem('userToken', token);
                    alert(token);
                    document.getElementById('container').style.display = "none";
                    document.getElementById('cancel').style.display = "none";
                    document.getElementById('screen').style.display = "none";
                })
                .catch(err => {
                    alert(`请求错误: ${err.response.data.message}`);

                });
        }
    }
})

new Vue({
    el: '#left_nav',
    data() {
        return {}
    },
    methods: {
        goUserCenter() {
            alert("进入用户中心");
            document.getElementById('longPost').style.display = "none";
            document.getElementById('user-center').style.display = "block";
        }
    }
})


new Vue({
    el: '#user-center',
    data() {
        return {
            information: {
                avatarInput: '',
                accountInput: '',
                emailInput: '',
            }

        }
    },
    created() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            axios
                .get('http://8.148.233.225:8081/user/me', {
                    headers: {
                        'token': token
                    }
                })
                .then(response => {
                    this.information.avatarInput = response.data.data.avatarUrl;
                    this.information.accountInput = response.data.data.username;
                    this.information.emailInput = response.data.data.email;
                })

        }
    }
})

new Vue({
    el: '#search_content',
    data() {
        return {
            searchInfo: '',
        }
    },
    methods: {
        search() {
            this.searchInfo = document.getElementById('search').value;
            axios
                .get('http://8.148.233.225:8081/posts', {
                    params: {
                        title: this.searchInfo
                    }
                })
                .then(response => {
                    alert(response.data);
                })
                .catch(err => {

                });
        }
    }

})

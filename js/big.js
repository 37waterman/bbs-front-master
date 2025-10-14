let token = localStorage.getItem('userToken');

new Vue({
    el: '#content',
    data() {
        return {
            postId: null,
            postList: null,
            hotPostList: null,
            postInfo: {
                title: '',
                subtitle: '',
                avatarUrl: '',
                username: '',
                content: '',
                createdTime: '',
                viewsCount: '',
                commentsCount: '',
            },
            commentList: null,
            total: 0,
            loading: false,
            error: null,
            errorDetails: null,
            searchInfo: '',
            information: {
                avatarInput: '',
                accountInput: '',
                emailInput: '',
            }
        }
    },
    mounted() {
        // 组件挂载后计算宽度
        this.calculateMiddleWidth();
        // 添加窗口大小变化监听
        window.addEventListener('resize', this.calculateMiddleWidth);
    },
    beforeDestroy() {
        // 清理事件监听器
        window.removeEventListener('resize', this.calculateMiddleWidth);
    },
    created() {
        this.getHotPostList();
        this.getPostList();
    },
    methods: {
        calculateMiddleWidth() {
            const leftNav = document.querySelector('.content .left_nav');
            const rightTopicArea = document.querySelector('.content .right_topic_area');
            const middleContent = document.querySelector('.content .middle_content');

            if (leftNav && rightTopicArea && middleContent) {
                const leftWidth = parseFloat(getComputedStyle(leftNav).width);
                const rightWidth = parseFloat(getComputedStyle(rightTopicArea).width);
                const middleWidth = window.innerWidth - leftWidth - rightWidth;
                middleContent.style.width = `${middleWidth}px`;
            }
        },
        homePage() {
            document.getElementById('topic').textContent = '今日主题';
            this.getPostList()
            this.viewBackPostList()
        },
        getPostList() {
            axios
                .get('http://8.148.233.225:8081/post')
                .then(response => {
                    console.log('完整响应数据:', response.data);

                    // 检查响应状态
                    if (response.data.code === 200) {
                        this.postList = response.data.data.rows;
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
        viewPost(post) {
            this.postId = post.id;
            // 填充帖子详情内容
            axios
                .get(`http://8.148.233.225:8081/post/${post.id}`)
                .then(response => {
                    console.log('完整响应数据:', response.data);
                    this.postInfo.title = response.data.data.title;
                    this.postInfo.subtitle = response.data.data.subtitle;
                    this.postInfo.avatarUrl = response.data.data.avatarUrl;
                    this.postInfo.username = response.data.data.username;
                    this.postInfo.content = response.data.data.content;
                    this.postInfo.createdTime = response.data.data.createdTime;
                    this.postInfo.viewsCount = response.data.data.viewsCount;
                    this.postInfo.commentsCount = response.data.data.commentsCount;

                })
                .catch(err => {
                    alert(`请求错误: ${err.response.data.message}`);
                });
            document.getElementById('longPost').style.display = 'none';
            document.getElementById('singlePost').style.display = 'block';
            this.getComment(post.id);
        },
        viewBackPostList() {
            document.getElementById('longPost').style.display = 'block';
            document.getElementById('singlePost').style.display = 'none';
            document.getElementById('user-center').style.display = 'none';
            document.getElementById('addPost').style.display = 'none';
        },
        goAddPostPage() {
            document.getElementById('longPost').style.display = "none";
            document.getElementById('addPost').style.display = "flex";
        },
        addPost() {
            const addPostInfo = {
                title: document.getElementById('title-input').value,
                subtitle: document.getElementById('subtitle-input').value,
                content: document.getElementById('post-content').value,
                boardId: parseInt(1)
            }
            axios
                .post('http://8.148.233.225:8081/post', addPostInfo, {
                        headers: {
                            'token': token
                        }
                    }
                )
                .then(response => {
                    alert('发布成功');
                    this.viewBackPostList();
                })
                .catch(err => {
                    alert(`请求错误: ${err.response.data.message}`);
                });
            this.viewBackPostList();
        },
        getComment(postId) {
            axios
                .get(`http://8.148.233.225:8081/comment/${postId}`)
                .then(response => {
                    console.log('完整响应数据:', response.data);
                    this.commentList = response.data.data.rows;
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
        goUserCenter() {
            this.getInfo();
            document.getElementById('longPost').style.display = "none";
            document.getElementById('user-center').style.display = "block";
            document.getElementById('singlePost').style.display = "none";
            document.getElementById('addPost').style.display = "none";

        },
        search(boardId) {
            this.viewBackPostList()
            this.searchInfo = document.getElementById('search').value;
            document.getElementById('search').value = '';
            axios
                .get('http://8.148.233.225:8081/post', {
                    params: {
                        title: this.searchInfo,
                        boardId: (parseInt(boardId, 10) ? parseInt(boardId) : null)
                    }
                })
                .then(response => {
                    this.postList = response.data.data.rows;
                    this.total = response.data.data.total;
                })
                .catch(err => {
                    alert(`请求错误: ${err.response.data.message}`)
                });
            switch (boardId) {
                case 1:
                    document.getElementById('topic').textContent = '校园生活';
                    break;
                case 2:
                    document.getElementById('topic').textContent = '互帮互助';
                    break;
                case 3:
                    document.getElementById('topic').textContent = '学术探讨';
                    break;
                default:
                    document.getElementById('topic').textContent = '搜索结果';
            }
        },
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
                .catch(err => {
                    alert(`请求错误: ${err.response.data.message}`)
                })
            document.getElementById('avatar').style.backgroundImage = this.information.avatarUrl
            document.getElementById('avatar').style.backgroundSize = 'cover';
            document.getElementById('avatar').style.color = 'transparent';
        },
        goMyFavorite() {
            this.postList = null;
            axios
                .get('http://8.148.233.225:8081/user/favourites', {
                    headers: {
                        'token': token
                    }
                })
                .then(response => {
                    this.postList = response.data.data.rows;
                    this.total = response.data.data.total;
                })
                .catch(err => {
                    alert(`请求错误: ${err.response.data.message}`)
                });

            this.viewBackPostList();
            document.getElementById('topic').textContent = '我的收藏';
        },
        goMyPost() {
            this.postList = null;
            axios
                .get('http://8.148.233.225:8081/user/posts', {
                    headers: {
                        'token': token
                    }
                })
                .then(response => {
                    this.postList = response.data.data.rows;
                    this.total = response.data.data.total;
                })
                .catch(err => {
                    alert(`请求错误: ${err.response.data.message}`)
                });

            this.viewBackPostList();
            document.getElementById('topic').textContent = '我的帖子';
        },
        addFavourite() {
            const formData = new FormData();
            formData.append('postId', this.postId);
            axios
                .post('http://8.148.233.225:8081/user/favourite', formData,
                    {
                        headers: {
                            'token': token
                        }
                    }
                )
                .then(response => {
                    alert('收藏成功');
                    document.getElementById('favourite').style.display = "none";
                    document.getElementById('removeFavourite').style.display = " inline-block";
                })
                .catch(err => {
                    alert(`请求错误: ${err.response.data.message}`)
                });
        },
        removeFavourite() {
            const formData = new FormData();
            formData.append('postId', this.postId);
            axios
                .delete('http://8.148.233.225:8081/user/favourite', {
                    data: formData,

                    headers: {
                        'token': token
                    }

                })
                .then(response => {
                    alert('取消收藏成功');
                    document.getElementById('favourite').style.display = " inline-block";
                    document.getElementById('removeFavourite').style.display = "none";
                })

        },

        updateAvatar(event) {
            const file = event.target.files[0];
            if (!file) return;

            // 文件类型验证
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                alert('只允许上传 JPG、PNG、GIF、WEBP 格式的图片');
                return;
            }

            // 文件大小验证（限制为5MB）
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                alert('图片大小不能超过 5MB');
                return;
            }

            // 创建 FormData 对象
            const formData = new FormData();
            formData.append('file', file);

            // 发送上传请求
            axios.post('http://8.148.233.225:8081/user/updateAvatar', formData, {
                headers: {
                    'token': token,
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    if (response.data.code === 200) {
                        // 更新头像显示
                        this.information.avatarInput = response.data.data;
                        document.getElementById('avatar').style.backgroundImage = `url(${response.data.data})`;
                        document.getElementById('avatar').style.backgroundSize = 'cover';
                        document.getElementById('avatar').style.color = 'transparent';
                        document.getElementById('avatar').textContent = ''; // 清空文字
                        alert('头像上传成功');
                    } else {
                        alert(`上传失败: ${response.data.message}`);
                        document.getElementById('avatar').textContent = originalText;
                    }
                })
                .catch(err => {
                    alert(`请求错误: ${err.response?.data?.message || '上传失败'}`);
                    document.getElementById('avatar').textContent = originalText;
                });
        },

        getHotPostList(){
            axios
                .get('http://8.148.233.225:8081/post/hot')
                .then(response => {
                    console.log('完整响应数据:', response.data);
                    this.hotPostList = response.data.data.rows;
                })
                .catch(err => {

                });
        },


        updateUserInfo() {
            // 获取用户输入的信息
            const updatedData = {
                username: document.getElementById('accountInput').value,
                email: document.getElementById('emailInput').value
            };

            // 发送更新请求
            axios
                .post('http://8.148.233.225:8081/user/updateInfo', updatedData, {
                    headers: {
                        'token': token
                    }
                })
                .then(response => {
                    if (response.data.data.code === 204) {
                        // 更新成功后更新本地数据
                        this.information.emailInput = updatedData.email;

                    } else {
                        alert(`更新失败: ${response.data.message}`);
                    }
                })
                .catch(err => {
                    alert(`请求错误: ${err.response.data.message || '更新失败'}`);
                });
            alert('信息更新成功');
            this.switchToViewMode();
        },
        logout() {
            localStorage.clear();
            document.getElementById('goLogin').style.display = "block";
            this.viewBackPostList();
        },

        switchToEditMode() {
            // 隐藏文本值，显示输入框
            document.querySelectorAll('.info-value').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.info-input').forEach(el => el.style.display = 'block');

            // 切换按钮显示
            document.getElementById('editBtn').style.display = 'none';
            document.getElementById('saveBtn').style.display = 'inline-block';
            document.getElementById('cancelBtn').style.display = 'inline-block';
        },

        switchToViewMode() {
            // 隐藏输入框，显示文本值
            document.querySelectorAll('.info-input').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.info-value').forEach(el => el.style.display = 'block');

            // 切换按钮显示
            document.getElementById('editBtn').style.display = 'inline-block';
            document.getElementById('saveBtn').style.display = 'none';
            document.getElementById('cancelBtn').style.display = 'none';
        }


    }

})
new Vue({
    el: '#header',
    data() {
        return {
            postList: null,
        }
    },

    methods: {
        goLogin() {
            document.getElementById('container').style.display = "block";
            document.querySelector('.cancel').style.display = "block";
            document.getElementById('screen').style.display = "block";
        },
        goHomePage() {
            document.getElementById('longPost').style.display = "block";
            document.getElementById('user-center').style.display = "none";
            document.getElementById('singlePost').style.display = "none";
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

    }
})
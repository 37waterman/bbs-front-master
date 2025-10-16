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
                    document.getElementById('goLogin').style.display = "none";
                    document.getElementById('container').style.display = "none";
                    document.getElementById('cancel').style.display = "none";
                    document.getElementById('screen').style.display = "none";
                })
                .catch(err => {
                    alert(`请求错误: ${err.response.data.message}`);

                });
        },
        goForgetPassword() {
            document.getElementById('forget').style.display = "block";
            document.getElementById('remember').style.display = "none";


        },
        goBack() {
            document.getElementById('forget').style.display = "none";
            document.getElementById('remember').style.display = "block";
        },
        forgetPassword() {
            let username = document.getElementById('forgetUsername').value;
            let email = document.getElementById('forgetEmail').value;
            let password = document.getElementById('forgetPassword').value;
            axios
                .post('http://8.148.233.225:8081/user/updatePassword', {
                    username: username,
                    email: email,
                    password: password
                })
                .then(response => {
                    alert('修改成功 请返回登录')
                    this.goBack();
                    document.getElementById('forgetUsername').value = '';
                    document.getElementById('forgetEmail').value = '';
                    document.getElementById('forgetPassword').value = '';
                })
                .catch(err => {
                    alert(`请求错误: ${err.response.data.message}`);

                });
            document.getElementById('forgetUsername').value = '';
            document.getElementById('forgetEmail').value = '';
            document.getElementById('forgetPassword').value = '';
        }

    }
})

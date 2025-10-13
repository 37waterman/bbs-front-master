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
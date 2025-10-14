const inside_help = document.querySelector('#inside_help')
const screen = document.querySelector('#screen');
const inside_suggest = document.querySelector('#inside_suggest')


new Vue({
    el: '#header',
    data() {
        return {}
    },
    created() {
        this.checkLoginStatus();
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
        checkLoginStatus() {
            const token = localStorage.getItem('userToken');
            const loginButton = document.getElementById('goLogin');

            if (token != null) {
                loginButton.style.display = "none";
            } else {
                loginButton.style.display = "block";
            }
        },
        goHelp() {
            inside_help.style.display = "block";
            document.getElementById('cancel').style.display = "block";
            screen.style.display = "block";
        },
        goSuggest() {
            inside_suggest.style.display = "block";
            document.getElementById('cancel').style.display = "block";
            screen.style.display = "block";
        },


    }
})
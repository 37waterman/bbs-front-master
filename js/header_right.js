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
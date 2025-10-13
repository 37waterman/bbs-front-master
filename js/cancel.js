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
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
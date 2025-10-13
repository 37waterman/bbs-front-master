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
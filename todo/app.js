let items = ""

new Vue({
    el: '#app',
    data: {
        items: [],
        newtodoitem: '',
        sortedbyASC: true
    },
    created() {
        this.fetch_data()
    },
    methods: {
        addNewTodoItem: function () {
            this.items.push({
                id: this.item_maxId(),
                title: this.newtodoitem,
                userId: 6815,
                completed: false
            })
            console.log(this.items[this.items.length - 1].id + " " + this.items[this.items.length-1].title)
            this.newTodoText = ''
        },
        RemoveTodoItem(item) {
            console.log("remove " + item.id)
            this.items.splice(item, 1)
        },

        Sort() {
            sortBy = 'title'
            console.log('sort')
            if (this.sortedbyASC) {
                this.items.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
                this.sortedbyASC = false;
            } else {
                this.items.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
                this.sortedbyASC = true;
            }
        },
        fetch_data: function(){
            fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(result => result.json())
            .then(data => (this.items = data))
        },

        items_done: function()
        {
            return this.items.filter(item => item.completed == true)
        },

        items_undone: function()
        {
            return this.items.filter(item => item.completed == false)
        },

        item_maxId: function () {
            var m = Math.max(...this.items.map(o => o.id)) + 1
            console.log(" - " + m)
            return m
        }

    },
})
<template>
    <div class="day">
        <h1 class="day-name">{{day.name}}</h1>
        <div class="panel tasks-container">
            <h2 class="category">Tasks</h2>
            <div class="new-task-input">
                <input  type="text" 
                        placeholder="New task" 
                        v-model="taskName"
                        v-on:keyup="createNewTask">
                <i class="fas fa-plus btn-add-icon" v-on:click="createNewTask"></i>
            </div>
            <ul>
                <Task v-for="task in todaysTasks" :key="task.id" :task="task"></Task>
            </ul>
        </div>
        <div class="panel activities-container">
            <h2 class="category">Activities</h2>
        </div>
        <div class="panel meals-container">
            <h2 class="category">Meals</h2>
        </div>
    </div>
</template>

<script>
import Task from './Task';
export default {
    name: 'Day',
    data() {
        return {
            taskName: ""
        }  
    },
    methods: {
        createNewTask: function(e) {
            if( this.taskName !== "" && ( e.type === 'click' || e.keyCode === 13 ) ) {
                // add new task to tasks array in Store
                this.$store.commit('addNewTask', 
                    {
                        task: this.taskName, 
                        day: this.day.name,
                        id: Symbol('task'),
                        completed: false,
                        users: [],
                        note: "",
                        open: false
                    });
                // clear the input
                this.taskName = "";
            }   
        }       
    },
    computed: {
        todaysTasks: function() {
            return this.$store.state.tasks
                .filter( task => task.day === this.day.name )
                .sort( (a, b) => a.completed - b.completed );
        }
    },
    props: ['day'],
    components: {
        Task
    }
};
</script>

<style scoped>
.day {
  border: 1px solid #888;
  border-radius: 3px;
  box-shadow: #888 0 2px 2px;
  min-height: 90vh;
}
.day-name {
    font-family: 'Dancing Script', cursive;
}
.panel {
    background-color: #efefef;
    border-radius: 3px;
    margin: 10px 3px;
    padding: 3px;
}
ul {
    padding: 0;
}
.category {
    text-align: left;
    padding-left: 20px;
}
.new-task-input {
    display: grid;
    grid-template-columns: 1fr 40px;
}
.btn-add-icon {
    font-size: 30px;
    color: #3eaf7c;
    transition: .2s;
    padding: 3px;
}
.btn-add-icon:hover {
    color: #ff5252;
}
input[type="text"] {
    display: inline-block;
    vertical-align: top;
    height: 34px;
    padding: 0 12px;
    margin: 0 0 0 6px;
    text-align: left;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
</style>
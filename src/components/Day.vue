<template>
    <div class="day">
        <h1 class="day-name">{{day.name}}</h1>
        <h2 class="category">Tasks</h2>
        <div class="new-task-input">
            <input  type="text" 
                    placeholder="New task" 
                    v-model="taskName"
                    v-on:keyup="createNewTask">
            <i class="fas fa-plus btn-add-icon" v-on:click="createNewTask"></i>
        </div>
        <ul>
            <li v-for="task in todaysTasks" class="task">
                <Complete :task="task"></Complete>
                <Remove :task="task"></Remove>
                <p v-bind:class="{ completed: task.completed }">{{task.task}}</p>
                <div class="user" v-for="user in task.users" v-bind:style ="{backgroundColor: user.color}">{{user.name}}</div>
            </li>
        </ul>
        <h2 class="category">Activities</h2>
        <h2 class="category">Meals</h2>
    </div>
</template>

<script>
import Remove from './Remove';
import Complete from './Complete';
export default {
  name: 'Day',
  data() {
    return {
      newTask: "",
      taskName: ""
    };
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
                    users: this.$store.state.users
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
      Remove,
      Complete
  }
};
</script>

<style scoped>
.day {
    background-color: #fff;
}
.day-name {
    font-family: 'Dancing Script', cursive;
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
    grid-template-columns: 5fr 1fr;
}
.task {
    list-style: none;
    text-align: left;
    padding: 2px 0 0 0;
    margin: 10px 5px;
    border: 1px solid #333;
    box-shadow: #333 0 2px 2px;
    transition: .2s ease-in-out;
    display: grid;
    grid-template-columns: 30px 30px 1fr;
    align-content: center;
}
.task:hover {
    transform: translateY(-2px);
    box-shadow: #333 0 2px 5px;
}
.task p {
    font-size: 20px;
    margin: 0;
    padding-left: 5px
}
.completed {
    text-decoration: line-through;
}
.completed {
     color: #888;
}
.btn-add-icon {
    font-size: 30px;
    color: #3eaf7c;
    transition: .2s;
    padding: 8px 3px 3px 3px;
}
.btn-add-icon:hover {
    color: #ff5252;
}
input[type="text"] {
    display: inline-block;
    vertical-align: top;
    height: 34px;
    padding: 6px 12px;
    margin: 0 0 0 10px;
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
.user {
    grid-column: 1 / span 3;
    color: #fff;
    padding-left: 3px;
}


</style>
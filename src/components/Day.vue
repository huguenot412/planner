<template>
    <div class="day">
        <h1 class="day-name">{{day.name}}</h1>
        <input  type="text" 
                placeholder="New task" 
                v-model="taskName">
        <div class="btn-add" v-on:click="createNewTask()">
            <i class="fas fa-plus btn-add-icon"></i>
        </div >
        <p>{{newTask.name}}</p>
        <ul>
            <li v-for="task in todaysTasks" class="task">
                <p v-bind:class="{ completed: task.completed }">{{task.task}}</p>
                <Complete :task="task"></Complete>
                <Remove :task="task"></Remove>
            </li>
        </ul>
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
      createNewTask: function() {
        if(this.taskName !== "") {
            // add new task to tasks array in Store
            this.$store.commit('addNewTask', 
                {
                    task: this.taskName, 
                    day: this.day.name,
                    id: Symbol('task'),
                    completed: false
                });
            // clear the input
            this.taskName = "";
        }       
      }
  },
  computed: {
      todaysTasks: function() {
        return this.$store.state.tasks
            .filter(task => task.day === this.day.name)
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
.task {
    list-style: none;
}
.task p {
    font-size: 30px;
    display: inline-block; 
    margin: 0;
    
}
.completed {
    text-decoration: line-through;
}
.btn-add {
    display: inline-block;
    margin: 0;
    padding: 0;
    height: 40px;
    width: 40px;
    padding-top: 8px;
}
.btn-add-icon {
    font-size: 30px;
    color: #3eaf7c;
    transition: .2s;
}
.btn-add-icon:hover {
    color: #ff5252;
}
input[type="text"] {
    display: inline-block;
    vertical-align: top;
    width: 50%;
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


</style>
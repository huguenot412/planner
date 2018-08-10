<template>
    <div class="day">
        <h1>{{day}}</h1>
        <input  type="text" 
                placeholder="New task" 
                v-model="taskName">
        <i  class="fas fa-plus-square btn-add"
            v-on:click="createNewTask()"></i>
        <p>{{newTask.name}}</p>
        <p>{{newTask.day}}</p>
        <ul>
            <li v-for="task in todaysTasks" class="task">
                {{task.task}}
            </li>
        </ul>
    </div>
</template>

<script>
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
          this.newTask = {
              name: this.taskName,
              day: this.day
          }
      }
  },
  computed: {
      todaysTasks: function() {
          return this.$store.state.tasks.filter(task => task.day === this.day);
      }
  },
  props: ['day']
};
</script>

<style scoped>
.day {
    background-color: #fff;
}
ul {
    padding: 0;
}
.task {
    list-style: none;
    font-size: 30px;
}
.btn-add {
    font-size: 48px;
}
input[type="text"] {
    display: inline-block;
    width: 70%;
    height: 34px;
    padding: 6px 12px;
    margin: auto;
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
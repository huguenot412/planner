<template>
    <div>
        <h1>{{day}}</h1>
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
      
    };
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

ul {
    padding: 0;
}
.task {
    list-style: none;
}


</style>
<template>
  <div class="week">
    <div class="day" v-for="day in days" v-bind:key="day.name">
      <Day :day="day"></Day>
    </div>
  </div>
</template>

<script>
import Day from './day';
import axios from 'axios';
export default {
  name: 'Planner',
  data() {
    return {
      days: this.$store.state.days
    };
  },
  created: function() {
    axios.get('http://localhost:3000/api/tasks')
      .then(result => {
        this.$store.commit('getAllTasks', result.data);
      });

    axios.get('http://localhost:3000/api/meals')
      .then(result => {
        this.$store.commit('getAllMeals', result.data);
      });
  },
  components: {
    Day
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: 5px;
  margin: 0 5px;
  grid-column: 2 / -1;
}



</style>

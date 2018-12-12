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
  width: 100%;
  min-height: 100%;
  /* display: flex;
  align-items: stretch;
  justify-content: space-around; */
  display: grid;
  grid-template-columns: repeat(7, auto);
  grid-column-gap: 5px;
  grid-column: 2 / -1;
  padding: 5px;
  box-sizing: border-box;
}

@media screen and (max-width: 1199px) {
  .week {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
@media screen and (max-width: 769px) {
  .week {
    grid-template-columns: 1fr;
  }
}



</style>

<template>
  <div id="planner" class="planner-container">
    <div class="header">
      <h1 class="header-title">Weekly Planner</h1>
    </div>
    <div class="week">
      <div class="day" v-for="day in days">
        <Day :day="day"></Day>
      </div>
    </div>
  </div>
</template>

<script>
import Day from './day';
export default {
  name: 'Planner',
  data() {
    return {
      days: this.$store.state.days
    };
  },
  components: {
    Day
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.header {
  min-height: 150px;
  padding: 0 0 0 40px;
  background-image: linear-gradient(to right,rgba(62,175,124,.4),rgba(62,175,124,.6)), url("../assets/planner.jpg");
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
  display: grid;
  justify-items: start; 
  align-items: center;
}
.header-title {
  font-size: 50px;
}
.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: 5px;
  margin: 0 5px;
}
.day {
  border: 1px solid #333;
  height: 80vh;
}


</style>

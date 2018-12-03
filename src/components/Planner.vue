<template>
  <div id="planner" class="planner-container">
    <div class="header">
      <h1 class="header-title">Weekly Planner</h1>
    </div>
    <div class="side-nav">
      <i class="far fa-calendar-alt btn-calendar"></i>
      <i class="fas fa-tasks btn-tasks"></i>
      <i class="fas fa-users btn-users"></i>
      <i class="fas fa-utensils btn-recipes"></i>
      <i class="far fa-clock btn-activities"></i>
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
.planner-container {
  display: grid;
  grid-template-columns: 80px 1fr;
}
.header {
  height: 80px;
  padding: 0 0 0 40px;
  background-image: linear-gradient(to right,rgba(62,175,124,.5),rgba(62,175,124,.5)), url("../assets/planner.jpg");
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
  display: grid;
  justify-items: start; 
  align-items: center;
  grid-column: 1 / -1;
}
.header-title {
  font-size: 50px;
  font-family: 'Dancing Script', cursive;
  margin: 10px 0;
}
.side-nav {
  grid-column: 1 / span 1;
  grid-row: 2 / last-line;
  background-color: #3eaf7c;
  color: #fff;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto-fill, 50px);
}
.side-nav i {
  justify-self: center;
  align-self: center;
  width: 60px;
  padding: 10px;
  font-size: 20px;
}
.side-nav i:hover {
  color: #ff5252;
}
.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: 5px;
  margin: 0 5px;
  grid-column: 2 / -1;
}



</style>

<template>
  <div id="planner" class="planner-container">
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
.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: 5px;
}
.day {
  border: 1px solid #333;
  height: 80vh;
}


</style>

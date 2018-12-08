<template>
  <div id="app">
    <div id="planner" class="planner-container">
      <div class="header">
        <h1 class="header-title">Weekly Planner</h1>
      </div>
      <div class="side-nav">
        <router-link to="/planner"><i class="far fa-calendar-alt btn-calendar"></i></router-link>
        <router-link to="/tasks"><i class="fas fa-tasks btn-tasks"></i></router-link>
        <router-link to="/users"><i class="fas fa-users btn-users"></i></router-link>
        <router-link to="/recipes"><i class="fas fa-utensils btn-recipes"></i></router-link>
        <router-link to="/activities"><i class="far fa-clock btn-activities"></i></router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  background-color: #fff;
  margin: 0;
  color: #333;
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.planner-container {
  display: grid;
  grid-template-columns: 80px 1fr;
}
.header {
  height: 80px;
  padding: 0 0 0 40px;
  background-image: linear-gradient(to right,rgba(62,175,124,.5),rgba(62,175,124,.5)), url("./assets/planner.jpg");
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
a,
a:visited,
a:link {
  color: #fff;
}
a:active {
  color: #ff5252;
}

</style>

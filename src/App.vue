<template>
  <div id="app">
    <div id="planner" class="planner-container">
      <div class="header">
        <h1 class="header-title">{{viewTitle}}</h1>
      </div>
      <div class="side-nav">
          <div class="side-nav-links">
            <router-link to="/planner"><i class="far fa-calendar-alt btn-calendar" @click="updateViewTitle('Planner')"></i></router-link>
            <router-link to="/tasks"><i class="fas fa-tasks btn-tasks" @click="updateViewTitle('Tasks')"></i></router-link>
            <router-link to="/users"><i class="fas fa-users btn-users" @click="updateViewTitle('Users')"></i></router-link>
            <router-link to="/recipes"><i class="fas fa-utensils btn-recipes" @click="updateViewTitle('Recipes')"></i></router-link>
            <router-link to="/activities"><i class="far fa-clock btn-activities" @click="updateViewTitle('Activities')"></i></router-link>
          </div>
      </div>
      <div class="view"><router-view/></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      viewTitle: "Planner"
    }
  },
  methods: {
    updateViewTitle: function(title) {
      this.viewTitle = title;
      console.log('view title updated');
    }
  }
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
  grid-template-columns: 60px 1fr;
  grid-template-rows: 80px 1fr;
  /* background: linear-gradient(to right,rgba(62,175,124,1),rgba(62,175,124,0)); */
}
.header {
  height: 80px;
  padding: 0 0 0 40px;
  /* background-image: linear-gradient(to right,rgba(62,175,124,.5),rgba(62,175,124,.5)), url("./assets/planner.jpg"); */
  background-size: cover;
  background-position: center;
  display: grid;
  justify-items: start; 
  align-items: center;
  grid-column: 2 / -1;
  grid-row: 1 / span 1;
}
.header-title {
  font-size: 50px;
  font-family: 'Dancing Script', cursive;
  margin: 10px 0;
}
.side-nav {
  grid-column: 1 / span 1;
  grid-row: 1 / -1;
  background-color: #3eaf7c;
  color: #fff;
  grid-template-columns: 1fr;
  min-height: 100vh;
  padding-top: 10px;
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
.side-nav-links {
  position: sticky;
  top: 0;
}
.view {
  grid-column: 2 / -1;
  grid-row: 2 / span 1;
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

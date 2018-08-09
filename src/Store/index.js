import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    tasks: [
      {
        task: 'Learn Vue',
        day: 'Monday'
      },
      {
        task: 'bake cookies',
        day: 'Friday'
      }
    ],
    meals: [],
    recipes: [],
    users: []
  }
});

export default store;

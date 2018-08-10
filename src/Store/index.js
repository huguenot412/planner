import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    days: [
      {
        name: 'Monday',
        type: 'weekday'
      },
      {
        name: 'Tuesday',
        type: 'weekday'
      },
      {
        name: 'Wednesday',
        type: 'weekday'
      },
      {
        name: 'Thursday',
        type: 'weekday'
      },
      {
        name: 'Friday',
        type: 'weekday'
      },
      {
        name: 'Saturday',
        type: 'weekend'
      },
      {
        name: 'Sunday',
        type: 'weekend'
      }
    ],

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
  },
  mutations: {
    addNewTask (state, task) {
      state.tasks.push(task);
    }
  }
});

export default store;

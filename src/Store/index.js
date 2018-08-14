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

    tasks: [],
    meals: [],
    recipes: [],
    users: [
      {
        name: 'Chris',
        tasks: [],
        meals: [],
        activities: []
      },
      {
        name: 'Olivia',
        tasks: [],
        meals: [],
        activities: []
      }
    ]
  },
  mutations: {
    addNewTask (state, task) {
      state.tasks.push(task);
    },
    deleteItem (state, id) {
      state.tasks = state.tasks.filter( task => {
        console.log(id);
        return task.id !== id;
      });
    }
  }
});

export default store;

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
        id: Symbol('user'),
        tasks: [],
        meals: [],
        activities: [],
        color: '#3eaf7c'
      },
      {
        name: 'Olivia',
        id: Symbol('user'),
        tasks: [],
        meals: [],
        activities: [],
        color: '#ff5252'
      }
    ]
  },
  mutations: {
    addNewTask (state, task) {
      state.tasks.push(task);
    },
    deleteItem (state, item) {
      state[item.array] = state[item.array].filter( task => {
        return task.id !== item.id;
      });
    },
    checkOff (state, item) {
      item.completed = !item.completed;
    },
    assignUser (state, data) {
      data.task.users.push(data.user);
    },
    unassignUser (state, data) {
      data.task.users = data.task.users.filter( user => {
        return user.id !== data.user.id;
      });
    }
  }
});

export default store;

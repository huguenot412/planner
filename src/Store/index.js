import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// const uniqid = require('uniqid');

const store = new Vuex.Store({
  state: {
    currentDraggable: {},
    days: [
      {
        name: 'Monday',
        type: 'weekday',
      },
      {
        name: 'Tuesday',
        type: 'weekday',
      },
      {
        name: 'Wednesday',
        type: 'weekday',
      },
      {
        name: 'Thursday',
        type: 'weekday',
      },
      {
        name: 'Friday',
        type: 'weekday',
      },
      {
        name: 'Saturday',
        type: 'weekend',
      },
      {
        name: 'Sunday',
        type: 'weekend',
      },
    ],
    tasks: [],
    meals: [
      {
        name: 'Pommes de Terre au Four',
        day: 'Saturday',
        id: Symbol('meal'),
        note: '',
        type: 'Dinner',
        list: 'meals'
      },
      {
        name: 'Yellow Curry Chicken',
        day: 'Monday',
        id: Symbol('meal'),
        note: '',
        type: 'Dinner',
        list: 'meals'
      },
      {
        name: 'Crepes',
        day: 'Monday',
        id: Symbol('meal'),
        note: '',
        type: 'Breakfast',
        list: 'meals'
      },
      {
        name: 'Soup',
        day: 'Monday',
        id: Symbol('meal'),
        note: '',
        type: 'Lunch',
        list: 'meals'
      },
      {
        name: 'Green Salad',
        day: 'Wednesday',
        id: Symbol('meal'),
        note: '',
        type: 'Lunch',
        list: 'meals'
      },
    ],
    recipes: [
      {
        name: 'Crepes',
        ingredients: [
          {
            name: 'sugar',
            amount: 1,
            unit: 'Tbsp',
          },
          {
            name: 'flour',
            amount: 250,
            unit: 'g',
          },
          {
            name: 'milk',
            amount: 250,
            unit: 'ml',
          },
          {
            name: 'eggs',
            amount: 4,
            unit: null,
          },
        ],
        prepTime: 5,
        cookingtime: 1,
        directions: [
          'Mix ingredients',
          'Heat crepe pan and apply butter or oil',
          'cook on crepe pan',
        ],
        note: 'Simple, quick and delicious!',
        id: Symbol('recipe'),
      },
    ],
    users: [
      {
        name: 'Chris',
        id: Symbol('user'),
        tasks: [],
        meals: [],
        activities: [],
        color: '#3eaf7c',
      },
      {
        name: 'Olivia',
        id: Symbol('user'),
        tasks: [],
        meals: [],
        activities: [],
        color: '#ff5252',
      },
      {
        name: 'Lea',
        id: Symbol('user'),
        tasks: [],
        meals: [],
        activities: [],
        color: '#9E55BC',
      },
    ],
  },
  mutations: {
    addNewTask(state, task) {
      state.tasks.push(task);
    },
    addNewMeal(state, meal) {
      state.meals.push(meal);
    },
    deleteItem(state, item) {
      state[item.array] = state[item.array].filter(x => x.id !== item.id);
    },
    checkOff(state, item) {
      item.completed = !item.completed;
    },
    assignUser(state, data) {
      data.task.users.push(data.user);
    },
    unassignUser(state, data) {
      data.task.users = data.task.users.filter(user => user.id !== data.user.id);
    },
    changeDay(state, data) {
      const item = state[data.item.list].find(x => x.id === data.item.id);
      item.day = data.day.name;
    },
    drag(state, item) {
      state.currentDraggable = item;
    },
    drop(state, day) {
      state.currentDraggable.day = day.name;
      state.currentDraggable = {};
    }
  },
});

export default store;

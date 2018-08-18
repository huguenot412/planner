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
    meals: [
      {
        name: "Pommes de Terre au Four",
        day: 'Saturday',
        id: Symbol('meal'),
        note: "",
        type: 'Dinner'
        
      },
      {
        name: "Yellow Curry Chicken",
        day: 'Monday',
        id: Symbol('meal'),
        note: "",
        type: 'Dinner'
      },
      {
        name: "Crepes",
        day: 'Monday',
        id: Symbol('meal'),
        note: "",
        type: 'Breakfast'
      },
      {
        name: "Soup",
        day: 'Monday',
        id: Symbol('meal'),
        note: "",
        type: "Lunch"
      },
      {
        name: "Green Salad",
        day: 'Wednesday',
        id: Symbol('meal'),
        note: "",
        type: "Lunch"
      }
    ],
    recipes: [
      {
        name: "Crepes",
        ingredients: [
          {
            name: 'sugar',
            amount: 1,
            unit: 'Tbsp'
          },
          {
            name: 'flour',
            amount: 250,
            unit: 'g'
          },
          {
            name: 'milk',
            amount: 250,
            unit: 'ml'
          },
          {
            name: 'eggs',
            amount: 4,
            unit: null
          }
        ],
        prepTime: 5,
        cookingtime: 1,
        directions: [
          'Mix ingredients',
          'Heat crepe pan and apply butter or oil',
          'cook on crepe pan'
        ],
        note: 'Simple, quick and delicious!',
        id: Symbol('recipe')
      }
    ],
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
      },
      {
        name: 'Lea',
        id: Symbol('user'),
        tasks: [],
        meals: [],
        activities: [],
        color: '#9E55BC'
      }
    ]
  },
  mutations: {
    addNewTask (state, task) {
      state.tasks.push(task);
    },
    addNewMeal (state, meal) {
      state.meals.push(meal);
    },
    deleteItem (state, item) {
      state[item.array] = state[item.array].filter( x => {
        return x.id !== item.id;
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

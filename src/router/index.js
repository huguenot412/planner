import Vue from 'vue';
import Router from 'vue-router';
import Planner from '@/components/Planner';
import TaskDash from '@/components/TaskDash';
import Users from '@/components/Users';
import Recipes from '@/components/Recipes';
import Activities from '@/components/Activities';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Planner
    },
    {
      path: '/planner',
      name: 'Planner',
      component: Planner
    },
    {
      path: '/tasks',
      name: 'TaskDash',
      component: TaskDash
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: Recipes
    },
    {
      path: '/activities',
      name: 'Activities',
      component: Activities
    },
  ],
});

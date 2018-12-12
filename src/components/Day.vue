<template>
    <div class="day" 
        v-on:dragover.prevent="dragOver($event)" 
        v-on:drop.prevent="drop($event)">
        <h1 class="day-name">{{day.name}}</h1>
        <div class="panel tasks-container">
            <h2 class="category">Tasks</h2>
            <div class="new-item-input">
                <input  type="text" 
                        placeholder="New task" 
                        v-model="taskName"
                        v-on:keyup="createNewTask">
                <i class="fas fa-plus btn-add-icon" v-on:click="createNewTask"></i>
            </div>
            <ul>
                <Task v-for="task in todaysTasks" :key="task.id" :task="task"></Task>
            </ul>
        </div>
        <div class="panel activities-container">
            <h2 class="category">Activities</h2>
        </div>
        <div class="panel meals-container">
            <h2 class="category">Meals</h2>
            <div class="search-container">
                <div class="new-item-input">
                    <input  type="text" 
                            placeholder="New meal" 
                            v-model="mealName"
                            v-on:keyup="createNewMeal">
                    <i class="fas fa-plus btn-add-icon" v-on:click="createNewMeal"></i>
                </div>
                <div class="search-list" v-if="searchItems.length > 0">
                    <div class="search-item" v-for="item in searchItems">{{item.name}}</div> 
                </div>
            </div>
            <ul>
                <Meal v-for="meal in todaysMeals" :key="meal.id" :meal="meal"></Meal>
            </ul>
        </div>
    </div>
</template>

<script>
import Task from './Task';
import Meal from './Meal';

import axios from 'axios';

// const task = require('../../models/task').Task;

// const uniqid = require('uniqid');

export default {
    name: 'Day',
    data() {
        return {
            taskName: "",
            mealName: "",
            searchItems: []
        }  
    },
    methods: {
        createNewTask: function(e) {
            if( this.taskName !== "" && ( e.type === 'click' || e.keyCode === 13 ) ) {
                // add new task to tasks array in Store
                axios.post('http://localhost:3000/api/tasks', { taskName: this.taskName, day: this.day.name })
                    .then((res) => {
                        this.$store.commit('addNewTask', res.data);
                    });
                this.taskName = "";
            }   
        },
        showSearchResults: function() { 
            
            this.searchItems = this.$store.state.meals
                .filter((meal) => {
                    return meal.name.toLowerCase().includes(this.mealName);
                });
            if(this.mealName === '') { this.searchItems = [] };
        },
        createNewMeal: function(e) {
            if( this.mealName !== "" && ( e.type === 'click' || e.keyCode === 13 ) ) {
                // add new meal to meals array in Store
                axios.post('http://localhost:3000/api/meals', { name: this.mealName, day: this.day.name })
                    .then((res) => {
                        this.$store.commit('addNewMeal', res.data);
                    });

                // clear the input
                this.mealName = "";
            } else if ( e.type === 'keyup' && e.keyCode !== 13 ) {
                this.showSearchResults();
            }
        },
        dragOver: function($event) {
            $event.dataTransfer.dropEffect = "move";
        },
        drop: function($event) {
            console.log(this.$store.state.currentDraggable.list);
            axios.post(`http://localhost:3000/api/update_${this.$store.state.currentDraggable.list}`, {item: this.$store.state.currentDraggable});
            this.$store.commit('drop', this.day);           
        }   
    },
    computed: {
        // Need to refactor with Vue Getters
        todaysTasks: function() {
            return this.$store.state.tasks
                .filter( task => task.day === this.day.name )
                .sort( (a, b) => a.completed - b.completed );
        },
        todaysMeals: function() {
            return this.$store.state.meals
                .filter( meal => meal.day === this.day.name )
                // Sorts Breakfast > Lunch > Dinner from top to bottom
                .map( meal => {
                    if(meal.type === "Breakfast") { meal.order = 1 };
                    if(meal.type === "Lunch") { meal.order = 2 };
                    if(meal.type === "Dinner") { meal.order = 3 };
                    return meal;
                })
                .sort( (a,b) => { return a.order - b.order });
        }
    },
    props: ['day'],
    components: {
        Task,
        Meal
    }
};
</script>
<style>
.panel li {
    list-style: none;
    text-align: left;
    padding: 0;
    margin: 10px 5px;
    border: 1px solid #888;
    border-radius: 3px;
    box-shadow: #888 0 2px 2px;
    transition: .2s ease-in-out;
    display: grid;
    grid-template-columns: 1fr;
    align-content: center;
    background-color: #fff;
}
h3 {
    grid-column: 1 / -1;
    grid-row: 1 / span 1;
    padding: 10px;
    font-size: 18px;
    margin: 0;
    font-weight: 400;
}
.btn-panel i:hover {
    cursor: pointer !important;
}
</style>

<style scoped>
.day {
  border: 1px solid #888;
  border-radius: 3px;
  box-shadow: #888 0 2px 2px;
  /* flex: 1; */
}
.day-name {
    font-family: 'Dancing Script', cursive;
}
.panel {
    background-color: #fff;;
    border-radius: 3px;
    margin: 0 3px;
    padding: 3px;
}
ul {
    padding: 0;
}
.category {
    text-align: left;
    padding-left: 20px;
}
.new-item-input {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 40px;
}
.btn-add-icon {
    font-size: 30px;
    color: #3eaf7c;
    transition: .2s;
    padding: 3px;
}
.btn-add-icon:hover {
    color: #ff5252;
    text-shadow: 0 4px 10px #747575;
}
input[type="text"] {
    display: inline-block;
    vertical-align: top;
    height: 34px;
    padding: 0 8px;
    margin: 0 0 0 6px;
    text-align: left;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    width: 95%;
}
.search-container {
    position: relative;
    height: 50px;

}
.search-list {
    position: absolute;
    top: 34px;
    left: 0;
    background-color: #fff;
    padding: 10px;
    width: 100%;
    text-align: left;
    z-index: 100;
    box-shadow: #333 0px 2px 8px 0px;
}
.search-item {
    padding: 10px;
    width: 100%;
}
.search-item:hover {
    background-color: #efefef;
}
</style>
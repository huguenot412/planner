<template>
    <li class="meal" 
        draggable v-on:dragstart="startDrag($event)" 
        v-on:mousedown="grabbing"
        v-on:mouseup="loosenGrip"> 
        <h3 class="meal-name" v-if="!editMode">{{meal.name}}</h3>
        <div class="btn-panel" v-if="!editMode">
            <i class="fas btn-list" 
                v-on:click="toggleMealDetails"
                v-bind:class="{
                    'fa-chevron-up': isOpen, 
                    'fa-chevron-down': !isOpen,
                    'btn-active': isOpen
                }"></i>
            <i class="far fa-edit btn-edit"
                v-on:click="toggleMealEdit"></i>
            <Remove :item="meal" :array="array"></Remove>
        </div>
        <div class="meal-edit" v-if="editMode">
            <input type="text" v-model="meal.name" v-on:keyup="toggleMealEdit">
            <div class="btn-save" v-on:click="toggleMealEdit">Save</div>
        </div>
        <p v-if="!isOpen && meal.note !== ''" class="note"><span>Note:</span> {{meal.note}}</p>
        <div class="meal-details" v-if="isOpen">
            <div class="notes">
                <div class="btn-add-note" v-on:click="toggleNoteEdit">{{noteBtnText}} note</div>
                <div class="note" v-if="!noteEdit && meal.note !== ''"><span>Note:</span> {{meal.note}}</div>
                <textarea class="note-edit" 
                            name="note" 
                            v-model="meal.note" 
                            v-if="noteEdit"
                            v-on:keyup="toggleNoteEdit"></textarea>
            </div>
            <div class="meal-types">
                <p>Set meal type:</p>
                <ul>
                    <li class="meal-label breakfast" 
                        @click="setMealType('Breakfast')">Breakfast</li>
                    <li class="meal-label lunch" 
                        @click="setMealType('Lunch')">Lunch</li>
                    <li class="meal-label dinner" 
                        @click="setMealType('Dinner')">Dinner</li>
                </ul>
            </div>
        </div>
        <div class="meal-type" 
             v-bind:style ="{backgroundColor: mealColor()}">
             <span class="user-name">{{meal.type}}</span>
        </div>
    </li>
</template>

<script>
    import Remove from './Remove';
    import Complete from './Complete'; 
    import axios from 'axios'
    export default {
        name: 'meal',
        data() {
            return {
                isOpen: false,
                noteEdit: false,
                editMode: false,
                noteBtnText: 'Add',
                array: 'meals',
                mealColor: function() {
                    if(this.meal.type === 'Breakfast') { return '#3eaf7c' };
                    if(this.meal.type === 'Lunch') { return '#ff5252' };
                    if(this.meal.type === 'Dinner') { return '#9E55BC' };
                }
            }
        },
        methods: {
            toggleMealDetails: function() {
                this.isOpen = !this.isOpen;
            },
            toggleMealEdit: function(e) {
                if( e.type === 'click' || e.keyCode === 13 ) {
                    this.editMode = !this.editMode;
                }
            },
            assignUser: function(user) {
                this.$store.commit('assignUser', {meal: this.meal, user: user});
            },
            toggleNoteEdit: function(e){
                if( e.type === 'click' || e.keyCode === 13 ) {
                    console.log(e);
                    e.preventDefault();
                    this.noteEdit = !this.noteEdit;
                    if(this.noteEdit) { this.noteBtnText = "Save" };
                    if(!this.noteEdit && this.meal.note === "") { this.noteBtnText = "Add" };
                    if(!this.noteEdit && this.meal.note !== "") { this.noteBtnText = "Edit" };
                }
            },
            unassignUser: function(user) {
                this.$store.commit('unassignUser', {meal: this.meal, user: user});
            },
            startDrag: function($event) {;
                // var data = JSON.stringify(this.meal);
                // $event.dataTransfer.setData("text/plain", data);
                this.$store.commit('drag', this.meal);
            },
            grabbing: function(e) {
                e.target.style.cursor = "grabbing";
            },
            loosenGrip: function(e) {
                e.target.style.cursor = "unset";
            },
            setMealType(mealType) {
                this.meal.type = mealType;
            }
        },
        props: ['meal'],
        components: {
            Remove,
            Complete
        }
    }
</script>

<style scoped>

p {
    margin: 0;
}
ul {
    padding: 0;
}
.meal {
    cursor: grab;
}
.meal-label {
    display: inline-block;
    color: #fff;
    padding: 0 3px;
    margin: 3px;
}
.breakfast {
    background-color: #3eaf7c;
}
.lunch {
    background-color: #ff5252;
}
.dinner {
    background-color: #9E55BC;
}
.meal-details {
    grid-column: 1 / -1;
    padding: 2px;
}
.meal-type {
    grid-column: 1 / span 3;
    color: #fff;
    padding-left: 3px;
    display: grid;
    grid-template-columns: 1fr 20px;
}
.user-name {
    display: inline-block;
    margin-left: 5px;
}
.notes {
    grid-column: 1 / span 3;
    display: grid;
    grid-template-columns: 1fr;
}
.note {
    padding: 5px;
    font-size: 14px;
    grid-column: 1 / -1;
    line-height: 1.5;
}
.note span {
    background-color: #3eaf7c;
    color: #fff;
    padding: 0 5px;
}
.note-edit {
    margin: 3px;
    padding: 10px;
    min-height: 50px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    resize: vertical;
}
.btn-user {
    color: #fff;
    display: inline-block;
    padding: 2px;
    margin: 2px;
}
.btn-add-note {
    padding: 3px;
    margin: 3px;
    background-color: #3eaf7c;
    color: #fff;
    text-align: center;
    transition: .2s ease-in-out;
}
.btn-add-note:hover {
    background-color: #ff5252;
}
.meal-edit {
    grid-column: 1 / -1;
    justify-self: left;
    display: grid;
    grid-template-columns: 1fr 50px;
}
.meal-edit input {
    display: inline-block;
    box-sizing: border-box;
    height: 26px;
    margin: 3px;
    padding: 0 6px;
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
}
.btn-save {
    padding: 3px 5px;
    color: #fff;
    background-color: #3eaf7c;
    justify-self: center;
    align-self: center;
    margin: 3px 3px 3px 0;
}
.btn-save:hover {
    background-color: #ff5252;
}
.btn-panel {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 3px 5px;
    grid-column: 1 / -1;
    grid-row: 1 / span 1;
    background-color: #333;
    opacity: 0;
    color: #fff;
}
.btn-panel:hover {
    opacity: .9;
}
.btn-list,
.btn-edit {
    align-self: center;
    justify-self: center;
}
.btn-list:hover,
.btn-edit:hover {
    color: #3eaf7c;
}
.btn-active {
    color: #ff5252;
}
.btn-unassign {
    justify-self: center;
    align-items: center;
    transition: .6s cubic-bezier(.53,-0.52,.57,1.5);
    padding-top: 1px;
}
.btn-unassign:hover {
    transform-origin: center;
    transform: rotateY(-180deg);   
}
</style>
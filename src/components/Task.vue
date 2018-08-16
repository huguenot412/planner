<template>
    <li class="task" v-bind:class="{ completed: task.completed }"> 
        <p class="task-name">{{task.task}}</p>
        <div class="btn-panel">
            <Complete :task="task"></Complete>
            <i class="fas btn-list" 
                v-on:click="toggleTaskDetails"
                v-bind:class="{
                    'fa-chevron-up': isOpen, 
                    'fa-chevron-down': !idOpen,
                    'btn-active': isOpen
                }"></i>
            <Remove :task="task"></Remove>
        </div>
        <p v-if="!isOpen && task.note !== ''" class="note"><span>Note:</span> {{task.note}}</p>
        <div class="task-details" v-if="isOpen">
            <span v-if="unassignedUsers.length > 0">Assign to: </span>
            <ul>
                <li v-for="user in unassignedUsers"
                    :key="user.id"
                    v-on:click="assignUser(user)"
                    class="btn-user"
                    v-bind:style ="{backgroundColor: user.color}">{{user.name}}</li>
            </ul>
            <div class="notes">
                <div class="btn-add-note" v-on:click="toggleNoteEdit">{{noteBtnText}}</div>
                <div class="note" v-if="!noteEdit && task.note !== ''"><span>Note:</span> {{task.note}}</div>
                <textarea class="note-edit" name="note" v-model="task.note" v-if="noteEdit"></textarea>
            </div>
        </div>
        <div class="user" 
             v-for="user in task.users"
             :key="user.id"
             v-bind:style ="{backgroundColor: user.color}">
             <i class="fas fa-times" v-on:click="unassignUser(user)"></i>
             <span class="user-name">{{user.name}}</span>
        </div>
    </li>
</template>

<script>
    import Remove from './Remove';
    import Complete from './Complete'; 
    export default {
        name: 'Task',
        data() {
            return {
                isOpen: false,
                noteEdit: false,
                noteBtnText: 'Add/edit note'
            }
        },
        computed: {
            unassignedUsers: function() {               
                return this.$store.state.users.filter(user => {
                    return this.task.users.find( taskUser => taskUser.id === user.id) === undefined ? true : false;
                });
            }
            // taskUsers: function() {               
            //     return this.$state.store.users.filter(user => {
            //         return this.task.users.find( taskUser => taskUser.id === user.id ).id === user.id ? true : false;
            //     });
            // }
        },
        methods: {
            toggleTaskDetails: function() {
                this.isOpen = !this.isOpen;
            },
            assignUser: function(user) {
                this.$store.commit('assignUser', {task: this.task, user: user});
            },
            toggleNoteEdit: function(){
                this.noteEdit = !this.noteEdit;
                this.noteEdit ? this.noteBtnText = "Save note" : this.noteBtnText = "Add/edit note";
            },
            unassignUser: function(user) {
                this.$store.commit('unassignUser', {task: this.task, user: user});
            }
        },
        props: ['task'],
        components: {
            Remove,
            Complete
        }
    }
</script>

<style scoped>
.task {
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
/* .task:hover {
    transform: translateY(-1px);
    box-shadow: #888 0 2px 5px;
} */
.task-details {
    grid-column: 1 / -1;
    padding: 2px;
}
p {
    margin: 0;
}
ul {
    padding: 0;
}
.completed {
    background-color: #ccc;
}
.completed p {
     text-decoration: line-through;
}
.user {
    grid-column: 1 / span 3;
    color: #fff;
    padding-left: 3px;
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
}
.note span {
    background-color: #3eaf7c;
    color: #fff;
    padding: 2px 5px;
}
.note-edit {
    margin: 3px;
    padding: 10px;
    min-height: 120px;
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
.task-name {
    grid-column: 1 / -1;
    grid-row: 1 / span 1;
    padding: 3px 5px;
    font-size: 24px;
    margin: 0;
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
.btn-list {
    align-self: center;
    justify-self: center;
}
.btn-list:hover {
    color: #3eaf7c;
}
.btn-active {
    color: #ff5252;
}
</style>
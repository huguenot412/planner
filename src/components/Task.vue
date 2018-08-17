<template>
    <li class="task" v-bind:class="{ completed: task.completed }"> 
        <p class="task-name" v-if="!editMode">{{task.task}}</p>
        <div class="btn-panel" v-if="!editMode">
            <Complete :task="task"></Complete>
            <i class="fas btn-list" 
                v-on:click="toggleTaskDetails"
                v-bind:class="{
                    'fa-chevron-up': isOpen, 
                    'fa-chevron-down': !idOpen,
                    'btn-active': isOpen
                }"></i>
            <i class="far fa-edit btn-edit"
                v-on:click="toggleTaskEdit"></i>
            <Remove :task="task"></Remove>
        </div>
        <div class="task-edit" v-if="editMode">
            <input type="text" v-model="task.task" v-on:keyup="toggleTaskEdit">
            <div class="btn-save" v-on:click="toggleTaskEdit">Save</div>
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
                <div class="btn-add-note" v-on:click="toggleNoteEdit">{{noteBtnText}} note</div>
                <div class="note" v-if="!noteEdit && task.note !== ''"><span>Note:</span> {{task.note}}</div>
                <textarea class="note-edit" 
                            name="note" 
                            v-model="task.note" 
                            v-if="noteEdit"
                            v-on:keyup="toggleNoteEdit"></textarea>
            </div>
        </div>
        <div class="user" 
             v-for="user in task.users"
             :key="user.id"
             v-bind:style ="{backgroundColor: user.color}">
             <i class="fas fa-times btn-unassign" v-on:click="unassignUser(user)"></i>
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
                editMode: false,
                noteBtnText: 'Add'
            }
        },
        computed: {
            unassignedUsers: function() {               
                return this.$store.state.users.filter(user => {
                    return this.task.users.find( taskUser => taskUser.id === user.id) === undefined ? true : false;
                });
            }
        },
        methods: {
            toggleTaskDetails: function() {
                this.isOpen = !this.isOpen;
            },
            toggleTaskEdit: function(e) {
                if( e.type === 'click' || e.keyCode === 13 ) {
                    this.editMode = !this.editMode;
                }
            },
            assignUser: function(user) {
                this.$store.commit('assignUser', {task: this.task, user: user});
            },
            toggleNoteEdit: function(e){
                if( e.type === 'click' || e.keyCode === 13 ) {
                    this.noteEdit = !this.noteEdit;
                    if(this.noteEdit) { this.noteBtnText = "Save" } 
                    if(!this.noteEdit && this.task.note === "") { this.noteBtnText = "Add" }
                    if(!this.noteEdit && this.task.note !== "") { this.noteBtnText = "Edit" };
                }
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
p {
    margin: 0;
}
ul {
    padding: 0;
}
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
.completed {
    background-color: #ccc;
}
.completed .task-name {
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
.task-edit {
    grid-column: 1 / -1;
    justify-self: left;
    display: grid;
    grid-template-columns: 1fr 50px;
}
.task-edit input {
    height: 28px;
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
    padding: 5px;
    color: #fff;
    background-color: #3eaf7c;
    justify-self: center;
    align-self: center;
    margin: 3px 3px 3px 0;
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
    grid-template-columns: repeat(4, 1fr);
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
    transition: .5s cubic-bezier(.53,-0.52,.57,1.5);
}
.btn-unassign:hover {
    transform: rotate(180deg);
}
</style>
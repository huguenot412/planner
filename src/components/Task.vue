<template>
    <li class="task"> 
        <Complete :task="task"></Complete>
        <Remove :task="task"></Remove>
        <p v-bind:class="{ completed: task.completed }" v-on:click="toggleTaskDetails">{{task.task}}</p>
        <div class="task-details" v-if="task.open">
            <span v-if="unassignedUsers.length > 0">Assign to: </span>
            <ul>
                <li v-for="user in unassignedUsers"
                    v-on:click="assignUser(user)"
                    class="btn-user"
                    v-bind:style ="{backgroundColor: user.color}">{{user.name}}</li>
            </ul>
        </div>
        <div class="user" 
             v-for="user in task.users" 
             v-bind:style ="{backgroundColor: user.color}">
             <i class="fas fa-times"></i>
             {{user.name}}
        </div>
    </li>
</template>

<script>
    import Remove from './Remove';
    import Complete from './Complete'; 
    export default {
        name: 'Task',
        data() {
            return {}
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
                this.$store.commit('toggleTaskDetails', this.task);
            },
            assignUser: function(user) {
                this.$store.commit('assignUser', {task: this.task, user: user});
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
    padding: 2px 0 0 0;
    margin: 10px 5px;
    border: 1px solid #333;
    box-shadow: #333 0 2px 2px;
    transition: .2s ease-in-out;
    display: grid;
    grid-template-columns: 30px 30px 1fr;
    align-content: center;
}
.task:hover {
    transform: translateY(-2px);
    box-shadow: #333 0 2px 5px;
}
.task p {
    font-size: 20px;
    margin: 0;
    padding-left: 5px
}
.task-details {
    grid-column: 1 / span 3;
    padding: 2px;
}
ul {
    padding: 0;
}
.completed {
    text-decoration: line-through;
}
.completed {
     color: #888;
}
.user {
    grid-column: 1 / span 3;
    color: #fff;
    padding-left: 3px;
}
.btn-user {
    color: #fff;
    display: inline-block;
    padding: 2px;
    margin: 2px;
}
</style>
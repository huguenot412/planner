<template>
    <div class="btn-remove" v-on:click="deleteItem()">
        <i class="fas fa-trash"></i>
    </div>
</template>

<script>
    export default {
       name: 'Remove',
       data() {
           return {

           }
       },
       methods: {
           deleteItem: function(){
               this.$store.commit('deleteItem', { array: 'tasks', id: this.task.id });
           }
       },
       props: ['task']
    }
</script>

<style scoped>

.btn-remove {
    display: inline-block;
    font-size: 15px;
    justify-self: center;
    align-self: center;
}

.btn-remove:hover {
    color: #ff5252;
}

</style>
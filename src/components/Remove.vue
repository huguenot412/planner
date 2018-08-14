<template>
    <div class="btn-remove" v-on:click="deleteItem()">
        <i class="fas fa-times"></i>
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
               this.$store.commit('deleteItem', this.task.id);
           }
       },
       props: ['task']
    }
</script>

<style scoped>

.btn-remove {
    display: inline-block;
}

</style>
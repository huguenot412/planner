<template>
    <div class="btn-remove" v-on:click="deleteItem()">
        <i class="fas fa-trash"></i>
    </div>
</template>

<script>
    import Task from './Task';
    import axios from 'axios';
    
    export default {
       name: 'Remove',
       data() {
           return {

           }
       },
       methods: {
           deleteItem: function(){
                axios.delete(`http://localhost:3000/api/${this.array}/${this.item._id}`);
                this.$store.commit('deleteItem', { array: this.array, id: this.item._id });
           }
       },
       props: ['item','array']
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
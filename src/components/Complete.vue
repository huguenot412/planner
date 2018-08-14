<template>
    <div class="btn-remove" v-on:click="checkOff()">
        <i class="fas fa-check"></i>
    </div>
</template>

<script>
    export default {
       name: 'Complete',
       data() {
           return {

           }
       },
       methods: {
           checkOff: function(){
               this.$store.commit('checkOff', this.task);
           }
       },
       props: ['task']
    }
</script>

<style scoped>

.btn-remove {
    display: inline-block;
    font-size: 15px;
    vertical-align: middle;
}

.btn-remove:hover {
    color: #3eaf7c;
}

</style>
<template>
    <div class="btn-complete" v-on:click="checkOff()">
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

.btn-complete {
    display: inline-block;
    font-size: 15px;
    text-align: center;
    height: 30px;
    width: 20px;
    vertical-align: middle;
    margin-left: 3px;
}

.btn-complete:hover {
    color: #3eaf7c;
}

</style>
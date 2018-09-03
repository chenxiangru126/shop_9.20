<template>
    <div style="display: flex;overflow-x: scroll;width: 750px;">
        <img v-for="it in item" :key='it'  @click="opimg(it)"  v-bind:src="it"/>
    </div>
</template>
<style scoped lang="less">
    @import 'index.less';
</style>
<script>
    export default {
        data() {
            return { 
               
            }
        },
        props: ['item'],
        methods: {
            opimg(a){
                this.$parent.opimg(a)
            }
            
        }
    }
</script>
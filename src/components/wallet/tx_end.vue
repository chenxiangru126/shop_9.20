<template>
    <div class="tx_end_b">
        <img src="../../static/images/img-bg-1.png" alt="">
        <p class="font-2 c1 t-c">提现申请已提交，预计24小时到账</p>
         <div class="submit-btn-1" style="margin-top:10rem">
            返回我的钱包
        </div>
    </div>
</template>

<style lang="less">
    @import 'tx_end.less';
</style>

<script>
    export default {
        data() {
            return {
                share_log: false,
                nav_show: false
            }
        },
        mounted() {
            var that = this;
        },
        methods: {
            initData() {
    
            },
            nav_open() {
                this.nav_show = !this.nav_show;
            },
            go_details() {
                this.$router.push({
                    name: 'order_details'
                })
            }
        }
    }
</script>



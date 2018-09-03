<template>
    <div class="refund_end_b">
        <p class="font-3 c1 t-c">¥1000 退款成功</p>
        <p class="font-1 c2 t-c m-t">预计1-3个工作日原路径退回支付账户</p>
        <div class="h8"></div>
         <div class="submit-btn-1">
            返回我的钱包
        </div>
    </div>
</template>

<style lang="less">
    @import 'refund_end.less';
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



<template>
    <div class="bill-details_b">
        <div class="w _cont" v-if="type==1">
            <div class="flex-h">
                <p>收款单号：</p>
                <p>{{details.billNo}}</p>
            </div>
            <div class="flex-h">
                <p>订单号：</p>
                <p>{{details.order_num}}</p>
            </div>
            <div class="flex-h">
                <p>付款金额：</p>
                <p>¥{{details.money}}</p>
            </div>
            <div class="flex-h">
                <p>支付方式</p>
                 <p v-if="details.payType==1">支付宝 </p>
                <p v-if="details.payType==2">微信</p>
            </div>
            <div class="flex-h">
                <p>收款账号：</p>
                <p>{{details.payNum}}</p>
            </div>
            <div class="flex-h">
                <p>支付状态：</p>
                <p v-if="details.status==1">成功</p>
                <p v-if="details.status==2">待付款</p>
            </div>
            <div class="flex-h">
                <p>生成时间：</p>
                <p>{{details.effectiveTime}}</p>
            </div>
        </div>
        <div class="w _cont" v-if="type==2">
            <div class="flex-h">
                <p>退款单号：</p>
                <p>{{details.billNo}}</p>
            </div>
            <div class="flex-h">
                <p>订单号：</p>
                <p>{{details.order_num}}</p>
            </div>
            <div class="flex-h">
                <p>付款金额：</p>
                <p>¥{{details.money}}</p>
            </div>
            <div class="flex-h">
                <p>退款金额：</p>
                <p>¥{{details.money}}</p>
            </div>
            <div class="flex-h">
                <p>支付方式</p>
                 <p v-if="details.payType==1">支付宝 </p>
                  <p v-else-if="details.payType==2">微信</p>
            </div>
            <div class="flex-h">
                <p>退单状态：</p>
                <p v-if="details.status==1">退款成功</p>
                <p v-if="details.status==2">退款中</p>
            </div>
            <div class="flex-h">
                <p>生成时间：</p>
                <p>{{details.effectiveTime}}</p>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    @import 'bill_details.less';
</style>

<script>
    export default {
        data() {
            return {
                type: this.$route.query.type||1 ,//1收款 2退款
                id:this.$route.query.id,
                details:{},
                
            }
        },
        created(){
            this.initData();
        },
        mounted() {
            var that = this;
        },
        methods: {
            initData() {
                var that = this,
                    url = that.type==1?'/mall/bill/receivablesDetail':'/mall/bill/refundDetail';
                    // url = that.type==1?'/mall/bill/receivablesDetail?id='+that.id:'/mall/bill/refundDetail?id='+that.id;
                this.util.ajax.post(url,{id:that.id}).then(e => {
                // this.util.ajax.get(url).then(e => {
                    that.details = e.data || {};
                }).catch()
            }
        }
    }
</script>

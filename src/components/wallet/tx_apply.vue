<template>
    <div class="order_pay_b">
       <div class="pay_b1">
           <div class="pay_b1_t" @click='pay_way(1)'></div>
           <div class="pay_b1_b" @click='pay_way(2)'></div>
           <div class="pay-select-1" v-if='pay_status==1'></div>
           <div class="pay-select-2" v-else></div>
       </div>
       <div class="pay-input">
           <p class="font-1 c2"><span class="font-3 c1">提现金额</span> （24小时到账）</p>
           <input type="text" v-model.trim='input_money'>
           <div class="font-1 w flex-h h3 line-h-3">
               <p class="c5 p-r">您的余额</p>
               <p class="c8 flex-1"><span class="c5">¥</span> {{money}}</p>
               <p class="c6" @click="tx_all">全部提现</p>
           </div>
       </div>
        <div class="submit-btn-1" @click="tx_apply_e">
            确认提现
        </div>
    </div>
</template>

<style lang="less">
    @import 'tx_apply.less';
</style>

<script>
    export default {
        data() {
            return {
                money:this.$route.query.money,
                input_money:null,//输入金额
                share_log: false,
                billType:6, // billType账单类型 1订单账单 2店铺账单 3平台手续费 4保证金 5退款账单 6提现
                payType:2,//payType进账/出账， 1进账 2出账
                pay_status: 1,//1 支付宝 2微信
            }
        },
        mounted() {
            var that = this;
        },
        methods: {
            initData() {
    
            },
            pay_way(a) {
                this.pay_status = a;
            },
            tx_all(){
               this.input_money=this.money;
            },
            tx_apply_e(){
                 var that = this,
                    url = '/mall/orders/tixian.do',
                    _p = {
                        money: that.money,
                        billType: that.billType,
                        payType: that.payType,
                        payType: that.pay_status
                    };
                    if(!that.input_money){
                        that.Toast('请输入金额');
                        return false;
                    }
                this.util.ajax.post(url, _p).then(e => {
                    if (e.code == 200) {
                        that._alert({
                            content: '提现成功',
                             sureTxt:'确定',
                            yes: () => {
                                history.back();
                            }
                        });
                    }
                }).catch()
            }
        }
    }
</script>



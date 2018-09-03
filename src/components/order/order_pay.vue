<template>
    <div class="reg2_wrap">
    <!-- 交保证金 -->
   <div class="reg2_content">
      <div>支付</div>
      <p><span>¥</span><span>{{money}}</span></p>
      <div class="reg2_contnet_con">
       <span @click="submit_e(1)"></span>
       <span @click="submit_e(2)"></span>
      </div>

   </div>
    </div>
   
</template>
<script>
    export default {
        data() {
            return {
                orderId:null ,
                money:this.$route.query.money

            }
        },
        created() {
            // this.initData();
        },
        mounted() {
            var that = this;
            that.orderId=that.$route.query.orderId;
        },
        methods: {
            initData() {

            },
            submit_e(a) {
                //a 支付方式 1支付宝 2微信
                var that = this,url;
                if(a==1){
                    url= location.protocol+'//'+location.hostname
                        +'/mall/orders/payOrder?orderId='+that.orderId+'&payWay='+ String(a);
                }else if(a==2){
                    url= location.protocol+'//'+location.hostname
                        +'/mall/orders/payOrder?orderId='+that.orderId+'&payWay=2';
                    //   url=location.protocol+'//'+location.hostname
// +"/orders/saveOrder?orderId="+that.orderId+"&payWay="+ String(a);;
                }
                iosObject.showCheckOrderBtn(location.origin+'/index.html#/order_list_buyer');
                window.location.href=url;
                // iosObject.toPayVC(url)
            }
        }
    }
</script>
<style lang="less">
      @import "order_pay.less";
</style>



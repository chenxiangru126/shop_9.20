<template>

<div class="reg2_wrap">
    <!-- 交保证金 -->
   <div class="reg2_content">
      <div>保证金种类 <span>C类</span></div>
      <p><span>¥</span><span>{{money}}</span></p>
      <div class="reg2_contnet_con">
       <span @click="submit_e(1)"></span>
       <span @click="submit_e(2)"></span>
      </div>
   </div>

    <!-- footer -->
     <div class="footer_back_pay">
     <div class="footer_content">
       <span class="active" >选择类型</span>
       <span class="active font-3" style="left:5%; top:-.333333rem">缴保证金</span>
       <span style="left:8%">填写信息</span>
       <span style="left:6%;">身份认证</span>
     </div>
    
 </div>

</div>
 
</template>
<style lang="less">
    @import 'back_pay.less';
</style>

<script>
import util from '../../libs/util'

export default {
  mounted(){  
    let that = this 
    let state = this.$route.query.state  
    if(state == 1){
     let money = this.$route.query.money;
     that.money = money;
    let shoptype = this.$route.query.shoptype;
    that.shoptype = shoptype;
     let model = this.$route.query.model
    that.model = model
    }else{
       that.dianpu()
    }
      
  },
  data(){
    return{
      money: null,
      shoptype:null,
      model:null,

    }
  },
   methods:{
     dianpu(){ 
      this.util.ajax.post('/mall/shopauthentication/getShopType.do').then(e=>{   
         this.model = e.data.model
         this.money = e.data.money
         this.shoptype = e.data.shoptype
      }) 
     },
   //调取支付接口进行支付
  submit_e(a) {
                //a 支付方式 1支付宝 2微信
                var url;
                let model = this.model
                let shoptype = this.shoptype  
                    if(a==1 && shoptype == 1){
                         url = location.protocol+'//'+location.hostname+'/mall/shopauthentication/bailMoney?payWay=1&model='+model+'&shoptype='+shoptype
                         iosObject.showCheckOrderBtn(location.origin+'/index.html#/order_list_seller')
                          window.location.href=url;
                    }else if(a==1 && shoptype == 2){
                         url = location.protocol+'//'+location.hostname+'/mall/shopauthentication/bailMoney?payWay=1&model='+model+'&shoptype='+shoptype
                          iosObject.showCheckOrderBtn(location.origin+'/index.html#/order_list_seller')
                          window.location.href=url;
                    }else if(a==2 && shoptype == 1){
                         url = location.protocol+'//'+location.hostname+'/mall/shopauthentication/bailMoney?payWay=2&model='+model+'&shoptype='+shoptype
                          iosObject.showCheckOrderBtn(location.origin+'/index.html#/order_list_seller')
                          window.location.href=url;
                        }else if(a==2 && shoptype == 2){
                         url = location.protocol+'//'+location.hostname+'/mall/shopauthentication/bailMoney?payWay=2&model='+model+'&shoptype='+shoptype
                          iosObject.showCheckOrderBtn(location.origin+'/index.html#/switch')
                          
                          window.location.href=url;
                                            
                            }
                               
                                        
                                }
}

    
}
</script>




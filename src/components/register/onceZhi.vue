<template>
    <div class="reg2_wrap">
    <!-- 交保证金 -->
   <div class="reg2_content">
      <div>保证金种类 <span>{{model}}类</span></div>
      <p><span>¥</span><span>{{money}}</span></p>
      <div class="reg2_contnet_con">
       <span @click="submit_e(1)"></span>
       <span @click="submit_e(2)"></span>
      </div>
   </div>
    </div>
   
</template>
<script>
import util from '../../libs/util'
export default {
  mounted(){
    let money = this.$route.query.money;
    let model = this.$route.query.model;
    let shoptype = this.$route.query.shoptype;
    this.money = money;
    this.model = model;
    this.shoptype = shoptype;
    let state = this.$route.query.state
    if(state == 1){
       this.util.ajax.post('/mall/shopauthentication/getShopType.do').then(e=>{
         this.money = e.data.money;
         this.model =e.data.model;
         this.shoptype = e.data.shoptype;

    })

    }
  

  },
  data(){
    return{
      money: null,
      model:null,
      shoptype:null,
    }
  },
  methods:{
    //调取支付接口进行支付
   //调取支付接口进行支付
              submit_e(a) {
                //a 支付方式 1支付宝 2微信
                var url;
                let model = this.model
                let shoptype = this.shoptype  
                    if(a==1 && shoptype == 1){
                         url = location.protocol+'//'+location.hostname+'/mall/shopauthentication/bailMoney?payWay=1&model='+model+'&shoptype='+shoptype
                          iosObject.showCheckOrderBtn(location.origin+'/index.html#/wallet')
                          window.location.href=url;
                    }else if(a==1 && shoptype == 2){
                         url = location.protocol+'//'+location.hostname+'/mall/shopauthentication/bailMoney?payWay=1&model='+model+'&shoptype='+shoptype
                          iosObject.showCheckOrderBtn(location.origin+'/index.html#/wallet')
                          window.location.href=url;
                    }else if(a==2 && shoptype == 1){
                         url = location.protocol+'//'+location.hostname+'/mall/shopauthentication/bailMoney?payWay=2&model='+model+'&shoptype='+shoptype
                          iosObject.showCheckOrderBtn(location.origin+'/index.html#/wallet')
                          window.location.href=url;
                        }else if(a==2 && shoptype == 2){
                         url = location.protocol+'//'+location.hostname+'/mall/shopauthentication/bailMoney?payWay=2&model='+model+'&shoptype='+shoptype
                          iosObject.showCheckOrderBtn(location.origin+'/index.html#/wallet')
                          window.location.href=url;
                                            
                            }
                               
                                        // iosObject.toPayVC(url)
                                }
  }

}
</script>
<style lang="less">
      @import "onceZhi.less";
</style>



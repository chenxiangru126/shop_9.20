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

    <!-- footer -->
    <div class="footer_two">
     <div class="footer_content">
       <span class="active" >选择类型</span>
       <span class="active font-3" style="left:5%; top:-.333333rem">缴保证金</span>
       <span style="left:8%">填写信息</span>
       <span style="left:6%;">身份认证</span>
     </div>
    
    </div>

    <!-- 弹出窗 -->
    <div class="dialog_layer" v-show="showWindow">
        <div class='layer_cont_1 cont_1_alert'>
        <div class="p-b p-t">
            <div class='p-b' v-if="shoptype==1">
                <div class="layer_title p-b c6 font-4">· 保证金种类  {{model}}类 ·</div>
                <p class="c1 font-1 w t-c over-h p-l p-r">您所选择的类型已获得前三单免保证金的机会，快去体验吧！</p>
            </div>
             <div class='p-b' v-else-if="shoptype==2">
                <div class="layer_title p-b c6 font-4">· 保证金种类  {{model}}类 ·</div>
                <p class="c1 font-1 w t-c over-h p-l p-r">您所选择的类型已获得首单免保证金的机会，快去体验吧！</p>
            </div>
            <div class="layer_cont_btn">
                <div class="layer_cont_alert ui_yes" @click="toPay">
                    确定
                </div>
            </div>
        </div>
    </div>
    </div>
    
</div>
 
</template>

<style lang="less">
    @import 'register2.less';
</style>

<script>
    import {_alert,_confrim} from '../../libs/ui';
    export default {
       data(){
            return{
              isShow:false,
              model:'A',
              shoptype:null,
              money:null,
              shop_type_id:null,
              showWindow:false
            }
        },
       
              mounted() {
                  //判断是否缴纳金额

                //  读取query的值，然后做出判断
                const model = this.$route.query.model
                if(model){
                 this.model = model;      
                }else{
                    this.model = 'A'
                }   
                const shoptype = this.$route.query.shoptype
                this.shoptype =shoptype
                let shop_type_id = this.$route.query.shop_type_id;
                this.shop_type_id = shop_type_id
                // 个人店铺
                   if(shoptype == 1){
                       if(model =='A'){
                           this.money = 100
                           this.showWindow=true
                           return false
                       }else if(model == 'B'){
                           this.money = 300
                           this.showWindow=true
                       
                          return false

                       }else if(model == 'C'){
                           this.money = 500
                           this.showWindow=true
                        //    this.alter_per(model,shoptype,shop_type_id)
                           return false

                       }else if(model == 'D'){
                            this.money = 1000
                       
                       }else if(model == 'E'){
                            this.money = 5000
                       }

                   }else if(shoptype == 2){
                    //企业店铺
                     if(model =='A'){
                         this.money = 1000
                         this.showWindow=true
                        //    this.alter_com(model,shoptype,shop_type_id)
                           return false
                       }else if(model == 'B'){
                           this.money = 3000
                         this.showWindow=true
                          return false

                       }else if(model == 'C'){
                           this.money = 5000
                       }else if(model == 'D'){
                           this.money = 20000                    
                       }else if(model == 'E'){
                           this.money = 50000     
                       }

                   }

        } ,      
        methods:{
            //跳转到个人信息页
           free_pay(model,shoptype,shop_type_id){
               this.$router.push("/info?shoptype="+shoptype+"&model="+model+"&shop_type_id="+shop_type_id)
           },
        //跳转到企业信息页
           free_pay_com(model,shoptype,shop_type_id){
               this.$router.push("/infoQ?shoptype="+shoptype+"&model="+model+"&shop_type_id="+shop_type_id)
           },  
           toPay(){
               var that = this
               that.showWindow=false
               if(this.shoptype==1){
                   that.free_pay()
               }else{
                   that.free_pay_com()
               }
         
               
           },
           //封装弹出层个人免单弹出层   
        //    alter_per(model,shoptype,shop_type_id){
        //        let _model = model
        //        let _shoptype = shoptype
        //        let _shop_type_id = shop_type_id
        //        var that = this
        //             const html=`
        //             <div class='p-b'>
        //                 <div class="layer_title p-b c6 font-4">· 保证金种类  ${_model}类 ·</div>
        //                 <p class="c1 font-1 w t-c over-h p-l p-r">您所选择的类型已获得前三单免保证金的机会，快去体验吧！</p>
        //             </div>
        //            `
        //             _alert({
        //                 html:html,
        //                 sureTxt:'确 定',
        //                 yes(model =_model,shoptype =_shoptype,shop_type_id=_shop_type_id){
        //                     //这里直接跳转到下个页面
        //                    that.free_pay(model,shoptype,shop_type_id)
        //                 }
        //               })
        //    } ,
        // // 封装企业弹出层
        //    alter_com(model,shoptype,shop_type_id){
        //        var that = this
        //        let _model = model
        //        let _shoptype = shoptype
        //        let _shop_type_id = shop_type_id
        //             const html=`
        //             <div class='p-b'>
        //                 <div class="layer_title p-b c6 font-4">· 保证金种类  ${_model}类 ·</div>
        //                 <p class="c1 font-1 w t-c over-h p-l p-r">您所选择的类型已获得首单免保证金的机会，快去体验吧！</p>
        //             </div>
        //            `
        //             _alert({
        //                 html:html,
        //                 sureTxt:'确 定',
        //                 yes(model=_model,shoptype=_shoptype,shop_type_id=_shop_type_id){
        //                     //这里直接跳转到下个页面
        //                    that.free_pay_com(model,shoptype,shop_type_id)
        //                 }
        //               })

        //    },
            //调取支付接口进行支付
              submit_e(a) {
                //a 支付方式 1支付宝 2微信
                var url;
                let model = this.model
                let shoptype = this.shoptype  
                 let shop_type_id = shop_type_id
                    if(a==1 && shoptype== 1){
                         url = location.protocol+'//'+location.hostname+'/mall/shopauthentication/bailMoney?payWay=1&model='+model+'&shoptype='+shoptype
                          iosObject.showCheckOrderBtn(location.origin+'/index.html#/info')
                          window.location.href=url;
                          return false;
                    }else if(a==1 && shoptype == 2){
                         url = location.protocol+'//'+location.hostname+'/mall/shopauthentication/bailMoney?payWay=1&model='+model+'&shoptype='+shoptype
                          iosObject.showCheckOrderBtn(location.origin+'/index.html#/infoQ')
                          window.location.href=url;
                           return false;
                    }else if(a==2 && shoptype == 1){
                         url = location.protocol+'//'+location.hostname+'/mall/shopauthentication/bailMoney?payWay=2&model='+model+'&shoptype='+shoptype
                          iosObject.showCheckOrderBtn(location.origin+'/index.html#/info')
                          window.location.href=url;
                           return false;
                        }else if(a==2 && shoptype == 2){
                         url = location.protocol+'//'+location.hostname+'/mall/shopauthentication/bailMoney?payWay=2&model='+model+'&shoptype='+shoptype
                          iosObject.showCheckOrderBtn(location.origin+'/index.html#/infoQ')
                          window.location.href=url;
                           return false;
//                        }
//
                        }
                               
                                        // iosObject.toPayVC(url)
                                }
//

        }

    }
</script>



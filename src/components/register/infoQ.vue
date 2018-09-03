<template>
<div>
   <div class="info_wrap">
    <!-- 填写信息 -->
      <p class="c1 font-0 p-l-r p-t " style="color:#BABABA;box-sizing:border-box">以下信息均为必填项。</p>
      <p class="c1 font-0 p-l-r " style="color:#BABABA;box-sizing:border-box">除了店铺名称外，其他信息我们将为您隐藏。</p>
      <div class="input_b" style="color:#BEBEBE">
            <div class="w h3 line-h-3 flex-h b-b  m-t">
                <div class="flex-1  font-1 p-l">网店名称</div>
                <div class="flex-3">
                    <input type="text" placeholder="输入店铺昵称" v-model="com_name">
                </div>
            </div>
                <div class="w h3 line-h-3 flex-h b-b">
                <div class="flex-1  font-1 p-l">公司名称</div>
                <div class="flex-3">
                    <input type="text" placeholder="输入公司名称" v-model="com_com_name">
                </div>
            </div>
                <div class="w h3 line-h-3 flex-h b-b ">
                <div class="flex-1  font-1 p-l">证件号码</div>
                <div class="flex-3">
                    <input type="text" placeholder="输入营业执照号" v-model="com_num">
                </div>
            </div>
            <div class="w h3 line-h-3 flex-h b-b">
                <div class="flex-1  font-1 p-l">法人名称</div>
                <div class="flex-3">
                    <input type="text" placeholder="输入法人名称" v-model="real_name">
                </div>
            </div>
            <div class="w h3 line-h-3 flex-h b-b">
                <div class="flex-1  font-1 p-l">联系方式</div>
                <div class="flex-3">
                    <input type="text" placeholder="输入联系方式" v-model="phone">
                </div>
            </div>
                <div class="w h3 line-h-3 flex-h b-b" @click='open_address'>
                <div class="flex-1 font-1 p-l">收货地址</div>
                <div class="flex-3">
                    <p class="font-0 c2 right-2" v-if='area_address'>{{area_address}}</p>
                    <p class="font-0 c2 right-2" v-else>选择城市</p>
                </div>
            </div>
            <div class="w h3 line-h-3">
                <div class="flex-1 font-1 p-l">详细地址</div>
            </div>
            <div class="text-area">
                <textarea name="" id="" cols="30" rows="10" placeholder="输入详细地址，如道路、门牌、小区等" class="h6" v-model="address_tail"></textarea>
            </div>
            <div class="submit-btn-1" style="margin:0.533333rem auto" @click="com_sure">
                确定
            </div>
        </div>
   </div>
    <!-- footer -->
    <div :class="model =='A'|| model =='B'? 'footer_three_m' : 'footer_three'">
    <div class="footer_content">
    <span class="active" >选择类型</span>
    <span class="active ">缴保证金</span>
    <span  class="active font-3" style="left:8%; top:-.333333rem">填写信息</span>
    <span style="left:6%;">身份认证</span>
    </div>

    </div>
    <myAddress v-if='show_select_address'@listen_to_child_event="get_colose" class="my_address">

    </myAddress>

   </div>


</template>
<script>
import myAddress from '../dizhi/dizhi.vue';
export default {
    data(){
        return{
          com_name:null,
          com_com_name:null,
          com_num:null,
          real_name:null,
          area_address:null,
          address_tail:null,
          show_select_address: false,
          phone:null,
          model:null,
          shoptype:null,
          shop_type_id:null,
          
        }
    },
   mounted(){
         let model   = this.$route.query.model
         let shoptype = this.$route.query.shoptype
         let shop_type_id = this.$route.query.shop_type_id
         this.shop_type_id = shop_type_id
         this.model = model
         this.shoptype = shoptype
         this.util.ajax.post('/mall/shop/getShopDetail.do').then(e=>{
           if(e.code ==200){
             this.com_name= e.data.name
             this.real_name = e.data.real_name
             this.com_num = e.data.idCard
             this.address_tail = e.data.address_detail
             this.area_address= e.data.address    
             this.phone = e.data.phone 
             this.com_com_name =e.data.company_name
           }      
       })
       
         this.util.ajax.post('/mall/shopauthentication/getShopType.do').then(e=>{
//                 debugger;
                 if(e.code ==200){
                     this.model= e.data.model
                     this.shoptype = e.data.shoptype
                 }
             })

    },

    methods:{
           open_address() {
                this.show_select_address = true;
            },
            cancel_address() {
                this.show_select_address = false;
            },
            return_address(a) {
                this.area_address = a;
                console.log(this.area_address);
                this.cancel_address();
            },
            get_colose(data){
               this.show_select_address =false;
            },
            com_sure(){
              let name = this.com_name
              let company_name = this.com_com_name
              let  idCard = this.com_num
              let  realName = this.real_name
              let  address = this.area_address
              let  address_detail = this.address_tail
              let phone = this.phone
              let model  = this.model
              let shoptype = this.shoptype
              let shop_type_id = this.shop_type_id
              
            //   电话号码验证
               var rePhone = /^1[0-9]{10}/;
               
               let _p = {
                name,
                company_name,
                idCard,
                realName,
                address,
                address_detail,
                phone,
                shop_type_id
               }
                  //逐层判断是否填写
             if( name== null || name == ""){
                this.Toast("请输入网店名称") 
                return false
             }
               this.util.ajax.post('/mall/shop/isHave.do',{name}).then(e=>{
                      if(!e.data){
                          this.Toast("网店名已存在")
                          return false 
                      }else{
                         if(company_name == null || company_name ==""){
                            this.Toast("请输入公司名称")
                            return false
                            }
                            if(idCard == null || idCard ==""){
                                this.Toast("请输入正确证件号")
                                return false
                            }
                            if(idCard == null || idCard ==""){
                                this.Toast("请输入正确的证件号码")
                                return false
                            }
                            if(realName == null || realName == ""){
                            this.Toast("请输入真实姓名")
                            return false
                            }
                            if(!rePhone.test(phone)){
                            this.Toast("请输入电话号码")
                            return false
                            }
                            if(address == null ||address =="" ){
                                this.Toast("请选择所在地址")
                                return false
                            }
                            if(address_detail == null || address_detail == ""){
                            this.Toast("请输入详细地址")
                            return false
                            } 
                            // 发送请求调转到身份验证页面
                            this.util.ajax.post('/mall/shop/editShop.do',_p).then(e=>{
                            //跳转到身份验证页面
                                this.$router.push('/shenfen?shoptype='+shoptype+'&model='+model)    

                            }).catch()
                            
                             }
                             }).catch()                      
                 }
             },
       components: {
            myAddress: myAddress
         }
   }

</script>
<style lang="less">
 @import 'info.less';

</style>
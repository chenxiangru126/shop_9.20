<template>
<div>
   <div class="info_wrap">
    <!-- 填写信息 -->
      <p class="c1 font-0 p-l-r p-t " style="color:#BABABA;box-sizing:border-box">以下信息均为必填项。</p>
      <p class="c1 font-0 p-l-r p-b" style="color:#BABABA;box-sizing:border-box">除了网店名称外，其他信息我们将为您隐藏。</p>
      <div class="input_b" style="color:#BEBEBE">
            <div class="w h3 line-h-3 flex-h b-b  m-t">
                <div class="flex-1  font-1 p-l">网店名称</div>
                <div class="flex-3">
                    <input type="text" placeholder="输入网店昵称" v-model="name_nike">
                
                </div>
            </div>
                <div class="w h3 line-h-3 flex-h b-b">
                <div class="flex-1  font-1 p-l">真实姓名</div>
                <div class="flex-3">
                    <input type="text" placeholder="输入真实姓名" v-model="real_name">
                   
                </div>
            </div>
                <div class="w h3 line-h-3 flex-h b-b">
                <div class="flex-1  font-1 p-l">证件号码</div>
                <div class="flex-3">
                    <input type="text" placeholder="输入身份证号" v-model="num" >
                   
                </div>
            </div>
              <div class="w h3 line-h-3 flex-h b-b" @click='open_address'>
                <div class="flex-1 font-1 p-l">收货地址</div>
                <div class="flex-3">
                    <p class="font-0 c2 right-2" v-if='area_address'>{{area_address}}</p>
                    <p class="font-0 c2 right-2" v-else>选择城市</p>
                </div>
              
            </div>
            <div class="w h3 line-h-3" >
                <div class="flex-1  font-1 p-l">详细地址</div>
            </div>
            <div class="text-area">
                <textarea name="" id="" cols="30" rows="10" placeholder="输入详细地址，如道路、门牌、小区等" class="h6" v-model="text_detail"></textarea>
            </div>
        
            <div class="submit-btn-1" style="margin:0.933333rem auto" @click="btn_sure">
                确&nbsp;定
            </div>
        </div>

   </div>
    <!-- footer -->
    <div :class="model == 'A' ||model == 'B' || model== 'C' ? 'footer_three_m' : 'footer_three'">
     <div class="footer_content">
       <span class="active " >选择类型</span>
       <span class="active" >缴保证金</span>
       <span  style="left:5%; top:-.333333rem" class="active font-3">填写信息</span>
       <span style="left:6%;">身份认证</span>
     </div>
    
   </div>
    <transition name="move">
    <myAddress v-if='show_select_address'@listen_to_child_event="get_colose" class="my_address">

    </myAddress>
    </transition>
   </div>



</template>
<script>
import myAddress from '../dizhi/dizhi.vue';
import util from '../../libs/util'
export default {
    data(){
        return{
         name_nike:null,//网店名
         real_name:null,//真实姓名
         num:null,//身份证件号
         text_detail:null,//详细地址
         area_address: null,
         show_select_address: false,
         model:null,
         shoptype:null,
         shop_type_id:null,
        }
    },
    created() {
//        this.util.ajax.post("/mall/shopauthentication/getPayStatus.do").then(e=>{
//            if(e.data.isPay != 2){
//                this.$router.push({path: '/register1?shoptype=1'});
//            }
//        })
    },
    mounted(){





        let model   = this.$route.query.model
        let shoptype = this.$route.query.shoptype
        let shop_type_id = this.$route.query.shop_type_id
        this.shop_type_id = shop_type_id
        this.model = model
        this.shoptype = shoptype
         setTimeout(()=>{
             this.util.ajax.post('/mall/shop/getShopDetail.do').then(e=>{
                 if(e.code ==200){
                     this.name_nike= e.data.name
                     this.real_name = e.data.realName
                     this.num = e.data.idCard
                     this.text_detail = e.data.address_detail
                     this.area_address= e.data.address
                 }
             })
         },1000)

        setTimeout(()=>{
            this.util.ajax.post('/mall/shopauthentication/getShopType.do').then(e=>{
//                debugger;
                if(e.code ==200){
                    this.model= e.data.model
                    this.shoptype = e.data.shoptype
                }
            })


        },1000)

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
                this.cancel_address();
            },
            get_colose(data){
               this.show_select_address =false;
            },
            //提交按钮后，发送请求，发送给后台信息,并跳转到身份验证页面
            btn_sure(){
                // 个人信息跳转到这个页面，并发送请求
                let name = this.name_nike
                let  realName = this.real_name
                let idCard = this.num
                let address_detail = this.text_detail
                // let address_detail = this.address_detail
                let address = this.area_address
                let model  = this.model
                let shoptype = this.shoptype
                let shop_type_id = this.shop_type_id
                 //身份证验证
                var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/   

                let _p = {
                        name,
                        realName,
                        idCard,
                        address_detail,
                        address,
                        shoptype,
                        model,
                        shop_type_id
                       }
                 if(name == null || name == ""){
                    this.Toast("请输入昵称")
                    return false
                }
                this.util.ajax.post('/mall/shop/isHave.do',{name}).then(e=>{
                    let data = e.data
                    if(!data){
                        this.Toast("用户名已存在")
                        return false
                    }else{
                        if(realName == null || realName == "" ){
                    this.Toast("请输入真实姓名")
                    return false
                }
                if(!regIdNo.test(idCard)){
                   this.Toast("请输入正确的证件号码")
                   return false
                }
                if(address ==null || address == ""){
                    this.Toast("请输入所在地址")
                   return false

                }
                if(address_detail == null || address_detail == ""){

                    this.Toast("请输入详细地址")
                   return false
                }
                    }
                // 发送异步请求提交信息
                 this.util.ajax.post('/mall/shop/editShop.do',_p).then(e=>{    
                    this.$router.push('/shenfen?shoptype='+shoptype+'&model='+model)
                 }).catch() 
                    }).catch()      

            }
     

    },
     components: {
            myAddress: myAddress
        },

}
</script>
<style lang="less">
 @import 'info.less';

</style>






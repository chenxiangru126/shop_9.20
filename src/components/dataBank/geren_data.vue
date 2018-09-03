<template>
   <div class="info_wrap">
    <!-- 完善信息 --> 
      <div class="input_b"  style="color:#BEBEBE">
            <div class="w h3 line-h-3 flex-h b-b m-t">
                <div class="flex-1 font-1 p-l">网店类型</div>
                <div class="flex-3">
                    <span>个人</span>
                </div>
            </div>
                <div class="w h3 line-h-3 flex-h b-b m-t">
                <div class="flex-1  font-1 p-l">网店名称</div>
                <div class="flex-3">
                    <span>{{name}}</span>
                </div>
            </div>
                <div class="w h3 line-h-3 flex-h b-b m-t">
                <div class="flex-1 font-1 p-l">真实姓名</div>
                <div class="flex-3">
                    <span>{{realName}}</span>
                </div>
            </div>
              <div class="w h3 line-h-3 flex-h b-b m-t">
                <div class="flex-1  font-1 p-l">证件号码</div>
                <div class="flex-3">
                    <span>{{idCard}}</span>
                </div>
            </div>
            <div class="w h3 line-h-3 flex-h b-b m-t">
                <div class="flex-1  font-1 p-l">身份认证</div>
                <div class="flex-3">
                    <span> 已认证</span>
                </div>
            </div>
            <div class="w h3 line-h-3 flex-h b-b m-t">
                <div class="flex-1  font-1 p-l">收货地址</div>
                <div class="flex-3">
                   <span>{{address}}</span>
                </div>
            </div>
            <div class="w h3 line-h-3 flex-h b-b m-t">
                <div class="flex-1  font-1 p-l">详细地址</div>
                <div class="flex-3">
                    <span>{{address_detail}}</span>
                </div>
            </div>
             
        </div>


   </div>




</template>
<script>
export default {
    mounted(){
    // 发送异步请求获取个人店铺的完善资料
      this.util.ajax.post('/mall/shop/getShopDetail.do').then(e=>{
          this.name = e.data.name
          this.realName = e.data.realName
          this.idCard = e.data.idCard
          this.state = e.data.state
          this.address = e.data.address
          this.address_detail = e.data.address_detail      

        }).catch()
    },
    data(){
      return{
         name:null,
         realName:null,
         idCard:null,
         state:null,
         address:null,
         address_detail:null
      }

    }
    
}
</script>
<style lang="less">
 @import 'geren_data.less';

</style>



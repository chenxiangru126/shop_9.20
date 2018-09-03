<template>
  <div class="switch">
   <span>   </span>

  </div>
  
</template>

<script>
  import util from '../../libs/util.js'
  export default {
    //判断是否有店铺
     mounted(){
       var that=this;
       this.userGetinfo()
//         this.initData()
      // setTimeout(() => {
      //   that.initData()
      // }, 500);
    } ,

    methods:{
     userGetinfo(){
//         debugger
          var _this = this;
          setTimeout(function(){
              try{
                  let objdata = iosObject.getUserInfo();
                  let jsondata = eval('(' + objdata + ')');
                  window.jsondata = jsondata;
                  if(window.jsondata.token){
                      _this.initData();
                  }else{
                      _this.userGetinfo();
                  }
              }catch(e){
                  _this.userGetinfo();
              }
          },300)
      },

       initData(){

         var that=this;
        this.util.ajax.post('/mall/shopauthentication/shopPage.do').then(e => {
          // 这里还要返回shoptype类型，
//            console.log(e);
          let shoptype = e.data.shoptype;
          let data = e.data.state;
          let model = e.data.model; 
          let money = e.data.money;
          let instruction = e.data.instruction;
          if (data == 1) {
            // 是否有店铺，data为1 时是没有店铺
            that.$router.replace('/register')
            return false
          } else if (data == 2) {
            // 企业和个人的免单后的操作
            that.$router.replace('/back_pay?money=' + money+'&state=1&shoptype='+shoptype+'&model='+model)
          } else if (data == 3 && shoptype == 1) {

            that.$router.replace('/info')
            return false
          } else if (data == 3 && shoptype == 2) {
            that.$router.replace('/infoQ')
            return false
  
          } else if (data == 4) {
            //    审核中
            that.$router.replace('/shenfen?state=' + data)
            return false
          } else if (data == 5) {
            //    审核通过未确认
            that.$router.replace('/shenfen?state=' + data)
            return false
          } else if (data == 6) {
            //    审核失败
            this.$router.replace('/shenfen?state=' + data + '&instruction=' + instruction + '&shoptype=' + shoptype)
            return false
          } else if (data == 7) {
            //    审核通过
            that.$router.replace('/switch')
            return false
          } else if (data == 8) {
            // 已退保证金
            that.$router.replace('/oncezhi?money=' + money+'&shoptype='+shoptype+'&model='+model)
            return false
          }
        })
       }
    }
  }
</script>

<style lang="less">
@import "detailData.less";
</style>



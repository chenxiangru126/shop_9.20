<template>
<div class="zheng_detail">
     <div class="top">
           <!--<img :src="b_url" alt="">-->
           <img :src="url1" alt="">
           <!--<img class="bj_write" src="../../static/images/black-white.png" alt="">-->
           <img :src="url2" alt="">
     </div>
     <div class="content">

     </div>
     <div class="content">
         <span class="content_tishi">注：点击二维码可查看更多证书详情</span>
         <p class="content_title">版权登记</p>
         <p class="line_2" ></p>
         <p class="content_word">版权登记证书已申请</p>
         <img class="content_zheng" :src="b_url" alt="">
         <!--<img :src="url2" alt="">-->
         <p class="content_title" >版权记录</p>
         <p class="line_2" ></p>
         <p class="content_word">当前著作人&nbsp;&nbsp;{{it.new_realname}}</p>
         <div class="change_content" v-for="(it,i) in changeDetail" :key="i">
             <!--<p class="change_date">{{it.createTime}}</p>-->
             <p class="change_desc">{{it.createTime}}&nbsp;&nbsp;&nbsp;{{it.new_realname}}转让给{{it.old_realname}}</p>
         </div>
          


     </div>


</div>
    
</template>
<script>
import util from '../../libs/util'
export default {
    data(){
        return{
          number :null,
          block_cert_numbere:null,
          url1:null,
          url2:null,
          b_url:null,
          changeDetail:[],

        }
    },
     created(){
      // 请求申请成功显示证书
        let number = this.$route.query.number
        let block_cert_numbere = this.$route.query.block_cert_numbere
        this.block_cert_numbere = number
        let _p ={
            block_cert_numbere
        }
        this.util.ajax.post('/admin/authCopyright/getCopyrightDataDetails.do',_p).then(e=>{
          //获取url
            console.log(e);
          if(e.code == 200){
              console.log(e.data);
               this.url1 = e.data.c_url1
              this.url2 = e.data.c_url2
              this.b_url = e.data.b_url
              console.log(this.url1);
          };

        })
//         var number = this.$route.query.number
//         this.number = number
//         var _b ={
//                 number
//             }
//         alert("3")
         this.number = number
         this.util.ajax.get('/admin/authCopyright/bq_change.do?number='+this.number).then(e=> {
             //获取url
//
             if (e.code == 200) {
//                 alert("111111111111")
                 this.changeDetail = e.data || {};
             }
         })
    }
    
}
</script>
<style lang="less">
@import 'zheng_detail.less';

</style>



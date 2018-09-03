<template>
<div class="reg_wrap">
 <!-- 主体部分 -->
 <div class="reg_content">
    <p>大咖,创建您的网店，我想进去看看！</p>
    <div class="content_con">
        <div class="geren " @click="goperson_mall">
          <span><img src="../../static/images/gerenw.png" alt=""></span>
        </div>
        <div class=" qiye" @click="goqi_mall">
          <span><img src="../../static/images/qiyew.png" alt=""></span>
        </div>
    </div>

 </div>
 <div class="footer_one">
     <div class="footer_content">
       <span class="active font-3" style="left:5%; top:-.333333rem">选择类型</span>
       <span>缴保证金</span>
       <span style="left:8%">填写信息</span>
       <span style="left:6%;">身份认证</span>
     </div>
    
 </div>

</div>
    
</template>

<style lang="less">
    @import 'register.less';
</style>

<script>
    export default {
       mounted() {
            var that = this;
        },
        methods:{
        //  跳转到个人网店
        // 传递参数：params:id:1 是个人网店
          goperson_mall(){
           this.$router.push({path: '/register1?shoptype=1'});
          },
        // 跳转到企业的网店
          // 传递参数：pareams:id:2 是企业网店
          goqi_mall(){
           this.$router.push({path:'/register1?shoptype=2'})
          }
        }     
    }
</script>



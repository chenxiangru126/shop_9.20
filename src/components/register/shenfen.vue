<template>
<div class="shenfen_wrap"> 
    

  <p class="c1 font-0 p-l-3 p-t"  style="color:#BABABA;box-sizing:border-box;margin: .325rem 0;">身份证正面：</p>
    <div class="upload"  @click="trigger_file">
        <img :src="avatar" alt=""  class="show_img" v-show="avatar !== null"> 
       <div class="input_cssY">
           <img src="../../static/images/shenfen.png" alt=""  style="width:113px;height:27px" v-show="avatar == null"> 
             
       </div> 


    </div> 
      <p  class="c1 font-0 p-l-3 p-t "  style="color:#BABABA;box-sizing:border-box;margin: .325rem 0;">身份证背面：</p>
  
      <div class="upload" @click="pick_file">
       <img :src="avar_fan" alt=""  class="show_img" v-show="avar_fan !== null"> 
       <div class="input_cssY" >
           <img src="../../static/images/shenfen.png" alt="" style="width:113px;height:27px" v-show="avar_fan == null"> 
           

       </div> 


    </div>


    <div  v-show="is_show">
     <p class="c1 font-0 p-l-3 p-t"  style="color:#BABABA;box-sizing:border-box;margin: .325rem 0;">营业执照：</p>
     <div class="upload" style="height: 22rem" @click="bus_flie">
       <img :src="avar_bus" alt=""  class="show_img" v-show="avar_bus !== null"> 
       <div class="input_cssY" >
           <img src="../../static/images/shenfen.png" alt=""  style="width:113px;height:27px" v-show="avar_bus == null">
           
       </div> 

    </div> 
    </div>
 
      <div class="submit-btn-1" style="margin:1.933333rem auto" @click="next">
           下一步
      </div>
    
    <!-- footer -->
     <div :class = "shoptype == 1 ? '':'show'">
     <div :class="model == 'A' || model == 'B' || model == 'C' ? 'footer_four_m' :'footer_four'" >
       <div class="footer_content">
       <span class="active " >选择类型</span>
       <span class="active ">缴保证金</span>
       <span style="left:8%" class="active ">填写信息</span>
       <span style="left:4%; top:-.333333rem" id="aa2" class="active font-3">身份认证</span>
     </div>
      </div>
    </div>

    <div :class = "shoptype == 2 ? '':'show'">
     <div :class="model == 'A' || model == 'B' ? 'footer_four_m' :'footer_four'" >
       <div class="footer_content">
       <span class="active " >选择类型</span>
       <span class="active ">缴保证金</span>
       <span style="left:8%" class="active ">填写信息</span>
       <span style="left:4%; top:-.333333rem" id="aa1" class="active font-3">身份认证</span>
     </div>
      </div>
    </div>

  <!--点击要上传图片的input -->
  <!-- 1.上传身份证正面的input -->
  <input type="file" class="hide file"  accept="image/*"   @change="upload_img">
<!-- 2.上传身份证背面的input -->
  <input type="file" class="hide pick_f" accept="image/*"   @change="upload_pick_img">
  <!-- 3.上传营业执照的input -->
   <input type="file" class="hide bus_file" accept="image/*"  @change="upload_bus_img">


</div>
    
</template>
<script>
 import {_alert,_confrim} from '../../libs/ui';
 import util from '../../libs/util'
export default {
     data(){
         return{
          avatar:null, //显示身份证正面的照片
          show_ava:null,
          avar_fan:null,//显示身份证背面照片
          show_fan:null,
          avar_bus:null,//显示营业执照的照片
          show_bus:null,
          is_show:false, //默认是不显示企业身份认证
          model :null,
          shoptype:null
         }
         
     },
     mounted(){
       let data=  this.$route.query.state;
       let instruction = this.$route.query.instruction;
       if(data == 4){
         this._check()
       }else if(data == 5){
         this._success()
       }else if(data ==6){
         this._fail(instruction)
       }

      //读取参数
        let shoptype = this.$route.query.shoptype
        let model = this.$route.query.model
        this.model = model
        this.shoptype = shoptype
          if(shoptype == 2){
            this.is_show = true

          }else{
            this.is_show = false
          }  
            
     
        
       
        
     },
     methods:{
        //书写弹出层
        //1.审核中  
          _check(){
            let that = this
           const html=`<div class='p-b'>
              <img src='/images/shenhe.png' class='w4 log_alert_logo' />
                <div class="layer_title p-b c8">· 正在审核中 ·</div>
                  <p class="c1 font-2 w t-c over-h p-l p-r">我们会在24小时内为您审核，请耐心等待...</p>
            </div>
            `
            _alert({
                html:html,
                sureTxt:'返回首页',
                yes(){
                    //返回我的主页
                    iosObject.closeHtml();
                }
            })

          },

        // 2.审核成功
             _success(){
               let that = this
               const html=`<div class='p-b'>
              <img src='/images/successdog.png' class='w4 log_alert_logo' />
                <div class="layer_title p-b c10">· 审核通过 ·</div>
                  <p class="c1 font-2 w t-c over-h p-l p-r">恭喜您，审核成功，您可以去发布商品了！</p>
            </div>
            `
            _alert({
                html:html,
                sureTxt:'我知道了',
                yes(){
              
               // 发送请求，不再显示当前的弹出窗口
               let _p ={
                  state:3
               }
               that.util.ajax.post('/mall/shop/editShop.do',_p).then(e=>{
                     
                    if(e.code == 200){
                         //跳转到发布商品的页面
                       that.$router.push('/switch');
                    }

               })
                }
            })
             },
         //3.审核失败
              _fail(instruction){
                let that = this
                const html=`<div class='p-b'>
              <img src='/images/faildog.png' class='w4 log_alert_logo' />
                <div class="layer_title p-b c11">· 审核失败 ·</div>
                  <p class="c1 font-2 w t-c over-h p-l p-r">·${instruction}</p>

            </div>
            `
            _alert({
                html:html,
                sureTxt:'重新提交',
                yes(){
                  //调用下一步函数
                   let shoptype = that.shoptype;
                   if(shoptype == 1){
                     that.$router.push({
                       name: 'info'
                     })
                   }else if(shoptype == 2){
                     that.$router.push({
                       name: 'infoQ'
                     })
                   }

                }
            }) 
              },
        //上传图片 
         trigger_file() {
                // 获取input，添加点击事件
                const file = document.querySelector(".file");
                file.click();
            },
             // input发生改变，调用图片的上传
            upload_img(e) {
//                debugger;
                let formData = new FormData();
                formData.append('file', e.target.files[0]);
                formData.append('type', 'test');
                // 发送异步请求，把formData发送异步请求
                this.util.ajax.post("/mall/shop/upload.do", formData).then(e => {
                    //  返回的参数
                    this.avatar=e.data.urlShow
                    this.show_ava = e.data.url
                }).catch()
            },
            // 身份证背面上传
            pick_file(){
              // 获取input，添加点击事件
                const file = document.querySelector(".pick_f");
                file.click();
            }, 
            upload_pick_img(e) {
                let formData = new FormData();
                formData.append('file', e.target.files[0]);
                formData.append('type', 'test');
                // 发送异步请求，把formData发送异步请求
                this.util.ajax.post("/mall/shop/upload.do", formData).then(e => {
                    //  返回的参数
                    this.avar_fan =e.data.urlShow
                    this.show_fan = e.data.url
                    
                }).catch()
            },
            // 调用营业执照上传
            bus_flie(){
              const file = document.querySelector(".bus_file");
              file.click();

            },
              upload_bus_img(e) {
                let formData = new FormData();
                formData.append('file', e.target.files[0]);
                formData.append('type', 'test');
                // 发送异步请求，把formData发送异步请求
                this.util.ajax.post("/mall/shop/upload.do", formData).then(e => {
                    //  返回的参数  
                    this.avar_bus =e.data.urlShow
                    this.show_bus = e.data.url
                  
                }).catch()
            },
  
          // 处理信息提交
            
          next(){
            let idCard_zheng = this.show_ava
            let  idCard_fan = this.show_fan
            let  zhizhao = this.show_bus
            let shoptype = this.shoptype

            // 这里还需要判断是个人网店还是企业网店
            if(shoptype == 1){            
              if(idCard_zheng == null){
                        this.Toast("请上传证件照")
                        return false
                }else if(idCard_fan ==null){
                   this.Toast("请上传证件照")
                        return false
                }else{
                     let  _p = {
                      idCard_zheng,
                      idCard_fan, 
                      }
                      this.util.ajax.post("/mall/shop/editShop.do", _p).then(e => {
                      //异步请求成功后，返回数据，进行弹出层的调用
                      this._check();
                }).catch()
                }    
            
            }
            if(shoptype == 2){
           
              if(idCard_zheng == null){
                        this.Toast("请上传证件照")
                        return false
                }else if(idCard_fan ==null){
                   this.Toast("请上传证件照")
                        return false
                }else if(zhizhao == null){
                  this.Toast("请上传证件照")
                        return false
                }else{
                  let  _p = {
                        idCard_zheng,
                        idCard_fan, 
                        zhizhao
                         }
                this.util.ajax.post("/mall/shop/editShop.do", _p).then(e => {
                          //异步请求成功后，返回数据，进行弹出层的调用
                      this._check();
                    }).catch()

                }
                          
            }
        
          }    
    }
     


} 

</script>


<style lang="less">
@import "shenfen.less";
</style>



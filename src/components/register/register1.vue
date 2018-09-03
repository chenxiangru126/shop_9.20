<template>
 <div class="reg1_wrap">
     <!-- 显示头部信息 -->
         <div class="header_b">
         <div class="ios_log"></div>
        <div class="w rela">
            <div class="_left" @click='back_event'></div>
            <div class="w t-c _center" style="color:#41BCA1" v-show="shoptype == 1" >{{title_name}}</div>     
            <div class="w t-c _center" style="color:#92C25D"  v-show=" shoptype == 2">{{title_name}}</div>     
        </div>
    </div>
    <div class=reg1_detail>
      <div v-show="shoptype == 1">
           <h3>开店资格</h3>
           <span>1、一个身份证只能创建一个艺狗网店</span><br>
           <span>2、个人网店，开店主体为自然人，该自然人需满16周岁</span><br>
           <span>3、在正常经营过程中，符合一定的要求可变更网店经营主体</span><br>
           <span>4、个人网店，包括自然人开店或自然人所登记的个体工商户开店的，该自然人即为店铺负责人</span><br>
           <span>5、网店负责人认证需按系统要求提供本人真实有效的身份信息，包括但不限于：身份信息有效联系方式、真实地址等</span><br>
           <span>6、开店需缴纳不同等级的保证金</span><br>
           <span>7. 如需保证金的级别调整请于平台联系 客服电话 010-5962 6817</span>


      </div>
      <div v-show="shoptype == 2"> 
          <h3>开店资格</h3>
           <span>1.除个体工商户外，其他基于营业执照信息通过认证的开店主体所开设的网店为企业网店</span><br>
           <span>2.企业网店的网店责任人包含但不限于：该企业的法人股东等，其需要对该店铺的运营及管理全面负责</span><br>
           <span>3.企业网店，其网店负责人需满18周岁</span><br>
           <span>4.网店负责人认证需按系统要求提供本人真实有效的身份信息，包括但不限于：身份信息、有效联系方式、真实地址等</span><br>
           <span>5.开店需缴纳不同等级的保证金</span><br>
           <span>6.如需保证金的级别调整请于平台联系客服电话 010-5962 6817</span>
           


      </div>
    </div>
    <!-- 个人网店类型 -->
    <div class="detail" v-show="shoptype == 1">
        <div class="wrap_two">
            <p>网店类型</p>
            <form class=reg1_lei>
                <table border="0" cellpadding="0"  cellspacing="0" class="table_wrap">
                    <tr>
                        <td style="width:17%; border-top: .0625rem solid #646464; border-left: .0625rem solid #646464; border-bottom: .0625rem solid #646464;">类别</td>
                        <td style="width:17%;  border-top: .0625rem solid #646464; border-left: .0625rem solid #646464; border-bottom: .0625rem solid #646464;">保证金</td>
                        <td style="width:17%; border-top: .0625rem solid #646464; border-left: .0625rem solid #646464; border-right: .0625rem solid #646464; border-bottom: .0625rem solid #646464;">规格</td>
                        <td style="width:15%; border:0" ></td>
                    </tr>
                    <tr v-for="(item,index) in list_person " :key="index" >
                        <td style="border-bottom: .0625rem solid #646464; border-left: .0625rem solid #646464;">{{item.model}}</td>
                        <td style="border-bottom: .0625rem solid #646464; border-left: .0625rem solid #646464;">{{item.money}}</td>
                        <td style="border-bottom: .0625rem solid #646464; border-left: .0625rem solid #646464; border-right: .0625rem solid #646464;">{{item.fomart1}}</td>
                        <td style="border:0">
                            <div class="circle" @click="dianji(index,model=item.model,shop_type_id=item.id)">
                                <span class="dian" :class="{active:isActive===index}" ></span>
                            </div>
                        </td>
                    </tr>



                </table>


            </form>
        </div>

        <button class="reg1_btn" @click="sure_person">确定</button>
   </div>

   <!-- 企业网店类型 -->
     <div class="detail" v-show="shoptype == 2">
        <div class="wrap_two">
            <p>网店类型</p>
            <form class=reg1_lei>
                <table border="0" cellpadding="0"  cellspacing="0" class="table_wrap">
                    <tr>
                        <td style="width:20%; border-top: .0625rem solid #646464; border-left: .0625rem solid #646464; border-bottom: .0625rem solid #646464;">类别</td>
                        <td style="width:20%;  border-top: .0625rem solid #646464; border-left: .0625rem solid #646464; border-bottom: .0625rem solid #646464;">保证金</td>
                        <td style="width:28%; border-top: .0625rem solid #646464; border-left: .0625rem solid #646464; border-right: .0625rem solid #646464; border-bottom: .0625rem solid #646464;">规格</td>
                        <td style="width:15%; border:0" ></td>
                    </tr>
                    <tr v-for="(item,index) in  list_coms " :key="index" >
                        <td style="border-bottom: .0625rem solid #646464; border-left: .0625rem solid #646464;">{{item.model}}</td>
                        <td style="border-bottom: .0625rem solid #646464; border-left: .0625rem solid #646464;">{{item.money}}</td>
                        <td style="border-bottom: .0625rem solid #646464; border-left: .0625rem solid #646464; border-right: .0625rem solid #646464;">{{item.fomart1}}</td>
                        <td style="border:0">
                            <div class="circle" @click="dianji(index,model=item.model,shop_type_id=item.id)">
                                <span class="dian" :class="{active:isActive===index}" ></span>
                            </div>
                        </td>
                    </tr>



                </table>


            </form>
        </div>
       <button class="reg1_btn" @click="sure_com">确定</button>
   </div>
 </div>



    
</template>

<style lang="less">
    @import 'register1.less';
</style>

<script>
    export default {
        mounted(){
            //获取的链接shoptype来判断是个人网店和企业网店
             const shoptype = this.$route.query.shoptype 
             this.shoptype = shoptype
             if(shoptype == 1){
                this.title_name ="个人网店说明"
             }else{
                 this.title_name = "企业网店说明"
                
             } 
            //   获取店铺类型
                 this.util.ajax.post("/mall/shop_type/getList.do").then(e=>{
                 let list = e.data
                  let list_com = list.filter((item)=>{
                      if(item.shoptype == 2){
                          return item
                      }
                       
                  }) 
                  let list_person = list.filter((item)=>{
                      if(item.shoptype == 1){
                        return item
                      }
                  }) 
                //填充企业类型
                   this.list_coms = list_com
                   this.list_person = list_person 
                 
              
            }).catch()

       
            
            

        },
       
        data(){
            return{       
               shoptype:null,
               list_person:[],
               isActive:0,//默认是不选中
             //企业网店类型
               list_coms:[],
               title_name:null,
               model:'A',
               shop_type_id:1,
            } 
        },
        methods:{ 
             // 返回上一级
              back_event(){
                history.back();
               },
               dianji(index,model,shop_type_id){
                 this.isActive = index
                 this.model = model
                 this.shop_type_id = shop_type_id;
                 },
                 sure_person(){
                    // 获取index的值
                   let model  = this.model
                   let shoptype = this.shoptype
                   let shop_type_id = this.shop_type_id
                   //要带走的是选择的值，和创建的是个人店铺还是企业店铺
                        //  跳转第一种类型是，免押金
                   this.$router.push("/register2?shoptype="+shoptype+"&model="+model+"&shop_type_id="+shop_type_id)   
                    // 创建店铺
                    let _p ={
                    model,
                    shoptype,
                    shop_type_id

                    }
                    this.util.ajax.post('/mall/shop/editShop.do',_p).then(e=>{
                        console.log(e.code)

                    })       
                 },
            
                 sure_com(){
                     // 获取index的值
                   let model  = this.model
                   let shoptype = this.shoptype
                   let shop_type_id = this.shop_type_id
                   //要带走的是选择的值，和创建的是企业店铺还是企业店铺
                        this.$router.push("/register2?shoptype="+shoptype+"&model="+model+"&shop_type_id="+shop_type_id)
                // 创建店铺
                let _p ={
                  model,
                  shoptype,
                  shop_type_id

                }
                  this.util.ajax.post('/mall/shop/editShop.do',_p).then(e=>{
                     console.log(e.code)

                  })
                  
                 }       
        }    
        
    }
</script>



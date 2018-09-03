<template>
 <div >
    <div class="ser_img" v-if="isShare">
        <img style="margin-right: 1rem;" @click="to_gwc" src="../../static/images/gwc-icon@3x.png" />
        <img @click="ser_on" src="../../static/images/ssss-ios.png" />
    </div>
    <mt-swipe :auto="3000">
    <mt-swipe-item v-for="(item,m) in items" :key="m">
    <!-- <a :href="item.href" rel="external nofollow" > -->
    <!-- <img src="../../static/images/1527777706210.jpg" class="sw_img"/> -->
    <img  :src="item.url" v-if="item.iswht" class="sw_img" style="width: 100%;margin:8% auto;display: block;" @click="opimg(item.url)"/>
    <img  :src="item.url" v-else class="sw_img" style="height: 100%;margin:0 auto;display: block;" @click="opimg(item.url)"/>
    <span class="desc"></span>
    <!-- </a> -->
    </mt-swipe-item>
    </mt-swipe>
    <div class="main">
        <div class="main_goods">
            <div class="goods_info">
                <p class="goods_info_name">{{goodsInfo.goodsName}}</p>
                <p class="goods_info_price1" v-show="goodsShow" ><span>商品价：</span><span> ¥{{goodsInfo.price}}</span></p>
                <p class="goods_info_price2" v-show="copyShow" ><span>版权价：</span><span> ¥{{goodsInfo.copyright_price}}</span></p>
                <p class="goods_info_spe"><span>商品标签</span><span>{{tags}}</span></p>
                <p class="goods_info_spe"><span>创作时间</span><span>{{goodsInfo.creatTime}}</span></p>
                <p class="goods_info_spe"><span>商品材质</span><span>{{goodsInfo.datum}}</span></p>
                <p class="goods_info_spe" style="margin-bottom: .133333rem"><span>商品规格</span><span>{{goodsInfo.format}} </span></p>
            </div>
            <div class="yk_bjt"><label class="triangle-right"></label><img src="../../static/images/hole_hole.png"/><label class="triangle-left"></label></div>
            <div class="goods_manager">
               <div class="man_img"><img v-bind:src="goodsInfo.photo"/></div> 
                <span class="name">{{goodsInfo.shop_name}}</span>
                <span v-if="isShare" @click="gostore(goodsInfo.friendsId)" class="but">进店逛逛</span>
            </div>
            <div class="yk_bjt"><label class="triangle-right"></label><img src="../../static/images/hole_hole.png"/><label class="triangle-left"></label></div>
            <div class="goods_describe">
                <p class="name">商品描述</p>
                <p class="info">{{goodsInfo.goodsDescribe}}</p>
            </div>
            <div class="yk_bjt"><label class="triangle-right"></label><img src="../../static/images/hole_hole.png"/><label class="triangle-left"></label></div>
            <div class="goods_evaluation">
                <p class="title">商品评价 <span>{{evaluationNum}}</span></p>
                <p class="line"></p>
                <!-- <div class="evaluation">
                    <div class="usr_info">
                        <img src="https://cdn.it120.cc/apifactory/2017/09/15/145c582252a7a20f21ad9a025ae8c9be.png"/>
                        <div class="info_r">
                            <p class="info_p"><span>执念only</span><span class="time">2018.02.25  09:41</span></p>
                            <p class="stars_p"><em class="stars_img"></em><em class="stars_img"></em><em class="stars_img"></em></p>
                        </div>
                    </div>
                    <div class="content">
                        <p>描述内容区，描述内容区描述内容区描述内容区描述内容区描述内容区。</p>
                        <p class="operation"><span class="give_like">18</span><span class="message">18</span></p>
                    </div>
                </div> -->
                <div class="evaluation" v-for="(it,i) in evaluation" :key="i" >
                    <div class="usr_info">
                        <div class="usr_img"><img v-bind:src="it.photo"/></div> 
                        <div class="info_r">
                            <p class="info_p"><span>{{it.realName}}</span><span class="time">{{it.createTime}}</span></p>
                            <p class="stars_p">
                                <em v-for="i in 5" :key='i'  :class="i<it.numzs?'stars_img': i==it.numzs&&it.numxs!=0?'stars_img2':'stars_img1'"></em>
                                </p>
                        </div>
                    </div>
                    <div class="content">
                        <p>{{it.content}}</p>
                        <p class="con_img">
                            <img v-for="(n,l) in it.urls" :key='l'  @click="opimg(n)"  v-bind:src="n"/>
                            
                        </p>
                        <p class="operation"><span @click="like(it)" :class="it.myDianzhan==1?'give_like':'give_like1'">{{it.dianzanCount}}</span><span class="message">{{it.pinglunCount}}</span></p>
                    </div>
                </div>
            </div>
            <div class="goods_but" v-if="isShare">
                <span class="contact" @click="contact">联系卖家</span>
                <span class="add" @click="user_action(1)">加入购物车</span>
                <span class="immediately" @click="user_action(2)">立即购买</span>
            </div>
        </div>
        <div class="dialog_layer" @click="dia_la"  v-show="share" >
       
        </div>
         <!-- <div class="share" v-show="share">
            <div class="share_m">
                <p><span></span><label>分享到</label><span></span></p>
                <div class="share_i"><img @click="share_on" src="../../static/images/circle@3x.png"/><img @click="share_on" src="../../static/images/wechat@3x.png"/>
                    <img @click="share_on" src="../../static/images/qq4x@3x.png"/><img @click="share_on" src="../../static/images/weibo@3x.png"/></div>
            </div>
        </div> -->
    </div>
      <thickness :num= number  :copyPrice=copyPrice :id=id :isShare=isShare v-if="dialog"></thickness>
 </div>
</template>

<style scoped lang="less" scoped>
    @import 'index.less';
    .ser_img{
        position: fixed;
        display: flex;
        z-index: 9999999;
        top: 1.6rem;
        right: .866667rem;
        img{
            width: 1.666667rem;
            height: 1.666667rem;
        }
    }
</style>

<script>
 import {Swipe, SwipeItem} from 'mint-ui'
 import 'mint-ui/lib/style.css'
 import util from "../../libs/util";
 import base64 from "../../libs/base64";
 import {_alert,_confrim,_openimg} from '../../libs/ui';
 import thickness from './thickness.vue';
 import axios from 'axios';
 export default {
 components: {
  'mt-swipe': Swipe,
  'mt-swipe-item': SwipeItem
 },
 data () {
    return {
        items: [ ],
        goodsInfo:'',
        tags:'',
        share:false,
        number:1,
        dialog:false,
        usr_t:0,
        id:'',
        list:[],
        evaluation:[],
        evaluationNum:'',
        isShare:true,
        copyPrice:null,
        price:null,
        copyShow:true,
        goodsShow:true
        // numzs:0,
        // numxs:0
      }
    },
    components: {
            thickness: thickness
        },
     created() {
         this.id = 	this.$route.query.id;
         this.isShare = this.$route.query.isShare==1?false:true;
         this.initData();
     },
    methods: {
        initData(){
            let _this =this;
            let data ={id:this.id,token: "",
                    userId: "",
                    mobile: ''};
            axios.post("/mall/goods/getById.do",data).then(res=>{
                let e = res.data;

                if(e.code==200){

                    this.goodsInfo = e.data.goods;
                    this.copyPrice = e.data.goods.copyright_price;
                    this.price = e.data.goods.price;
                    for(let i in e.data.goods.tags){
                        this.tags+=e.data.goods.tags[i]+'; '
                    }
                    for(let n in e.data.goods.urlShow){
                        let img = new Image();
                        img.src = e.data.goods.urlShow[n];
                        img.onload = function(){
                        let iswht = Number(img.width) > Number(img.height*2)?true:false;
                            _this.items.push({url:e.data.goods.urlShow[n],iswht:iswht});
                        };
                    }
                    if(this.copyPrice == '' || !this.copyShow){
                        this.copyShow = false;
                    }else{
                        this.copyShow = true
                    }
                    if(this.price == ''|| !this.price){
                        this.goodsShow = false
                    }else{
                        this.goodsShow = true
                    }
                }
                
            }).catch()
            this.initList();
        },
        //评价
        initList(){
            let data ={id:this.id,token: "",userId: "", mobile: ''};
            axios.post("/mall/comments/getComments.do",data).then(res=>{
                let e = res.data;
                if(e.code == 200){
                    for(let i in e.data.list){
                        let r = e.data.list[i].score.split('.');
                        e.data.list[i].numzs = Number(r[0])+1 ;
                        e.data.list[i].numxs = Number(r[1])||0;
                    }
                    this.evaluationNum = e.data.list.length;
                    this.evaluation = e.data.list;
                }
                
            }).catch()

        },
        // ----------------------------------------------//
        // 这个是判断是不是登陆状态
        user_action(a){
            let _t = this;
            this.userGetinfo(function(){
                _t.usr_t = a;
                _t.dialog = true;
            })
        },
        // 这个是调用是否登录的函数
        userGetinfo(fun){
            if(location.href.indexOf('localhost')>-1){
                return true;
            }
            var _this = this;
            let objdata = iosObject.getUserInfo();
            let jsondata = eval('(' + objdata + ')');
            window.jsondata = jsondata;
            axios.post("/mall/address/isHaveToken.do",{token:window.jsondata.token}).then(res=>{
                let e = res.data;
                if(e.code!=200){
                    // 这个是没有登陆的时候返回到登陆页
                    iosObject.goLogin();
                    return false;
                }else{
                     fun();
                     return true;
                }
            }).catch();
        },
//--------------------------------------- //


        Place_order(type){
            this.dialog = false;
            let url = '';
            if(this.usr_t==1){
                url = '/mall/cart/addCart.do'
            }else if(this.usr_t==2){
                url = '/mall/goods/viewOrder.do'
            }
             let data ={
                 goodsId:this.goodsInfo.id,
                 count:type?'1':this.number,
                 type:type?'1':'0'
                 }
            util.ajax.post(url,data).then(e=>{
                if(e.code==200){
                    if(this.usr_t==2){
                        this.$router.push({path: '/order_create',query:{ id:this.goodsInfo.id,type:type?'1':'0',count:type?'1':this.number}});  
                    }else{
                        this.Toast('加入成功！');
                    }
                }
            }).catch()
        },
        to_gwc(){
            let _t = this;
            this.userGetinfo(function(){
                _t.$router.push({path: '/shopping-list'});
            })
        },
        ser_on(){
            let ur = '/index.html#/goods-details-gwc?id='+this.goodsInfo.id+'&isShare=1';
            let str = base64.base64encode(ur);
            let url = window.location.host+'/mall/toGoodsShareUrl/usl/'+str
            // alert("base64 encode:" + str);  http://59.110.169.175:8081/index.html#/
                //解密
            //    let str1 = base64.base64decode(str);
            //     alert("base64 decode:" + str1);
            iosObject.shareContentTitlePicUrl(this.goodsInfo.goodsDescribe,this.goodsInfo.goodsName,this.goodsInfo.sharePhoto,url);
            // this.share = !this.share
        },
        dia_la(){
            this.share = false;
        },
        opimg(e){
            _openimg(e);
         },
        gostore(id){
            let _t = this;
            this.userGetinfo(function(){
               iosObject.toFriendMainPage(id);
            })
        },
        like(a){
            util.ajax.post("/mall/goodscomment_dianzan/dianzan.do",{goodscommentId:a.id}).then(e=>{
                if(e.code==200){
                    if(a.myDianzhan ==0){
                        a.dianzanCount--;
                        a.myDianzhan = 1;
                        this.Toast('取消点赞！');
                    }else{
                        a.dianzanCount++;
                        a.myDianzhan = 0;
                        this.Toast('点赞成功！');
                    } 
                } 
            }).catch()
        },
        contact(){
            let _t = this;
            this.userGetinfo(function(){
                iosObject.toChatVC(_t.goodsInfo.userId);
            })
        }
    }
 }
</script>
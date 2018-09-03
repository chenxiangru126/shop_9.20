<template>
 <div >
 <mt-swipe :auto="3000">
  <mt-swipe-item v-for="item in items" :key="item">
  <!-- <a :href="item.href" rel="external nofollow" > -->
  <!-- <img src="../../static/images/1527777706210.jpg" class="sw_img"/> -->
  <img  :src="item.url" v-if="item.iswht" class="sw_img" style="width: 100%;margin:8% auto;display: block;" @click="opimg(item.url)"/>
   <img  :src="item.url" v-else class="sw_img" style="height: 100%;margin:0 auto;display: block;" @click="opimg(item.url)"/>
   <span class="desc"></span>
  <!-- </a> -->
  </mt-swipe-item>
 </mt-swipe>
    <div class="main">
        <div class="goods_info">
            <p class="goods_info_name"><span>{{goodsInfo.goodsName}}</span>  <span class="but" @click="shelves">{{goodsInfo.isUp==0?'上架商品':'下架商品'}}</span></p>
            <p class="goods_info_price1"><span>商品编号</span><span class="font-14">{{goodsInfo.goods_num}}</span></p>
            <p class="goods_info_price2"><span>商品分类</span><span class="font-14">{{goodsInfo.bigTypeName}}</span></p>
            <p class="goods_info_spe"><span>商品价格</span><span class="font-14" style="color: #D1324E;">￥{{goodsInfo.price}}</span></p>
            <p class="goods_info_spe"><span>版权价格</span><span class="font-14" style="color: #D1324E;">￥{{goodsInfo.copyright_price}}</span></p>
            <p class="goods_info_spe"><span>商品标签</span><span class="font-14">{{tags}}</span></p>
            <p class="goods_info_spe"><span>商品状态</span><span class="font-14" style="color: #D1324E;">{{state}}  </span></p>
        </div>
        <div class="yk_bjt"><label class="triangle-right"></label><img src="../../static/images/hole_hole.png"/><label class="triangle-left"></label></div>
         <div class="goods_info">
            <p class="goods_info_name"><span>商品参数</span> </p>
            <p class="goods_info_spe"><span>创作时间</span><span class="font-14" >{{goodsInfo.creatTime}}</span></p>
            <p class="goods_info_spe"><span>商品材质</span><span class="font-14" >{{goodsInfo.datum}}</span></p>
            <p class="goods_info_spe"><span>商品规格</span><span class="font-14" >{{goodsInfo.format}}    </span></p>
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
                        <p class="con_img" style="width: 100%;">

                            <imgages :item='it.urls'></imgages>
                            
                        </p>
                        <p class="operation"><span @click="like(it)" :class="it.myDianzhan==1?'give_like':'give_like1'">{{it.dianzanCount}}</span><span class="message">{{it.pinglunCount}}</span></p>
                    </div>
                </div>
            </div>
    </div>
 </div>
</template>

<style scoped lang="less">
    @import 'index.less';
</style>

<script>
 import {Swipe, SwipeItem} from 'mint-ui'
 import 'mint-ui/lib/style.css'
 import util from "../../libs/util";
 import {_alert,_confrim,_openimg} from '../../libs/ui';
 import img from './img.vue';
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
        state:'',
        id:'',
        list:[],
        evaluation:[],
        evaluationNum:""
        }
    },
     components: {
            imgages: img
        },
    created() {
         this.id = 	this.$route.query.id;
         this.initData();
        },
    methods: {
        initData(){
            let data ={id:this.id}
            let _this = this;
            let stateL = ['待售','在售','已售出','已售罄'];
            util.ajax.post("/mall/goods/getById.do",data).then(e=>{
                this.goodsInfo = e.data.goods;
                this.state = stateL[e.data.goods.state];
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
                // this.items = e.data.goods.urlShow;
            }).catch()
            this.initList();
        },
         //评价
        initList(){
            util.ajax.post("/mall/comments/getComments.do",{goodsId:this.id}).then(e=>{
                for(let i in e.data.list){
                    let r = e.data.list[i].score.split('.');
                    e.data.list[i].numzs = Number(r[0])+1 ;
                    e.data.list[i].numxs = Number(r[1])||0;

                }
                this.evaluationNum = e.data.list.length;
               this.evaluation = e.data.list;
            }).catch()
        },
        shelves(){
            let content,that = this;;
            if(this.goodsInfo.isUp==0){
                content = '确认上架该商品？';
            }else if(this.goodsInfo.isUp==1){
                content = '确认下架该商品？';
            }
            _confrim({
                //  title:'我是标题',// 选填
                content:content,//必填
                sureTxt:'确定',//选填
                // cancelTxt:'取消',//选填
                yes(){ //选填
                    if(that.goodsInfo.isUp==0){
                        that.isUps(1,'上架成功');
                    }else{
                        that.isUps(0,'下架成功');
                    }

                },
                no(){
                }
            })
        },
        isUps(isp,text){
            let data = {id:this.id,isUp:isp}
            util.ajax.post("/mall/goods/editGoods.do",data).then(e=>{
                this.goodsInfo.isUp = isp;
                this.Toast(text);
            }).catch()
        },
         like(a){
            util.ajax.post("/mall/goodscomment_dianzan/dianzan.do",{goodscommentId:a.id}).then(e=>{
                 if(a.myDianzhan ==0){
                     a.dianzanCount--;
                     a.myDianzhan = 1;
                     this.Toast('取消点赞！');
                 }else{
                     a.dianzanCount++;
                     a.myDianzhan = 0;
                     this.Toast('点赞成功！');
                 } 
            }).catch()
        },
         opimg(e){
            _openimg(e);
         },
    }
 }
</script>

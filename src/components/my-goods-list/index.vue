<template>
    <div class="list_m"  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"  infinite-scroll-distance="50" >
          <div class="header_d" v-if="isheader">
            <div class="search-top"></div>
            <div class="search_box flex-v flex-j-c">
                <div class="font-1 search_box_1 flex-h">
                    <input type="text" class="c2" v-model="goodsNameLike" placeholder="输入商品名称">
                    <p class="font-2 flex-1 t-c c3" @click="seh_qx">取消</p>
                </div>
            </div>
        </div>
        <div class=" _right flex-v flex-j-c flex-a-c"  @click="goods_search">
                <img src="../../static/images/search.svg" alt="" class="w1_5 h1_5">
        </div>

        <div class="add_goods" @click="addGoods" v-if="!isheader">
            <span>+ 添加商品</span>
        </div>
          <!-- 搜索 -->
      <div class="ser_h" v-if="isheader">
          <p v-if="goodsNameLike!=''" v-for="(i,k) in list" :key="k" @click="nameLike(i.goodsName)">{{i.goodsName}}</p>
      </div>
        <div class="list_c" @click="go_details(item.id)" v-for="(item,index) in list" :key="index"  >
            <p class="list_h"><span>商品号：{{item.goods_num}}</span> <span>{{item.creatTime}}</span></p>
            <div class="list_d" >
                <div class="list_lt" >
                    <img v-bind:src="item.imgUrl" />
                    <div style="flex: 1;position: relative">
                     <div class="list-rt">
                            <span v-if="item.isUp==0" @click.stop="del(item.id,index)">删除</span>
                            <span @click.stop="operation(item.id,index)" class="shelves">{{item.isUp==0?'上架':'下架'}}</span>
                        </div>
                        <div class="list_introduce">
                            <div class="list_span">
                            <span>{{item.goodsName}}</span>
                            <span v-if="item.price!=''">商品价 ￥{{item.price}}</span>
                            <span v-if="item.copyright_price!=''" style="color: #F5A623">版权价 ￥{{item.copyright_price}}</span>
                            </div>
                        <P style="color: #FFF;">{{item.isUp==0?'待售':'在售'}}</P>
                        </div>
                       
                    </div>
              </div>
               
            </div>
             
        </div>
        <div v-if="nulldata" style="text-align: center;margin-bottom: 1rem">没有更多数据...</div>
        <div class="goods_ft">
            <span  v-for="(item,index) in tabs" :key="index"  :class="{back:index == num}" @click="tab(index)">{{item}}</span>
        </div>

      <noData v-if="nones"></noData>
    </div>
</template>

<style lang="less" scoped>
    @import 'index.less';
</style>

<script>
import util from "../../libs/util";
import no_data from '../teshu/noData.vue';
    import {
        InfiniteScroll
    } from 'mint-ui';
    import Vue from 'vue';
    Vue.use(InfiniteScroll);
    export default {
        data() {
            return {
                isheader:false,
                tabs:['全部','在售商品','待售商品','已售商品'],
                share_log:false,
                list:[],
                num:0,
                currentPage:1,
                state:'',
                goodsNameLike:'',
                isheader:false,
                load:false,
                nulldata:false,
                nones:false
            }
        },
         components: {
            noData: no_data
        },
          watch:{  
            goodsNameLike(oldVal){
                if(this.goodsNameLike!=''){
                    this.list = [];
                    this.currentPage = 1;
                    this.initData();
                }
　　　　　　　　}
　　　　　},
        created(){
             this.initData();
        },
        mounted() {
           
        },
        methods: {
           initData() {
                var that = this;
                let data ={
                    showCount:20,
                    currentPage:this.currentPage,
                    shopId:'',
                    goodsNameLike:this.goodsNameLike,
                    state:this.state
                }
                util.ajax.post("/mall/goods/getGoodsData.do",data).then(e=>{
                    if(e.data.list.length==0){
                        if(this.currentPage==1){
                            this.nones = true;
                            this.nulldata = false;
                        }else{
                            this.nulldata = true;
                        }
                        this.busy=true;
                        return false;
                    }
                    console.log(e.data)
                    that.list =  that.list.concat(e.data.list||[]);
                     this.busy=false;
                     this.nones = false;
                    if(this.currentPage)this.load = true;
                }).catch();
            },
            go_details(id){
                this.$router.push({path: '/goods-details-store',query:{id:id}});
            },
            addGoods(){
                 this.$router.push({path: '/add-goods'});
            },
            tab(index) {
                this.num = index;
                this.currentPage = 1;
                this.list = [];
                if(index==0) index="";
                if(index==2) index="0";
                if(index==3) index="2";
                this.state = index;
                this.initData();
            },
             nameLike(i){
              this.goodsNameLike = i;
              this.isheader = false;
              this.list = [];
              this.currentPage = 1;
              this.initData();
           },
            del(id,index){
                util.ajax.post("/mall/goods/editGoods.do",{id:id,deleted:'1'}).then(e=>{
                    this.list.splice(index,1);
                }).catch();
            },
            operation(id,index){
                let isUp_;
                if(this.list[index].isUp==0){
                    isUp_ = 1;
                }else if(this.list[index].isUp==1){
                    isUp_ = 0;
                }
                 util.ajax.post("/mall/goods/editGoods.do",{id:id,isUp:isUp_}).then(e=>{
                    this.list[index].isUp = isUp_
                }).catch();
            },
            loadMore(){
                this.busy=true;
                if(this.load){
                    setTimeout(()=>{
                        this.currentPage++;
                        this.initData();
                    },500)
                }
            },
    
            goods_search(){
                this.goodsNameLike = '';
                this.isheader =true;
            },
            seh_qx(){
                this.isheader =false;
                this.goodsNameLike = "";
                // this.list = [];
                // this.currentPage = 1;
                // this.initData();
            },
        }
    }
</script>



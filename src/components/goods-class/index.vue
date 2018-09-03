<template>
    <div class="list_m">
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
        <div class="goods_nav">
            <div class="classification" @click="onGoods">{{navigation1}}<span></span></div>
            <div class="classification" @click="onClassification">{{navigation2}}<a v-if="isDian">...</a><span></span></div>
            <div class="price" @click="onPrice">价 格<span></span></div>
        </div>
        <div class="lsit_t"    v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" ref="viewbox">
            <div class="list_c" v-for="(item,index) in list" :key="index" @click="go_details(item.id)">
                <div class="list_img">
                    <img class="img" v-bind:src="item.imgUrl"/>
                <div class="tixing">
                        <div style="margin-top:3.8rem;margin-left: 4.6rem;color: #F5A623 ;" v-bind:style="{ opacity: item.copyright_price?'1':'0' }" >
                            <p style="font-size: .866667rem;font-weight:bold;margin-left: .9rem;">版权价</p>
                            <p style="font-size: .86666rem">￥{{item.copyright_price}}</p>
                        </div>
                        <div style="margin-left: 2.55rem;color: #FFFFFF ;">
                            <p style="font-size: .866667rem;font-weight:bold;margin-left: .8rem;">商品价</p>
                            <p style="font-size: .866667rem">￥{{item.price}}</p>
                        </div>
                    </div>
                </div>
                <div class="list_introduce">
                    <span>{{item.goodsName}}</span>
                </div>
                <div class="list_source">{{item.shop_name}}</div>
            </div>
             <div v-if="nulldata" style="text-align: center;margin-bottom: 1.333333rem">没有更多数据...</div>
        </div>
        <noData v-if="nones"></noData>
    <!-- 商品-->
    <div class="goods_m" v-show="isgoods" >
        <div class="goods_lab">
            <label><span class="bjys" @click="on_sp_goods(0,$event)">全部</span></label><label><span @click="on_sp_goods(1,$event)">商品</span></label><label><span @click="on_sp_goods(2,$event)">版权</span></label>
        </div>
        <div class="but_small" @click="on_arrow"><img src="../../static/images/small-arrow.png"/></div>
    </div>

    <!-- 分类-->
    <div class="classification_m" v-show="classification">
        <div class="cn_t"><span @click="chooseAll()">全部</span></div>

        <div class="cn_type">
            <div v-for="(item,index) in goodsType" :key="index">
                <div class="cn_lab" >
                    <p class="cn_lab_t">{{item.name}}</p>
                    <div class="cn_lab_c" >
                        <label v-for="(it,n) in item.list" :key="n" ><span  @click="onlabel($event,item.id,it)">{{it.name}}</span></label>
                    </div>
                </div>
                <div class="yk_bjt" v-if="index<goodsN-1"  ><label class="triangle-right"></label><img src="../../static/images/hole_hole.png"/><label class="triangle-left"></label></div>
           </div>
        </div>
        
        <div class="cla_but"><span class="but_qx" @click="cancel()">取  消</span><span class="but_qd" @click="onconfirm()">确  定</span></div>
        <div class="but_small" @click="on_arrow"><img src="../../static/images/small-arrow.png"/></div>
    </div>

    <!-- 价格-->
        <div class="price_m"  v-bind:class="{class0:price}">
            <div class="pr_interval">
                <div id="min_price" class="price_db" ><span style="font-size: 0.75rem">￥</span>0</div>
                <div id="dragbar">
                    <div id="long_bar">
                        <div id="small_bar"></div>
                        <span class="btn"></span>
                        <span class="btn"></span>
                    </div>
                </div>
                <div id="max_price" class="price_db" style="margin-left:10px;"><span style="font-size: 0.75rem">￥</span>不限</div>
            </div>
            <div class="price_xs"><a>￥<span style="font-size: 1.333333rem">{{minP}}</span> -￥<span style="font-size: 1.333333rem">{{maxP}}</span></a></div>
            <div class="price_but"><span @click="initial_P">默认不限</span><span @click="onconfirm()">确定</span></div>
            <div class="but_small" @click="on_arrow"><img src="../../static/images/small-arrow.png"/></div>
        </div>
    <!-- 搜索 -->
      <div class="ser_h" v-if="isheader">
          <p v-if="goodsNameLike!=''" v-for="(i,k) in list" :key="k" @click="nameLike(i.goodsName)">{{i.goodsName}}</p>
      </div>
    </div>
</template>

<style lang="less" scoped>
    @import 'index.less';
    #dragbar {position: relative; width: 14.3rem;top: .625rem;float: left; background: #939393;}
    #long_bar {height: .25rem; border-radius: 4px;}
    #small_bar {background:  #D1324E; position: absolute;z-index: 1; height: .25rem;line-height: .25rem;overflow: hidden;}
    #long_bar .btn {width: 1.0625rem;z-index: 2;position: absolute;height: 1.0625rem;cursor: pointer;top: -0.4rem;margin-left: -0.6em;background: #4A8ADA;border-radius: 50%;}
    .price_db {width: 3.6rem;font-size: 1.25rem;color: #9E9E9E; float: left;text-align: center;}
    .class0{opacity:0;z-index: -1;}
</style>

<script>
import util from "../../libs/util";
import no_data from '../teshu/noData.vue';
import axios from 'axios';
    import {
        InfiniteScroll
    } from 'mint-ui';
    import Vue from 'vue';
    Vue.use(InfiniteScroll);
    export default {
        data() {
            return {
                share_log:false,
                classification:false,
                price:true,
                minP:"0",
                maxP:'不限',
                zindex:-1,
                isgoods:false,
                list:[],
                goodsType:[],
                goodsN:0,
                pid:[],
                goodsTypeId:[],
                currentPage:1,
                startPrice:'',
                endPrice:'',
                isheader:false,
                goodsNameLike:'',
                load:false,
                nulldata:false,
                nones:false,
                searchType:"",
                navigation1:"商品",
                navigation2:"分类",
                isDian:false
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
                    this.initList();
                }
　　　　　　　　}
　　　　　},
        mounted() {
             this.initData();
        },
        methods: {
             userGetinfo(){
                var _this = this;
                setTimeout(function(){
                    try{
                        let objdata = iosObject.getUserInfo();
                        let jsondata = eval('(' + objdata + ')');
                        // alert(objdata);
                        if(!jsondata.hasOwnProperty('token')){
                            jsondata = {
                                token: "",
                                userId: "",
                                mobile: ''
                            }
                        }
                        window.jsondata = jsondata;
                        if(window.jsondata.token){
                            _this.initData();
                            _this.interval_p();
                        }else{
                            _this.userGetinfo();
                        }
                    }catch(e){
                        _this.userGetinfo();
                    }
                },300)
            },
         initData() {
               this.initList();
                axios.post("/mall/goodstype/goodsType.do",{ token: "",userId: "",mobile: ''}).then(e=>{
                    var e=e.data;
                    this.goodsType = e.data||[];
                    this.goodsN = this.goodsType.length;
                }).catch()
            },
         initList(){
              let datar ={
                    showCount:20,
                    isUp:1,
                    currentPage:this.currentPage,
                    // pid:this.pid.join(','),
                    goodsTypeId:this.goodsTypeId.join(','),
                    goodsNameLike:this.goodsNameLike,
                    startPrice:this.startPrice,
                    endPrice:this.endPrice,
                    searchType:this.searchType,
                    token: "",
                    userId: "",
                    mobile: ''
                }
                if(datar.id)delete datar.id;//删除属性
               axios.post("/mall/goods/getGoodsData.do",datar).then(e=>{
                   var e=e.data;
                    if(e.data.list.length==0){
                         if(this.currentPage==1){
                            this.nones = true;
                            this.nulldata = false;
                        }else{
                             this.nulldata = true;
                        }
                        return false;
                    }
                    this.list =  this.list.concat(e.data.list||[]);
                    this.nones = false;
                    if(this.currentPage==1)this.load = true;
                    //  this.nones = true
                }).catch(
                    // this.nones = true
                );
         },
          loadMore: function() {
              if(this.load){
                  this.currentPage++;
                  this.initList();
              }
             
          },
          go_details(id){
	        this.$router.push({path: '/goods-details-gwc',query:{ id:id,isShare:'0'}});
          },
          onClassification(){
            this.price = true;
            this.classification = true;
            this.isgoods = false
          },
          onPrice(){
            this.classification = false;
            this.isgoods = false;
            this.price = false;
          },
          on_arrow(){
            this.classification = false;
            this.isgoods =false;
            this.price = true;
          },
          onGoods(){
            this.classification = false;
            this.price = true;
            this.isgoods = true;
          },
          nameLike(i){
              this.goodsNameLike = i;
              this.isheader = false;
              this.list = [];
              this.currentPage = 1;
              this.initList();
          },
          on_sp_goods(n,e){
            //   debugger
            for(var i =0;i< e.target.parentNode.parentNode.children.length;i++) {
                e.target.parentNode.parentNode.children[i].children[0].classList.remove('bjys');
            }
            if(e.target.className.indexOf('bjys')== -1){
                    e.target.className = "bjys"; 
            }
            if(n==0){
                this.searchType = "";
                this.navigation1 = "全部";
            }else{
                this.searchType = n;
            }
            if(n==1) this.navigation1 = "商品";
            if(n==2) this.navigation1 = "版权";
            this.isgoods = false;
            this.list = [];
            this.currentPage = 1;
            this.initList();
  
          },
          cancel(){
              var l = document.getElementsByClassName('cn_lab_c');
              for(let i in l){
                  for(let n in l[i].children){
                      if(l[i].children[n].firstChild)
                      l[i].children[n].firstChild.className ="";
                  }
              }
              this.pid=[];
              this.goodsTypeId=[];
              this.navigation2="分类";
              this.isDian=false;
          },
          onlabel(e,pid,a){
              if (e.target.className.indexOf("bjys") == -1) {
                   e.target.className = "bjys"; //切换按钮样式
                    this.pid.push(pid);
                    this.goodsTypeId.push(a.id);
                   
                } else {
                   e.target.className = "";//切换按钮样式
                    for(let it in this.pid){
                        if(this.pid[it]==pid&&this.goodsTypeId[it]==a.id){
                             this.pid.splice(it, 1);
                             this.goodsTypeId.splice(it, 1);
                        }
                    }
                }
                let nodeList = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('label');
                 if(this.goodsTypeId.length==0){
                    this.navigation2 = '分类';
                }
                if(this.goodsTypeId.length>1){
                    console.log(1);
                    this.isDian = true;
                }else{
                    this.isDian = false;
                }
                for(var i =0;i< nodeList.length;i++) {
                   if(nodeList[i].children[0]&&nodeList[i].children[0].classList[0]=='bjys'){
                     this.navigation2 =  nodeList[i].innerText;
                     return "";
                   }
                }
          },
          chooseAll(){
              this.goodsTypeId = [];
              this.navigation2 = '分类';
              this.isDian = false;
              for(let i in this.goodsType){
                //   debugger;
                    for(let j in this.goodsType[i].list){
                        this.goodsTypeId.push(this.goodsType[i].list[j].id)
                    }
              }
              this.onconfirm();
          },
          onconfirm(){
              this.list = [];
              this.currentPage = 1;
              this.initList(); 
              this.classification = false;
              this.isgoods =false;
              this.price = true;
          },
          goods_search(){
              this.goodsNameLike = '';
              this.isheader =true;
          },
          seh_qx(){
              this.goodsNameLike = "";
              this.isheader =false;
          },
          interval_p(){
            var that = this;
            var longbar = document.getElementById("long_bar");
			var smallbar = document.getElementById("small_bar");
			var arrbtn = longbar.getElementsByTagName("span");
			var minP = document.getElementById("min_price");
			var maxP = document.getElementById("max_price");
			var minprice = 0;
			var maxprice = 1000;
			var total = maxprice - minprice,
				Isclick = false,
				zindex = 2;
			smallbar.style.width = 100 + "%";
			smallbar.style.left = 0;
			arrbtn[0].style.left = 0;
			arrbtn[1].style.left = 100 + "%";
			var maxwidth = longbar.offsetWidth; //最大移动值
			arrbtn[0].ontouchstart = function(e) {
				Isclick = true;
				this.style.zIndex = ++zindex;
				var x = Number(e.touches[0].clientX); //取点击位置的X轴长度值
				//按钮的x轴长度值
				var lenght = this.offsetLeft + (this.offsetWidth / 2 - 1);
				var btn2lenght = arrbtn[1].offsetLeft + (arrbtn[1].offsetWidth / 2 - 1);
				var maxlenght = Math.min(maxwidth, btn2lenght)+2;
				var btn = this;
				document.ontouchmove = function(e) {
					if(Isclick) {
						var thisX = Number(e.touches[0].clientX); //当前移动位置的X轴长度值
						var golenght = Math.min(maxlenght, Math.max(0, lenght + (thisX - x))); //移动的长度
						var leftVal = (golenght / maxwidth) * 100;
						btn.style.left = leftVal + "%"; //使用百分比
						smallbar.style.left = btn.style.left;
						smallwidth();
						price('minP', leftVal);
					} else {
						return false;
					}
				}
				document.ontouchend = window.onblur = btn.onlosecapture = function() {
					Isclick = false;
					btn.releaseCapture && btn.releaseCapture();
				};
				this.setCapture && this.setCapture();
				return false;
			}
			arrbtn[1].ontouchstart = function(e) {
				Isclick = true;
				this.style.zIndex = ++zindex;
				var x = Number(e.touches[0].clientX);
				var lenght = this.offsetLeft + (this.offsetWidth / 2 - 1);
				var btn1lenght = arrbtn[0].offsetLeft + (arrbtn[0].offsetWidth / 2 - 1);
				var minlenght = Math.max(0, btn1lenght)+2;
				var btn1 = this;
				document.ontouchmove = function(e) {
					if(Isclick) {
						var thisX = Number(e.touches[0].clientX);
						var golenght = Math.max(minlenght, Math.min(maxwidth, lenght + (thisX - x)));
						var leftVal = (golenght / maxwidth) * 100;
						btn1.style.left = leftVal + "%";
						smallwidth();
						price('maxP', leftVal);
					} else {
						return false;
					}
				}
				document.ontouchend = window.onblur = btn1.onlosecapture = function() {
					Isclick = false;
					btn1.releaseCapture && btn1.releaseCapture();
				};
				this.setCapture && this.setCapture();
				return false;
			}

			function smallwidth() {
				var left = parseFloat(arrbtn[0].style.left);
				var right = parseFloat(arrbtn[1].style.left);
				smallbar.style.width = (right - left > 0 ? Math.floor(right - left) : 0) + "%";
			}

			function price(obj, leftVal) {
				var p = parseInt((total / 100) * leftVal) + minprice;
				if(p > minprice && p < maxprice) {
					p = p % 5 > 3 ? p + (5 - (p % 5)) : p - (p % 5)
                }
                // debugger;
                // console.log(p);
                if(obj=="minP"){that.minP = p;that.startPrice=p}
                if(obj=="maxP"){that.maxP = p;that.endPrice=p}
                // this.obj = p;
				// obj.innerHTML = p + "元";
			}
          },
          initial_P:function(){
              this.interval_p();
              this.minP="0";
              this.maxP='不限';
          },
           
        }
    }
</script>



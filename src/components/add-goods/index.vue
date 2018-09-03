<template>
    <div class="entry_b">
        <p class="entry_ts">最多上传5张</p>
        <div class="up">
            <mt-swipe :auto="3000" class="up_sw">
            <img v-if="items.length==0" src='../../static/images/lbbj@3x.png' class="sw_img" style="width: 100%;height: 112%;margin-top: -.6rem;"/>
                <mt-swipe-item v-else v-for="(item,n) in items" :key="n" >
                    <img  :src="item.url" v-if="item.iswht" class="sw_img" style="width: 100%;margin:8% auto;display: block;" @click="opimg(item.url)"/>
                    <img  :src="item.url" v-else class="sw_img" style="height: 100%;margin:0 auto;display: block;" @click="opimg(item.url)"/>
                    <span class="desc"></span>
                </mt-swipe-item>
            </mt-swipe>
            <div class="up_r">
                <div class="up_img"><input type="file" value=""  id="file" accept="image/*"   @change='onUpload'> <img src="../../static/images/bcicon@3x.png" /> <span>上传作品</span></div>
                <div class="up_img"><img  @click="library" src="../../static/images/bbbicon@3x.png" /> <span>绿库导入</span></div>
            </div>
      
        </div>
        <div class="thickness" v-show="isthickness">
            <p class="thickness_name">商品分类<img @click="cl_img" src="../../static/images/guanbi.png"/> </p>
            <p class="thickness_fl">
                <span :class=" choose_co ?'th_xz':''" @click="clickfl(1)">{{flname}}</span>
                <span :class=" choose_co ?'':'th_xz'" @click="clickfl(2)">二级分类</span>
            </p>
            <div class="thickness_m">
             <p v-for="(item, index ) in listType" :key="index" @click="click_in(index)">{{item.name}}</p>
          
            </div>
        </div>
        <div class="entry_m">
            <div class="goods_i">
                <div><span>商品名称</span><input class="input" placeholder="输入商品名称" v-model="goodsName"/></div>
                <div><span>商品编号</span><input class="input" style="width: 12.3125rem;" readonly="readonly" v-model="goodsNum" placeholder="点击右侧按钮生成编号" /><p class="butn" :class=" isbjg ? 'background1' : 'background2' " @click="generate">生成编号</p></div>
                <div><span>商品分类</span><a class="choose" @click="goodsfl">{{goodt_n}}</a></div>
                <div><span>商品价格</span><input class="input" placeholder="输入商品价格" v-model="price"/></div>
                <div><span>版权编号</span><input class="input" placeholder="输入版权编号" v-model="copyright_num" /><p class="butn background1"   @click="validation">验证</p></div>
               <p style="width: 85%;height: 1.2rem;text-align: right; font-size: .8rem;color: #888888; position: absolute;margin-top: .166667rem">用于验证是否申请版权存证证书</p>
               <div style="height: 3.9rem ;padding-top: .533333rem;">
                    <span>版权价格</span><input class="input" placeholder="输入版权价格" v-model="copyright_price"/></div>
                <div style="min-height: 3.9875rem;display: block;">
                    <p>商品标签</p>
                    <label class="label" v-for="(item,index) in tagList"  :key="index" @click="cl_tag($event,item.id)">{{item.value}}</label> 
                       
                </div>
                <div style="border: none"><span>商品状态</span> <a> 立即上架</a>
                <input class="switch switch-anim" type="checkbox" @click="check"> <a>待售</a>
                </div>
            </div>
            <div class="yk_bjt"><label class="triangle-right"></label><img src="../../static/images/hole_hole.png"/><label class="triangle-left"></label></div>
            <div class="goods_c">
                <p>商品参数</p>
                <div class="div_m"><span>创作时间</span><a class="time" :class="make_time!='选择创作时间'?'cent':''" @click="cl_time">{{make_time}}</a>
                    <div class="xztime" v-show="isTime">
                        <label v-for="item in ttList" :key="item.id" @click="year(item)">{{item}}</label>
                        <!-- <label @click="year(2018)">2018年</label>
                        <label @click="year(2019)">2019年</label>
                        <label @click="year(2020)">2020年</label>
                        <label @click="year(2021)" style="border: none">2021年</label> -->
                    </div>
                </div>
                <div  class="div_m"><span>商品材质</span><input placeholder="输入商品材质" v-model="datum"/></div>
                <div  class="div_m"><span>商品规格</span><input placeholder="例：12*20*90 cm，或28g" v-model="format"/></div>
                <div  class="div_m" style="border: none"><span>商品数量</span><input placeholder="输入商品数量" v-model="count"/></div>
            </div>
             <div class="yk_bjt"><label class="triangle-right"></label><img src="../../static/images/hole_hole.png"/><label class="triangle-left"></label></div>
            <div class="goods_m">
                <p>商品描述</p>
                
            </div>
        </div>
        <div class="tt_ss">
            <textarea v-model="goodsDescribe"></textarea>
            <span class="tex_span">{{are}}/400</span>
        </div>
        
        <div class="but" @click="goodsSave">
            <span >确  定</span>
        </div>
        <router-view style="z-index: 999" class="child_view"></router-view>
    </div>
</template>

<style  lang="less" >
    @import 'index.less';
</style>

<script>
import {Swipe, SwipeItem} from 'mint-ui'
import 'mint-ui/lib/style.css'
import util from "../../libs/util";
import {_alert,_confrim,_openimg} from '../../libs/ui';
    export default {
        data() {
            return {
               items: [],
               goodsNum:'',
               isbjg:true,
               isTime:false,
               isthickness:false,
               choose_co:true,
               goodsType:[],
               listType:[],
               goodt_n:'选择商品分类',
               flname:"一级分类",
               tagList:[],
               lab0:false,
               lab1:false,
               lab2:false,
               lab3:false,
               goodsName:'',
               price:'',
               copyright_num:'',
               copyright_price:'',
               tag:[],
               isUp:true,
               make_time:'选择创作时间',
               datum:'',
               format:'',
               goodsDescribe:'',
               count:'',
               categories:'',
               smallclass:'',
               are:0,
               ttList:[],
               imgUrl:[],
               i:0
            }
        },
        components: {
            'mt-swipe': Swipe,
            'mt-swipe-item': SwipeItem
        },
        watch:{  
            goodsDescribe(oldVal){  
                if(oldVal.length<400){
                    this.goodsDescribe = this.goodsDescribe.slice(0,400);
                    this.are = 400;
                }
                this.are = oldVal.length;
　　　　　　　　}
　　　　　}, 
        created() {
            this.initData();
        },
        methods: {
            initData(){
                util.ajax.post("/mall/datas/getDatas.do",{code:'goodstag'}).then(e=>{
                    this.tagList = e.data||[];
                }).catch();
                util.ajax.post("/mall/goods/getYears.do").then(e=>{
                    this.ttList = e.data.list||[];
                }).catch()
            },
        generate(){
            this.isbjg = false;
                util.ajax.post("/mall/goods/goodsNum.do").then(e=>{
                    this.goodsNum = e.data.goodsNum||'';
                }).catch()
                // this.items.length
        },
         opimg(e){
            _openimg(e);
         },
        goodsfl(){
            this.isthickness = true;
            this.flname = "一级分类";
            this.choose_co = true,
            util.ajax.post("/mall/goodstype/goodsType.do").then(e=>{
                this.goodsType = e.data||[];
                this.listType = this.goodsType||[];
            });
        },
        clickfl(e){
            if(e==1){
                this.choose_co = true;
            }else{
                this.choose_co = false;
            }
        },
        click_in(e){
            if(this.choose_co){
                this.listType = this.goodsType[e].list;
                this.flname = this.goodsType[e].name;
                this.categories = this.goodsType[e].id;
                this.choose_co = false;
            }else{
                this.smallclass =  this.listType[e].id;
                this.goodt_n = this.flname+'--'+this.listType[e].name;
                this.isthickness = false;
            }
        },
        cl_img(){
            this.isthickness = false;
        },
        cl_time(){
            this.isTime = !this.isTime;
        },
        year(e){
            this.make_time = e;
            this.isTime = false;
        },
        check(e){
            this.isUp = !this.isUp;
        },
        cl_tag(e,id){
                if (e.target.className.indexOf("labelbj") == -1) {
                    e.target.className = "label labelbj"; //切换按钮样式
                    this.tag.push(id);
                } else {
                    e.target.className = "label";//切换按钮样式
                    var index = this.tag.indexOf(id);
                    this.tag.splice(index, 1);
                }             
        },
        //商品新增——版权编号验证
        validation(){
            if(this.copyright_price !='' ){
                if( this.copyright_num!=''){
                    util.ajax.post("/mall/auth_copyright/validate.do",{number:this.copyright_num}).then(e=>{
                        if(e.code==200){
                            this.Toast('验证通过');
                            this.i++
                            console.log(this.i)
                        }
//                        else{
//                            this.Toast('版权编号输入错误，请重新验证');
//                        }
                    }).catch()
                }else{
                    this.Toast('输入版权编号');
                }
            }
        },
        onUpload(e){
            let _this = this;
            if(this.items.length>4){
                this.Toast('最多上传5张');
                return false;
            }
            let reader = new FileReader();
			
            reader.readAsDataURL(e.target.files[0]);
            let formData = new FormData(); 
            formData.append('file', e.target.files[0]);
            // formData.append('type', 'test');
            util.ajax.post("/mall/shop/upload.do",formData).then(e=>{
                let img = new Image();
                img.src = e.data.urlShow;
                img.onload = function(){
                let iswht = Number(img.width) > Number(img.height*2)?true:false;
                    _this.items.push({url:e.data.urlShow,iswht:iswht});
                    _this.imgUrl.push(e.data.url);
                };
                // debugger;
                // let iswht = Number(img.width) > Number(img.height)?true:false;
                // console.log(iswht);
                // this.items.push({url:e.data.urlShow,iswht:iswht});
                // this.imgUrl.push(e.data.url);
            }).catch()
        },
         compress : function (res) {
            var that = this;
            var img = new Image(),
                maxH = 300;

            img.onload = function () {
                var cvs = document.createElement('canvas'),
                    ctx = cvs.getContext('2d');

                if(img.height > maxH) {
                    img.width *= maxH / img.height;
                    img.height = maxH;
                }
                cvs.width = img.width;
                cvs.height = img.height;

                ctx.clearRect(0, 0, cvs.width, cvs.height);
                ctx.drawImage(img, 0, 0, img.width, img.height);
                var dataUrl = cvs.toDataURL('image/jpeg', 1);
                alert(dataUrl);
                // 上传略
                // that.upload( dataUrl );
            };

            img.src = res;
        },
        goodsSave(){
            if(this.goodsName==''){
                this.Toast('请填写商品名称');
                return false;
            }
            if(this.goods_num==''){
                this.Toast('请填写商品编号');
                return false;
            }
            if(this.goodsTypeId==''){
                this.Toast('请选择商品分类');
                return false;
            }
//            if(this.price==''){
//                this.Toast('请填写商品价格');
//                return false;
//            }
//            if(this.price=='' || this.price==null &&this.copyright_price==null || this.copyright_price==''){

            //  if( this.copyright_price==''){
            //     this.Toast('请填写版权价格');
            //     return false;
            // }
//            if(this.goodsNum==""){
//                this.Toast('请生成编号');
//                return false;
//            }
            if(this.imgUrl.length==0){
                this.Toast('请上传商品图片');
                return false;
            }
             if(this.smallclass==''){
                this.Toast('请选择商品分类');
                return false;
            }
             if(this.count==''){
                this.Toast('请输入数量');
                return false;
            }
            if(this.price.length>8){
                 this.Toast('商品价格超过8位数');
                return false;
            }
             if(this.copyright_price.length>8){
                 this.Toast('版权价格超过8位数');
                return false;
            }

            if(this.price=='' && this.copyright_price==''){
                this.Toast('请填写商品价格或版权价格');
                return false;
//                return false;
            }else if(this.price=='' &&this.copyright_price!=''){
                if(this.copyright_num == ''){
                    this.Toast('请输入版权编号并进行验证');
                    return false;
                }else{
                    if(this.i>0){

                    }else{
                        this.Toast('请进行版权编号验证');
                        return false;
                    }
                }
            }else if(this.price!='' && this.copyright_price==''){

//                return false
            }else if(this.price!='' && this.copyright_price!=''){
                if(this.copyright_num == ''){
                    this.Toast('请输入版权编号并进行验证');
                    return false;
                }else{
                    if(this.i>0){

                    }else{
                        this.Toast('请进行版权编号验证');
                        return false;
                    }
                }


            }

            if(this.price!= ''||this.copyright_price!=''){
                let data = {
                    goodsName:this.goodsName,
                    goods_num:this.goodsNum,
                    price:this.price,
                    goodsTypeId:this.smallclass+'',
                    copyright_num:this.copyright_num,
                    copyright_price:this.copyright_price,
                    tag:this.tag.join(','),
                    isUp:this.isUp?"1":"0",
                    make_time:this.make_time=='选择创作时间'?'':this.make_time,
                    datum:this.datum,
                    format:this.format,
                    goodsDescribe:this.goodsDescribe,
                    count:this.count,
                    imgUrl:this.imgUrl.join(',')
                }
                util.ajax.post("/mall/goods/goodsSave.do",data).then(e=>{

                    if(e.code==200){
                        this.Toast('商品添加成功');
                        setTimeout(function(){
                            history.back();
                        },2000)
                    }
                    window.localStorage.clear();
                }).catch()
            }


        },
        library(){
            if(this.items.length>4){
                this.Toast('最多上传5张');
                return false;
            }
            this.$router.push({path: '/library-into'});  
        }
      }
    }
</script>



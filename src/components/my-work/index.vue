<template>
    <div class="work_m">
            <div class="work_l" >
                <div class="img_max" v-for="it in list_l" :key="it.id" @click="on_img(it)"><em v-if="it.check"></em> <span v-else></span><img v-bind:src="it.url"/></div>
                <!-- <div class="img_min"><span></span><img src="http://img.alicdn.com/bao/uploaded/i1/TB1B3D2uVGWBuNjy0FbSuv4sXXa.jpg_320x5000Q50s50.jpg_.webp"/></div>
                <div class="img_max"><span></span><img src="http://img.alicdn.com/bao/uploaded/i1/TB1B3D2uVGWBuNjy0FbSuv4sXXa.jpg_320x5000Q50s50.jpg_.webp"/></div>
                <div class="img_min"><span></span><img src="http://img.alicdn.com/bao/uploaded/i1/TB1B3D2uVGWBuNjy0FbSuv4sXXa.jpg_320x5000Q50s50.jpg_.webp"/></div> -->
            </div>
            <div class="work_r" >
                <div class="work_r_img" v-for="item in list_r" :key="item.id" @click="on_img(item)"><em v-if="item.check"></em> <span v-else></span><img v-bind:src="item.url" /></div> 
                <!-- <div class="work_r_img"><span></span><img src="http://img.alicdn.com/bao/uploaded/i1/TB1B3D2uVGWBuNjy0FbSuv4sXXa.jpg_320x5000Q50s50.jpg_.webp" /></div> 
                <div class="work_r_img"><span></span><img src="http://img.alicdn.com/bao/uploaded/i1/TB1B3D2uVGWBuNjy0FbSuv4sXXa.jpg_320x5000Q50s50.jpg_.webp" /></div>   -->
            </div>
        
        <div class="but" @click="import_img">
            <span>导入图片</span>
        </div>
    </div>
</template>

<style lang="less">
    @import 'index.less';
</style>

<script>
  import util from "../../libs/util";
    export default {
        data() {
            return {
              id:'',
              list_l:[],
              list_r:[],
              img:[]
            }
        },
       created() {
         this.id = 	this.$route.query.id;
         this.initData();
        },
        mounted() {
            var that = this;
        },
        methods: {
            initData(){
                util.ajax.post("/mall/auth_production/getProductImg.do",{productionId:this.id}).then(e=>{
                   this.list = e.data.list;
                   for(let i in e.data.list){
                       if(i%2==0){
                           this.list_l.push({'url':e.data.list[i],'check':false})
                       }else{
                           this.list_r.push({'url':e.data.list[i],'check':false})
                       }
                   }
                }).catch()
            },
            on_img(a){
                a.check = !a.check;
                var index = this.img.indexOf(a.url);
                if(index < 0){
                    this.img.push(a.url);
                }else{
                    this.img.splice(index, 1);
                }
            },
            import_img(){
                if(this.img.length==0){
                    this.Toast('请选择导入图片');
                    return  false;
                }
                let _this = this;
                let inglist = this.img;
                for(let i in inglist){
                    let img = new Image();
                    img.src = inglist[i];
                    img.onload = function(){
                    let iswht = Number(img.width) > Number(img.height*2)?true:false;
                        if(_this.$parent.items.length<6){
                            _this.$parent.items.push({url:inglist[i],iswht:iswht});
                        }
                        
                    };
                }

            //    this.$parent.items =  this.$parent.items.concat(this.img).slice(0,5);
               this.$parent.imgUrl = this.$parent.imgUrl.concat(this.img).slice(0,5);
                history.go(-2);
            }
        }
    }
</script>



<template>
    <div class="library_m">
        <div class="header_d" @click="akey"><span>一键导入</span></div>
       <div class="lib_list" @click="lib_on(it)" v-for="(it,index) in list" :key="index" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"  infinite-scroll-distance="50" >
           <img v-bind:src="it.url"/>
           <div class="lib_n  " :class="it.check?'lib-selected':'lib-unselected'"  @click.stop="choose(it,index)">
               <span>·{{it.name}}·</span>
           </div>
       </div>
       <div v-if="nulldata" style="text-align: center;margin-bottom: 1rem">没有更多数据...</div>
       <noData v-if="nones"></noData>
    </div>
</template>

<style lang="less">
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
               list:[],
               currentPage:1,
               rid:999,
               load:false,
                nulldata:false,
                nones:false
            }
        },
         components: {
            noData: no_data
        },
        created() {
            this.initData();
           
        },
        mounted() {
            var that = this;
        },
        methods: {
           initData() {
               let data = {
                   showCount:20,
                   currentPage:this.currentPage
               }
                util.ajax.post("/mall/auth_production/getProductData.do",data).then(e=>{
                    if(e.data.list.length==0){
                        if(this.currentPage==1){
                            this.nones = true;
                        }else{
                            this.nulldata = true;
                        }
                        this.busy=true;
                        return false;
                    }else{
                        for(let i in e.data.list){e.data.list[i].check = false;}
                        this.list = this.list.concat(e.data.list);
                        this.busy=false;
                        this.nones = false;
                        if(this.currentPage==1)this.load = true;
                    }
                    
                }).catch()
            },
            lib_on(a){
                this.$router.push({path: '/my-work',query:{ id:a.id}}); 
            },
            akey(){
                if(this.rid==999){
                    this.Toast('请选择导入资源');
                    return  false;
                }
                let _this = this;
                let id = this.list[this.rid].id;
                util.ajax.post("/mall/auth_production/getProductImg.do",{productionId:id}).then(e=>{
                   let li =  e.data.list.length;
                   let ls = this.$parent.items.length;
                   if (li>(5-ls))li = 5-ls;
                   for(let i =0;i< li;i++){
                       let img = new Image();
                        img.src = e.data.list[i];
                        img.onload = function(){
                        let iswht = Number(img.width) > Number(img.height*2)?true:false;
                            _this.$parent.items.push({url:e.data.list[i],iswht:iswht});
                        };
                    //   this.$parent.items.push(e.data.list[i]);
                      this.$parent.imgUrl.push(e.data.list[i]);
                   }
                    history.back();
                }).catch()

            },
             loadMore: function() {
              if(this.load){
                  this.currentPage++;
                  this.initData();
              }
             
          },
            // loadMore(){
            //     this.busy=true;
            //     if(this.load){
            //         setTimeout(()=>{
            //             this.currentPage++;
            //             this.initData();
            //         },500)
            //     }
            // },
            choose(a,b){
                a.check = !a.check;
                if(this.rid!=999){
                    this.list[this.rid].check = false;
                }
                if(this.rid==b){
                    this.rid = 999;
                }else{
                     this.rid = b;
                }
               
            }
        }
    }
</script>



<template>
    <div class="shop_b_list">
        <div class="cart_m" v-if="emptylist">
            <em></em>
            <p>你的购物车里空空如也</p>
            <div class="but" @click="browse">去 逛 逛</div>
        </div>
        <div class="shop-lib"  @scroll="onScroll" ref="viewbox" >
            <list :item='it' v-for='(it,i) in list' :key='i'>
    
            </list>
             <div v-if="nulldata" style="text-align: center">没有更多数据...</div>
         </div>
        
         <div class="d_but" v-show="butdisplay">
                <p>   总计   ¥ {{total}} <span @click="settlement">结 算</span></p>
         </div>
    </div>
</template>

<style lang="less">
    @import './index.less';
</style>

<script>
import util from "../../libs/util";
// import {InfiniteScroll} from 'mint-ui';
// import Vue from 'vue';
//  Vue.use(InfiniteScroll);
import list from './list.vue';
    export default {
        data() {
            return {
                emptylist:false,
                list:[],
                showCount:20,
                currentPage:1,
                total:0,
                ids:[],
                goodsIds:[],
                counts:[],
                types:[],
                nulldata:false,
                butdisplay:false,
                show_delete:false,
                select_status: false, //false 全不选  true 全选
                hasSelect: false, //是否有选中状态
                delete_items: [] //删除的数组
            }
        },
        components: {
            list: list
        },
        mounted() {
        //     let that = this;
        //     setTimeout(() => {
        //         that.initData()
        //    }, 450);
            this.userGetinfo();
            // if(location.href.indexOf('localhost')>-1){
            //     this.initData()
            // }
        },
        methods: {
            userGetinfo(){
                var _this = this;
                setTimeout(function(){
                    try{
                        let objdata = iosObject.getUserInfo();
                        let jsondata = eval('(' + objdata + ')');
                        window.jsondata = jsondata;
                        if(window.jsondata.token){
                            _this.initData();
                        }else{
                            _this.userGetinfo();
                        }
                    }catch(e){
                        _this.userGetinfo();
                    }
                },300)
            },
            initData() {
                var that = this;
                let data ={
                    showCount:20,
                    currentPage:this.currentPage,
                }
                util.ajax.post("/mall/cart/getCartData.do",data).then(e=>{
                    if(e.data.list&&e.data.list.length==0){
                        if(this.currentPage==1){
                             this.emptylist = true;
                             this.butdisplay= false;
                        }else{
                            this.nulldata = true;
                        }
                        return false;
                    }else{
                        this.butdisplay= true;
                        this.emptylist = false;
                    for(let i in e.data.list){
                        e.data.list[i].check = true;
                    }
                    that.list =  that.list.concat(e.data.list||[]); 
                    }
                    
                }).catch(
                    //  this.emptylist = true
                )
            },
            browse(){
                 this.$router.push({path: 'goods-ls-class'});
            },
            onScroll(){
                var offsetHeight = event.target.offsetHeight,
                    scrollHeight = event.target.scrollHeight-1,//滚动区域高度
                    scrollTop = event.target.scrollTop,//滚动位置
                    scrollBottom = offsetHeight + scrollTop;//滚动最下方位置

                if(scrollBottom >= scrollHeight){
                    this.currentPage++;
                    this.initData();
                }
            },
            // loadMore() {
            //     this.currentPage++;
            //     this.initData();
            // },
            settlement(){
                console.log(this.count)
                if(this.ids.length==0){
                    this.Toast('请选择商品');
                    return false
                }
                if(this.counts.length==1){
                    let data ={
                        ids:this.ids.join(','),
                        count:this.counts.join(','),
                        type:this.types.join(','),
                    }
                    util.ajax.post("/mall/cart/getMoney.do",data).then(e=>{
                        this.$router.push({path: '/order_create',query:{ id:this.goodsIds.join(','),count:this.counts.join(','), type:this.types.join(',')}});
                    }).catch()
                }else{
                    let data ={
                        ids:this.ids.join(','),
                        count:this.counts.join(','),
                        type:this.types.join(','),
                    }
                    util.ajax.post("/mall/cart/getMoney.do",data).then(e=>{
                        this.$router.push({path: '/order_create',query:{ id:this.ids.join(','),count:this.counts.join(','), type:this.types.join(',')}});
                    }).catch()
                }

            },
        }
    }
</script>



<template>
    <div class="shop_b_list" style="overflow:hidden">
        <div class="cart_m" v-if="emptylist">
            <em></em>
            <p>你的购物车里空空如也</p>
            <div class="but" @click="browse">去 逛 逛</div>
        </div>
        <div class="shop-lib"  @scroll="onScroll" ref="viewbox" >
            <list :item='it' v-for='(it,i) in list' :key='i.id'>
    
            </list>
             <div v-if="nulldata" style="text-align: center">没有更多数据...</div>
         </div>
        
         <div class="d_but" v-show="butdisplay">
                <p>   总计   ¥ {{total.toFixed(2)}} <span @click="settlement">结 算</span></p>
         </div>
         <div class="submit-btn-1-fix" v-show="show_delete">
            <div class="submit-btn-1-fixed"  @click='all_delete'>
                全部删除
            </div>
        </div>
    </div>
</template>

<style lang="less">
    @import './index.less';

</style>

<script>
import util from "../../libs/util";
// import cellSwiper from './cell_swiper.vue';
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
        created() {
            this.initData();            
            this.$root.eventHup.$on('receive_shopping_check', this.process_data);
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
        watch: {
            select_status: function(new_value, old_value) {
                if (new_value) {
                    this.list.forEach(e => {
                        e.check = false;
                    })
                } else {
                    this.list.forEach(e => {
                        e.check = true;
                        this.show_delete = false;
                    })
                }
            },
            list: {　　　　
                handler(newValue, oldValue) {　　
                    var that = this;　　
                    that.delete_items = [];
                    // debugger　　
                    if (that.select_status) {
                        that.list.forEach(e => {
                            if (!e.check) {
                                that.delete_items.push(e.id)
                                that.show_delete=true;
                            }
                        })　
                        if (that.delete_items.length == 0) {
                            that.hasSelect = false;
                        } else {
                            that.hasSelect = true;
                        }　
                        console.log(that.delete_items);　
                        if (that.delete_items.length == that.list.length) {
                            that.$root.eventHup.$emit('childEvent', {
                                shopping_checked: true
                            })

                        } else {
                            that.$root.eventHup.$emit('childEvent', {
                                shopping_checked: false
                            })
                        }
                    }
                },
                deep: true　　
            }
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
                },450)
            },
            initData() {
                var that = this;
                let data ={
                    showCount:20,
                    currentPage:this.currentPage,
                }
                util.ajax.post("/mall/cart/getCartData.do",data).then(e=>{
                    console.log(e);
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
                if(this.ids.length==0){
                    this.Toast('请选择商品');
                    return false
                }
                let data ={
                   ids:this.ids.join(','),
                }
                util.ajax.post("/mall/cart/getMoney.do",data).then(e=>{
                    this.$router.push({path: '/order_create',query:{ id:this.ids.join(',')}}); 
                }).catch()
            },
            process_data(a) {
                var that = this;
                if(!this.select_status){  
                     setTimeout(() => {
                        for(let i in this.list){
                            this.list[i].check = true;
                            this.total =this.total+this.list[i].count*this.list[i].price;
                            this.ids.push(this.list[i].id);
                        }
                        that.select_status = a;
                    }, 200)
                
                    //  this.total =this.total-this.list[i].count * 0
                }else if(this.select_status){
                        that.select_status = null;
                      this.total = 0
                }
    
            },
            all_delete() {
                var that = this,
                    url = '/mall/cart/deleteCart.do';
                this.util.ajax.post(url, {
                    ids: that.delete_items.join(",")
                }).then(e => {
                    if (e.code == 200) {
                        that.Toast('删除成功');
//                        setTimeout(() => {
//                            that.initData();
//                        }, 1000)
                        setTimeout(()=>{
                            var index = that.list.indexOf(that.item);
                            that.list = [];
                            that.list.splice(index, 1);
                            that.initData();
                        },1000)
                        that.show_delete=false;
                    }
                }).catch()
            },
            //  select_shopping_send(a) {
            //     this.$parent.recive_shopping_listen(a);
            //     history.back();
            // }

        }
    }
</script>



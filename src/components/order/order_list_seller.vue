<template>
    <div class="order_list_b">
        <div class="order_list-nav">
            <div class="list-nav-b flex-h flex-j-c" @click='nav_open'>
                <p v-if="!state">全 部</p>
                <p v-else-if="state==1">待付款</p>
                <p v-else-if="state==2">待发货</p>
                <p v-else-if="state==3">已发货</p>
                <p v-else-if="state==4">待评价</p>
                <p v-else-if="state==-1">退货</p>
                <p class="t-c flex-v flex-j-c l_t">
                    <span class="span_up" v-if='nav_show'></span>
                    <span class="span_down" v-else></span>
                </p>
                <div class="nav_list_c" v-if='nav_show'>
                    <p @click="handle_state(0)">全部</p>
                    <p @click="handle_state(1)">待付款</p>
                    <p @click="handle_state(2)">待发货</p>
                    <p @click="handle_state(3)">已发货</p>
                    <p @click="handle_state(4)">待评价</p>
                    <p @click="handle_state(-1)">退货</p>
                </div>
            </div>
            <div class="list-order-lib">
                <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-if="items.length>0">
                    <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                        <div class="order-lib_b" v-for="it in items" :key='it.id'>
                            <div class="flex-h">
                                <div class="c2 font-1 flex-1 ellipsis">订单号 {{it.order_num}}</div>
                                <div class="c2 font-1 flex-1 ellipsis t-r p-l">{{it.createTime}}</div>
                            </div>
    
                            <div class="order-lib_b_1 flex-h" @click='go_details(it)'>
                                <div><img :src="it.imgUrl" alt=""></div>
                                <div class="c3 flex-v flex-j-c flex-1">
                                    <p class="font-2 ellipsis">{{it.goodsName}}</p>
                                    <p class="font-1 c12" v-if='it.type==1'>¥{{it.money}}</p>
                                    <p class="font-1" v-else>商品价格 ¥{{it.money}}</p>
                                </div>
                                <div class="flex-1" v-if='it.state==1'>待付款</div>
                                <div class="flex-1" v-else-if='it.state==2 && it.type==0'>待发货</div>
                                <div class="flex-1" v-else-if='it.state==2 && it.type==1'>待确认</div>
                                <div class="flex-1" v-else-if='it.state==3 && it.type==0'>已发货</div>
                                <div class="flex-1" v-else-if='it.state==3 && it.type==1'>变更中</div>
                                <div class="flex-1" v-else-if='it.state==4 && it.type==0' >待评价 </div>
                                <div class="flex-1" v-else-if='it.state==4 && it.type==1' >取消出售 </div>
                                <div class="flex-1" v-else-if='it.state==5 && it.type==0'>已完成</div>
                                <div class="flex-1" v-else-if='it.state==5 && it.type==1'>已转让</div>
                                <div class="flex-1" v-else-if='it.state==6'>已取消</div>
                                <div class="flex-1" v-else-if='it.state==7'>待审核</div>
                                <div class="flex-1" v-else-if='it.state==8'>待退货 </div>
                                <div class="flex-1" v-else-if='it.state==9||it.state==13'>已拒绝</div>
                                <div class="flex-1" v-else-if='it.state==10'>待收货</div>
                                <div class="flex-1" v-else-if='it.state==11'>退款成功</div>
                                <div class="flex-1" v-else-if='it.state==12'>重新申请</div>
                            </div>
                            <div class="lib-btn-1" @click='send_goods_event(it)' v-if='it.state==2 && type==0'>一键发货</div>
                            <div v-if='it.state==2 && it.type==1'>
                                <div class="lib-btn-no"  @click="no_sell(it)">暂不出售</div>
                                <div class="lib-btn-1" @click='yes_sell(it)'>确认出售</div>
                            </div>
                            <div class="lib-btn-1" @click='go_audit(it)' v-if='it.state==7'>去审核</div>
                            <div class="lib-btn-1" @click='sure_get_goods(it)' v-else-if='it.state==10'>确认收货</div>
                            <!-- <div class="lib-btn-1" @click='send_goods_event(it)' v-else-if='it.state==8'>填写物流单号</div> -->
                            <!-- <div class="lib-btn-1" @click='go_audit(it)' v-else-if='it.state==9'>重新申请</div> -->
                        </div>
                    </ul>
                    <p v-show="loading&&!null_data" class="page-infinite-loading font-1 c1">
                        <mt-spinner type="fading-circle"></mt-spinner>
                        加载中...
                    </p>
                    <p v-if="null_data&&page>1" class="page-infinite-loading font-1 c1">
                        兄弟，真的没有了...
                    </p>
                </div>
                <noData v-else></noData>
    
                <div class="h8"></div>
            </div>
        </div>
    
        <div class="dialog_layer" v-if="send_goods_show">
            <div class="layer_cont_1">
                <div class="flex-v flex-j-c" style="padding:2rem 0 4rem 0;">
                    <div class="layer_title">· 发货信息 ·</div>
                    <div class="c3 flex-h flex-j-c">
                        <p class="line-h-2">物流单号:</p>
                        <input type="text" placeholder="输入物流单号" v-model.trim="express_num">
                    </div>
                    <div class="c3 flex-h flex-j-c m-t-2">
                        <p class="line-h-2">物流公司:</p>
                        <input type="text" placeholder="输入物流公司名称" v-model.trim="express_name">
                    </div>
                </div>
                <div class="layer_cont_btn">
                    <div class="layer_cont_confirm flex-h flex-j-c">
                        <p @click="send_goods_cancel">取消</p>
                        <p @click="send_goods_sure">确定</p>
                    </div>
                </div>
            </div>
        </div>
        <router-view class="order-search"></router-view>
    
    </div>
</template>

<style lang="less">
    @import 'order_list.less';
</style>

<script>
    // 卖家：全部、待付款、待发货、已发货、待评价、退货
    // 买家：全部、待付款、待发货、待收货、待评价
    import {
        _alert,
        _confrim
    } from '../../libs/ui';
    import {
        InfiniteScroll
    } from 'mint-ui';
    import Vue from 'vue'; 
    Vue.use(InfiniteScroll);
    import no_data from '../teshu/noData.vue';
    import util from '../../libs/util'
    export default {
        data() {
            return {
                items: [],
                nav_show: false,
                send_goods_show: false,
                page: 1,
                pageSize: 10,
                express_id: null, //订单id
                express_num: null, //物流单号
                express_name: null, //物流公司名称
                state: '', //订单状态
                loading: false,
                wrapperHeight: 0,
                null_data: false,
                type:'',//0是普通商品，1是版权商品
                id:null,

            }
        },
        created() {
            this.initData();
            if (this.$route.query.show_send_goods) {
                this.send_goods_show = true;
            }
        },
        mounted() {
            var that = this;
    
        },
        components: {
            noData: no_data
        },
        methods: {
            initData(a) {
                var that = this,
                    url = '/mall/orders/getOrderData.do', //卖家接口
                    _p = {
                        showCount: that.pageSize,
                        currentPage: that.page,
                        userType: 2, //2卖家数据
                        state: that.state
                    };
                if (a == 'update') {
                    _p.currentPage=1;
                    that.page = 1;
                    that.loading = true;
                    that.null_data = false;
                };
                if (that.null_data && a != 'update') return false;
                this.util.ajax.post(url, _p).then(e => {
                    if (that.page == 1) {
                        that.items = [];
                        that.items = e.data.list;
                    } else {
                        that.items = that.items.concat(e.data.list);
                    }
                    setTimeout(() => {
                        that.loading = false;
                    }, 200);
                    if (e.data.list.length < 10) {
                        that.null_data = true;
                        return false;
                    }
    
                }).catch()
            },
            loadMore() {
                this.loading = true;
                this.page++;
                this.initData();
    
            },
            //暂不出售，
            no_sell(a){
                
                 var that = this;
                _confrim({
                    content: '确定暂时不出售该版权么？', //必填
                    sureTxt:'确定',
                     yes() { //选填
                        var url = '/mall/orders/confirmReceipt.do';
                        that.util.ajax.get(url, {
                            params: {
                                id: a.id,
                            }
                        }).then(e => {
                            if (e.code == 200) {
                                that.initData('update');
                            } else {
                                that._alert({
                                    content: e.message
                                });
                            }
                        }).catch()
                    },
                    no() {

                    }
                })
                event.stopPropagation();
            }, 
            //确认出售
          /*   yes_sell(a){
               var that = this;
               var url = '/admin/copyrightChange/save.do';
                that.util.ajax.get(url, {
                    params: {
                        id: a.id,
                    }
                }).then(e => {
                    if (e.code == 200) {
                        that.initData('update');
                        that.Toast({
                            message:'您已确认该版权售出',
                            position:'bottom'
                        })
                    } else {
                       
                    }
                }).catch()
                 event.stopPropagation(); 
            }, */
            yes_sell(a){
            //   先调用获取买家和卖家的id还有交易的证书编号
                 debugger;
                //  console.log(a)  
                var that = this;
                this.id = a.id
                let userId = a.userId
                this.userId = a.userId
                let _p={
                    userId
                }
                debugger;
                this.util.ajax.get('/admin/users/zyzhuce.do?userId='+this.userId).then((e)=>{
                    debugger;
                    console.log('11111111：'+e.status);
                    if(e.data.status == 1){
                        this.util.ajax.get('/mall/orders/getOrderDetail.do?id='+this.id).then((e)=>{
                            debugger;
                            if(e.code == 200){
//                       let old_user_id = e.data.seller.sellerId
                                let old_user_id  ='59d31948-8260-4707-8d86-2759e2bd71bd'
//                       let new_user_id = e.data.buyer.buyerId
                                let new_user_id  ='59d31948-8260-4707-8d86-2759e2bd71bd'

//                       let block_cert_numbere  = e.data.goodsDetail.copyright_num
                                let  block_cert_numbere = '22A60CC41878924AA027555230B3716D'
                                console.log('old_user_id'+old_user_id,'new_user_id'+new_user_id,'block_cert_numbere'+block_cert_numbere)

                                let _p ={
                                    old_user_id,
                                    new_user_id,
                                    block_cert_numbere
                                }
                                debugger;
                                this.util.ajax.post('/admin/copyrightChange/save.do',_p).then((e)=>{
//                                    debugger;
                                    if(e.code == 200){
                                        let id  = this.id
                                        let express_name =  ''
                                        let _p ={
                                            id,
                                            express_name
                                        }
                                        debugger;
                                        this.util.ajax.post('/mall/orders/editOrder.do',_p).then((e)=>{
                                            debugger;
                                            if(e.code == 200){
                                                this.Toast('您已确认该版权售出')
//                                                this.state = 3
                                                this.initData();
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }else if(e.data.status == 0){

                        that.Toast({
                            message:'您还未申请版权登记，请去申请版权登记证书',
                        })

                        }
                })
            },
            //选择状态查询
            handle_state(a) {
                this.null_data = false;
                this.page = 1;
                this.state = a == 0 ? '' : a;
                this.initData('update');
            },
            nav_open() {
                this.nav_show = !this.nav_show;
            },
            go_details(a) {
                this.$router.push({
                    name: 'order_details_seller',
                    query: {
                        id: a.id,
                        goodsId: a.goodsId
                    }
                })
            },
            // 去审核
            go_audit(a) {
                this.$router.push({
                    name: 'order_return_goods_audit',
                    query: {
                        id: a.id,
                        goodsId: a.goodsId
                    }
                })
            },
            // 商家确定收货
            sure_get_goods(a) {
                var that = this;
                _confrim({
                    content: '请确定收到货后，确认收货。', //必填
                    yes() { //选填
                        var url = '/mall/orders/selleeConfirmReceipt.do';
                        that.util.ajax.get(url, {
                            params: {
                                id: a.id,
                            }
                        }).then(e => {
                            if (e.code == 200) {
                                that.initData('update');
                            } else {
                                that._alert({
                                    content: e.message
                                });
                            }
                        }).catch()
                    },
                    no() {}
                })
            },
            //发货信息弹层打开[一件发货]
            send_goods_event(a) {
                this.express_id = a.id;
                this.send_goods_show = true;
            },
            //发货信息取消
            send_goods_cancel() {
                this.send_goods_show = false;
            },
            //发货信息确定
            send_goods_sure() {
                var that = this,
                    url = '/mall/orders/editOrder.do';
                if (!that.express_name) {
                    that._alert({
                        content: '请输入物流公司'
                    });
                    return false;
                }
                if (!that.express_num) {
                    that._alert({
                        content: '请输入物流单号'
                    });
                    return false;
                }
                this.util.ajax.get(url, {
                    params: {
                        id: that.express_id,
                        express_name: that.express_name,
                        express_num: that.express_num,
                    }
                }).then(e => {
                    if (e.code == 200) {
                        that.send_goods_cancel();
                        that.initData('update');
                    } else if (e.code == 501) {
                        that._alert({
                            content: e.message,
                            yes: function() {
                                that.$router.push({
                                    path: 'onceZhi',
                                    query: {
                                        state: 1
                                    }
                                })
                            }
                        });
                    } else {
                        that._alert({
                            content: e.message
                        });
                    }
                }).catch()
            }
        }
    }
</script>



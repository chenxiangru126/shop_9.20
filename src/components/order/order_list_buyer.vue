<template>
    <div class="order_list_b">
        <div class="order_list-nav">
            <div class="list-nav-b flex-h flex-j-c" @click='nav_open'>
                <p v-if="!state">全 部</p>
                <p v-else-if="state==1">待付款</p>
                <p v-else-if="state==2">待发货</p>
                <p v-else-if="state==3 && type==0">待收货</p>
                <p v-else-if="state==4">待评价</p>
                <p class="t-c flex-v flex-j-c l_t">
                    <span class="span_up" v-if='nav_show'></span>
                    <span class="span_down" v-else></span>
                </p>
                <div class="nav_list_c2" v-if='nav_show'>
                    <p @click="handle_state(0)">全部</p>
                    <p @click="handle_state(1)">待付款</p>
                    <p @click="handle_state(2)">待发货</p>
                    <p @click="handle_state(3)">待收货</p>
                    <!-- <p @click="handle_state(3)">变更中</p> -->
                    <p @click="handle_state(4)">待评价</p>
                </div>
            </div>
            <div class="list-order-lib">
                <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-if="items.length>0">
                    <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                        <div class="order-lib_b" :class="(it.state==7||it.state==8||it.state==9)?'tuihuo-icon':''" v-for="it in items" :key='it.id'>
                            <div class="flex-1 top_1" v-if='it.state==1'>待付款</div>
                            <div class="flex-1 top_1" v-else-if='it.state==2 && it.type==0'>待发货</div>
                            <div class="flex-1 top_1" v-else-if='it.state==2 && it.type==1'>待确认</div>
                            <div class="flex-1 top_1" v-else-if='it.state==3 && it.type==0'>待收货</div>
                            <div class="flex-1 top_1" v-else-if='it.state==3 && it.type==1'>变更中</div>
                            <div class="flex-1 top_1" v-else-if='it.state==4 && it.type==1'>取消出售</div>
                            <div class="flex-1 top_1" v-else-if='it.state==4 && it.type==0'>待评价 </div>
                            <div class="flex-1 top_1" v-else-if='it.state==5 && it.type==0' >已完成</div>
                            <div class="flex-1 top_1" v-else-if='it.state==5 && it.type==1'>查看版权信息</div>
                            <div class="flex-1 top_1" v-else-if='it.state==6'>已取消</div>
                            <div class="flex-1 top_1" v-else-if='it.state==7'>待处理</div>
                            <div class="flex-1 top_1" v-else-if='it.state==8'>待退货 </div>
                            <div class="flex-1 top_1" v-else-if='it.state==9||it.state==13'>已拒绝</div>
                            <div class="flex-1 top_1" v-else-if='it.state==10'>待退款</div>
                            <div class="flex-1 top_1" v-else-if='it.state==11'>退款成功</div>
                            <div class="flex-1 top_1" v-else-if='it.state==12'>重新申请</div>
                            <p class="line_1"></p>
                            <p class="c2 font-1">{{it.shop_name?it.shop_name:'商店名称'}}</p>
                            <div class="order-lib_b_1 flex-h" @click='go_details(it)'>
                                <div><img :src="it.imgUrl" alt=""></div>
                                <div class="c3 flex-v flex-j-c flex-1">
                                    <p class="font-2 ellipsis">{{it.goodsName}}</p>
                                    <p class="font-1 c12" v-if='it.type==1'>¥{{it.money}}</p>
                                    <p class="font-1" v-else>商品价格¥{{it.money}}</p>
                                </div>
                            </div>
                            <p class="line_2"></p>
                            <div class="lib-btn-1" @click='go_pay(it)' v-if='it.state==1'>付款</div>
                            <!-- <div class="lib-btn-1" @click='send_goods(it)' v-else-if='it.state==2'>一键发货</div> -->
                            <div class="lib-btn-1" @click='sure_get_goods(it)' v-else-if='it.state==3 && it.type==0'>确认收货</div>
                            <div class="lib-btn-1" @click='go_evaluate(it)' v-else-if='it.state==4 && it.type==0'>评价</div>
                            <div class="lib-btn-1" @click='cancel_refund(it)' v-else-if='it.state==7'>取消退款</div>
                            <div class="lib-btn-1" @click='send_goods_event(it)' v-else-if='it.state==8'>填写物流单号</div>
                            <div class="lib-btn-1" @click='apply_again(it)' v-else-if='it.state==9'>重新申请</div>

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
                    <div class="layer_title">· 退货信息 ·</div>
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
    .line_1{
        width: 100%;
        height: .066667rem;
        background: rgba(216,216,216,0.19);
        transform: scale(1,0.5);
        margin-top: 0.32rem;
    }
    .line_2{
        width: 100%;
        height: .066667rem;
        background: rgba(216,216,216,0.19);
        transform: scale(1,0.5);
        margin-bottom: 2.5625rem;
    }
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
            }
        },
        created() {
            var that = this;
          
            //    setTimeout(() => {
            if(location.href.indexOf('localhost')>-1){
                that.initData()
            }else{
                  this.userGetinfo();
            }

            //    }, 500);
            if (this.$route.query.show_send_goods) {
                this.send_goods_show = true;
            }
    
        },
        components: {
            noData: no_data
        },
        mounted() {
            var that = this;
        },
        methods: {
            userGetinfo() {
                var _this = this;
                setTimeout(function() {
                    try {
                        let objdata = iosObject.getUserInfo();
                        let jsondata = eval('(' + objdata + ')');
                        window.jsondata = jsondata;
                        if (window.jsondata.token) {
                            _this.initData();
                        } else {
                            _this.userGetinfo();
                        }
                    } catch (e) {
                        _this.userGetinfo();
                    }
                }, 300)
            },
            initData(a) {
                var that = this,
                    url = '/mall/orders/getOrderData.do', //卖家接口
                    _p = {
                        showCount: that.pageSize,
                        currentPage: a == 'update' ? 1 : that.page,
                        userType: 1, //1买家数据
                        state: that.state
                    };
                if (a == 'update') {
                    that.page = 1;
                    that.loading = true;
                    that.null_data = false;
                };
                if (that.null_data & a != 'update') return false;
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
            //选择状态查询
            handle_state(a) {
                this.null_data = false;
                this.page = 1;
                this.state = a == 0 ? '' : a;
                this.initData();
            },
            nav_open() {
                this.nav_show = !this.nav_show;
            },
            go_details(a) {
                this.$router.push({
                    name: 'order_details_buyer',
                    query: {
                        id: a.id,
                        goodsId: a.goodsId
                    }
                })
            },
            // 付款
            go_pay(a) {
                this.$router.push({
                    name: 'order_pay',
                    query: {
                        orderId: a.id,
                        money: a.money
                    }
                })
            },
            //取消退款
            cancel_refund(a) {
                var that = this;
                _confrim({
                    content: '确定要取消退款吗？', //必填
                    yes() { //选填
                        var url = '/mall/orders/cancelReturn.do';
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
            // 评论
            go_evaluate(a) {
                this.$router.push({
                    name: 'order_evaluate',
                    query: {
                        orderId: a.id,
                        goodsId: a.goodsId
                    }
                })
            },
            // 确定收货
            sure_get_goods(a) {
                var that = this;
                console.log('22222222222222222222'+a.id)
                _confrim({
                    content: '请确定收到货后，确认收货。', //必填
                    yes() { //选填
                        var url = '/mall/orders/confirmReceipt.do';
                        that.util.ajax.get(url, {
                            params: {
                                id: a.id,
                            }

                        }).then(e => {
//                            console.log('22222222222222222222'+a.id)
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
            //重新申请退款
            apply_again(a) {
                var that = this,
                    url = '/mall/orders/againReturn.do';
                this.util.ajax.get(url, {
                    params: {
                        id: a.id,
                    }
                }).then(e => {
                    if (e.code == 200) {
                        that.initData('update');
                    }
                }).catch()
            },
    
            //退货信息弹层打开
            send_goods_event(a) {
                this.express_id = a.id;
                this.send_goods_show = true;
            },
            //退货信息取消
            send_goods_cancel() {
                this.send_goods_show = false;
            },
            //退货信息确定
            send_goods_sure() {
                var that = this,
                    url = '/mall/orders/sendReturn.do';
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
                        express: that.express_name,
                        express_num: that.express_num,
                    }
                }).then(e => {
                    if (e.code == 200) {
                        that.send_goods_cancel();
                        that.initData('update');
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



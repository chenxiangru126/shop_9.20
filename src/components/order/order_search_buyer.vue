<template>
    <div class="order-search">
        <div class="header_b">
            <div class="search-top"></div>
            <div class="search_box flex-v flex-j-c">
                <div class="font-1 search_box_1 flex-h">
                    <form action="">
                        <input type="text" class="c2 search_el" @focus="on_focus" v-model.trim='goodsName' placeholder="输入商品名称" @input="searching_get">
                    </form>
                    <p class="font-2 flex-1 t-c c3" @click='cancel_event'>取消</p>
                </div>
            </div>
        </div>
        <div class="order_list_b">
            <div class="order_list-nav">
                <div v-if="status==1" class="list-order-lib list-order-lib-search" :style="status==1?'top:5rem!important':'top:5.5rem!important'">
                    <div class="font-1">
                        <p class="h2 line-h-2 p-l-3 c1 ellipsis" v-for="it in search_word_items" :key="it.goodsName" @click="click_search(it.goodsName)">{{it.goodsName}}</p>
                    </div>
                </div>
                <div class="list-order-lib list-order-lib-search" v-else-if="status==2" :style="status==1?'top:5rem!important':'top:5.5rem!important'">
                    <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-if="return_items.length>0">
                        <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                            <div class="over-h" v-if="status==2">
                                <div class="order-lib_b" :class="(it.state==7||it.state==8||it.state==9)?'tuihuo-icon':''" v-for="it in return_items" :key='it.id'>
                                    <p class="c2 font-1">{{it.shop_name?it.shop_name:'商店名称'}}</p>
                                    <div class="order-lib_b_1 flex-h" @click='go_details(it)'>
                                        <div><img :src="it.imgUrl" alt=""></div>
                                        <div class="c3 flex-v flex-j-c flex-1">
                                            <p class="font-2 ellipsis">{{it.goodsName}}</p>
                                            <p class="font-1 c12" v-if='it.type==1'>版权价格 ¥{{it.money}}</p>
                                            <p class="font-1" v-else>¥{{it.money}}</p>
                                        </div>
                                        <div class="flex-1" v-if='it.state==1'>待付款</div>
                                        <div class="flex-1" v-else-if='it.state==2'>待发货</div>
                                        <div class="flex-1" v-else-if='it.state==3'>待收货</div>
                                        <div class="flex-1" v-else-if='it.state==4'>待评价 </div>
                                        <div class="flex-1" v-else-if='it.state==5'>已完成</div>
                                        <div class="flex-1" v-else-if='it.state==6'>已取消</div>
                                        <div class="flex-1" v-else-if='it.state==7'>待处理</div>
                                        <div class="flex-1" v-else-if='it.state==8'>待退货 </div>
                                        <div class="flex-1" v-else-if='it.state==9||it.state==13'>已拒绝</div>
                                        <div class="flex-1" v-else-if='it.state==10'>待退款</div>
                                        <div class="flex-1" v-else-if='it.state==11'>退款成功</div>
                                        <div class="flex-1" v-else-if='it.state==12'>重新申请</div>
                                    </div>
                                    <div class="lib-btn-1" @click='go_pay(it)' v-if='it.state==1'>付款</div>
                                    <!-- <div class="lib-btn-1" @click='send_goods(it)' v-else-if='it.state==2'>一键发货</div> -->
                                    <div class="lib-btn-1" @click='sure_get_goods(it)' v-else-if='it.state==3'>确认收货</div>
                                    <div class="lib-btn-1" @click='go_evaluate(it)' v-else-if='it.state==4'>评价</div>
                                    <div class="lib-btn-1" @click='cancel_refund(it)' v-else-if='it.state==7'>取消退款</div>
                                    <div class="lib-btn-1" @click='send_goods_event(it)' v-else-if='it.state==8'>填写物流单号</div>
                                    <div class="lib-btn-1" @click='apply_again(it)' v-else-if='it.state==9'>重新申请</div>
                                </div>
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
                </div>
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
    
    </div>
</template>

<style lang="less">
    @import 'order_list.less';
</style>

<script>
    import {
        InfiniteScroll
    } from 'mint-ui';
    import Vue from 'vue';
    Vue.use(InfiniteScroll);
    import no_data from '../teshu/noData.vue';
    export default {
        data() {
            return {
                share_log: false,
                nav_show: false,
                time_el: null,
                send_goods_show: false,
                search_word_items: [],
                return_items: [],
                status: 1, //1 search中 2 结果
                goodsName: null, //商品查询
                page: 1,
                pageSize: 10,
                loading: false,
                wrapperHeight: 0,
                null_data: false,
                express_id: null, //订单id
                express_num: null, //物流单号
                express_name: null, //物流公司名称
            }
        },
        mounted() {
            var that = this;
            document.onkeydown = function(e) {
                var ev = document.all ? window.event : e;
                if (ev.keyCode == 13) {
                    var input = document.querySelector(".search_el");
                    input.blur();
                    that.page = 1;
                    that.null_data = false;
                    that.returnData();
                    return false;
                }
            }
        },
        components: {
            noData: no_data
        },
        methods: {
            returnData() {
                var that = this,
                    url = '/mall/orders/getOrderData.do', //卖家接口
                    _p = {
                        showCount: that.pageSize,
                        currentPage: that.page,
                        userType: 1, //1买家数据
                        goodsName: that.goodsName,
                    };
                that.status = 2;
                if (!that.goodsName) return false;
                if (that.null_data) return false;
                this.util.ajax.post(url, _p).then(e => {
                    if (that.page == 1) {
                        that.return_items = [];
                        that.return_items = e.data.list;
                    } else {
                        that.return_items = that.return_items.concat(e.data.list);
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
                this.returnData();
    
            },
            click_search(a) {
                this.goodsName = a;
                this.returnData();
            },
            nav_open() {
                this.nav_show = !this.nav_show;
            },
            cancel_event() {
                history.back();
            },
            on_focus() {
                this.status = 1;
            },
            searching_get() {
                var that = this,
                    url = '/mall/orders/buyGoodList.do',
                    _p = {
                        goodsName: that.goodsName,
                    };
                that.search_word_items = [];
                if (!that.goodsName) return false;
                clearTimeout(that.time_el);
                that.time_el = setTimeout(() => {
                    that.util.ajax.post(url, _p).then(e => {
                        if (e.code == 200) {
                            that.search_word_items = e.data;
                        }
                    }).catch();
                }, 500);
    
            },
            go_details(a) {
                this.$router.replace({
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
                                that.returnData();
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
                        id: a.id,
                        goodsId: a.goodsId
                    }
                })
            },
            // 确定收货
            sure_get_goods(a) {
                var that = this;
                _confrim({
                    content: '请确定收到货后，确认收货。', //必填
                    yes() { //选填
                        var url = '/mall/orders/confirmReceipt.do';
                        that.util.ajax.get(url, {
                            params: {
                                id: a.id,
                            }
                        }).then(e => {
                            if (e.code == 200) {
                                that.initData('update');
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
            //退款
            refund_money() {
    
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



<template>
    <div class="order-search">
        <div class="header_b">
            <div class="search-top"></div>
            <div class="search_box flex-v flex-j-c">
                <div class="font-1 search_box_1 flex-h">
                    <form action="">
                        <input type="text" class="search_el c2" @focus="on_focus" v-model.trim='order_num' placeholder="输入订单号" @input="searching_get">
                    </form>
                    <p class="font-2 flex-1 t-c c3" @click='cancel_event'>取消</p>
                </div>
            </div>
        </div>
        <div class="order_list_b">
            <div class="order_list-nav">
                <div v-if="status==1" class="list-order-lib list-order-lib-search" :style="status==1?'top:5rem!important':'top:5.5rem!important'">
                    <div class="font-1" v-if="status==1">
                        <p class="h2 line-h-2 p-l-3 c1 ellipsis" v-for="it in search_word_items" :key="it.order_num" @click="click_search(it.order_num)">
                            {{it.order_num}}</p>
                    </div>
                </div>
                <div class="list-order-lib list-order-lib-search" v-if="status==2" :style="status==1?'top:5rem!important':'top:5.5rem!important'">
                    <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-if="return_items.length>0">
                        <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                            <div class="over-h">
                                <div class="order-lib_b" :class="(it.state==7||it.state==8||it.state==9)?'tuihuo-icon':''" v-for="it in return_items" :key='it.id'>
                                    <div class="flex-h">
                                        <div class="c2 font-1 flex-1 ellipsis">订单号 {{it.order_num}}</div>
                                        <div class="c2 font-1 flex-1 ellipsis t-r p-l">{{it.createTime}}</div>
                                    </div>
    
                                    <div class="order-lib_b_1 flex-h" @click='go_details(it)'>
                                        <div><img :src="it.imgUrl" alt=""></div>
                                        <div class="c3 flex-v flex-j-c flex-1">
                                            <p class="font-2 ellipsis">{{it.goodsName}}</p>
                                            <p class="font-1 c12" v-if='it.type==1'>版权价格 ¥{{it.money}}</p>
                                            <p class="font-1" v-else>¥{{it.money}}</p>
                                        </div>
                                        <div class="flex-1" v-if='it.state==1'>待付款</div>
                                        <div class="flex-1" v-else-if='it.state==2'>待发货</div>
                                        <div class="flex-1" v-else-if='it.state==3'>已发货</div>
                                        <div class="flex-1" v-else-if='it.state==4'>待评价 </div>
                                        <div class="flex-1" v-else-if='it.state==5'>已完成</div>
                                        <div class="flex-1" v-else-if='it.state==6'>已取消</div>
                                        <div class="flex-1" v-else-if='it.state==7'>待审核</div>
                                        <div class="flex-1" v-else-if='it.state==8'>待退货 </div>
                                        <div class="flex-1" v-else-if='it.state==9||it.state==13'>已拒绝</div>
                                        <div class="flex-1" v-else-if='it.state==10'>待收货</div>
                                        <div class="flex-1" v-else-if='it.state==11'>退款成功</div>
                                        <div class="flex-1" v-else-if='it.state==12'>重新申请</div>
                                    </div>
                                    <div class="lib-btn-1" @click='send_goods_event(it)' v-if='it.state==2'>一键发货</div>
                                    <div class="lib-btn-1" @click='go_details(it)' v-else-if='it.state==7'>去审核</div>
                                    <div class="lib-btn-1" @click='send_goods(it)' v-else-if='it.state==8'>填写物流单号</div>
                                    <div class="lib-btn-1" @click='go_audit(it)' v-else-if='it.state==9'>重新申请</div>
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
                search_word_items: [],
                return_items: [],
                status: 1, //1 search中 2 结果
                order_num: null, //订单号查询
                loading: false,
                wrapperHeight: 0,
                null_data: false,
                page: 1,
                pageSize: 10,
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
                        userType: 2, //2卖家数据
                        order_num: that.order_num,
                    };
                that.status = 2;
                if (!that.order_num) return false;
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
                this.order_num = a;
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
                    url = '/mall/orders/buyOrderNumList.do',
                    _p = {
                        order_num: that.order_num,
                    };
                that.search_word_items = [];
                if (!that.order_num) return false;
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
                    name: 'order_details_seller',
                    query: {
                        id: a.id,
                        goodsId: a.goodsId
                    }
                })
            },
            // 去审核
            go_audit() {
    
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
                        content: '请输入物流单号'
                    });
                    return false;
                }
                if (!that.express_num) {
                    that._alert({
                        content: '请输入物流公司'
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



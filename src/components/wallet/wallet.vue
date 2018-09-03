<template>
    <div class="wallet_b flex-v">
        <div class="wallet-bn1">
            <p class="c1 t-c font-1">余额（¥）</p>
            <p class="c1 t-c font-8">{{details.money||0}}</p>
            <p class="btn-tx" @click="apply_tx">提现</p>
        </div>
        <div class="wallet-bn2 flex-h flex-a-c p-l_5 p-r">
            <p class="font-1 c1 flex-2">保证金（¥）：{{details.caution_money||0}}</p>
            <p class="btns-1" @click="refund_bzj" v-if="details.isPay==2">退保证金</p>
            <p class="btns-1" @click="apply_bzj" v-else>缴保证金</p>
        </div>
        <div class="wallet-nav flex-h flex-a-c p-l p-r">
            <p @click="handle_bill(1)" :class="type==1?'wallet-nav-hot':''">收款账单</p>
            <p @click="handle_bill(2)" :class="type==2?'wallet-nav-hot':''">退款账单</p>
            <p @click="handle_bill(3)" :class="type==3?'wallet-nav-hot':''">平台账单</p>
        </div>
        <div class="nav-cont flex-1 scroll">
            <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-if="bill_items.length>0">
                <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                    <div class="nav-cont-lib" v-for="it in bill_items" :key="it.id" v-if="type==1" @click="receivablesDetail(it)">
                        <div class="w flex-h">
                            <p class="font-0 c2 flex-1">收款单号 {{it.billNo}}</p>
                            <p class="font-0 c2 flex-1 t-r">{{it.effectiveTime}}</p>
                        </div>
                        <div class="w flex-h line-h-2">
                            <p class="c1 font-1 flex-">收款金额 ¥{{it.money}}</p>
                            <p class="font-1 c8 flex-1 t-r" v-if="it.status==2">待收款</p>
                            <p class="font-1 c8 flex-1 t-r" v-else-if="it.status==1">已收款</p>
                        </div>
                    </div>
                    <div class="nav-cont-lib" v-for="it in bill_items" :key="it.id" v-if="type==2" @click="refundDetail(it)">
                        <div class="w flex-h">
                            <p class="font-0 c2 flex-1">退款单号 {{it.billNo}}</p>
                            <p class="font-0 c2 flex-1 t-r">{{it.effectiveTime}}</p>
                        </div>
                        <div class="w flex-h line-h-2">
                            <p class="c1 font-1 flex-">退款金额 ¥{{it.money}}</p>
                            <p class="font-1 c8 flex-1 t-r" v-if="it.status==1">退款成功</p>
                            <p class="font-1 c8 flex-1 t-r" v-else-if="it.status==2">退款中</p>
                            <p class="font-1 c8 flex-1 t-r" v-else-if="it.status==3">退款失败</p>
                        </div>
                    </div>
                    <div class="nav-cont-lib" v-for="it in bill_items" :key="it.id" v-if="type==3" @click="platformDetail(it)">
                        <div class="w flex-h">
                            <p class="font-0 c2 flex-1">订单单号 {{it.billNo}}</p>
                            <p class="font-0 c2 flex-1 t-r">{{it.effectiveTime}}</p>
                        </div>
                        <div class="w flex-h line-h-2">
                            <p class="c1 font-1 flex-">平台金额 ¥{{it.money}}</p>
                            <p class="font-1 c8 flex-1 t-r">店铺评分{{it.score}}星</p>
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
        <router-view class="child_view"></router-view>
    </div>
</template>

<style lang="less">
    @import 'wallet.less';
</style>

<script>
    import no_data from '../teshu/noData.vue';
    export default {
        data() {
            return {
                details: {},
                bill_items: {}, //账单列表
                type: 1, //1:收款账单 2:退款账单 3:平台账单
                page: 1,
                pageSize: 20,
                loading: true,
                wrapperHeight: 0,
                null_data: false,
            }
        },
        created() {
            setTimeout(() => {
                this.initData();
            }, 1000)
            setTimeout(() => {
                this.bill_list();
            }, 1000)
        },
        mounted() {
            var that = this;
        },
        components: {
            noData: no_data
        },
        methods: {
            initData() {
                var that = this,
                    url = '/mall/account/myWalletIndex.do'
                this.util.ajax.get(url).then(e => {
                    that.details = e.data || {};
                }).catch()
            },
            bill_list() {
                var that = this,
                    url = '',
                    _p = {
                        showCount: that.pageSize,
                        currentPage: that.page
                    };
                if (this.type == 1) {
                    url = '/mall/bill/receivablesList.do';
                } else if (this.type == 2) {
                    url = '/mall/bill/refundList.do';
                } else if (this.type == 3) {
                    url = '/mall/bill/platformList.do';
                }
                if (that.null_data) return false;
                this.util.ajax.post(url, _p).then(e => {
                    if (that.page == 1) {
                        that.bill_items = [];
                        that.bill_items = e.data.list;
                    } else {
                        that.bill_items = that.bill_items.concat(e.data.list);
                    }
                    setTimeout(() => {
                        that.loading = false;
                    }, 200);
                    if (e.data.list.length < 20) {
                        that.null_data = true;
                        return false;
                    }
                }).catch()
            },
            loadMore() {
                this.loading = true;
                this.page++;
                this.bill_list();
            },
            handle_bill(b) {
                this.bill_items = [];
                this.type = b;
                this.null_data = false;
                this.page = 1;
                this.bill_list();
            },
            apply_tx() {
                this.$router.push({
                    name: 'tx_apply',
                    query: {
                        money: this.details.money
                    }
                })
            },
            //退保证金
            refund_bzj() {
                // this._alert({
                //     content:'您还有未完成的订单，暂不能退保证金',
                //     sureTxt:'知道了'
                // })
                var that = this;
                that._confrim({
                    title: '退保证金',
                    content: '退保证金后，您的在售商品将自动下架，店铺将处于关闭状态！',
                    sureTxt: '再考虑考虑',
                    cancelTxt: '退保证金',
                    cancel: () => {
                        var url = '/mall/takecash/returnCautionMoney';
                        that.util.ajax.post(url, {}).then(e => {
                            if (e.code == 200) {
                                that.Toast('操作成功');
                                that.initData();
                            }
                        }).catch()
                    }
                })
            },
            apply_bzj() {
                this.checkBzj();
    
            },
            //收款明细
            receivablesDetail(a) {
                this.$router.push({
                    name: 'bill_details',
                    query: {
                        id: a.id,
                        type: 1
                    }
                })
            },
            //退款账单明细
            refundDetail(a) {
                this.$router.push({
                    name: 'bill_details',
                    query: {
                        id: a.id,
                        type: 2
                    }
                })
            },
            //平台账单明细
            platformDetail(a) {
                this.$router.push({
                    name: 'bill_details2',
                    query: {
                        id: a.id
                    }
                })
            },
            //交保证金之前的验证接口
            checkBzj() {
                var that = this,
                    url = '/mall/shopauthentication/checkBzj.do'
                this.util.ajax.get(url).then(e => {
                    if (e.code == 200) {
                        that.$router.push({
                            path: 'onceZhi',
                            query: {
                                state: 1
                            }
                        });
                    }
                }).catch()
            }
    
        }
    }
</script>



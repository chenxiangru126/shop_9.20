<template>
    <div class="tx_list_b">
        <div class="tx_list-nav">
            <div class="list-nav-b flex-h flex-j-c" @click='nav_open'>
                <p v-if="billType==47">保证金明细</p>
                <p v-else-if="billType==6">提现明细</p>
                <p class="t-c flex-v flex-j-c l_t">
                    <span class="span_up" v-if='nav_show'></span>
                    <span class="span_down" v-else></span>
                </p>
                <div class="nav_list_c nav_list_c2" v-if='nav_show'>
                    <p @click="handle_nav(47)">保证金明细</p>
                    <p @click="handle_nav(6)">提现明细</p>
                </div>
            </div>
            <div class="nav-cont m-t">
                <div class="list-order-lib">
                    <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-if="items.length>0">
                        <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                            <div class="nav-cont-lib" v-for="it in items" :key="it.id">
                                <div class="w flex-h">
                                    <p class="font-0 c2 flex-1" v-if="billType==6">提现 {{it.billNo}}</p>
                                    <p class="font-0 c2 flex-1" v-if="billType==4||billType==7">
                                        <span v-if="it.billType==4">缴保证金 {{it.billNo}}</span>
                                        <span v-else-if="it.billType==7">退保证金 {{it.billNo}}</span>
                                     </p>
                                    <p class="font-0 c2 flex-1 t-r">{{it.createTime}}</p>
                                </div>
                                <div class="w flex-h line-h-2">
                                    <p class="c1 font-1 flex-">金额 ¥{{it.money}}</p>
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
    @import 'tx_list.less';
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
                billType: 47, // 47保证金明细 6提现明细
                nav_show: false,
                items: [],
                loading: false,
                wrapperHeight: 0,
                null_data: false,
                page: 1,
                pageSize: 20,
            }
        },
        mounted() {
            var that = this;
            this.initData();
        },
        created() {
    
        },
        components: {
            noData: no_data
        },
        methods: {
            initData() {
                var that = this,
                    url = '/mall/bill/tixianDetail.do',
                    _p = {
                        showCount: that.pageSize,
                        currentPage: that.page,
                        billType: that.billType,
                    };
                if (that.null_data) return false;
                this.util.ajax.post(url, _p).then(e => {
                    if (that.page == 1) {
                        that.items=[];
                        that.items = e.data.list;
                    } else {
                        that.items = that.items.concat(e.data.list);
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
                this.initData();
    
            },
            handle_nav(a) {
                this.billType = a;
                this.loading = true;
                this.null_data = false;
                this.page = 1;
                 this.items=[];
                this.initData();
            },
            nav_open() {
                this.nav_show = !this.nav_show;
            },
            go_details() {
                this.$router.push({
                    name: 'order_details'
                })
            }
        }
    }
</script>



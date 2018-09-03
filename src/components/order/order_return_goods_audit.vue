<template>
    <div class="order_return_goods_audit">
        <div class="p-l-0_5">
            <p class="c1 font-3 h3 line-h-3"> 退货原因：</p>
            <p class="c2 font-1 "> {{details.reason}}</p>
        </div>
        <div class="audit-img-box flex-h">
            <div class="audit-img-1 flex-v flex-j-c flex-a-c flex-1" v-for="it in details.list" :key="it">
                <img :src="it" alt="">
            </div>
    
            <!-- <img src="../../static/images/1.png" alt=""> -->
        </div>
        <div class="audit-btn-b flex-h flex-j-c">
            <p class="b11" @click="audit_doing(9)">拒绝退货</p>
            <p class="b12 m-l-2" @click="audit_doing(8)">审核通过</p>
        </div>
    </div>
</template>

<style lang="less">
    .order_return_goods_audit {
        width: 100%;
        height: auto;
        padding: 2.666667rem .533333rem;
        .audit-img-box {
            width: 100%;
            overflow: hidden;
            margin-top: 2.8rem;
            .audit-img-1 {
                // width: 33%;
                overflow: hidden;
                .audit-img-1-zwt {
                    margin-bottom: 100%;
                }
                &:nth-child(n+2)>img {
                    margin-left: 0.5rem;
                }
                img {
                    width: 100%;
                    display: block;
                    float: left;
                }
            }
        }
        .audit-btn-b {
            margin: 4rem 0;
            p {
                width: 7.4rem;
                height: 2.4rem;
                line-height: 2.4rem;
                color: #E7E7E7;
                border-radius: 1.8rem;
                text-align: center;
            }
        }
    }
</style>

<script>
    export default {
        data() {
            return {
                share_log: false,
                nav_show: false,
                details: {}
            }
        },
        mounted() {
            var that = this;
        },
        created() {
            this.initData();
        },
        methods: {
            initData() {
                var that = this,
                    url = '/mall/orders/getReturnDetail.do',
                    _p = {
                        id: that.$route.query.id,
                    };
                this.util.ajax.post(url, _p).then(e => {
                    that.details = e.data;
                }).catch()
            },
            nav_open() {
                this.nav_show = !this.nav_show;
            },
            audit_doing(a) {
                var that = this,
                    url = '/mall/orders/verifyReturn.do',
                    _p = {
                        id: that.$route.query.id,
                        state: a,
                    };
                that._confrim({
                    content: a==8?'确定要审核通过吗':'确定要拒绝退货吗', //必填
                    yes() { //选填
                        that.util.ajax.post(url, _p).then(e => {
                            if (e.code == 200) {
                                that.Toast('操作成功');
                                setTimeout(() => {
                                    history.back();
                                }, 1000);
                            }
                        }).catch()
                    }
                })
    
            }
        }
    }
</script>



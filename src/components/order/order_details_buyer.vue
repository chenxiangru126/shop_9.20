<template>
    <div class="order_details_b">
        <div class="fixed_right c6" v-if="state==1 || state==2 && orderDetail.orderType==0 " @click='cancel_order'>取消订单</div>
        <div class="order_details-nav" v-if="state">
            <div class="list-order-details-lib">
                <div class="flex-h flex-j-c" >
                    <img src="../../static/images/order-shouhuo.png" alt="" class="order-dog">
                </div>
                <div class="flex-h flex-j-c" v-if="state==8">
                    <img src="../../static/images/order-tuihuo.png" alt="" class="order-dog">
                </div>
                <div class="flex-h flex-j-c" v-if="state==7||state==10||state==11">
                    <img src="../../static/images/order-shouhuo.png" alt="" class="order-dog">
                </div>
                <div v-if="state!=8 && state!=5 && state!=7 && state!=10 && state!=11">
                    <div v-show="type==0 ? true:false">
                    <div class="title-l">收货信息</div>
                    <div class="order-details-lib_b order-p-t-2 copy_event" :data-clipboard-text="seller.express_num" onclick=''>
                        <div class="flex-1 flex-h">
                            <p class="flex-1">收货地址：</p>
                            <p class="c4 flex-3">{{buyer.address}}</p>
                        </div>
                        <div class="flex-1 flex-h">
                            <p class="flex-1">详细地址：</p>
                            <p class="c4 flex-3">{{buyer.address_detail}}</p>
                        </div>
                        <div class="flex-1 flex-h">
                            <p class="flex-1">收货人：</p>
                            <p class="c4 flex-3">{{buyer.name}}</p>
                        </div>
                        <div class="flex-1 flex-h">
                            <p class="flex-1">联系方式：</p>
                            <p class="c4 flex-3">{{buyer.phone}}</p>
                        </div>
                        <div v-if="state>2">
                            <div class="flex-1 flex-h">
                                <p class="flex-1">快递公司：</p>
                                <p class="c4 flex-3">{{seller.express_name}}</p>
                            </div>
                            <div class="flex-1 flex-h">
                                <p class="flex-1">物流单号：</p>
                                <p class="c4 flex-3">{{seller.express_num}}</p>
                            </div>
                            <div class="copy-icon">复制单号</div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="order-details-lib_b" style="margin-top:0.8rem" @click="go_goods_details">
                    <div class="order-details-lib_b_1 flex-h">
                        <div><img :src="goodsDetail.showUrl" alt=""></div>
                        <div class="c3 flex-v flex-j-c flex-1">
                            <p class="font-3 ellipsis">{{goodsDetail.goodsName}}</p>
                            <p>{{goodsDetail.shop_name}}</p>
                        </div>
                        
                        <div class="flex-1 flex-v flex-j-c flex-a-e" v-if="state==1 && orderDetail.orderType==1">
                            <div class="lib-btn-2" @click='cancel_order'>取消订单</div>
                            <!-- <div class="lib-btn-2" @click='go_pay'>付款</div> -->
                        </div>
                        <div class="flex-1 flex-v flex-j-c flex-a-e" v-else-if="state==3 && orderDetail.orderType==0">
                            <div class="lib-btn-2 b2" @click="refund_money">退款</div>
                            <div class="lib-btn-2 m-t" @click="sure_get_goods">确定收货</div>
                        </div>
                        <div class="flex-1 flex-v flex-j-c flex-a-e" v-if="state==4 && orderDetail.orderType==0">
                            <div class="lib-btn-2" @click="go_evaluate">评价</div>
                        </div>
                        <div class="flex-1 flex-v flex-j-c flex-a-e" v-if="state==5">
                            <div class="lib-btn-3" v-if='state==5 && orderDetail.orderType==0'>已完成</div>
                            <div class="lib-btn-3" v-else-if='state==5 && orderDetail.orderType==1' @click="see_copy_btn">查看版权信息</div>
                        </div>
                        <div class="flex-1 flex-v flex-j-c flex-a-e" v-if="state==8">
                            <div class="lib-btn-2" @click="send_goods_event">填写物流单号</div>
                        </div>
                        <div class="flex-1 flex-v flex-j-c flex-a-e" v-if="state==9">
                            <div class="lib-btn-2 b2" @click="apply_again">重新申请退款</div>
                            <div class="lib-btn-2 m-t" @click="sure_get_goods">确定收货</div>
                        </div>
    
                    </div>
                    <div class="cancel_red" v-if='state==6'>已取消</div>
                    <p class="line_1"></p>
                    <!-- 0是普通，1是版权 -->
                    <div v-if='orderDetail.orderType==0'>
                        <div class="words-1 flex-h c5">
                            <p class="flex-1 flex-h"> 商品规格 <span class="c4 p-l">{{goodsDetail.format}}</span></p>
                            <p class="flex-1 flex-h"> 商品数量 <span class="c4 p-l">{{goodsDetail.count}}个</span></p>
                        </div>
                        <div class="words-2 flex-h c5">
                            <p class="flex-1 flex-h"> 商品单价 <span class="c4 p-l">¥{{goodsDetail.price}}</span></p>
                            <p class="flex-1 flex-h"> 商品总价 <span class="c4 p-l">¥{{orderDetail.money}}</span></p>
                        </div>
                    </div>
                    <div v-else>
                        <div class="words-2 flex-h">
                            <p class="flex-1 flex-h c12"> 版权价格 <span class="p-l">¥{{goodsDetail.copyright_price}}</span></p>
                        </div>
                    </div>
                </div>
                <div v-if="state==8||state==7||state==10||state==11">
                    <div class="title-l">退单信息</div>
                    <div class="order-details-lib_b order-p-t-2">
                        <p class="flex-1 flex-h"> 退单单号： <span class="c4 ">{{returnInfo.order_num}}</span></p>
                        <p class="flex-1 flex-h"> 退单状态：
                            <span class="c4 " v-if="state==7">待处理</span>
                            <span class="c4 " v-if="state==8">待退货</span>
                            <span class="c4 " v-if="state==10">待退款</span>
                            <span class="c4 " v-if="state==11">退款成功</span>
    
                        </p>
                        <p class="flex-1 flex-h"> 退单时间： <span class="c4 ">{{returnInfo.create_time}}</span></p>
                        <p class="flex-1 flex-h"> 退单原因： <span class="c4 ">{{returnInfo.return_reason}}</span></p>
                        <div class="flex-1 flex-h show-imgs">
                            <p class="w4"></p>
                            <img :src="i" @click='open_img(i)' alt="" v-for="i in returnInfo.urls" :key='i'>
                        </div>
                    </div>
                </div>
                <div v-if="state==10||state==11">
                    <div class="title-l">买家信息</div>
                    <div class="order-details-lib_b order-p-t-2 copy_event" :data-clipboard-text="seller.express_num" onclick=''>
                        <div class="flex-1 flex-h">
                            <p class="flex-1">收货地址：</p>
                            <p class="c4 flex-3">{{buyer.address+' '+buyer.address_detail}}</p>
                        </div>
                        <div class="flex-1 flex-h">
                            <p class="flex-1">收件人：</p>
                            <p class="c4 flex-3">{{buyer.name}}</p>
                        </div>
                        <div class="flex-1 flex-h">
                            <p class="flex-1">联系方式：</p>
                            <p class="c4 flex-3">{{buyer.phone}}</p>
                        </div>
                        <div class="flex-1 flex-h">
                            <p class="flex-1">快递公司：</p>
                            <p class="c4 flex-3">{{seller.express_name}}</p>
                        </div>
                        <div class="flex-1 flex-h">
                            <p class="flex-1">物流单号：</p>
                            <p class="c4 flex-3">{{seller.express_num}}</p>
                        </div>
                        <div class="copy-icon">复制单号</div>
                    </div>
                </div>
                <div v-if="state==8||state==7">
                    <div class="title-l">卖家信息</div>
                    <div class="order-details-lib_b order-p-t-2">
                        <div class="flex-1 flex-h">
                            <p class="flex-1">收货地址：</p>
                            <p class="c4 flex-3">{{seller.address}}</p>
                        </div>
                        <div class="flex-1 flex-h">
                            <p class="flex-1">详细地址：</p>
                            <p class="c4 flex-3">{{seller.address_detail}}</p>
                        </div>
                        <div class="flex-1 flex-h">
                            <p class="flex-1">收货人：</p>
                            <p class="c4 flex-3">{{seller.name}}</p>
                        </div>
                        <div class="flex-1 flex-h">
                            <p class="flex-1">联系方式：</p>
                            <p class="c4 flex-3">{{seller.phone}}</p>
                        </div>
                        <!-- <div class="flex-1 flex-h">
                                                                                                <p class="flex-1">退单状态：</p>
                                                                                                <p class="c4 flex-3">待退货</p>
                                                                                            </div>
                                                                                            <div class="flex-1 flex-h">
                                                                                                <p class="flex-1">退单时间：</p>
                                                                                                <p class="c4 flex-3">商品与描述不符合</p>
                                                                                            </div> -->
                    </div>
                </div>
                <div class="title-l">订单信息</div>
                <div class="order-details-lib_b order-p-t-2">
                    <p class="flex-1 flex-h"> 订 单 号： <span class="c4 ">{{orderDetail.order_num}}</span></p>
                    <p class="flex-1 flex-h"> 订单状态：
                        <span class="c4 " v-if='state==1'>待付款</span>
                        <span class="c4 " v-else-if='state==2 && orderDetail.orderType==0'>待发货</span>
                        <span class="c4 " v-else-if='state==2 && orderDetail.orderType==1'>待确认</span>
                        <span class="c4 " v-else-if='state==3 && orderDetail.orderType==0'>待收货</span>
                        <span class="c4 " v-else-if='state==3 && orderDetail.orderType==1'>变更中</span>
                        <span class="c4 " v-else-if='state==4 && orderDetail.orderType==0'>待评价</span>
                        <span class="c4 " v-else-if='state==4 && orderDetail.orderType==1'>取消出售</span>
                        <span class="c4 " v-else-if='state==5 && orderDetail.orderType==0'>已完成</span>
                        <span class="c4"  v-else-if='state==5 && orderDetail.orderType==1'>版权信息变更成功</span>
                        <span class="c4 " v-else-if='state==6'>已取消</span>
                        <span class="c4 " v-else-if='state==7'>待处理</span>
                        <span class="c4 " v-else-if='state==8'>待退货</span>
                        <span class="c4 " v-else-if='state==9||state==13'>已拒绝</span>
                        <span class="c4 " v-else-if='state==10'>待退款</span>
                        <span class="c4 " v-else-if='state==11'>退款成功</span>
                        <span class="c4 " v-else-if='state==12'>重新申请</span>
                    </p>
                    <p class="flex-1 flex-h"> 下单时间 ：<span class="c4 ">{{orderDetail.createTime}}</span></p>
                    <div v-if='state&&state!=6'>
                        <p class="line_2" ></p>
                        <p class="flex-1 flex-h" > 支付方式： <span class="c4 ">{{orderDetail.payWay}}</span></p>
                        <p class="flex-1 flex-h"> 支付时间： <span class="c4 ">{{orderDetail.payTime}}</span></p>
                        <p class="flex-1 flex-h"> 订单金额： <span class="c4 ">¥{{orderDetail.money}}</span></p>
                    </div>
                    <!-- <div v-if="state && state!=6 && state!=2 || state!=1">
                        <p class="flex-1 flex-h"> 订单金额： <span class="c4 ">¥{{orderDetail.money}}</span></p>
                    </div> -->
    
                </div>
    
    
                <div class="title-l">备注</div>
                <div class="order-details-lib_b order-p-t-1">
                    <p class="flex-1 flex-h"> {{details.remark}}</p>
                </div>
                <div class="h5"></div>
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
    @import 'order_details.less';
    .cancel_red{
        margin-top: .933333rem;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #D1324E;
        letter-spacing: 0.15px;
        text-align: justify;
    }
</style>

<script>
    // 1.待付款==待付款【买家】
    // 2.待发货 ==待发货【买家】
    // 3.待收货 ==待收货【买家】
    // 4.待评价==待评价 【买家】
    // 5.评价完成==已完成【买家】
    // 6.取消订单==已取消【买家】
    // 7.申请退货==待处理【买家】
    // 8.退货待退货（同意退货）==退货-待退货【买家】
    // 9.已拒绝（拒绝退货）==退货-已拒绝【买家】
    // 10.退货待退款==退货-待退款【买家】
    // 11.退货完成==退货-退款成功【买家】
    // 12.退货完成==重新申请退货【买家】
    // 13.退货完成==拒绝重新申请退款【买家】
    import ClipboardJS from '../../libs/clipboard';
    export default {
        data() {
            return {
                share_log: false,
                nav_show: false,
                send_goods_show: false,
                buyer: {}, //买家信息
                goodsDetail: {}, //商品信息
                orderDetail: {}, //订单信息
                returnInfo: {}, //退单信息
                seller: {}, //卖家信息
                state: null, //订单状态
                details: {},
                express_id: null, //订单id
                express_num: null, //物流单号
                express_name: null, //物流公司名称
                copyData: 'copy data',
                number:null,
                type:'',//0是普通商品 ，1是版权商品
            }
        },
        created() {
            if (this.$route.query.show_send_goods) {
                this.send_goods_show = true;
            }
            this.initData();
        },
        mounted() {
            var that = this;
            try {
                var clipboard = new ClipboardJS('.copy_event');
                clipboard.on('success', function(e) {
                    that.Toast("复制成功！");
                });
                clipboard.on('error', function(e) {
//                    console.log(e);
                });
            } catch (e) {
                alert(e);
            }
        },
        methods: {
            initData() {
                var that = this,
                    url = '/mall/orders/getOrderDetail.do',
                    _p = {
                        id: that.$route.query.id,
                    };
                this.util.ajax.post(url, _p).then(e => {
                    that.details = e.data || {};
                    that.buyer = e.data.buyer || {};
                    that.goodsDetail = e.data.goodsDetail || {};
                    that.orderDetail = e.data.orderDetail || {};
                    that.returnInfo = e.data.returnInfo || {};
                    that.seller = e.data.seller || {};
                    that.state = e.data.orderDetail.state;
                    that.number = e.data.goodsDetail.copyright_num
//                    console.log("0000000"+that.$route.query.id,)
                }).catch()

            },

            // 付款
            go_pay() {
                this.$router.push({
                    name: 'order_pay',
                    query: {
                        orderId: this.details.orderId,
                        money: this.orderDetail.money,
                    }
                })
                event.stopPropagation();
            },
            // 确定收货
            sure_get_goods() {
                var that = this,
                    url = '/mall/orders/confirmReceipt.do'

                that._confrim({
                    content: '请确定收到货后，确认收货。', //必填
                    yes() { //选填
                        that.util.ajax.get(url, {
                            params: {
                                id: that.details.orderId
                            }
                            
                        }).then(e => {

                            if (e.code == 200) {
                                that.initData('updata');
                            } else {
                                that._alert({
                                    content: e.message
                                });
                            }
                        }).catch()
                    },
                    no() {}
                })
                event.stopPropagation();
            },




            //查看版权详情
            see_copy_btn(){;
                var that = this;
                let number  = that.number
                let  block_cert_numbere=that.number
                that.$router.push({
                    name: 'zheng_detail',
                    query: {
                        number:that.number,
                        block_cert_numbere:that.number
                    }
                })

                event.stopPropagation();
//                debugger;
            },






            // 评论
            go_evaluate(a) {
                this.$router.push({
                    name: 'order_evaluate',
                    query: {
                        goodsId: this.goodsDetail.id,
                        orderId: this.details.orderId,
                    }
                })
                event.stopPropagation();
            },
            //重新申请退款
            apply_again() {
                var that = this,
                    url = '/mall/orders/againReturn.do';
                this.util.ajax.get(url, {
                    params: {
                        id: that.$route.query.id,
                    }
                }).then(e => {
                    if (e.code == 200) {
                        that.initData();
                    } else {
                        that._alert({
                            content: e.message
                        });
                    }
                }).catch()
            },
            //退款
            refund_money() {
                var that = this;
                that.$router.push({
                    name: 'order_refund',
                    query: {
                        goodsId: that.goodsDetail.id,
                        orderId: that.details.orderId,
                        money: that.goodsDetail.money,
                    }
                })
                event.stopPropagation();
            },
    
            //退货信息弹层打开
            send_goods_event(a) {
                this.send_goods_show = true;
                event.stopPropagation();
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
                        that.initData();
                    } else {
                        that._alert({
                            content: e.message
                        });
                    }
                }).catch();
                event.stopPropagation();
            },
            go_goods_details() {
                
                var that = this;
                this.$router.push({
                    path: 'goods-details-gwc',
                    query: {
                        id: that.goodsDetail.id
                    }
                })
            },
            //取消订单
            cancel_order() {
                var that = this,
                    url = '/mall/orders/cancelOrder.do',
                    _p = {
                        id: that.details.orderId,
                    };
                that._confrim({
                    content: '确定要取消订单吗', //必填
                    yes() { //选填
                        that.util.ajax.post(url, _p).then(e => {
                            if (e.code == 200) {
                                that.Toast('操作成功');
                                that.initData();
                            }
                        }).catch()
                    }
                })
                event.stopPropagation();
            }
        }
    }
</script>



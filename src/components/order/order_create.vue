
<template>
    <div class="child_view">
        <div class="order_details_b" style="position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        height: 100%;
        overflow: auto;">
            <div class="order_details-nav">
                <div class="list-order-details-lib" v-for='i in allType' :key='i.id'>
                    <div   v-show="i < 1 ? true:false ">
                        <div v-if="addressMap.name">
                            <div class="title-l">收货信息</div>
                            <div class="order-details-lib_b order-p-t-2" @click="address_list">
                                <div class="flex-1 flex-h">
                                    <p class="flex-1">收货地址：</p>
                                    <p class="c4 flex-3">{{addressMap.address}}</p>
                                </div>
                                <div class="flex-1 flex-h">
                                     <p class="flex-1">姓名：</p>
                                    <p class="c4 flex-3">{{addressMap.name}}</p>
                                </div>
                                <div class="flex-1 flex-h">
                                    <p class="flex-1">联系方式：</p>
                                    <p class="c4 flex-3">{{addressMap.phone}}</p>
                                </div>
                            </div>
                        </div>
                        <div  v-else>
                            <div class="title-l">收货信息</div>
                            <div class="order-details-lib_b order-p-t-1" @click="add_address">
                                <p class="flex-1 t-c c6"> 您还没有收货地址，去添加一个吧！</p>
                            </div>
                        </div>
                    </div>
                    
                    <div  v-for="(it,index) in details.list" :key="it.id">
                         <div class="order-details-lib_b " :class="index>0&&details.list.length!=1?'bg-style-b bg-style-t':''" 
                        :style="index==0?'margin-top:0.8rem':''">
                        <div class="flex-h font-2 c1" @click="open_friend">
                            <p class="" >{{it.shop_name}}</p>
                            <p class="flex-1 t-r">>></p>
                        </div>
                        <div v-for="i in it.goodslist" :key="i.goodsId">
                            <div class="line_2"></div>
                            <div class="order-details-lib_b_1 flex-h" @click="go_goods_details">
                                <div><img :src="i.showUrl" alt=""></div>
                                <div class="c3 flex-v flex-j-c flex-1">
                                    <p class="font-3 ellipsis" >{{i.goodsName}}</p>
                                </div>
                            </div>
                            <p class="line_2" v-show="details.type == 0 ? true:false"></p>
                            <div v-if="(viewOrderType==1&&i.type=='0')||(viewOrderType==2&&details.type=='0')">
                                <div class="words-1 flex-h c5">
                                    <p class="flex-1 flex-h"> 商品规格 <span class="c4 p-l">{{i.format}}</span></p>
                                    <p class="flex-1 flex-h"> 商品数量 <span class="c4 p-l">{{i.count}}个</span></p>
                                </div>
                                <div class="words-2 flex-h c5">
                                    <p class="flex-1 flex-h"> 商品单价 <span class="c4 p-l">¥{{i.price}}</span></p>
                                    <p class="flex-1 flex-h"> 商品总价 <span class="c4 p-l">¥{{i.money}}</span></p>
                                </div>
                            </div>
                            <div v-else>
                                <div class="words-2 flex-h">
                                    <p class="flex-1 flex-h c12"> 版权价格 <span class="p-l">¥{{i.price}}</span></p>
                                </div>
                            </div>                         
                        </div>
    
                    </div>
    
                    <!-- <div class="title-l">订单信息</div>
                                        <div class="order-details-lib_b order-p-t-2">
                                            <p class="flex-1 flex-h"> 订 单 号： <span class="c4 ">23232323</span></p>
                                            <p class="flex-1 flex-h"> 订单状态： <span class="c4 ">已完成</span></p>
                                            <p class="flex-1 flex-h"> 下单时间 ：<span class="c4 ">2018-5-12 19:22:00</span></p>
                                            <p class="line_2"></p>
                                            <p class="flex-1 flex-h"> 支付方式： <span class="c4 ">支付宝</span></p>
                                            <p class="flex-1 flex-h"> 订单金额： <span class="c4 ">¥242</span></p>
                                            <p class="flex-1 flex-h"> 支付时间： <span class="c4 ">2018-5-12 19:22:00</span></p>
                                        </div> -->
                    <!-- <div v-for="i in it.goodslist" :key="i.goodsId">
                        <div class="title-l">备注</div>
                        <div class="text-area order_remark">
                            <textarea name="" id="" cols="30" rows="5" v-model.trim="remark" placeholder="需要开发票，公司抬头：某某某有限公司"></textarea>
                        </div>
                    </div>                     -->
                    <div class="title-l">备注</div>
                        <div class="text-area order_remark">
                            <textarea name="" id="" cols="30" rows="5" v-model.trim="remark" placeholder="需要开发票，公司抬头：某某某有限公司"></textarea>
                        </div>
                </div>

                    <div class="apply_btn flex-h">
                        <div class="flex-3 c1 font-1 t-c">总计 ¥{{details.allMoney}}</div>
                        <div class="flex-1" @click="submit_e">提交订单</div>
                    </div>
                    <div class="h5"></div>
                </div>
            </div>
        </div>
        <router-view class="child_view"></router-view>
    </div>
</template>
<style lang="less">
    @import 'order_details.less';
</style>

<script>
    export default {
        data() {
            return {
                details: {},
                addressMap: {},
                typeList:null,
                address_id: null, //地址ID
                remark: null, //备注
                money:null,
                allType:null,
                orderId:null,
                viewOrderType: (this.$route.query.type == 0 || this.$route.query.type == 1) ? 2 : 1 ,//1购物车，2商品直接购买
                // type:'', //0是普通商品 ，1是版权商品
            }
        },
        created() {
            this.initData();
        },
        mounted() {
            var that = this;
//            console.log(that.$route.query)
        },
        methods: {
            initData() {
                var that = this,
                    url = '/mall/cart/viewOrder.do?ids=' + that.$route.query.id +
                    '&viewOrderType=' + that.viewOrderType +
                    '&count=' + that.$route.query.count +
                    '&type=' + that.$route.query.type;
//                debugger
                this.util.ajax.get(url).then(e => {
                    if (e.code == 200) {

                        that.details = e.data || {};
                        that.orderId = e.data.orderId
                        that.addressMap = e.data.addressMap;
                        that.address_id = e.data.addressMap.recive_address;
                        that.money = e.data.allMoney

                        for(let i=0 ; i<that.details.type.length; i++) {
                            that.typeList = that.details.type[i].replace(",")

                            if(that.typeList !=null && that.typeList !=''&& that.typeList !='undefined'){
                                that.allType=that.typeList


                            }
                            //  console.log()

                        }

                    }
                }).catch()
    
            },
            add_address() {
                this.$router.push({
                    name: 'add_address1'
                })
            },
            address_list() {
                this.$router.push({
                    name: 'address_list'
                })
            },
            //跳转店铺详情页
            go_goods_details() {
                
                this.$router.push({
                    path: 'goods-details-gwc',
                    query: {
                        id: this.details.ids
                    }
                })
            },
            //打开商铺-好友界面
            open_friend() {
                iosObject.toFriendMainPage('friendId');
            },
            submit_e() {
//                debugger
                let that = this;
                let url, _p;
                if(that.viewOrderType == 1){
                    url = '/mall/orders/cartCreateOrder.do',

                        _p = {

                            ids: that.$route.query.id,
                            recive_address: that.address_id,
                            remark: that.remark,
                        };
                    if(that.$route.query.type==1){
                        this.util.ajax.post('/admin/sysUserReal/getId.do').then(e=>{

                            if(e.code ==200){

                                this.util.ajax.post(url, _p).then(e => {

                                    if (e.code == 200) {
//                                    alert(that.money)
                                        that.$router.push({
                                            name: 'order_pay',
                                            query: {
                                                orderId: e.data.orderId,
                                                money:that.money
                                            }
                                        })
                                    }
                                }).catch()

                            }else if(e.code == 500){
                                setTimeout(() => {
                                    this.$router.push('/real')
                                }, 2000);
//                            return false
                            }
                        })
                    }else{
                        if (!that.address_id ) {
                            that.Toast('请先选择收获地址');
                            return false;
                        }else{
                            this.util.ajax.post(url, _p).then(e => {

                                if (e.code == 200) {
                                    that.$router.push({
                                        name: 'order_pay',
                                        query: {
                                            orderId: e.data.orderId,
                                            money: that.money
                                        }
                                    })
                                }
                            }).catch()
                        }
                    }
                }else{
                    url = '/mall/orders/createOrder.do';
                    _p = {
                        goodsId: that.$route.query.id,
                        count: that.$route.query.count,
                        type: that.$route.query.type,
                        recive_address: that.address_id,
                        remark: that.remark,
                    }
                    if(that.$route.query.type==1){
                        this.util.ajax.post('/admin/sysUserReal/getId.do').then(e=>{

                            if(e.code ==200){

                                this.util.ajax.post(url, _p).then(e => {

                                    if (e.code == 200) {
//                                    alert(that.money)
                                        that.$router.push({
                                            name: 'order_pay',
                                            query: {
                                                orderId: e.data.orderId,
                                                money:that.money
                                            }
                                        })
                                    }
                                }).catch()

                            }else if(e.code == 500){
                                setTimeout(() => {
                                    this.$router.push('/real')
                                }, 2000);
//                            return false
                            }
                        })
                    }else{
                        if (!that.address_id ) {
                            that.Toast('请先选择收获地址');

                            return false;
                        }else{
                            this.util.ajax.post(url, _p).then(e => {

                                if (e.code == 200) {
                                    that.$router.push({
                                        name: 'order_pay',
                                        query: {
                                            orderId: e.data.orderId,
                                            money: that.money
                                        }
                                    })
                                }
                            }).catch()
                        }
                    }
                }
            },
            
            recive_address_listen(a) {
                if (a) {
                    this.addressMap = a;
                    this.address_id = a.id;
                } else {
                    this.initData();
                }
            }
        }
    }
</script>



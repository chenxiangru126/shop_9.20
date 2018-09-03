<template>
    <div class="bill-details_b">
        <div class="w _cont">
            <div class="flex-h">
                <p>订单号：</p>
                <p>{{details.order_num}}</p>
            </div>
            <div class="flex-h">
                <p>订单金额：</p>
                <p>¥{{details.money}}</p>
            </div>
            <div class="flex-h">
                <p>实付金额：</p>
                <p>¥{{details.money}}</p>
            </div>
    
            <div class="flex-h m-t-half">
                <p>平台费用：</p>
                <p>¥{{details.money}}</p>
            </div>
           
            <div class="flex-h">
                <p>支付时间：</p>
                <p>{{details.effectiveTime}}</p>
            </div>
        </div>
        <div class="h3 line-h-3 font-2 c1 p-l">收货信息</div>
        <div class="order-details-lib_b">
            <div class="order-details-lib_b_1 flex-h">
                <div><img src="../../static/images/1.png" alt=""></div>
                <div class="c3 flex-v flex-j-c flex-1">
                    <p class="font-3 ellipsis">{{details.goodsName}}</p>
                </div>
            </div>
            <p class="line_1"></p>
            <div class="words-1 flex-h c5">
                <p class="flex-1 flex-h"> 商品规格 <span class="c4 p-l">10g</span></p>
                <p class="flex-1 flex-h"> 商品数量 <span class="c4 p-l">10个</span></p>
            </div>
            <div class="words-2 flex-h c5">
                <p class="flex-1 flex-h"> 商品单价 <span class="c4 p-l">¥222</span></p>
                <p class="flex-1 flex-h"> 商品总价 <span class="c4 p-l">¥243</span></p>
            </div>
        </div>
        <div class="w flex-h">
            <div class="c1 font-2 p-l p-r-2 h3 line-h-3">商品评价：</div>
            <div class=" h3 line-h-3 flex-h star-manage flex-a-c">
                <p class="star-lib real-stars"></p>
                <p class="star-lib real-stars"></p>
                <p class="star-lib half-stars"></p>
                <p class="star-lib empty-stars"></p>
                <p class="star-lib empty-stars"></p>
            </div>
        </div>
        <div class="remark_1">
           <span v-if="details.content">{{details.content}}</span> 
           <span v-else>暂无评价</span>
        </div>
        <div class="h3"></div>
    
    </div>
</template>

<style lang="less">
    @import 'bill_details.less';
</style>

<script>
    export default {
        data() {
            return {
                share_log: false,
                nav_show: false,
                  details:{},
            }
        },
         created(){
            this.initData();
        },
        mounted() {
            var that = this;
        },
        methods: {
            initData() {
                var that = this,
                    url = '/mall/bill/platformDetail?id='+that.$route.query.id;
                this.util.ajax.get(url).then(e => {
                    that.details = e.data || {};
                }).catch()
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

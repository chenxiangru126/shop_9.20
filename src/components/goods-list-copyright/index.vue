<template>
    <div class="list_m">
         <div class="goods_nav">
            <div class="classification" @click="onGoods"><a>商品</a><span></span></div>
            <div class="classification" @click="onClassification"><a>视觉传 hj h 干活吧出达…</a><span></span></div>
            <div class="price" @click="onPrice"><a>价 格</a><span></span></div>
        </div>
        <div class="list_c" @click="go_details">
            <div class="list_img">
                <img class="img" src="../../static/images/1527777418732.jpg" />
               <div class="tixing">
                    <div style="margin-top:3.8rem;margin-left: 5.4rem;color: #F5A623 ;">
                        <p style="font-size: .866667rem;font-weight:bold;">版权价</p>
                        <p style="font-size: .86666rem">￥678</p>
                    </div>
                    <div style="margin-left: 3.25rem;color: #FFFFFF ;">
                        <p style="font-size: .866667rem;font-weight:bold;">商品价</p>
                        <p style="font-size: .866667rem">￥9877</p>
                    </div>
                </div>
            </div>
            <div class="list_introduce">
                <span>归途——枷锁</span>
                <!-- <span>￥899.00</span> -->
            </div>
            <div class="list_source">艺狗艺术商店</div>
        </div>
        <div class="list_c" @click="go_details">
            <div class="list_img">
                <img class="img" src="../../static/images/1527777418732.jpg" />
                <div class="tixing">
                    <div style="margin-top:3.8rem;margin-left: 5.4rem;color: #F5A623 ;">
                        <p style="font-size: .866667rem;font-weight:bold;">版权价</p>
                        <p style="font-size: .86666rem">￥678</p>
                    </div>
                    <div style="margin-left: 3.25rem;color: #FFFFFF ;">
                        <p style="font-size: .866667rem;font-weight:bold;">商品价</p>
                        <p style="font-size: .866667rem">￥9877</p>
                    </div>
                </div>
            </div>
            <div class="list_introduce">
                <span>归途——枷锁</span>
                <!-- <span>￥899.00</span> -->
            </div>
            <div class="list_source">艺狗艺术商店</div>
        </div>
        <div class="list_c" @click="go_details">
            <div class="list_img">
                <img class="img" src="../../static/images/1527777418732.jpg" />
               <div class="tixing">
                    <div style="margin-top:3.8rem;margin-left: 5.4rem;color: #F5A623 ;">
                        <p style="font-size: .866667rem;font-weight:bold;">版权价</p>
                        <p style="font-size: .86666rem">￥678</p>
                    </div>
                    <div style="margin-left: 3.25rem;color: #FFFFFF ;">
                        <p style="font-size: .866667rem;font-weight:bold;">商品价</p>
                        <p style="font-size: .866667rem">￥9877</p>
                    </div>
                </div>
            </div>
            <div class="list_introduce">
                <span>归途——枷锁</span>
                <!-- <span>￥899.00</span> -->
            </div>
            <div class="list_source">艺狗艺术商店</div>
        </div>
    </div>
</template>

<style lang="less">
    @import 'index.less';
</style>

<script>
    export default {
        data() {
            return {
                share_log:false,
            }
        },
        created() {
            this.initData();
        },
        mounted() {
            var that = this;
        },
        methods: {
          initData() {
                var that = this;
                let data ={
                    showCount:20,
                    currentPage:this.currentPage,
                }
                util.ajax.post("/mall/goods/getGoodsData.do").then(e=>{
                    for(let i in e.data.list){
                        e.data.list[i].check = true;
                    }
                    that.list =  that.list.concat(e.data.list); ;
                }).catch()
            },
          go_details(){
	        this.$router.push({path: '/goods-details-store',params:{ id:'1'}});
          }
        }
    }
</script>



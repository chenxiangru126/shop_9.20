<template>
    <div class="list_m">
        <div class="list_c" @click="go_details">
            <div class="list_img">
                <img class="img" src="../../static/images/1527777418732.jpg" />
                <!-- <div class="tixing">
                    <div style="margin-top: 4.75rem;margin-left: 5.7rem;color: #F5A623 ;font-weight:bold;">
                        <p style="font-size: 1rem">版权价</p>
                        <p style="font-size: .8125rem">￥678</p>
                    </div>
                    <div style="margin-left: 3.25rem;font-weight:bold;color: #FFFFFF ;">
                        <p style="font-size: 1rem">商品价</p>
                        <p style="font-size: .8125rem">￥9877</p>
                    </div>
                </div> -->
            </div>
            <div class="list_introduce">
                <span>归途——枷锁</span>
                <span>￥899.00</span>
            </div>
            <div class="list_source">艺狗艺术商店</div>
        </div>
        <div class="list_c" @click="go_details">
            <div class="list_img">
                <img class="img" src="../../static/images/1527777418732.jpg" />
                <!-- <div class="tixing">
                    <div style="margin-top: 4.75rem;margin-left: 5.7rem;color: #F5A623 ;font-weight:bold;">
                        <p style="font-size: 1rem">版权价</p>
                        <p style="font-size: .8125rem">￥678</p>
                    </div>
                    <div style="margin-left: 3.25rem;font-weight:bold;color: #FFFFFF ;">
                        <p style="font-size: 1rem">商品价</p>
                        <p style="font-size: .8125rem">￥9877</p>
                    </div>
                </div> -->
            </div>
            <div class="list_introduce">
                <span>归途——枷锁</span>
                <span>￥899.00</span>
            </div>
            <div class="list_source">艺狗艺术商店</div>
        </div>
        <div class="list_c" @click="go_details">
            <div class="list_img">
                <img class="img" src="../../static/images/1527777418732.jpg" />
                <!-- <div class="tixing">
                    <div style="margin-top: 4.75rem;margin-left: 5.7rem;color: #F5A623 ;font-weight:bold;">
                        <p style="font-size: 1rem">版权价</p>
                        <p style="font-size: .8125rem">￥678</p>
                    </div>
                    <div style="margin-left: 3.25rem;font-weight:bold;color: #FFFFFF ;">
                        <p style="font-size: 1rem">商品价</p>
                        <p style="font-size: .8125rem">￥9877</p>
                    </div>
                </div> -->
            </div>
            <div class="list_introduce">
                <span>归途——枷锁</span>
                <span>￥899.00</span>
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
        mounted() {
            var that = this;
        },
        methods: {
          initData(){

          },
          go_details(){
	        this.$router.push({path: '/goods-details-store',params:{ id:'1'}});
          }
        }
    }
</script>



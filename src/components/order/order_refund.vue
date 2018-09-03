<template>
    <div class="order_evaluate_b">
        <input type="file" class="hide file" accept="image/*" @change="upload_img">
        <div class="p flex-h">
            <img :src="details.urlShow" alt="" class="w_h_img">
            <div class="c3 flex-v flex-j-c flex-1 p-l ellipsis">
                <p class="font-3 ellipsis">{{details.goodsName}}</p>
            </div>
        </div>
        <div class="h3 line-h-3 flex-h p-l-r c1">
            <p class="flex-1 font-1">退货金额</p>
            <p class="flex-3 font-0">¥{{details.money}}</p>
        </div>
        <div class="h3 line-h-3 flex-h p-l-r c1" @click="open_log">
            <p class="flex-1 font-1">退货原因</p>
            <p class="flex-3 font-0 c6 right-1" v-if='!reason_value'>选择退货原因</p>
            <p class="flex-3 font-0 c6 right-1" v-else>{{reason_value}}</p>
        </div>
        <div class="h3 line-h-3 p-l-r c1">
            <p class="flex-1 font-1">退货说明</p>
        </div>
        <div class="text-area">
            <textarea name="" id="" cols="30" rows="10" v-model="instruction"></textarea>
            <div class="upload-area flex-h">
                <p class="add-icon" @click='trigger_file'></p>
                <p class="flex-v flex-j-c" v-for="it in upimg_show_items" :key="it" v-if='upimg_show_items.length>0'>
                    <img :src="it" alt="" class="w">
                </p>
            </div>
        </div>
        <div class="submit-btn-1" @click='submit'>
            提交
        </div>
    
        <!-- 退货原因，调取列表 -->
        <div class="showChose" v-show='log_show'>
            <div class="dialog_rgba_bg" @click='close_log'></div>
            <section class="address">
                <section class="title" style="border-bottom:.0625rem solid #383838">
                    <h4>
                        退货原因
                    </h4>
                    <span class="iconfont icon-cuo"></span>
                </section>
                <ul>
                    <li @click='choose_reason(it)' class=" lib_reason" v-for="it in reason_items" :key="it.id">{{it.value}}</li>
                </ul>
            </section>
        </div>
    
    
    
    </div>
</template>

<style lang="less">
    @import 'order_evaluate.less';
</style>

<script>
    export default {
        data() {
            return {
                log_show: false,
                reason_items: [],
                upimg_items: [],
                upimg_show_items: [],
                reason_id: null,
                reason_value: null,
                money: 0,
                orderId:null ,
                goodsId:null ,
                instruction: null,
                details: {}
    
            }
        },
        created() {
            this.initData();
            this.reasonData();
            this.$root.eventHup.$emit('childEvent', {
                a: 1,
                b: 2
            })
        },
        mounted() {
            var that = this;
                that.money=that.$route.query.money;
                that.orderId=that.$route.query.orderId;
                that.goodsId=that.$route.query.goodsId;
        },
        methods: {
            initData() {
                var that = this,
                    url = '/mall/orders/getByOrderId.do',
                    _p = {
                        id: that.$route.query.orderId,
                    };
                this.util.ajax.post(url, _p).then(e => {
                    that.details = e.data || {};
                }).catch()
            },
             reasonData() {
                var that = this,
                    url = '/mall/datas/getDatas.do?code=return';
                   
                this.util.ajax.get(url).then(e => {
                    that.reason_items = e.data;
                }).catch()
            },
            // 打开弹出层，选择原因
            open_log() {
                this.log_show = true;
            },
            // 遮罩层点击关闭退货
            close_log() {
                this.log_show = false;
            },
            // 选择完原因，关闭原因弹出框
            choose_reason(a) {
                this.reason_id = a.id;
                this.reason_value = a.value;
                this.close_log();
            },
            // 提交按钮，提交所有信息，把所有的信息异步请求发送给后台
            submit() {
                var that = this,
                    url = '/mall/orders/editReturnInfo.do',
                    _p = {
                        orderId: that.orderId,
                        goodsId: that.goodsId,
                        return_reason: that.reason_value,
                        instruction: that.instruction,
                        urls: that.upimg_items.join(","),
                    };
                if(!that.reason_value) {
                    that.Toast('请选择退货原因');
                    return false;
                } 
                if(!that.instruction) {
                    that.Toast('请输入退货说明');
                    return false;
                }    
                this.util.ajax.post(url, _p).then(e => {
                    if(e.code==200){
                        history.back();
                    }
                }).catch()
            },
            //下面的是图片的上传
            //点击上传图片
    
            trigger_file() {
                // 获取input，添加点击事件
                const file = document.querySelector(".file");
                file.click();
            },
            // input发生改变，调用图片的上传
            upload_img(e) {
                let formData = new FormData();
                formData.append('file', e.target.files[0]);
                formData.append('type', 'test');
                // 发送异步请求，把formData发送异步请求
                this.util.ajax.post("/mall/shop/upload.do", formData).then(e => {
                    //  返回的参数
                    this.upimg_items.push(e.data.url);
                    this.upimg_show_items.push(e.data.urlShow);
                }).catch()
            }
        }
    }
</script>



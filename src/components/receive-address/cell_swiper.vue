<template>
    <div class="lib_b_1 flex-h" :style="txtStyle" @touchstart="touch_start" @touchmove="touch_move" @touchend="touch_end">
        <div class="lib_b_1_c" :class="it.check?'lib-selected':'lib-unselected'" @click="select_event(it)">
            <p class="font-2 c1">{{it.name}} {{it.phone}}</p>
            <p class="c9 font-1 h2 line-h-2">{{it.address}}</p>
        </div>
        <div class="delete_icon"></div>
    </div>
</template>

<style lang="less">
    @import 'cell_swiper.less';
</style>

<script>
    export default {
        name: 'cellSwiper',
        data() {
            return {
                startX: 0, //触摸位置
                moveX: 0, //滑动时的位置
                disX: 0, //移动距离
                txtStyle: '',
                maxX: 100
            }
        },
        props: ['it'],
        created() {},
        mounted() {
            var that = this;
        },
        methods: {
            touch_start(ev) {
                ev = ev || event;
                if (ev.target.className == 'delete_icon') {
                    this.delete_address();
                }
                if (ev.touches.length == 1) {
                    // 手指按下的时候记录按下的位置
                    this.startX = ev.touches[0].clientX;
                    // console.log(this.startX)
                }
    
            },
            touch_move(ev) {
                ev = ev || event;
                if (ev.touches.length == 1) {
                    // 滑动过程中的实时位置
                    this.moveX = ev.touches[0].clientX
                    // 滑动过程中实时计算滑动距离
                    this.disX = this.startX - this.moveX;
                    // console.log('disX==>',this.disX)
                    // 如果是向右滑动或者只是点击，不改变滑动位置
                    if (this.disX < 0 || this.disX == 0) {
                        // console.log('没有移动');
                        this.txtStyle = "transform:translateX(0rem)";
    
                    } else if (this.disX > 0) {
                        // 如果是向左滑动，则实时给这个根元素一个向左的偏移-left，当偏移量到达固定值delWidth时，固定元素的偏移量为 delWidth
                        this.txtStyle = "transform:translateX(-" + this.disX / 15 + "rem)";
                        if (this.disX >= 100) {
                            this.txtStyle = "transform:translateX(-" + 5 + "rem)";
                            this.zIndex = "z-index:" + 10 + "rem";
                        }
                    }
                }
            },
            touch_end(ev) {
                ev = ev || event;
                if (event.changedTouches.length == 1) {
                    // this.startX = 0;
                    this.zIndex = "z-index:" + -1 + "rem";
                    // console.log(event.changedTouches[0].clientX)
                    // 手指移动结束后的水平位置
                    let endX = event.changedTouches[0].clientX;
                    // 触摸开始与结束,手指移动的距离
                    this.disX = this.startX - endX;
                    if (this.disX >= 100) {
                        this.txtStyle = "transform:translateX(-" + 5 + "rem)";
                        this.zIndex = "z-index:" + 10 + "rem";
                    } else {
                        this.txtStyle = "transform:translateX(0)";
                    }
                    //如果距离小于删除按钮的1/2，不显示删除按钮
                }
            },
            delete_address() {
                var that = this,
                    url = '/mall/address/delete.do';
                this.util.ajax.post(url, {
                    ids: that.it.id
                }).then(e => {
                    if(e.code==200){
                        that.Toast('删除成功');
                        setTimeout(()=>{
                            that.$parent.initData();
                        },1000)
                       
                    }
                   
                }).catch()
            },
            select_event(a){
                let select_status=this.$parent.select_status;
                if(!select_status){
                     a.check=!a.check;
                     this.$parent.select_address_send(a)
                }else{
                    a.check=!a.check;
                }
               
            }
        }
    }
</script>



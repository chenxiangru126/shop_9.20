<template>
    <div class="lib_b_1"  @touchstart="touch_start"  @touchmove="touch_move"  @touchend="touch_end" :style="txtStyle" >
            <div class="lib_b_1_c "    :class="item.check?'lib-unselected':'lib-selected'" >
                <div class="transparent"  @click="click_tag(item)"></div>
                <div class="line"></div>
                <p class="shop_name" @click="tostore(item.friendsId)"><span>{{item.shop_name}}</span> <em></em></p>
                <div class="shop_info" @click="toGoodsDes($event,item.goodsId)">
                    <div class="div_2">
                        <p class="font-2 c1 shop_n">{{item.goodsName}}</p>
                        <p class="c9  h2 line-h-2 shop_pic" :class="item.type==0?'shop_pic_cl':'shop_pic_cl2'"><span style="font-size: .933333rem">￥</span>{{item.price}}/个 * {{item.count}}<span v-if="item.type==1">(版权)</span></p>
                    </div>
                    <img class="shop_img" v-bind:src="item.imgUrl">
                </div>
            </div>    
            <div @click.stop="delete_()"  class="delete_icon"></div>
    </div>
</template>

<style lang="less">
    @import './index.less';
</style>

<script>
import util from "../../libs/util";
    export default {
        data() {
            return { 
                startX: 0,       //触摸位置
                moveX: 0,       //滑动时的位置
                disX: 0,       //移动距离
                txtStyle: '',
                delWidth: 80
            }
        },
         props: ['item'],
        methods: {
        
            touch_start(ev) {
                // debugger;
                ev = ev || event;
                if (ev.target.className == 'delete_icon') {
                    this.delete_goods();
                }else if (ev.touches.length == 1) {
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
                        if (this.disX >= 50) {
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
                    if (this.disX >= 50) {
                        this.txtStyle = "transform:translateX(-" + 5 + "rem)";
                        this.zIndex = "z-index:" + 10 + "rem";
                    } else {
                        this.txtStyle = "transform:translateX(0)";
                    }
                    //如果距离小于删除按钮的1/2，不显示删除按钮
                }
            },
            delete_goods() {
                var that = this,
                    url = '/mall/cart/deleteCart.do';
                this.util.ajax.post(url, {
                        ids: that.item.id
                }).then(e => {
                    if(e.code==200){
                        that.Toast('删除成功');
                        var index =  that.$parent.list.indexOf(that.item);
                        that.$parent.list.splice(index, 1);
                        if(that.$parent.list.length==0){
                             that.$parent.butdisplay = false;
                             that.$parent.emptylist = true;
                        }
                         setTimeout(()=>{
                         var index =  that.$parent.list.indexOf(that.item);
                         that.$parent.list = [];
                         that.$parent.list.splice(index, 1);
                        that.$parent.initData();
                        },1000)
                    }
                   
                }).catch()
            },
            delete_(){

            },
            tostore(id){
                iosObject.toFriendMainPage(id);
            },
            click_tag(item){
                if(item.check){
                    this.$parent.total = Math.abs(this.$parent.total+item.count*item.price);
                    this.$parent.ids.push(item.id);
                    this.$parent.counts.push(item.count)
                    this.$parent.types.push(item.type)
                    this.$parent.goodsIds.push(item.goodsId)

                }else{
                    this.$parent.total =Math.abs( this.$parent.total-item.count*item.price);
                    var index = this.$parent.ids.indexOf(item.id);
                    this.$parent.ids.splice(index, 1);
                }
                item.check = !item.check;
            },
            toGoodsDes(e,id){
                if(e.target.className.indexOf('delete_icon')==-1){
                    this.$router.push({path: '/goods-details-gwc',query:{ id:id}});
                }
                
            },
            select_event(a){
                let select_status=this.$parent.select_status;
                if(!select_status){
                    a.check=!a.check;
                    this.$parent.select_shopping_send(a)
                }else{
                    a.check=!a.check;
                }

            }
        }
    }
</script>



<template>
    <div class="order_evaluate_b">
        <input type="file" class="hide file" accept="image/*" @change="upload_img">
        <div class="p flex-h">
            <img :src="details.photo" alt="" class="w_h_img" >
            <div class="c3 flex-v flex-j-c flex-1 p-l ellipsis">
                <p class="font-3 ellipsis">{{details.goodsName}}</p>
            </div>
        </div>
        <div class="w h3 line-h-3 flex-h star-manage flex-a-c">
            <p class="star-lib" :class="handle_star1" @click='stars_event(1)'></p>
            <p class="star-lib" :class="handle_star2" @click='stars_event(2)'></p>
            <p class="star-lib" :class="handle_star3" @click='stars_event(3)'></p>
            <p class="star-lib" :class="handle_star4" @click='stars_event(4)'></p>
            <p class="star-lib" :class="handle_star5" @click='stars_event(5)'></p>
            <p class="font-1 c1 p-l" v-if="score_num==1||score_num==0.5">非常差</p>
            <p class="font-1 c1 p-l" v-else-if="score_num==2||score_num==1.5">差</p>
            <p class="font-1 c1 p-l" v-else-if="score_num==3||score_num==2.5">一般般</p>
            <p class="font-1 c1 p-l" v-else-if="score_num==4||score_num==3.5">好</p>
            <p class="font-1 c1 p-l" v-else-if="score_num==5||score_num==4.5">非常好</p>
        </div>
        <div class="text-area">
            <textarea name="" id="" cols="30" rows="10" placeholder="您对商品有什么评价或意见吗？" v-model.trim="content"></textarea>
            <div class="upload-area flex-h">
                <p class="add-icon" @click='trigger_file'></p>
                <p class="flex-v flex-j-c" v-for="it in upimg_items" :key="it" v-if='upimg_items.length>0'>
                    <img :src="it" alt="" class="w">
                </p>
            </div>
        </div>
        <div class="submit-btn-1" @click="submit_e">
            提交
        </div>
        <!-- <div class="dialog_layer">
                                        <div class="layer_cont_1 cont_1_alert">
                                            <div class="flex-v flex-j-c">
                                                <p class="c6 font-3 w t-c">评价成功</p>
                                            </div>
                                            <div class="layer_cont_btn">
                                                <div class="layer_cont_confirm flex-h flex-j-c">
                                                    <p>取消</p>
                                                    <p>完成</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div> -->
    </div>
</template>

<style lang="less">
    @import 'order_evaluate.less';
</style>

<script>
    // 一星：非常差；二星：差；三星：一般般；四星：好；五星：非常好
    export default {
        data() {
            return {
                share_log: false,
                nav_show: false,
                upimg_items: [],
                star_click_num: 0,
                current_star_status: 0, //0 空🌟 1半星🌟 2满星🌟
                score_num: null, //评分
                content: null, //评价内容
                details: {} //商品详情
            }
        },
        created() {
            this.initData();
        },
        mounted() {
            var that = this;
        },
        watch: {
            star_click_num: function(new_vl) {
                this.current_star_status = 0;
                this.current_star_status++;
            }
        },
        computed: {
            handle_star1() {
                if (this.star_click_num > 1) {
                    return 'real-stars'
                } else if (this.star_click_num == 1) {
                    this.score_num = 0;
                    if (this.current_star_status == 1) {
                        this.score_num = this.score_num + 0.5;
                        return 'half-stars'
                    } else if (this.current_star_status == 2) {
                        this.score_num = this.score_num + 1;
                        return 'real-stars'
                    } else {
                        return 'empty-stars'
                    }
                } else {
                    return 'empty-stars'
                }
            },
            handle_star2() {
                if (this.star_click_num > 2) {
                    return 'real-stars'
                } else if (this.star_click_num == 2) {
                    this.score_num = 1;
                    if (this.current_star_status == 1) {
                        this.score_num = this.score_num + 0.5;
                        return 'half-stars'
                    } else if (this.current_star_status == 2) {
                        this.score_num = this.score_num + 1;
                        return 'real-stars'
                    } else {
                        return 'empty-stars'
                    }
                } else {
                    return 'empty-stars'
                }
            },
            handle_star3() {
                if (this.star_click_num > 3) {
                    return 'real-stars'
                } else if (this.star_click_num == 3) {
                    this.score_num = 2;
                    if (this.current_star_status == 1) {
                        this.score_num = this.score_num + 0.5;
                        return 'half-stars'
                    } else if (this.current_star_status == 2) {
                        this.score_num = this.score_num + 1;
                        return 'real-stars'
                    } else {
                        return 'empty-stars'
                    }
                } else {
                    return 'empty-stars'
                }
            },
            handle_star4() {
                 if (this.star_click_num > 4) {
                    return 'real-stars'
                } else if (this.star_click_num == 4) {
                    this.score_num = 3;
                    if (this.current_star_status == 1) {
                        this.score_num = this.score_num + 0.5;
                        return 'half-stars'
                    } else if (this.current_star_status == 2) {
                        this.score_num = this.score_num + 1;
                        return 'real-stars'
                    } else {
                        return 'empty-stars'
                    }
                } else {
                    return 'empty-stars'
                }
            },
            handle_star5() {
                 if (this.star_click_num > 5) {
                    return 'real-stars'
                } else if (this.star_click_num == 5) {
                    this.score_num = 4;
                    if (this.current_star_status == 1) {
                        this.score_num = this.score_num + 0.5;
                        return 'half-stars'
                    } else if (this.current_star_status == 2) {
                        this.score_num = this.score_num + 1;
                        return 'real-stars'
                    } else {
                        return 'empty-stars'
                    }
                } else {
                    return 'empty-stars'
                }
            },
        },
        methods: {
            initData() {
                var that = this,
                    url = '/mall/goods/getById.do',
                    _p = {
                        id: that.$route.query.goodsId,
                    };
                this.util.ajax.post(url, _p).then(e => {
                    that.details = e.data.goods || {};
                }).catch()
            },
            nav_open() {
                this.nav_show = !this.nav_show;
            },
            trigger_file() {
                const file = document.querySelector(".file");
                file.click();
            },
            upload_img(e) {
                let formData = new FormData();
                formData.append('file', e.target.files[0]);
                formData.append('type', 'test');
                this.util.ajax.post("/mall/shop/upload.do", formData).then(e => {
                    this.upimg_items.push(e.data.urlShow);
                }).catch()
            },
            stars_event(a) {
                var that = this;
                  this.star_click_num = a;
                   this.current_star_status++;
                if (this.current_star_status > 2) this.current_star_status = 0;
            },
            handle_star_click_num(a) {
                if (this.star_click_num > a) {
                    return 'real-stars'
                } else if (this.star_click_num == a) {
                    this.score_num = a - 1;
                    if (this.current_star_status == 1) {
                        this.score_num = this.score_num + 0.5;
                        return 'half-stars'
                    } else if (this.current_star_status == 2) {
                        this.score_num = this.score_num + 1;
                        return 'real-stars'
                    } else {
                        return 'empty-stars'
                    }
                } else {
                    return 'empty-stars'
                }
            },
            submit_e() {
                var that = this,
                    url = '/mall/comments/commentsGoods.do',
                    _p = {
                        orderId: that.$route.query.orderId,
                        goodsId: that.$route.query.goodsId,
                        content: that.content,
                        score: that.score_num,
                        upimg_items: that.upimg_items,
                    };
                this.util.ajax.post(url, _p).then(e => {
                    if (e.code == 200) {
                        that._alert({
                            content: '评价成功',
                            sureTxt: '确定',
                            yes: () => {
                                history.back();
                            }
                        });
                    }
                }).catch()
            }
        }
    }
</script>



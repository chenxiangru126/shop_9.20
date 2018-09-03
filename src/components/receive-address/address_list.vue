<template>
    <div class="child_view" style="overflow:hidden">
        <div class="address_b_list" >
            <div class="add-address-input" @click='add_new_address'>
                <div><span class="font-3">+</span> 添加新的收货地址</div>
            </div>
            <div v-if="items.length>0">
                <div class="add-address-lib">
                    <cell :it='it' v-for='it in items' :key='it.id'>
        
                    </cell>
                </div>
                <div class="h6 w"></div>
            </div>
            <div class="submit-btn-1-fix" v-if="select_status">
                <div class="submit-btn-1-fixed"  @click='all_delete'>
                    全部删除
                </div>
            </div>
        </div>
         <router-view class="child_view"></router-view>
    </div>
</template>

<style lang="less">
    @import './address_list.less';
</style>

<script>
    import cellSwiper from './cell_swiper.vue';
    export default {
        data() {
            return {
                items: [],
                select_status: false, //false 全不选  true 全选
                hasSelect: false, //是否有选中状态
                delete_items: [] //删除的数组
            }
        },
        components: {
            cell: cellSwiper
        },
        created() {
            this.initData();
            this.$root.eventHup.$on('receive_address_check', this.process_data);
        },
        watch: {
            select_status: function(new_value, old_value) {
                if (new_value) {
                    this.items.forEach(e => {
                        e.check = true;
                    })
                } else {
                    this.items.forEach(e => {
                        e.check = false;
                    })
                }
            },
            items: {　　　　
                handler(newValue, oldValue) {　　
                    var that = this;　　
                    that.delete_items = [];　　
                    if (that.select_status) {
                        that.items.forEach(e => {
                            if (e.check) {
                                that.delete_items.push(e.id)
                            }
                        })　
                        if (that.delete_items.length == 0) {
                            that.hasSelect = false;
                        } else {
                            that.hasSelect = true;
                        }　
                        console.log(that.delete_items);　
                        if (that.delete_items.length == that.items.length) {
                            that.$root.eventHup.$emit('childEvent', {
                                address_checked: true
                            })
                        } else {
                            that.$root.eventHup.$emit('childEvent', {
                                address_checked: false
                            })
                        }
                    }
                },
                deep: true　　
            }
        },
        methods: {
            initData() {
                var that = this,
                    url = '/mall/address/list.do';
                this.util.ajax.get(url).then(e => {
                    let arrs = e.data;
                    arrs.forEach(function(m) {
                        m.check = false;
                    })
                    that.items = arrs;
                }).catch()
            },
            add_new_address() {
                this.$router.push({
                    name: 'add_address'
                })
            },
            process_data(a) {
                var that = this;
                console.log('process_data', a);
                that.select_status = null;
                setTimeout(() => {
                    that.select_status = a;
                }, 200)
    
            },
            all_delete() {
                var that = this,
                    url = '/mall/address/delete.do';
                this.util.ajax.post(url, {
                    ids: that.delete_items.join(",")
                }).then(e => {
                    if (e.code == 200) {
                        that.Toast('删除成功');
                        setTimeout(() => {
                            that.initData();
                        }, 1000)
                    }
    
                }).catch()
            },
            //添加地址监听器
            add_address_listen() {
                this.initData();
            },
            //选择地址发送器
            select_address_send(a) {
                this.$parent.recive_address_listen(a);
                history.back();
            }
        }
    }
</script>



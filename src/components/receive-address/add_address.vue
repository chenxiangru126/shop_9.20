<template>
    <div class="add_address_b">
        <div class="input_b">
            <div class="w h3 line-h-3 flex-h b-b m-t">
                <div class="flex-1 c1 font-1 p-l">收件人</div>
                <div class="flex-3">
                    <input type="text" placeholder="输入收件人姓名" v-model="name" id="id_name">
                </div>
            </div>
            <div class="w h3 line-h-3 flex-h b-b">
                <div class="flex-1 c1 font-1 p-l">手机号</div>
                <div class="flex-3">
                    <input type="text" placeholder="输入收件人手机号" v-model="phone" id="id_phone">>
                </div>
            </div>
            <div class="w h3 line-h-3 flex-h b-b" @click='open_address'>
                <div class="flex-1 c1 font-1 p-l">收货地址</div>
                <div class="flex-3">
                    <p class="font-0 c2 right-2" v-if='area_address'>{{area_address}}</p>
                    <p class="font-0 c2 right-2" v-else>选择城市</p>
                </div>
            </div>
            <div class="w h3 line-h-3">
                <div class="flex-1 c1 font-1 p-l">详细地址</div>
            </div>
            <div class="text-area">
                <textarea v-model="address_detail" id="id_address" class="h6" name=""  cols="30" rows="10" placeholder="输入详细地址，如道路、门牌、小区等" ></textarea>
            </div>
            <div class="submit-btn-1" @click="saveAddress">
                保存
            </div>
        </div>
        <myAddress v-if='show_select_address'></myAddress>
    </div>
</template>

<style lang="less">
    @import './add_address.less';
</style>

<script>
    import myAddress from '../dizhi/dizhi.vue';
    export default {
        data() {
            return {
                name: null,
                phone: null,
                address_detail: null,
                area_address: null,
                show_select_address: false,
                address_setTime:null
            }
        },
        components: {
            myAddress: myAddress
        },
        mounted(){
        },
        methods: {
            open_address() {
                var that=this;
                var _name=document.getElementById("id_name");
                var _phone=document.getElementById("id_phone");
                var _address=document.getElementById("id_address");
                _name.blur();
                _phone.blur();
                _address.blur();
                clearTimeout(that.address_setTime);
                that.address_setTime=setTimeout(() => {
                    that.show_select_address = true;
                }, 1000);
            },
            cancel_address() {
                this.show_select_address = false;
            },
            return_address(a) {
                this.area_address = a;
                this.cancel_address();
            },
            check_input(){
                //    name: null,
                // phone: null,
                // address_detail: null,
                // area_address: null,
                if(!this.name){
                    this.Toast('输入收件人姓名');
                    return false;
                }
                 if(!this.phone){
                    this.Toast('输入收件人手机号');
                    return false;
                }
                if(this.phone&&!/^1\d{10}$/i.test(this.phone)){
                     this.Toast('输入正确的手机号');
                    return false;
                }
                  if(!this.area_address){
                    this.Toast('选择收货地址');
                    return false;
                }
                  if(!this.address_detail){
                    this.Toast('输入详细地址');
                    return false;
                }
                return true;
            },
            saveAddress() {
                var that = this,
                    url = '/mall/address/saveAddress.do',
                    _p = {
                        params: {
                            name: that.name,
                            phone: that.phone,
                            address: that.area_address ,
                            address_detail:that.address_detail
                        }
                    };
                if(!that.check_input())return false;    
                this.util.ajax.get(url, _p).then(e => {
                    this._alert({
                        content: '保存成功', // 选填
                        yes() {
                            if(that.$parent.add_address_listen){
                                that.$parent.add_address_listen();
                                 history.back();
                            }else{
                                history.back();
                            }
                        }
                    })
                }).catch()
            },
        }
    }
</script>



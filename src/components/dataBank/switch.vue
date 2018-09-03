<template>
  <div class="detaildata">
    <div class="data_top">
      <div class="top">
        <div class="top_one flex ">
          <span class="avata"><img :src="photo" alt=""></span>
          <span class="c1" style="margin:10px 0 5px 13px; font-size:14px; letter-spacing: .03333rem">{{shopName}}</span>
        </div>
        <p class="font-0 c1 gengduo" style="" @click="go_data">更多资料<span style=" letter-spacing:-.2rem; margin-left:.1rem">>></span></p>
      </div>
  
  
      <div class="data_content">
        <div class="one" style=" border-right: .0625rem solid #444444;border-bottom: .0625rem solid #444444;">
          <span style="font-size: 28px; color: #50B7E3; margin: .466667rem 0;">{{current_order}}</span>
          <span>今日订单<span>(单)</span></span>
        </div>
        <div class="one" style=" border-bottom: .0625rem solid #444444;">
          <span style="font-size: 28px; color: #69B876;margin: .466667rem 0;">{{current_cell}}</span>
          <span>今日收入<span>(元)</span></span>
        </div>
        <div class="one" style=" border-right: .0625rem solid #444444;">
          <span style="font-size: 28px; color: #CD5F73;margin: .466667rem 0;">{{back_money}}</span>
          <span>退款中<span>(单)</span></span>
        </div>
        <div class="one">
          <span style="font-size: 28px; color: #FFDA66;    margin: .466667rem 0;">{{be_celling}}</span>
          <span>待发货<span>(单)</span></span>
        </div>
  
  
      </div>
  
  
  
    </div>
  
    <!-- 详情内容区 -->
    <div class="content">
      <div class="content_one" @click="go_order_seller">
        <div class="one_left">
          <!-- <span class="iconfont icon-dingdan1" style="font-size: 1.625rem;margin-right: 1.25rem;"></span> -->
          <img src="../../static/images/ding.png" alt="" style="margin-right: 1.25rem;vertical-align:middle ">
          <span>订单</span>
        </div>
        <div class="one_right">
          <span style="font-size:14px;">累计订单</span>
          <span>{{total_order}}</span>
        </div>
      </div>
      <div class="content_one" @click="go_wallet">
        <div class="one_left">
          <img src="../../static/images/qian.png" alt="" style="margin-right: 1.25rem;vertical-align: middle">
          <span>钱包</span>
        </div>
        <div class="one_right">
          <span style="font-size:15px">余额</span>
          <span>¥{{total_money}}</span>
        </div>
      </div>
      <div class="content_one">
        <div class="one_left" style="flex:1" @click="go_goods">
          <img src="../../static/images/shang.png" alt="" style="margin-right: 1.25rem;vertical-align:middle">
          <span>商品</span>
        </div>
        <div class="one_right">
          <span style="font-size:15px">在售</span>
          <span>{{total_celling}}</span>
        </div>
        <div class="one_right">
          <span style="font-size:15px">售出</span>
          <span>{{total_celled}}</span>
        </div>
      </div>
  
  
  
    </div>
  
  
  </div>
</template>

<script>
  import util from "../../libs/util";
  export default {
    data() {
      return {
        current_order: null,
        current_cell: null,
        back_money: null,
        be_celling: null,
        total_order: null,
        total_money: 0,
        total_celling: null,
        total_celled: null,
        shoptype: null,
        shopName:null,
        photo:null,
      }
    },
    created() {
       this.initData()
    },
    mounted() {
      
    },
    methods: {
      initData() {
        //这里是接收接口，返回显示数据
        this.util.ajax.post("/mall/shop/shopIndex.do").then(e => {
          var data = e.data
          this.current_order = data.nCount;
          this.current_cell = data.dMoney;
          this.back_money = data.tCount;
          this.be_celling = data.dCount;
          this.total_order = data.allOrder;
          this.total_money = data.money;
          this.total_celling = data.isUpCount;
          this.total_celled = data.isSellCount;
          this.shoptype = data.shoptype;
          this.shopName = data.shopName;
          this.photo = data.photo
        })
      },
      go_order_seller() {
        this.$router.push({
          name: 'order_list_seller'
        })
      },
      go_wallet() {
        this.$router.push({
          name: 'wallet'
        })
  
      },
      go_goods() {
        this.$router.push({
          name: 'my-goods-list'
        })
      },
      go_data() {
        var shoptype = this.shoptype
        if (shoptype == 1) {
          this.$router.push('/geren_data?shoptype='+shoptype)
        } else if (shoptype == 2) {
          this.$router.push('/qiye_data?shoptype='+shoptype)
        }
      }
    }
  }
</script>

<style lang="less">
  @import "switch.less";
</style>



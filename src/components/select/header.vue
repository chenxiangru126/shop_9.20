<template>
  <!--下拉单选框-->
  <div class="base-select" @click="showDataList" v-bind:style="{width: widthData}">
      <div class="sub-selected-value">
        {{selectedValue.value}}<!--显示选择的值-->
        <div class="sub-select-list" v-bind:style="{width: widthData}" v-if="showData">
          <div class="sub-select-item" v-for="(item, index) in dataList" :key="item" @click.stop="select(item, index)">
            {{item.value}}
          </div>
        </div>
      </div>
  </div>
</template>
<style lang="scss">
  .base-select {
    position: relative;
    top: 0px;
    float: right;
    border: 1px solid;
    height: 25px;
    //width: 160px;
    &:after {
      position: absolute;
      top: 50%;
      right: 2px;
      transform: translateY(-50%);
      content: '';
      width: 0;
      border-top: 5px solid black;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      height: 0;
    }
      .sub-selected-value {
        position: absolute;
        top: -7px;
        .sub-select-list {
          position: absolute;
          top: 33px;
          background: white;
          //width: 160px;
          box-shadow: 1px 1px 1px 1px #D9D9D9;
          z-index: 9;
          .sub-select-item {
            width: auto;
            min-width: 7.25rem;
            height: 2.5rem;
            line-height: 2.5rem;
            position: relative;
            text-align: left;
            img {
              position: absolute;
              top: 50%;
              right: 0;
              transform: translate(-0.1rem, -50%);
              width: .8125rem;
              height: .625rem;
            }
          }
        }
      }
  }
</style>
<script type="text/ecmascript-6">
  export default{
    data(){
      return{
        showData: false
      }
    },
    props: {
      dataList:Array,
      selectedValue: Object,//传回父组件的选择值
      widthData:{
        type: String,
        default: "160px"
      }
    },
    methods: {
      showDataList(){
        this.showData=!this.showData
      },
      select(item,index){
        this.showData=false;
        console.log("选择");
        console.log(item);
        console.log(index);
        //this.selectedValue=item;
        //赋值的时候要分开写
        this.selectedValue.key=item.key;
        this.selectedValue.value=item.value;
        this.$emit('select');
        console.log("0"+this.selectedValue.value);
      },
    },
    mounted(){
    }
  }
</script>
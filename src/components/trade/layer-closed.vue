<template>
  <div :class="{'layer-closed':'black' === themeValue, 'layer-closed-white': 'white' === themeValue}">
    <div class="content" style="padding-top: 10px;">
      <div class="text" style="padding-left: 68px;padding-right:45px;">
        <span class="icon"></span>
        <!--<span class="text1">{{text1}}</span><br>-->
        <span class="text2">{{`确定以价格 ${closedData.price} USDT, 数量 ${closedData.size} 手平仓吗`}}</span><br>
        <span class="text3">{{$t('message.layerClosed.text3')}}</span>
      </div>
    </div>
    <layer-button :close="popClose" :confirm="confirm"></layer-button>
  </div>
</template>

<script>
  import LayerButton from './layer-button.vue'
  import SwapsApi from '@/assets/js/api/swapsApi'
  export default {
    name: 'layer-closed',
    components: {
      LayerButton
    },
    props: {
      closedData: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        
      }
    },
    computed: {
      // 主题
      themeValue () {
        return this.$store.state.dictionary.theme
      },
    },
    methods: {
      popClose () {
        this.$emit('popClose')
      },
      confirm () {
        SwapsApi.orderPlace(this.closedData).then(res => {
          this.$emit('confirm')
        }).catch(err => {
          console.log(err)
          this.$emit('confirm',err)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("../../assets/css/theme");
  .layer-closed {
    .themeBlack();
    background-color: @layerCloseBgColor;
    color: @fontColor;
    .content {
      position: relative;
      margin: 0 auto;
      text-align: center;
      // padding-top: 10px;
      .text {
        padding-bottom: 28px;
        span {
          color: @fontColor;
        }
        .text1 {
          font-size: 14px;
          color: @downColor;
        }
        .text2 {
          text-align: left;
          display: inline-block;
          font-size: 16px;
        }
        .text3 {
          display: inline-block;
          width: 100%;
          text-align: left;
          font-size: 12px;
          color: #7889A9!important;
        }
        .icon {
          position: absolute;
          top: 10px;
          left: 26px;
          width: 42px;
          height: 42px;
          background: url("../../assets/images/newUI/sell.png") no-repeat;
          // background-color: #F6A217;
          background-size: cover;
          border:1px solid transparent;
          border-radius: 100%;
          display: block;
        }
      }
    }
  }
  .layer-closed-white {
    .themeWhite();
    background-color: @boxBgColor;
    color: @fontColor;
    .content {
      position: relative;
      margin: 0 auto;
      text-align: center;
      // padding-top: 10px;
      .text {
        padding-bottom: 28px;
        span {
          color: #24324C;
        }
        .text1 {
          font-size: 14px;
          color: @downColor;
        }
        .text2 {
          text-align: left;
          display: inline-block;
          font-size: 16px;
        }
        .text3 {
          display: inline-block;
          width: 100%;
          text-align: left;
          font-size: 12px;
          color: #7889A9!important;
        }
        .icon {
          position: absolute;
          top: 10px;
          left: 20px;
          width: 42px;
          height: 42px;
          background: url("../../assets/images/newUI/sell.png") no-repeat;
          // background-color: #F6A217;
          background-size: cover;
          border:1px solid transparent;
          border-radius: 100%;
          display: block;
        }
      }
    }
  }
</style>

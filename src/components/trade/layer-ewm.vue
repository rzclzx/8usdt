<template>
  <div :class="{'layer-ewm': 'black' === themeValue,'layer-ewm-white': 'white' === themeValue}"
    class="layer-ewm">
    <div class="img"></div>
    <p class="text">{{$t('message.toolbar.ewm')}}</p>
  </div>
</template>

<script>
  export default {
    name: 'layer-ewm',
    data() {
      return {}
    },
    computed: {
      // 主题
      themeValue () {
        return this.$store.state.dictionary.theme
      }
    },
  }
</script>

<style lang="less" scoped="">
  @import "../../assets/css/theme";
  .layer-ewm {
    .themeBlack();
    position: absolute;
    width: 172px;
    height: 195px;
    padding: 20px;
    background-color: @ewmBgColor;
    .img {
      width: 128px;
      height: 128px;
      background-image: url("../../assets/images/newUI/toolbar/ewm.png");
      background-size: cover;
    }
    .text {
      margin-top: 8px;
      width: 100%;
      height: 17px;
      line-height: 17px;
      text-align: center;
      font-size: 12px;
      color: #fff;
    }
  }
  .layer-ewm-white {
    .themeWhite();
    box-shadow: 0 4px 10px 0 rgba(89,122,185,0.15);
    position: absolute;
    width: 172px;
    height: 195px;
    padding: 20px;
    background-color: @boxBgColor;
    .img {
      width: 128px;
      height: 128px;
      background-image: url("../../assets/images/newUI/toolbar/ewm.png");
      background-size: cover;
    }
    .text {
      margin-top: 8px;
      width: 100%;
      height: 17px;
      line-height: 17px;
      text-align: center;
      font-size: 12px;
      color:  #24324C;
    }
  }
</style>
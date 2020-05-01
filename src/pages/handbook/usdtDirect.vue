<template>
  <div>
    usdt新手指导
    <st-row class="toHistory" justify="center" align="center">
      <div class="mouse"></div>
      <p class="text1" v-html="$t('message.direct.handbook.paragraph6.p2')"></p>
      <router-link class="text2" to="/handbook/usdtContract#1" v-html="$t('message.direct.navigation.secondaryTitle6')"></router-link>
    </st-row>
  </div>
</template>

<script>
  export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .toHistory {
    width: 100%;
    height: 58px;
    background: #F5F6FA;
    .mouse {
      width: 12px;
      height: 16px;
      background: url('../../assets/images/handbook/mouse.svg');
      background-size: 100% 100%;
    }
    .text1 {
      margin-top: 0;
      padding: 0;
      margin-left: 9px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #24324C;
      line-height: 22px;
    }
    .text2 {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #697FD5;
      line-height: 22px;
      text-decoration: underline;
    }
  }
</style>

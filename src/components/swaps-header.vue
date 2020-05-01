<template>
  <st-row :class="{'swaps-header': themeValue === 'black', 'swaps-header-white': themeValue === 'white', 'scroll': true}" align="center">
    <a :class="['logo', $i18n.locale]" :href="apiConfig.mainDomain"></a>
    <!--<div class="line line-30"></div>-->
    <st-row class="nav" align="center">
      <st-row class="item" align="center">
        <a :href="apiConfig.mainDomain">{{$t('message.header.index')}}</a>
      </st-row>
      <st-row class="item" align="center">
        <a :href="apiConfig.swapsDomain">{{ $t('message.header.trade') }}</a>
      </st-row>
      <st-row class="item" align="center">
        <router-link class="usdt" :to="`/trade/${$store.state.market.contract[0].id}`" :class="{active: $route.path.indexOf('trade/') > 0}">
          {{ $t('message.header.usdtTrade') }}
          <span id="usdt" class="hot"></span>
        </router-link>
      </st-row>
      <st-row class="item" align="center">
        <router-link to="/handbook/instructions" active-class="active">{{ $t('message.header.guide') }}</router-link>
      </st-row>
      <st-row class="item" align="center">
        <router-link :to="'/history/'+$route.params.id" active-class="active">{{ $t('message.header.tradeHistory') }}</router-link>
      </st-row>
      <!-- <st-row class="item" align="center">
        <router-link to="/direct">{{$t('message.header.newPlayer')}}</router-link>
      </st-row> -->
      <!--<st-row class="item" align="center">-->
        <!--<router-link to="/show">{{$t('message.header.userShow')}}</router-link>-->
      <!--</st-row>-->
    </st-row>
    <div class="blank"></div>
    <st-row class="user" align="center">
      <!-- 资产 -->
      <st-row class="asset" align="center">
        <div class="asset_pic"></div>
        <p>{{$t('message.header.asset')}}</p>
        <span class="arrow"></span>
        <!--<span :class="{'arrow': themeValue === 'black', 'arrow-white': themeValue === 'white'}"></span>-->
        <asset-info></asset-info>
      </st-row>
      <div class="line line-10"></div>
      <!-- 账户 -->
      <template v-if="userInfo">
        <!--<a @click="logout" :href="apiConfig.swapsDomain">{{ $t('message.header.logout') }}</a>-->
        <!--<div class="line line-10"></div>-->
        <!--<a style="color: #fff;" :href="apiConfig.mainDomain + 'users'">{{ $t('message.header.user') }}：{{ userInfo.nickName }}</a>-->
        <!--<span class="arrow"></span>-->
        <div class="userInfo">
          <a :href="apiConfig.userDomain + 'users'">{{ $t('message.header.user') }}：{{ userInfo.nickName }}</a>
          <span class="arrow"></span>
          <!--<span :class="{'arrow': themeValue === 'black', 'arrow-white': themeValue === 'white'}"></span>-->
          <user-info></user-info>
        </div>

      </template>
      <!-- 登录 -->
      <template v-else>
        <a class="normal" :href="'https://www.baidu.com'">{{ $t('message.header.login') }}</a>
        <div class="line line-10"></div>
        <a class="normal" :href="apiConfig.mainDomain + 'manage/register'">{{ $t('message.header.register') }}</a>
      </template>
      <!-- 语言选择 -->
      <st-language style="margin: 10px 0 0 20px;"></st-language>
    </st-row>
  </st-row>
</template>
<script>
  import ApiConfig from '@/assets/js/config/api.config'
  import Product from '@/assets/js/config/product'
  import Cookie from '@/assets/js/config/cookie'
  import UserApi from '@/assets/js/api/userApi'
  // import StSelect from './trade/select/select'
  // import StOption from './trade/select/option'
  // 0930新UI
  import UserInfo from './trade/new-header-user-info'
  import AssetInfo from './trade/asset-info.vue'

  export default {
    name: 'swaps-header',
    components: {
      // StSelect,
      // StOption,
      UserInfo,
      AssetInfo
    },
    data () {
      return {
        apiConfig: ApiConfig,
        isAction: '',
        initText: Product(this.$i18n)[0].name,
        currentHref: '',
        isScroll: false
      }
    },
    computed: {
      userInfo () {
        return this.$store.state.user.userInfo
      },
      product () {
        return Product(this.$i18n)
      },
      // 主题
      themeValue () {
        return this.$store.state.dictionary.theme
      }
    },
    watch: {
      '$store.state.dictionary.scrollTop' (val) {
        this.isScroll = val === 0 ? false : true
      }
    },
    methods: {
      logout () {
        Cookie.clearCookie('token', ApiConfig.domain)
        this.$store.commit('SET_COOKIE', { token: null })
        this.$store.commit('SAVE_USER_INFO', { data: null })
      },
      selectItem (href, name) {
        window.location.href = href
      },
      // 触发计算器
      showCalculateFloat () {
        this.$store.commit('SAVE_CALCULATE_FLOAT', true)
      }
    },
    mounted () {
      lottie.loadAnimation({
        path: '/static/json/hot.json',   // json文件路径
        loop: true,
        autoplay: true,
        renderer: 'svg',  // 渲染方式，有"html"、"canvas"和"svg"三种
        container: document.getElementById('usdt')
      })
    },
    created () {
      // console.log(this.userInfo)
      this.currentHref = window.location.href
      if (Cookie.getCookie('token')) {
        UserApi.getUserInfo().then(res => {
          // console.log(res)
          this.$store.commit('SET_USERINFO', res.data.info)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../assets/css/theme";
  .scroll {
    width: 100%;
    position: fixed!important;
    top: 0!important;
    left: 0!important;
    z-index: 9999;
  }
  .swaps-header {
    .themeBlack();
    padding-left: 30px;
    padding-right: 30px;
    min-width: 1366px;
    height: 50px;
    background: @headerBgColor;
    box-shadow: 0 2px 10px 0 #090D17;
    .logo {
      display: block;
      .flex-shrink(@val: 0);
      /*margin-right: 30px;*/
      width: 134px;
      height: 36px;
      background: url(../assets/images/58COIN_wc.png) no-repeat;
      background-size: 100% 100%;
      &.en {
        background-image: url(../assets/images/58COIN_we.png);
      }
      &.ko {
        background-image: url(../assets/images/58COIN_we.png);
      }
      &.ja {
        background-image: url(../assets/images/58COIN_we.png);
      }
      &.ru {
        background-image: url(../assets/images/58COIN_we.png);
      }
    }
    .line {
      width: 1px;
      background: @headerLoginLineColor;
    }
    .line-30 {
      height: 30px;
    }
    .line-10 {
      height: 10px;
    }
    .nav {
      margin-left: 36px;
      height: 100%;
      .item {
        position: relative;
        margin-right: 36px;
        height: 100%;
        &:last-child {
          margin-right: 0;
        }
        a {
          padding-top: 4px;
          font-size: 14px;
          color: @headerTagsNormalFontColor;
          padding-bottom: 2px;
          &:hover {
            color: #7e9efd;
          }
          &.active {
            border-bottom: 2px solid @headerTagsActiveBorderColor;
            color: #fff;
            // border-bottom: 2px solid #6c85ae;
          }
        }
        span {
          font-size: 14px;
          color: @fontColor;
          &:hover {
            color: #7e9efd;
          }
          &.active {
            // color: #6c85ae;
            // border-bottom: 2px solid #6c85ae;
          }
        }
        // 产品列表
        &.product1 {
          display: none
        }
        &.product2 {
          margin-left: 20px;
        }
        .usdt {
          position: relative;
          .hot {
            display: inline-block;
            position: absolute;
            top: 0;
            right: -14px;
            width: 14px;
            height: 16px;
          }
        }

      }
    }
    .nav-right {
      margin-left: 40px;
      height: 100%;
      .item {
        position: relative;
        margin-left: 48px;
        height: 100%;
        &:last-child {
          margin-right: 0;
        }
        a {
          font-size: 14px;
          color: @fontColor;
          &:hover {
            color: #7e9efd;
          }
        }
      }
    }
    .blank {
      .flex-grow();
    }
    .user {
      .line {
        margin: 0 15px;
      }
      a {
        font-size: 14px;
        color: @headerTagsNormalFontColor;
        &:hover {
          color: #7e9efd;
        }
      }
      .asset {
        margin-top: 10px;
        padding-bottom: 10px;
        position: relative;
        /*margin-right: 20px;*/
        .asset_pic {
          width: 16px;
          height: 16px;
          margin-top: 3px;
          margin-right: 4px;
          background-image: url("../assets/images/newUI/toolbar/zc.svg");
          background-size: 100% 100%;
          fill: @headerUserInfoPopupFontShallowColor;
        }
        p {
          font-size: 14px;
          font-weight: 400;
          color: @headerUserInfoPopupFontShallowColor;
        }
        .arrow {
          display: inline-block;
          margin-top: 6px;
          margin-left: 8px;
          width:0;
          height: 0;
          border-top: 4px solid @headerUserInfoPopupFontShallowColor;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          cursor: pointer;
          .transition(.5s)
        }
        &:hover {
          cursor: pointer;
          fill: @headerUserInfoPopupFontColor;
          .asset_pic {
            background-image: url("../assets/images/newUI/toolbar/zc_hover.svg");
            background-size: 100% 100%;

          }
          p {
            color: @headerUserInfoPopupFontColor;
          }
          .asset-info {
            display: block;
          }
          .asset-info-white {
            display: block;
          }
          .arrow {
            border-top: 4px solid @headerUserInfoPopupFontColor;
            .transform(rotate(180deg));
          }
        }
      }
      .userInfo {
        margin-top: 10px;
        padding-bottom: 10px;
        position: relative;
        a {
          color: @headerUserInfoPopupFontShallowColor;
        }
        .arrow {
          display: inline-block;
          margin-top: 6px;
          margin-left: 8px;
          width:0;
          height: 0;
          border-top: 4px solid @headerUserInfoPopupFontShallowColor;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          cursor: pointer;
          .transition(.5s)
        }
        .arrow-white {
          display: inline-block;
          margin-top: 6px;
          margin-left: 8px;
          width:0;
          height: 0;
          border-top: 4px solid #fff;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          cursor: pointer;
          .transition(.5s)
        }
        &:hover {
          a {
            color: @headerUserInfoPopupFontColor;
          }
          .user-info {
            display: block;
          }
          .user-info-white {
            display: block;
          }
          .arrow {
            border-top: 4px solid @headerUserInfoPopupFontColor;
            .transform(rotate(180deg));
          }
        }
      }
    }
    .change-version {
      margin-left: 20px;
      min-width: 70px;
      padding: 0 10px;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      text-align: center;
      color: @headerChangeVersionFontColor;
      border: 1px solid @headerLoginLineColor;
      border-radius: 100px;
      cursor: pointer;
      &:hover {
        border-color: #6c85ae;
        color: #6c85ae;
      }
    }
  }
  .swaps-header-white {
    .themeBlack();
    padding-left: 30px;
    padding-right: 30px;
    min-width: 1366px;
    height: 50px;
    background: @headerBgColor;
    box-shadow: 0 2px 10px 0 #37435fc2;
    .logo {
      display: block;
      .flex-shrink(@val: 0);
      /*margin-right: 30px;*/
      width: 134px;
      height: 36px;
      background: url(../assets/images/58COIN_wc.png) no-repeat;
      background-size: 100% 100%;
      &.en {
        background-image: url(../assets/images/58COIN_we.png);
      }
      &.ko {
        background-image: url(../assets/images/58COIN_we.png);
      }
      &.ja {
        background-image: url(../assets/images/58COIN_we.png);
      }
      &.ru {
        background-image: url(../assets/images/58COIN_we.png);
      }
    }
    .line {
      width: 1px;
      background: @headerLoginLineColor;
    }
    .line-30 {
      height: 30px;
    }
    .line-10 {
      height: 10px;
    }
    .nav {
      margin-left: 36px;
      height: 100%;
      .item {
        position: relative;
        margin-right: 36px;
        height: 100%;
        &:last-child {
          margin-right: 0;
        }
        a {
          padding-top: 4px;
          font-size: 14px;
          color: @headerTagsNormalFontColor;
          padding-bottom: 2px;
          &:hover {
            color: #7e9efd;
          }
          &.active {
            border-bottom: 2px solid @headerTagsActiveBorderColor;
            color: #fff;
            // border-bottom: 2px solid #6c85ae;
          }
        }
        span {
          font-size: 14px;
          color: @fontColor;
          &:hover {
            color: #7e9efd;
          }
          &.active {
            // color: #6c85ae;
            // border-bottom: 2px solid #6c85ae;
          }
        }
        // 产品列表
        &.product1 {
          display: none
        }
        &.product2 {
          margin-left: 20px;
        }
        .usdt {
          position: relative;
          .hot {
            display: inline-block;
            position: absolute;
            top: 0;
            right: -14px;
            width: 14px;
            height: 16px;
          }
        }

      }
    }
    .nav-right {
      margin-left: 40px;
      height: 100%;
      .item {
        position: relative;
        margin-left: 48px;
        height: 100%;
        &:last-child {
          margin-right: 0;
        }
        a {
          font-size: 14px;
          color: @fontColor;
          &:hover {
            color: #7e9efd;
          }
        }
      }
    }
    .blank {
      .flex-grow();
    }
    .user {
      .line {
        margin: 0 15px;
      }
      a {
        font-size: 14px;
        color: @headerTagsNormalFontColor;
        &:hover {
          color: #7e9efd;
        }
      }
      .asset {
        margin-top: 10px;
        padding-bottom: 10px;
        position: relative;
        /*margin-right: 20px;*/
        .asset_pic {
          width: 16px;
          height: 16px;
          margin-top: 3px;
          margin-right: 4px;
          background-image: url("../assets/images/newUI/toolbar/zc.svg");
          background-size: 100% 100%;
          fill: @headerUserInfoPopupFontShallowColor;
        }
        p {
          font-size: 14px;
          font-weight: 400;
          color: @headerUserInfoPopupFontShallowColor;
        }
        .arrow {
          display: inline-block;
          margin-top: 6px;
          margin-left: 8px;
          width:0;
          height: 0;
          border-top: 4px solid @headerUserInfoPopupFontShallowColor;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          cursor: pointer;
          .transition(.5s)
        }
        &:hover {
          cursor: pointer;
          fill: @headerUserInfoPopupFontColor;
          .asset_pic {
            background-image: url("../assets/images/newUI/toolbar/zc_hover.svg");
            background-size: 100% 100%;

          }
          p {
            color: @headerUserInfoPopupFontColor;
          }
          .asset-info {
            display: block;
          }
          .asset-info-white {
            display: block;
          }
          .arrow {
            border-top: 4px solid @headerUserInfoPopupFontColor;
            .transform(rotate(180deg));
          }
        }
      }
      .userInfo {
        margin-top: 10px;
        padding-bottom: 10px;
        position: relative;
        a {
          color: @headerUserInfoPopupFontShallowColor;
        }
        .arrow {
          display: inline-block;
          margin-top: 6px;
          margin-left: 8px;
          width:0;
          height: 0;
          border-top: 4px solid @headerUserInfoPopupFontShallowColor;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          cursor: pointer;
          .transition(.5s)
        }
        .arrow-white {
          display: inline-block;
          margin-top: 6px;
          margin-left: 8px;
          width:0;
          height: 0;
          border-top: 4px solid #fff;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          cursor: pointer;
          .transition(.5s)
        }
        &:hover {
          a {
            color: @headerUserInfoPopupFontColor;
          }
          .user-info {
            display: block;
          }
          .user-info-white {
            display: block;
          }
          .arrow {
            border-top: 4px solid @headerUserInfoPopupFontColor;
            .transform(rotate(180deg));
          }
        }
      }
    }
    .change-version {
      margin-left: 20px;
      min-width: 70px;
      padding: 0 10px;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      text-align: center;
      color: @headerChangeVersionFontColor;
      border: 1px solid @headerLoginLineColor;
      border-radius: 100px;
      cursor: pointer;
      &:hover {
        border-color: #6c85ae;
        color: #6c85ae;
      }
    }
  }
  // 产品列表
  @media only screen and (max-width: 1400px) {
    .product1 {
      display: block !important;
    }
    .product2 {
      display: none !important;
    }
  }
</style>

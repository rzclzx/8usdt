<template>
  <st-row class="common-header" align="center">
    <a :class="['logo', $i18n.locale]" :href="apiConfig.mainDomain"></a>
    <div class="line line-24"></div>
    <st-row class="main-nav" align="center">
      <!--<a :href="apiConfig.swapsDomain">{{ $t('message.header.trade') }}</a>-->
      <router-link @click="changeTags" to="/">
        {{ $t('message.header.trade') }}
      </router-link>
      <router-link :class="{'active': 'guide' === this.index }" @click="changeTags" to="/guide/BTC">
        {{ $t('message.header.guide') }}
      </router-link>
      <!--<router-link :class="{'active': 'reference' === this.index }" @click="changeTags" to="/reference">-->
        <!--{{ $t('message.header.reference') }}-->
      <!--</router-link>-->
      <router-link :class="{'active': 'information' === this.index }" @click="changeTags" :to="'/information/wallet/1'">
        {{ $t('message.header.information') }}
      </router-link>
      <router-link to="/direct" :class="{'active': 'direct' === this.index }">
        {{$t('message.header.newPlayer')}}
      </router-link>
      <router-link to="/show" :class="{'active': 'direct' === this.index }">
        {{$t('message.header.userShow')}}
      </router-link>
      <!--<router-link  @click="changeTags" to="/">-->
        <!--{{ $t('message.header.newPlayer') }}-->
      <!--</router-link>-->
      <!--<a :href="item.href" v-for="item in product" :key="item.id" :class="[currentHref.indexOf(item.href) > -1 && 'active']">{{ item.name }}</a>-->
    </st-row>
    <div class="blank">
      <!--<div class="advertising-b"></div>-->
    </div>
    <!--<st-row class="account-nav" align="center">-->
      <!--<a :href="apiConfig.mainDomain + 'account'">{{ $t('message.header.wallet') }}</a>-->
      <!--<a :href="apiConfig.mainDomain + 'account/deposit'">{{ $t('message.header.deposit') }}</a>-->
      <!--<a :href="apiConfig.mainDomain + 'account/withdraw'">{{ $t('message.header.withdraw') }}</a>-->
      <!--<a href="https://58coin-support.zendesk.com/hc/zh-cn/categories/360000038673-%E5%85%AC%E5%91%8A%E4%B8%AD%E5%BF%83" target="_blank">公告</a>-->
    <!--</st-row>-->
    <!--<div class="line line-10"></div>-->
    <template v-if="userInfo">
      <a @click="logout" :href="apiConfig.mainDomain">{{ $t('message.header.logout') }}</a>
      <div class="line line-10"></div>
      <a :href="apiConfig.mainDomain + 'users'">{{ $t('message.header.user') }}：{{ userInfo.nickName }}</a>
    </template>
    <template v-else>
      <a :href="apiConfig.mainDomain + 'manage'">{{ $t('message.header.login') }}</a>
      <div class="line line-10"></div>
      <a :href="apiConfig.mainDomain + 'manage/register'">{{ $t('message.header.register') }}</a>
    </template>
  </st-row>
</template>

<script>
  import ApiConfig from '@/assets/js/config/api.config'
  import Cookie from '@/assets/js/config/cookie'
  import Product from '@/assets/js/config/product'

  export default {
    name: 'common-header',
    data () {
      return {
        apiConfig: ApiConfig,
        product: Product,
        currentHref: '',
        index: null
      }
    },
    props: {
      isMain: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      userInfo () {
        return this.$store.state.manage.userInfo
      }
    },
    watch: {
      '$route' () {
        this.changeTags()
      }
    },
    methods: {
      logout () {
        Cookie.clearCookie('token', ApiConfig.domain)
        this.$store.commit('SET_COOKIE', { token: null })
        this.$store.commit('SAVE_USER_INFO', { data: null })
      },
      changeTags () {
        // // console.log(this.$route.path.split('/'))
        let index = this.$route.path.split('/')
        this.index = index[1]
        // // console.log('index', this.index);
      }
    },
    created () {
      this.changeTags()
      // this.index = this.$route.path.slice(1)
      this.currentHref = window.location.href
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../assets/css/theme";
  .common-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    min-width: 1300px;
    width: 100%;
    border-bottom: 1px solid #c5d4ed;
    .border-shadow(0 3px 8px rgba(205, 205, 205, .5));
    // padding: 18.5px 42px 18.5px 50px;
    padding-left: 60px;
    padding-right: 45px;
    height: 75px;
    background: #fff;
    .logo {
      display: block;
      width: 168px;
      height: 46px;
      background: url(../assets/images/58COIN_bc.png) no-repeat;
      background-size: 100% 100%;
      text-indent: -9999px;
      &.en {
        background-image: url(../assets/images/58COIN_be.png);
      }
      &.ko {
        background-image: url(../assets/images/58COIN_be.png);
      }
      &.ja {
        background-image: url(../assets/images/58COIN_be.png);
      }
      &.ru {
        background-image: url(../assets/images/58COIN_be.png);
      }
    }
    .line {
      width: 1px;
      background: #e2eafb;
    }
    .line-10 {
      margin: 0 20px;
      height: 10px;
    }
    .line-24 {
      margin-left: 40px;
      height: 24px;
    }
    a {
      font-size: 14px;
      color: #6c85ae;
      &:hover {
        color: #1e2266;
      }
    }
    .main-nav a,
    .account-nav a {
      position: relative;
      display: inline-block;
      height: 75px;
      line-height: 75px;
      margin-left: 42px;
    }
    .account-nav a {
      &:first-child {
        margin-left: 0;
      }
    }
    .blank {
      /*margin-left: 22%;*/
      .flex-grow();
      /*.advertising-b {*/
        /*display: inline-block;*/
        /*width: 329px;*/
        /*height: 14px;*/
        /*background: url('../../../58coin/assets/img/index/slogan-b.png') no-repeat;*/
      /*}*/
    }
    .active {
      border-bottom: 2px solid #6c85ae;
      /*&:after {*/
        /*position: absolute;*/
        /*bottom: 1px;*/
        /*content:' ';*/
        /*display: block;*/
        /*width: 100%;*/
        /*height: 2px;*/
        /*background-color: red;*/
      /*}*/
    }
  }
</style>

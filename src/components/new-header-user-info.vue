<template>
  <div class="user-info">
    <div style="width: 100%;">
      <div class="arrow"></div>
    </div>
    <st-row class="content" direction="column">
      <st-row class="info">
        <span class="portrait"></span>
        <st-row style="margin-left: 8px;" direction="column">
          <span class="name">{{ userInfo.nickName }}</span>
          <span class="site">{{ `上次登录地点：${userInfo.lastLoginAddress}` }}</span>
        </st-row>
      </st-row>
      <st-row class="property" direction="column">
        <p>净资产折合(BTC)</p>
        <p>5.09344643≈1896740.89CNY</p>
      </st-row>
      <st-row class="others" direction="column">
        <st-row class="item">
          <div class="icon"></div>
          <a class="text">身份认证</a>
        </st-row>
        <st-row class="item">
          <div class="icon"></div>
          <a class="text">我的邀请</a>
        </st-row>
        <st-row class="item">
          <div class="icon"></div>
          <a class="text">开发者工具</a>
        </st-row>
        <st-row class="item">
          <div class="icon"></div>
          <a class="text" @click="logout">安全退出</a>
        </st-row>
      </st-row>
    </st-row>
  </div>
</template>

<script>

  import ApiConfig from '@/assets/js/config/api.config'
  import Cookie from '@/assets/js/config/cookie'
  export default {
    name: 'user-info',
    data() {
      return {
        apiConfig: ApiConfig,
      }
    },
    computed: {
      userInfo () {
        return this.$store.state.user.userInfo || {}
      }
    },
    methods: {
      logout () {
        console.log(234)
        Cookie.clearCookie('token', ApiConfig.domain)
        this.$store.commit('SET_USERINFO', null)
      },
    }
  }
</script>

<style lang="less" scoped="">
  @import "../assets/css/theme";
  .themeBlack();
  .user-info {
    display: none;
    position: absolute;
    right: 180px;
    top: 44px;
    z-index: 9;
    .arrow {
      position: absolute;
      top: -12px;
      right: 70px;
      display: inline-block;
      margin-top: 6px;
      margin-left: 8px;
      width:0;
      height: 0;
      border-bottom: 7px solid @headerUserInfoPopupBgColor;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      cursor: pointer;
      // .transition(.5s)
    }
    .content {
      width: 240px;
      height: 262px;
      border-radius: 4px;
      background-color: @headerUserInfoPopupBgColor;
      .info {
        margin-top: 20px;
        padding-left: 20px;
        width: 100%;
        height:46px;
        // background-color: #eee;
        .portrait {
          width: 32px;
          height: 32px;
          background-image: url("../assets/images/newUI/header/portrait.png");
          background-size: cover;
        }
        .name {
          line-height: 18px;
          font-size: 14px;
          color: @headerUserInfoPopupFontColor;
        }
        .site {
          line-height: 14px;
          font-size: 12px;
          color: @headerUserInfoPopupFontShallowColor;
        }
      }
      .property {
        padding-left: 20px;
        width: 100%;
        height: 50px;
        p {
          font-size: 14px;
          color: @headerUserInfoPopupFontColor;
        }
        &:last-child {
          font-size: 16px;
        }
      }
      .others {
        width: 100%;
        height: 140px;
        .item {
          padding-top: 8px;
          padding-left: 22px;
          width: 100%;
          height: 32px;
          .icon {
            width: 14px;
            height: 14px;
            background-color: #eee;
          }
          .text {
            display: block;
            padding-left: 8px;
            font-size: 12px;
            line-height: 14px;
            color: @headerUserInfoPopupFontColor;
          }
          &:hover {
            background-color: @headerUserInfoPopupActiveColor;
          }
        }
      }
    }
  }
</style>
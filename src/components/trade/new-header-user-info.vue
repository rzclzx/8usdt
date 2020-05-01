<template>
  <div :class="{'user-info': themeValue === 'black', 'user-info-white': themeValue === 'white'}">
    <div style="width: 100%;">
      <div class="arrow"></div>
    </div>
    <st-row class="content" direction="column">
      <st-row class="info">
        <span class="portrait"></span>
        <st-row style="margin-left: 8px;" direction="column">
          <span class="name">{{ userInfo.nickName }}</span>
          <span class="site">{{ $t(`message.header.lastLogin`) }}：{{userInfo.lastLoginAddress}}</span>
        </st-row>
      </st-row>
      <!--<st-row class="property" direction="column">-->
        <!--<p>净资产折合(BTC)</p>-->
        <!--<p>{{totalAssets | splitFormat(8)}}≈{{totalCnyAssets | splitFormat(2)}}{{unit}}</p>-->
      <!--</st-row>-->
      <st-row class="others" direction="column">
        <st-row class="item">
          <div class="icon-safe"></div>
          <a class="text" :href="apiConfig.userDomain + 'users/safe'">{{ $t(`message.header.userSafe`) }}</a>
        </st-row>
        <st-row class="item">
          <div class="icon-sfz"></div>
          <a class="text" :href="apiConfig.userDomain + 'users'">{{ $t(`message.header.userAuth`) }}</a>
        </st-row>
        <st-row class="item">
          <div class="icon-wdyq"></div>
          <a class="text" :href="apiConfig.userDomain + 'users/invite'">{{ $t(`message.header.invite`) }}</a>
        </st-row>
        <st-row class="item">
          <div class="icon-kfgj"></div>
          <a class="text" :href="apiConfig.userDomain + 'users/tool'">{{ $t(`message.header.devTool`) }}</a>
        </st-row>
        <st-row class="item">
          <div class="icon-tc"></div>
          <a class="text" @click="logout">{{ $t(`message.header.logout`) }}</a>
        </st-row>
      </st-row>
    </st-row>
  </div>
</template>

<script>

  import ApiConfig from '@/assets/js/config/api.config'
  import Cookie from '@/assets/js/config/cookie'
  import AccountApi from '@/assets/js/api/accountApi'
  export default {
    name: 'user-info',
    data() {
      return {
        apiConfig: ApiConfig,
        rateAsset: null,
        totalAssets: 0,
        totalCnyAssets: 0,
        local: 0,
        unit: 'cny'
      }
    },
    computed: {
      // 主题
      themeValue () {
        return this.$store.state.dictionary.theme
      },
      userInfo () {
        return this.$store.state.user.userInfo
      },
    },
    methods: {
      logout () {
        Cookie.clearCookie('token', ApiConfig.domain)
        this.$store.commit('SET_USERINFO', null);
        // 重新刷新，清空资产
        window.location.reload();
      },
      getSitesAll (local) {
        AccountApi.getSitesAll(local)
          .then(res => {
            // console.log(res)
            this.rateAsset = res.data.assets
            this.unit = res.data.assets[0].currencyName || 'CNY'
            this.totalAssets = 0
            this.totalCnyAssets = 0
            for (let i = 0; i < res.data.assets.length; i++) {
              this.totalAssets += Number(res.data.assets[i].assets)
              this.totalCnyAssets += Number(res.data.assets[i].cnyAssets)
            }
            // console.log(this.totalAssets, this.totalCnyAssets)
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    mounted (){
      this.local = this.$i18n.locale === 'en' ? 1 : this.$i18n.locale === 'ko' ? 3 : this.$i18n.locale === 'ja' ? 2 : this.$i18n.locale === 'ru' ? 4 : 0
      this.getSitesAll(this.local)
    }
  }
</script>

<style lang="less" scoped="">
  @import "../../assets/css/theme";
  .user-info {
    .themeBlack();
    display: none;
    position: absolute;
    right: -73px;
    top: 30px;
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
      height: 234px;
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
          background-image: url("../../assets/images/newUI/header/portrait.png");
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
        /*height: 140px;*/
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
            font-weight: 350;
            line-height: 14px;
            color: @headerUserInfoPopupFontColor;
          }
          &:hover {
            background-color: @headerUserInfoPopupActiveColor;
          }
          .icon-safe {
            width: 16px;
            height: 16px;
            background-image: url("../../assets/images/newUI/toolbar/safe.svg");
            background-size: 100% 100%;
          }
          .icon-sfz {
            width: 14px;
            height: 14px;
            background-image: url("../../assets/images/newUI/toolbar/sfz.svg");
            background-size: 100% 100%;
          }
          .icon-wdyq {
            width: 14px;
            height: 14px;
            background-image: url("../../assets/images/newUI/toolbar/wdyq.svg");
            background-size: 100% 100%;
          }
          .icon-kfgj {
            width: 14px;
            height: 14px;
            background-image: url("../../assets/images/newUI/toolbar/kfgj.svg");
            background-size: 100% 100%;
          }
          .icon-tc {
            width: 14px;
            height: 14px;
            background-image: url("../../assets/images/newUI/toolbar/tc.svg");
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  .user-info-white {
    .themeWhite();
    display: none;
    position: absolute;
    right: -73px;
    top: 30px;
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
      border-bottom: 7px solid @boxBgColor;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      cursor: pointer;
      // .transition(.5s)
    }
    .content {
      width: 240px;
      height: 234px;
      border-radius: 4px;
      background-color: @boxBgColor;
      box-shadow: 0 4px 10px 0 rgba(89,122,185,0.15);
      .info {
        margin-top: 20px;
        padding-left: 20px;
        width: 100%;
        height:46px;
        // background-color: #eee;
        .portrait {
          width: 32px;
          height: 32px;
          background-image: url("../../assets/images/newUI/header/portrait.png");
          background-size: cover;
        }
        .name {
          line-height: 18px;
          font-size: 14px;
          color: #24324C;
        }
        .site {
          line-height: 14px;
          font-size: 12px;
          color: #7889A9;
        }
      }
      .property {
        padding-left: 20px;
        width: 100%;
        height: 50px;
        p {
          font-size: 14px;
          color: #24324C;
        }
        &:last-child {
          font-size: 16px;
        }
      }
      .others {
        width: 100%;
        /*height: 140px;*/
        .item {
          padding-top: 8px;
          padding-left: 22px;
          width: 100%;
          height: 32px;
          .icon {
            width: 14px;
            height: 14px;
            // background-color: #eee;
          }
          .text {
            display: block;
            padding-left: 8px;
            /*font-weight: 350;*/
            font-size: 12px;
            line-height: 14px;
            color: #24324C;
          }
          &:hover {
            background-color: #F3F7FE;
            .text {
              color: #597AB9;
            }
              .icon-safe {
                  width: 16px;
                  height: 16px;
                  background: url("../../assets/images/newUI/toolbar/safe_hover.svg");
                  background-size: 100% 100%;
              }
              .icon-sfz {
                  width: 14px;
                  height: 14px;
                  background-image: url("../../assets/images/newUI/toolbar/sfz_hover.svg");
                  background-size: 100% 100%;
              }
              .icon-wdyq {
                  width: 14px;
                  height: 14px;
                  background-image: url("../../assets/images/newUI/toolbar/wdyq_hover.svg");
                  background-size: 100% 100%;
              }
              .icon-kfgj {
                  width: 14px;
                  height: 14px;
                  background-image: url("../../assets/images/newUI/toolbar/kfgj_hvoer.svg");
                  background-size: 100% 100%;
              }
              .icon-tc {
                  width: 14px;
                  height: 14px;
                  background-image: url("../../assets/images/newUI/toolbar/tc_hover.svg");
                  background-size: 100% 100%;
              }
          }
          .icon-safe {
            width: 16px;
            height: 16px;
            background: url("../../assets/images/newUI/toolbar/safe_white.svg");
            background-size: 100% 100%;
          }
          .icon-sfz {
            width: 14px;
            height: 14px;
            background-image: url("../../assets/images/newUI/toolbar/sfz_white.svg");
            background-size: 100% 100%;
          }
          .icon-wdyq {
            width: 14px;
            height: 14px;
            background-image: url("../../assets/images/newUI/toolbar/wdyq_white.svg");
            background-size: 100% 100%;
          }
          .icon-kfgj {
            width: 14px;
            height: 14px;
            background-image: url("../../assets/images/newUI/toolbar/kfgj_white.svg");
            background-size: 100% 100%;
          }
          .icon-tc {
            width: 14px;
            height: 14px;
            background-image: url("../../assets/images/newUI/toolbar/tc_white.svg");
            background-size: 100% 100%;
          }
        }
      }
    }
  }
</style>

<template>
  <div :class="{'asset-info': themeValue === 'black', 'asset-info-white': themeValue === 'white'}">
    <div style="width: 100%;">
      <div class="arrow"></div>
    </div>
    <div class="content">
      <st-row class="property" direction="column" @callback="toAssets">
        <p>{{ $t(`message.header.marketableAssets`, {current: 'BTC'}) }}</p>
        <p>{{totalAssets | splitFormat(8)}}≈{{totalCnyAssets | splitFormat(2)}}{{unit}}</p>
      </st-row>
      <st-row class="others" direction="column">
        <st-row class="item">
          <div class="icon-safe"></div>
          <a class="text" :href="apiConfig.userDomain + `account/deposit/`">{{ $t(`message.header.deposit`) }}</a>
        </st-row>
        <st-row class="item">
          <div class="icon-sfz"></div>
          <a class="text" :href="apiConfig.userDomain + `account/withdraw/`">{{ $t(`message.header.withdraw`) }}</a>
        </st-row>
      </st-row>
    </div>

  </div>
</template>

<script>
  import ApiConfig from '@/assets/js/config/api.config'
  import Cookie from '@/assets/js/config/cookie'
  import AccountApi from '@/assets/js/api/accountApi'
  export default {
    data () {
      return {
        apiConfig: ApiConfig,
        rateAsset: null,
        totalAssets: 0,
        totalCnyAssets: 0,
        unit: 'cny'
      }
    },
    computed: {
      themeValue () {
        return this.$store.state.dictionary.theme
      },
      userInfo () {
        return this.$store.state.manage.userInfo
      }
    },
    methods: {
      toAssets () {
        window.location.href = `${this.apiConfig.userDomain}account`
      },
      logout () {
        Cookie.clearCookie('token', ApiConfig.domain)
        this.$store.commit('SET_COOKIE', { token: null })
        this.$store.commit('SAVE_USER_INFO', { data: null })
      },
      getSitesAll (local) {
        AccountApi.getSitesAll(local)
            .then(res => {
              this.rateAsset = res.data.assets
              this.unit = res.data.assets[0].currencyName || 'CNY'
              this.totalAssets = 0
              this.totalCnyAssets = 0
              for (let i = 0; i < res.data.assets.length; i++) {
                this.totalAssets += Number(res.data.assets[i].assets)
                this.totalCnyAssets += Number(res.data.assets[i].cnyAssets)
              }
            })
            .catch(e => {
                console.log(e)
            })
      }
    },
    mounted () {
      this.local = this.$i18n.locale === 'en' ? 1 : this.$i18n.locale === 'ko' ? 3 : this.$i18n.locale === 'ja' ? 2 : this.$i18n.locale === 'ru' ? 4 : 0
      this.getSitesAll(this.local)
    }
  }
</script>

<style lang="less" scoped="">
  @import "../../assets/css/theme";
  .asset-info {
    display: none;
    position: absolute;
    // right: -155px;
    left: -15px;
    top: 30px;
    z-index: 999;
    .themeBlack();
    // cursor: pointer;
    padding-bottom: 8px;
    // width: 233px;
    min-width: 233px;
    max-width: 400px;
    width: auto;
    /*height: 146px;*/
    background: @headerUserInfoPopupBgColor;
    border-radius: 4px;
    box-shadow: 0 10px 10px 0 rgba(21,22,39,0.40);
    .arrow {
      position: absolute;
      top: -7px;
      left: 75px;
      display: inline-block;
      /*margin-top: 6px;*/
      /*margin-left: 50%;*/
      transform: translateX(-50%);
      width:0;
      height: 0;
      border-bottom: 7px solid @headerUserInfoPopupBgColor;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      cursor: pointer;
      // .transition(.5s)
    }
    .content {
      /*height: 146px;*/
      padding-right: 20px;
      .property {
        padding: 19px 0 10px 20px;
        p:nth-child(1) {
          line-height: 20px;
          font-size: 14px;
          font-weight: 300;
          color: @headerUserInfoPopupFontColor;
        }
        p:nth-child(2) {
          line-height: 20px;
          font-size: 16px;
          font-weight: 300;
          color: @headerUserInfoPopupFontColor;
        }
      }
      .others {;
        width: 100%;
        cursor: pointer;
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
            width: 14px;
            height: 14px;
            background-image: url("../../assets/images/newUI/toolbar/cz.svg");
            background-size: 100% 100%;
          }
          .icon-sfz {
            width: 14px;
            height: 14px;
            background-image: url("../../assets/images/newUI/toolbar/tx.svg");
            background-size: 100% 100%;
          }

        }
      }
    }
  }
  .asset-info-white {
    display: none;
    position: absolute;
    right: -155px;
    top: 30px;
    z-index: 999;
    .themeBlack();
    // cursor: pointer;
    padding-bottom: 8px;
    width: 233px;
    /*height: 146px;*/
    background-color: @headerTagsActiveFontColor;
    box-shadow: 0 4px 10px 0 rgba(89,122,185,0.15);
    border-radius: 4px;
    .arrow {
      position: absolute;
      top: -7px;
      left: 75px;
      display: inline-block;
      /*margin-top: 6px;*/
      /*margin-left: 50%;*/
      transform: translateX(-50%);
      width:0;
      height: 0;
      border-bottom: 7px solid @headerTagsActiveFontColor;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      cursor: pointer;
      // .transition(.5s)
    }
    .content {

      .property {
        padding: 19px 0 10px 20px;
        p:nth-child(1) {
          line-height: 20px;
          font-size: 14px;
          font-weight: 350;
          color: #24324C;
        }
        p:nth-child(2) {
          line-height: 20px;
          font-size: 16px;
          font-weight: 350;
          color: #24324C;
        }
      }
      .others {;
        width: 100%;
        cursor: pointer;
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
            color: #24324C;
          }
          &:hover {
            background-color: #F3F7FE;
            .text {
              color: #597AB9;
            }
            .icon-safe {
              width: 14px;
              height: 14px;
              background-image: url("../../assets/images/newUI/toolbar/cz_hover.svg");
              background-size: 100% 100%;
            }
            .icon-sfz {
              width: 14px;
              height: 14px;
              background-image: url("../../assets/images/newUI/toolbar/tx_hover.svg");
              background-size: 100% 100%;
            }
          }
          .icon-safe {
            width: 14px;
            height: 14px;
            background-image: url("../../assets/images/newUI/toolbar/cz_white.svg");
            background-size: 100% 100%;
          }
          .icon-sfz {
            width: 14px;
            height: 14px;
            background-image: url("../../assets/images/newUI/toolbar/tx_white.svg");
            background-size: 100% 100%;
          }

        }
      }
    }
  }
</style>
<template>
  <div :class="{'trade-index':'black' === themeValue, 'trade-index-white': 'white' === themeValue}" style="width:100%;">
    <swaps-header></swaps-header>
    <st-row style="margin-top: 50px;width:100%;" class="main clearfix">
      <!-- <div :style="{width: $store.state.dictionary.boxWidth + 'px', height: $store.state.dictionary.boxHeight + 'px', minWidth: $store.state.dictionary.boxWidth + 'px'}"></div> -->
      <trade-tags></trade-tags>
      <div class="content" :style="contentStyle+';overflow:hidden;'">
        <st-row>
          <product-market class="margin">
            <trading-view></trading-view>
          </product-market>
          <trade-list ref="trade-list" class="margin margin-left10"></trade-list>
        </st-row>
        <st-row class="bottom" style="margin-top: 10px">
          <trade-detail-list></trade-detail-list>
          <div>
            <st-row>
              <asset-information></asset-information>
              <trade-operate style="margin-left: 10px;"></trade-operate>
            </st-row>
            <!-- <deep></deep> -->
          </div>
        </st-row>
      </div>
      <!-- <div :style="{width: $store.state.dictionary.barWidth + 'px', height: $store.state.dictionary.barHeight + 'px', minWidth: $store.state.dictionary.barWidth + 'px'}"></div> -->
      <toolbar></toolbar>
    </st-row>
    <st-footer style="background-color: #141625;" :product="product"></st-footer>
    <!--<common-float v-if="!showCal"-->
                  <!--@showCalculate="showCalculator()"-->
                  <!--:text="$t('message.calculate.title')"></common-float>-->
    <!--<trade-calculate v-if="showCal" @closeCal="closeCal"></trade-calculate>-->
  </div>
</template>

<script>
import ApiConfig from '@/assets/js/config/api.config'
import Product from '@/assets/js/config/product'
import store from '@/store/index'
import SwapsApi from '@/assets/js/api/swapsApi'
import WsRq from "@/assets/js/request"
import Socket from "@/assets/js/ws"
import Sub from "@/assets/js/sub"
import SwapsHeader from '@/components/swaps-header.vue'
import CommitEntrust from '@/components/trade/commit-entrust.vue'
import Toolbar from '@/components/trade/toolbar'
import TradeTags from '@/components/trade/new-trade-tags'
import TradingView from '@/components/trade/trading-view.vue'
import ProductMarket from '@/components/trade/product-market.vue'
import TradeList from '@/components/trade/trade-list'
import TradeDetailList from '@/components/trade/trade-detail-list'
import AssetInformation from '@/components/trade/asset-information'
import TradeOperate from '@/components/trade/trade-operate'
// import Deep from '@/components/trade/deep'

export default {
  name: 'TradePage',
  data () {
    return {
      wsRq: new WsRq(),
      socket: new Socket(ApiConfig.webSocketURL),
      sub: {},
      routeId: this.$route.params.id,
      isSpread: false,
      boxHeight: 0,
      boxWidth: '',
      barWidth: '10px',
      contentStyle: ''
    }
  },
  computed: {
    product () {
      return Product(this.$i18n)
    },
    themeValue () {
      return this.$store.state.dictionary.theme
    },
    screenWidth () {
      return this.$store.state.dictionary.screenWidth
    },
    screenHeight () {
      return this.$store.state.dictionary.screenHeight
    },
    wsOrder () {
      return this.$store.state.market.wsOrder
    }
  },
  components: {
    SwapsHeader,
    CommitEntrust,
    Toolbar,
    TradeTags,
    TradingView,
    ProductMarket,
    TradeList,
    TradeDetailList,
    AssetInformation,
    TradeOperate,
    // Deep
  },
  watch: {
    '$store.state.dictionary.barWidth' () {
      this.contentStyle = 'width: ' + (this.$store.state.dictionary.screenWidth-(this.$store.state.dictionary.barWidth + this.$store.state.dictionary.boxWidth)).toString() + 'px'
    },
    '$store.state.dictionary.boxWidth' () {
      this.contentStyle = 'width: ' + (this.$store.state.dictionary.screenWidth-(this.$store.state.dictionary.barWidth + this.$store.state.dictionary.boxWidth)).toString() + 'px'
    },
    '$store.state.market.connect': {
      handler (val) {
        if (val) {
          this.wsRq.clear()
          this.sub.subAll(this.routeId)
        } else {
          this.wsRq.getAll(this.routeId, true)
        }
      }
    },
    '$route': {
      handler (val) {
        this.routeId = val.params.id
        this.close()
      }
    },
    '$store.state.dictionary.screenWidth': {
      handler (val) {
        this.contentStyle = 'width: ' + (this.$store.state.dictionary.screenWidth-(this.$store.state.dictionary.barWidth + this.$store.state.dictionary.boxWidth)).toString() + 'px'
        if ( val <= 1366 ) {
          this.isSpread = true
        } else {
          this.isSpread = false
        }
        if ( this.screenHeight <= 760 || this.screenWidth <= 1366 ) {
          this.boxHeight = 1058
        } else {
          this.boxHeight = 1190
        }
      },
      immediate: true
    },
    '$store.state.dictionary.screenHeight': {
      handler (val) {
        if ( this.screenHeight <= 760 || this.screenWidth <= 1366 ) {
          this.boxHeight = 1058
        } else {
          this.boxHeight = 1190
        }
      },
      immediate: true
    },
    isSpread: {
      handler (val) {
        if (val) {
          this.boxWidth = '50px'
        } else {
          this.boxWidth = '170px'
        }
      },
      immediate: true
    },
    wsOrder (val) {
      // console.log('future_order', val)
      let res = this.getEmergeMessage2(val)
      setTimeout(() => {
        // console.log('res::::', res)
        // this.$emerge({message: result.message, className: result.className, title: result.title})
        this.$emerge({message: res.message, className: res.className})
      }, 500)
    },
  },
  created () {
    this.contentStyle = 'width: ' + (this.$store.state.dictionary.screenWidth-(this.$store.state.dictionary.barWidth + this.$store.state.dictionary.boxWidth)).toString() + 'px'

    if (this.$store.state.market.tradeFirst) {
      this.init()
      this.$store.commit('SET_TRADEFIRST', false)
    } else {
      this.close()
      this.routeId = this.$route.params.id
      this.sub = new Sub(this.$store.state.market.contract)
    }
    // this.$emerge()
    // this.$emerge({message: 123, className: '', title: 123})
  },
  methods: {
    getEmergeMessage2 (data) {
      let result = {
        message: '',
        className: ' normal'
      }
      let wsData = data[0]
      // console.log(wsData)
      // let type = this.getEmergeType(wsData.type)
      // let status = this.getEmergeStatus(wsData.status, wsData.reason, wsData.type)
      let color = this.getEmergeColor(wsData.side)
      let text = this.getEmergeText(wsData.operationType, wsData.status)
      // let side = this.getEmergeSide(wsData.side)
      // let price = this.getEmergePrice(wsData.price, wsData.type)
      //let reason = this.getEmergeReason(wsData.reason, type, side, price, Math.abs(wsData.size), status)
      // result.title = status
      // console.log('99as0d9f',color, text)
      result.message = text
      result.className = color
      if (wsData.reason) {
        result.message = this.$t('message.errorCode.' + 10200001)
      }
      return result
    },
    getEmergeText (index, status) {
      // console.log('getText', index, status)
      let text = ''
      switch (index) {
        case 300:
          text =  this.$t('message.emerge.entrustSuccess');
          break;
        case 306:
          text = this.$t('message.emerge.revocationSuccess');
          break;
        case 307:
          text = this.$t('message.emerge.revocationBachSuccess');
          break;
        case 304:
          if (status === 1) {
            text = this.$t('message.emerge.entrustPart');
          } else if (status === 2) {
            text = this.$t('message.emerge.entrustAll');
          }
          break;
        case 305:
          if (status === 1) {
            text = this.$t('message.emerge.entrustPart');
          } else if (status === 2) {
            text = this.$t('message.emerge.entrustAll');
          }
          break;
      }
      return text
    },
    getEmergeType (index) {
      let type = ''
      switch (index) {
        case 1 : type = this.$t('message.emerge.limit')
          break;
        case 2 : type = this.$t('message.emerge.market')
          break;
        case 20 : type = this.$t('message.emerge.margin')
          break
        case 21: type = this.$t('message.emerge.leverage')
      }
      return type
    },
    getEmergeStatus (index, reason, type) {
      let status = ''
      switch (index) {
        case 0 : status = this.$t('message.emerge.entrustSend')
          break;
        case 1 : status = this.$t('message.emerge.entrustPart')
          break;
        case 2 : status = this.$t('message.emerge.entrustAll')
          break;
        case 3 :
          if (type === 1) {
            if (reason === 0 ) {
              status = this.$t('message.emerge.revocationSuccess')
            } else {
              if (reason === 30010) {
                status = this.$t('message.emerge.revocationSuccess')
              } else {
                status = this.$t('message.emerge.revocationFailed')
              }
            }
          }
          if (type === 2) {
            status = this.$t('message.emerge.prompt')
          }
          break;
        case 4 : status = this.$t('message.emerge.entrustFailed')
          break;
        default: status = this.$t('message.emerge.prompt')
      }
      if (type === 20) {
        status = this.$t('message.emerge.adjustMargin')
      }
      if (type === 21) {
        status = this.$t('message.emerge.adjustLeverage')
      }
      return status
    },
    getEmergeSide (index) {
      let side = ''
      switch (index) {
        case 1 : side = this.$t('message.emerge.buy')
          break;
        case 2 : side = this.$t('message.emerge.sell')
          break;
      }
      return side
    },
    getEmergePrice (price, type) {
      let resPrice = ''
      if (type === 2) {
        return resPrice = ''
      } else {
        return resPrice = price
      }
    },
    getEmergeColor (index) {
      let color = ''
      switch (index) {
        case 1 : color = ' green'
          break;
        case 2 : color = ' red'
          break;
      }
      return color
    },
    getEmergeReason (index, type, side, price, size, status) {
      let reason = ''
      if (index === 0) {
        if (type === this.$t('message.emerge.margin') || type === this.$t('message.emerge.leverage') || status === this.$t('message.emerge.revocationSuccess')) {
          reason = this.$t('message.common.success')
        } else {
          reason = this.$t('message.emerge.text1',{type:type, price: price, side:side, size: size})
        }
      } else {
        reason = this.$dictionary.wsError(index)
      }
      return reason
    },
    close () {
      window.ws.close()
    },
    init () {
      this.wsRq.getAll(this.routeId)
      this.sub = new Sub(this.$store.state.market.contract)
      this.socket.connection()
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/css/theme";
  .clearfix:after {
    content: ".";
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
    font-size:0;
  }
  .clearfix {
    *zoom:1;
  }
  .trade-index {
    .themeBlack();
    position: relative;
    min-height: 100%;
    padding-bottom: 210px;
    background: @tradeBgColor;
    .main {
      .left {
        width: 280px;
      }
      .content {
        // width: 100%;
        .flex();
        // margin-left: 10px;
        .product-info {
          .flex();
        }
        .entrust-list {
          margin-left: 10px;
          width: 252px;
        }
        .history-list {
          margin-left: 10px;
          width: 252px;
        }
        .tags {
          padding-bottom: 10px;
        }
      }
    }
    .margin {
      margin-top: 10px;
    }
    .margin-right10 {
      margin-right: 10px;
    }
    .margin-left10 {
      margin-left: 10px;
    }
  }
  .trade-index-white {
    .themeWhite();
    position: relative;
    min-height: 100%;
    padding-bottom: 210px;
    background: #ECF0F7;
    .main {
      // padding: 10px;
      .left {
        width: 280px;
      }
      .content {
        width: 100%;
        .flex();
        // margin-left: 10px;
        .product-info {
          .flex();
        }
        .entrust-list {
          margin-left: 10px;
          width: 252px;
        }
        .history-list {
          margin-left: 10px;
          width: 252px;
        }
        .tags {
          padding-bottom: 10px;
        }
      }
    }
    .margin {
      margin-top: 10px;
    }
    .margin-right10 {
      margin-right: 10px;
    }
    .margin-left10 {
      margin-left: 10px;
    }
  }
  /*guosk Float布局*/
  .left-box {
    float: left;
    width: 170px;
    margin-left: -100%;
    position: relative;
    left: 100%;
    &.left-off {
      width: 50px;
    }
  }
  .center-box {
    width: 100%;
    float: left;
    padding-left: 170px;
    padding-right: 48px;
    &.left-off {
      padding-left: 50px;
    }
    &.right-off {
      padding-right: 10px;
    }
  }
  .right-box {
    position: relative;
    z-index: 5;
    float: left;
    margin-left: -48px;
    width: 48px;
    &.right-off {
      width: 10px;
      margin-left: -10px;
    }
  }
  @media screen and (max-width: 1366px) {
    .center-box {
      padding-right: 46px;
    }
    .right-box {
      margin-left: -46px;
      width: 46px;
    }
  }
  /*@media only screen and (max-width: 1352px) {*/
    /*.trade-index {*/
      /*.main {*/
        /*.left {*/
          /*width: 280px;*/
        /*}*/
      /*}*/
    /*}*/
  /*}*/
</style>

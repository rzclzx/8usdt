// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 导入样式
import '@/assets/css/base.less'
import '@/assets/css/theme.less'
import '@/assets/css/icon/iconfont.css'

// 基本依赖
import router from '@/router'
import VueI18n from 'vue-i18n'
import store from './store/index'
import Filter from '@/assets/js/filter'
import Dictionary from '@/assets/js/dictionary'

// 导入UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Row from '@/components/st-ui/row'
import Footer from '@/components/st-ui/footer'
import Language from '@/components/st-ui/language'
import { Toast } from './components/st-ui/toast'
import { Emerge } from './components/st-ui/emerge'
import Scrollbar from './components/st-ui/scrollbar/index'
import Slider from './components/st-ui/slider'
import LangConfig from '@/assets/js/i18n/config'

import StCN from '@/assets/js/i18n/lang/cn'
import StEN from '@/assets/js/i18n/lang/en'
import StKO from '@/assets/js/i18n/lang/ko'
import StRU from '@/assets/js/i18n/lang/ru'

import CommonCH from '@/assets/js/i18n/common/cn.json'
import CommonEN from '@/assets/js/i18n/common/en.json'
import CommonKO from '@/assets/js/i18n/common/ko.json'
import CommonRU from '@/assets/js/i18n/common/ru.json'
import CommonJA from '@/assets/js/i18n/common/ja.json'

import CN from '@/assets/js/i18n/cn'
import EN from '@/assets/js/i18n/en'
import KO from '@/assets/js/i18n/ko'
import JA from '@/assets/js/i18n/ja'
import RU from '@/assets/js/i18n/ru'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import koLocale from 'element-ui/lib/locale/lang/ko'
import jaLocale from 'element-ui/lib/locale/lang/ja'
import ruLocale from 'element-ui/lib/locale/lang/ru-RU'
import ElementLocale from 'element-ui/lib/locale'

import SwapsApi from '@/assets/js/api/swapsApi'


Vue.config.productionTip = false
Vue.prototype.$emerge = Emerge
Vue.use(Row)
Vue.use(Footer)
Vue.use(Toast)
Vue.use(Scrollbar)
Vue.use(Slider)
Vue.use(ElementUI)
Vue.prototype.$toast = Toast
Vue.prototype.$filter = Filter
for (let key in Filter) {
  Vue.filter(key, Filter[key])
}

// 多语言配置
const messages = {
  en: {
    message: EN,
    ...StEN,
    ...CommonEN,
    ...enLocale
  },
  cn: {
    message: CN,
    ...StCN,
    ...CommonCH,
    ...zhLocale
  },
  ko: {
    message: KO,
    ...StKO,
    ...CommonKO,
    ...koLocale
  },
  ja: {
    message: JA,
    ...StCN,
    ...CommonJA,
    ...jaLocale
  },
  ru: {
    message: RU,
    ...StRU,
    ...CommonRU,
    ...ruLocale
  }
}
Vue.use(Language)
Vue.use(VueI18n)
const hasLanguage = function (lang, obj) {
  let localeList = Object.keys(obj)
  return localeList.some(item => item === lang) ? lang : 'en'
}
const i18n = new VueI18n({
  locale: hasLanguage(LangConfig.getLang(), messages),    // 语言标识
  messages
})

Vue.use(Dictionary, i18n)
ElementLocale.i18n((key, value) => i18n.t(key, value))

// 跳转后返回顶部
// router.afterEach(() => {
//   window.scrollTo(0, 0)
// })
// SwapsApi.getContractAllList().then(res => {
//   let arr = res.data.contractList || []
//   arr = Filter.reRepeatArr(arr, 'id')
//   arr.forEach(item => {
//     if (!item.contractParam) {
//       item.contractParam = {}
//     }
//   })
//   store.commit('SET_CONTRACT', arr)
//   new Vue({
//     el: '#app',
//     router,
//     i18n,
//     store,
//     components: { App },
//     template: '<App/>',
//     mounted () {
//       setTimeout(() => {
//         document.getElementById('loading').style.display = 'none'
//       }, 1000)
//     }
//   })
// }).catch(err => {
//   console.log(err)
// })
let arr = [
  {
    baseCurrencyInterestRate: 0.0003,
    contractParam: null,
    currencyId: 1,
    fundingInterval: 3,
    fundingRateCompareLastPercent: 0.75,
    fundingRatePercent: 0.75,
    id: 1,
    indexPriceAvgPercent: 0.5,
    initialMarginBtc: 0.1,
    interestRatePremiumIndexAbsolute: 0.0005,
    intervalHour: 8,
    maintenanceMarginRate: 0.005,
    makerCommision: 0.00015,
    maxCommision: 0.0003,
    maxLeverage: 100,
    multiplier: -100000000,
    name: "BTC/USD 永续",
    orderDelay: 3500,
    quoteCurrencyInterestRate: 0.0006,
    sorted: 800,
    status: 0,
    tableName: "xbt",
    takerCommision: 0.0003,
    unit: "btc",
    value: 1
  },{
    baseCurrencyInterestRate: 0.0003,
    contractParam: null,
    currencyId: 1,
    fundingInterval: 3,
    fundingRateCompareLastPercent: 0.75,
    fundingRatePercent: 0.75,
    id: 1,
    indexPriceAvgPercent: 0.5,
    initialMarginBtc: 0.1,
    interestRatePremiumIndexAbsolute: 0.0005,
    intervalHour: 8,
    maintenanceMarginRate: 0.005,
    makerCommision: 0.00015,
    maxCommision: 0.0003,
    maxLeverage: 100,
    multiplier: -100000000,
    name: "BTC/USD 永续",
    orderDelay: 3500,
    quoteCurrencyInterestRate: 0.0006,
    sorted: 800,
    status: 0,
    tableName: "xbt",
    takerCommision: 0.0003,
    unit: "btc",
    value: 1
  },{
    baseCurrencyInterestRate: 0.0003,
    contractParam: null,
    currencyId: 1,
    fundingInterval: 3,
    fundingRateCompareLastPercent: 0.75,
    fundingRatePercent: 0.75,
    id: 1,
    indexPriceAvgPercent: 0.5,
    initialMarginBtc: 0.1,
    interestRatePremiumIndexAbsolute: 0.0005,
    intervalHour: 8,
    maintenanceMarginRate: 0.005,
    makerCommision: 0.00015,
    maxCommision: 0.0003,
    maxLeverage: 100,
    multiplier: -100000000,
    name: "BTC/USD 永续",
    orderDelay: 3500,
    quoteCurrencyInterestRate: 0.0006,
    sorted: 800,
    status: 0,
    tableName: "xbt",
    takerCommision: 0.0003,
    unit: "btc",
    value: 1
  },{
    baseCurrencyInterestRate: 0.0003,
    contractParam: null,
    currencyId: 1,
    fundingInterval: 3,
    fundingRateCompareLastPercent: 0.75,
    fundingRatePercent: 0.75,
    id: 1,
    indexPriceAvgPercent: 0.5,
    initialMarginBtc: 0.1,
    interestRatePremiumIndexAbsolute: 0.0005,
    intervalHour: 8,
    maintenanceMarginRate: 0.005,
    makerCommision: 0.00015,
    maxCommision: 0.0003,
    maxLeverage: 100,
    multiplier: -100000000,
    name: "BTC/USD 永续",
    orderDelay: 3500,
    quoteCurrencyInterestRate: 0.0006,
    sorted: 800,
    status: 0,
    tableName: "xbt",
    takerCommision: 0.0003,
    unit: "btc",
    value: 1
  },{
    baseCurrencyInterestRate: 0.0003,
    contractParam: null,
    currencyId: 1,
    fundingInterval: 3,
    fundingRateCompareLastPercent: 0.75,
    fundingRatePercent: 0.75,
    id: 1,
    indexPriceAvgPercent: 0.5,
    initialMarginBtc: 0.1,
    interestRatePremiumIndexAbsolute: 0.0005,
    intervalHour: 8,
    maintenanceMarginRate: 0.005,
    makerCommision: 0.00015,
    maxCommision: 0.0003,
    maxLeverage: 100,
    multiplier: -100000000,
    name: "BTC/USD 永续",
    orderDelay: 3500,
    quoteCurrencyInterestRate: 0.0006,
    sorted: 800,
    status: 0,
    tableName: "xbt",
    takerCommision: 0.0003,
    unit: "btc",
    value: 1
  },{
    baseCurrencyInterestRate: 0.0003,
    contractParam: null,
    currencyId: 1,
    fundingInterval: 3,
    fundingRateCompareLastPercent: 0.75,
    fundingRatePercent: 0.75,
    id: 1,
    indexPriceAvgPercent: 0.5,
    initialMarginBtc: 0.1,
    interestRatePremiumIndexAbsolute: 0.0005,
    intervalHour: 8,
    maintenanceMarginRate: 0.005,
    makerCommision: 0.00015,
    maxCommision: 0.0003,
    maxLeverage: 100,
    multiplier: -100000000,
    name: "BTC/USD 永续",
    orderDelay: 3500,
    quoteCurrencyInterestRate: 0.0006,
    sorted: 800,
    status: 0,
    tableName: "xbt",
    takerCommision: 0.0003,
    unit: "btc",
    value: 1
  },{
    baseCurrencyInterestRate: 0.0003,
    contractParam: null,
    currencyId: 1,
    fundingInterval: 3,
    fundingRateCompareLastPercent: 0.75,
    fundingRatePercent: 0.75,
    id: 1,
    indexPriceAvgPercent: 0.5,
    initialMarginBtc: 0.1,
    interestRatePremiumIndexAbsolute: 0.0005,
    intervalHour: 8,
    maintenanceMarginRate: 0.005,
    makerCommision: 0.00015,
    maxCommision: 0.0003,
    maxLeverage: 100,
    multiplier: -100000000,
    name: "BTC/USD 永续",
    orderDelay: 3500,
    quoteCurrencyInterestRate: 0.0006,
    sorted: 800,
    status: 0,
    tableName: "xbt",
    takerCommision: 0.0003,
    unit: "btc",
    value: 1
  }
]
  arr = Filter.reRepeatArr(arr, 'id')
  arr.forEach(item => {
    if (!item.contractParam) {
      item.contractParam = {}
    }
  })
  store.commit('SET_CONTRACT', arr)
  new Vue({
    el: '#app',
    router,
    i18n,
    store,
    components: { App },
    template: '<App/>',
    mounted () {
      setTimeout(() => {
        document.getElementById('loading').style.display = 'none'
      }, 1000)
    }
  })

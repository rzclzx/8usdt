// vuex状态管理
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import market from './modules/market'
import dictionary from './modules/dictionary'
import account from './modules/account'
import manage from './modules/manage'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    market,
    account,
    dictionary,
    manage
  }
})

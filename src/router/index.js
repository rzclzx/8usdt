import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

Vue.use(Router)

const redirect = (to, from, next) => {
  let id = store.state.market.contract.filter(item => {
    return item.id.toString() === to.params.id
  })[0]
  if (id) {
    next()
  } else {
    next({
      path: `/trade/1001`,
      replace: true
    })
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      beforeEnter: (to, from, next) => {
        next({
          path: `/trade/${store.state.market.contract[0].id}`,
          replace: true
        })
      }
    },
    {
      path: '/trade/:id',
      beforeEnter: redirect,
      name: 'TradePage',
      component: resolve => require(['@/pages/trade/index'], resolve)
    },
    {
      path: '/history/:id',
      name: 'historyPage',
      component: resolve => require(['@/pages/history/index'], resolve)
    },
    {
      path: '/handbook',
      component: resolve => require(['@/pages/handbook/index'], resolve),
      children: [
        {path: '', component: resolve => require(['@/pages/handbook/direct'], resolve)},
        {path: 'compensate/:id', component: resolve => require(['@/pages/handbook/compensate'], resolve)},
        {path: 'insurance/:id', component: resolve => require(['@/pages/handbook/insurance'], resolve)},
        {path: 'instructions', component: resolve => require(['@/pages/handbook/instructions/index'], resolve)},
        {path: 'nounExplanation', component: resolve => require(['@/pages/handbook/nounExplanation'], resolve)},
        {path: 'price/:id', component: resolve => require(['@/pages/handbook/price'], resolve)},
        {path: 'usdtCompensate/:id', component: resolve => require(['@/pages/handbook/usdtCompensate'], resolve)},
        {path: 'usdtInsurance/:id', component: resolve => require(['@/pages/handbook/usdtInsurance'], resolve)},
        {path: 'usdtDirect', component: resolve => require(['@/pages/handbook/usdtDirect'], resolve)},
        {path: 'usdtContract', component: resolve => require(['@/pages/handbook/usdtContract/index'], resolve)}
      ]
    }
  ]
})

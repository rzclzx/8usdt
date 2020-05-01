import Utils from '@/assets/js/utils'
import { stat } from 'fs';
let state = {
  operatePrice: {
    value: ''
  },
  connect: false,
  historyList: [],
  wsOrder:null,
  contract: [],
  tickers: {},
  specialLastPrice: '0',
  market: {},
  kTime: '5min',
  kLasttime: '',
  kType: 2,
  kDieState: false,
  changeKtime: false,
  order: {},
  firstOrder: false,
  currentPosition: {},
  orderCloseFire: false,
  position: {},
  tradeFirst: true,
  buyOne: '',
  sellOne: '',
  positionList: null,
  batchWithdrawal: null,
  popoverStatus: false,
  popoverStatus1: false,
  popoverStatus2: false,
  popoverStatus3: false
}

let mutations = {
  SET_POPOVER_STATUS (state, data) {
    state.popoverStatus = data
  },
  SET_POPOVER_STATUS1 (state, data) {
    state.popoverStatus1 = data
  },
  SET_POPOVER_STATUS2 (state, data) {
    state.popoverStatus2 = data
  },
  SET_POPOVER_STATUS3 (state, data) {
    state.popoverStatus3 = data
  },
  SET_BATCH_WITHDRAWAL (state, data) {
    state.batchWithdrawal = data
  },
  SET_POSITION_LIST (state, data) {
    state.positionList = data
  },
  SET_SELLONE (state, data) {
    state.sellOne = data
  },
  SET_BUYONE (state, data) {
    state.buyOne = data
  },
  SET_OPERATEPRICE (state, data) {
    state.operatePrice.value = data
    state.operatePrice = Utils.deepCopy(state.operatePrice)
  },
  SET_TRADEFIRST (state, data) {
    state.tradeFirst = data
  },
  SET_POSITION (state, data) {
    state.position[data.contractId] = data
    state.position = Utils.deepCopy(state.position)
  },
  SET_ORDERCLOSEFIRE (state, data) {
    state.orderCloseFire = data
  },
  SET_CURRENTPOSITION (state, data) {
    state.currentPosition = data
  },
  SET_KDIESTATE (state, data) {
    state.kDieState = data
  },
  SET_FIRSTORDER (state, data) {
    state.firstOrder = data
  },
  SET_KTYPE (state, data) {
    state.kType = data
  },
  SET_CHANGEKTIME (state, data) {
    state.changeKtime = data
  },
  SET_KTIME (state, data) {
    state.kTime = data
  },
  SET_KLASTTIME (state, data) {
    state.kLasttime = data
  },
  SET_HISTORYLIST (state, data) {
    state.historyList = data || []
  },
  SET_WS_ORDER(state, data) {
    state.wsOrder = data || null
  },
  SET_CONNECT (state, data) {
    state.connect = data
  },
  SET_TICKERS (state, data) {
    state.tickers[data.productId] = data
    state.tickers = Utils.deepCopy(state.tickers)
  },
  SET_CONTRACT (state, data) {
    state.contract = data
  },
  SET_SPECIALLASTPRICE (state, data) {
    state.specialLastPrice = data || '0'
  },
  SET_MARKET (state, data) {
    state.market[data.contractId] = data
    state.market = Utils.deepCopy(state.market)
  },
  SET_ORDER (state, data) {
    state.order[data.id] = data.data
    state.order = Utils.deepCopy(state.order)
  }
}
// 合并深度，在永续合约的基础上做了一部分修改（断线重连确保数据准确性）
let actions = {
  saveOrder (context, payload) {
    context.commit('SET_ORDER', {
      id: payload.product,
      data: orderBookData(payload.data, payload.product)
    })
  }
}

function orderBookData (data, id) {
  if (state.firstOrder) {
    mutations['SET_FIRSTORDER'](state, false)
    return data
  }
  let oldData = state.order[id]
  let obj = {}
  obj['bids'] = formatOrderBook(oldData, data, 'bids')
  obj['asks'] = formatOrderBook(oldData, data, 'asks')
  return obj
}

function formatOrderBook (oldData, newData, type) {
  if (newData && oldData && newData[type] && oldData[type]) {
    for (let i = newData[type].length; i--;) {
      let bl = true
      for (let j = oldData[type].length; j--;) {
        if (Number(newData[type][i][0]) > Number(oldData[type][j][0])) {
          if (Number(newData[type][i][1]) !== 0) {
            oldData[type].splice(j + 1, 0, newData[type][i])
          }
          bl = false
          break
        } else if (Number(newData[type][i][0]) === Number(oldData[type][j][0])) {
          if (Number(newData[type][i][1]) === 0) {
            oldData[type].splice(j, 1)
          } else {
            oldData[type].splice(j, 1, newData[type][i])
          }
          bl = false
          break
        }
      }
      if (bl && Number(newData[type][i][1]) !== 0) {
        oldData[type].unshift(newData[type][i])
      }
    }
    return oldData[type]
  } else if (newData) {
    return newData[type] || []
  }
}

export default {
  state,
  mutations,
  actions
}

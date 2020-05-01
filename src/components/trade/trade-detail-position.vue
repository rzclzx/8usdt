<template>
  <div :class="{'trade-detail-position-new':'black' === themeValue, 'trade-detail-position-new-white': 'white' === themeValue}">
    <div class="table-wrapper" style="width: 100%;">
      <el-table :data="list" height="246" id="table1" class="el-table-content table1" v-if="list.length > 0"
        @row-click='choice'
        :cell-style="selectedHighlight"
        :row-class-name="tableRowClassName"
        >
        <el-table-column  prop="name" width="130" :label="$t('message.transactionList.currency')" >
          <template slot-scope="scope">
            <div v-show="scope.row.id !=='last'">
              <span :class="[scope.row.side === 1 ? 'buyColorBg point' : 'sellColorBg point']"></span>
              <span style="font-weight: bold;">{{ contractInfo[scope.row.contractId] }}</span>
              <span :class="[scope.row.side === 1 ? 'buyColor' : 'sellColor']">
                {{ scope.row.side === 1 ? $t('message.transactionList.more') : $t('message.transactionList.less') }}
              </span>
            </div>
            <div v-show="scope.row.id ==='last'">
              <span>{{ $t('message.transactionList.total') }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column  prop="" min-width="80" align="right" :label="$t('message.transactionList.totalPosition')" >
          <template slot-scope="scope">
            <span>{{ scope.row.positionQty }}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="" min-width="100"  align="right" :label="$t('message.transactionList.available')" >
          <template slot-scope="scope">
            <span>{{ scope.row.availablePositionQty }}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="" min-width="150" align="right" :label="$t('message.transactionList.avgPrice')" >
          <template slot-scope="scope">
            <span>{{ scope.row.entryPrice | splitFormat(4) }}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="" min-width="120" align="right" :label="$t('message.transactionList.occupationMargin')" >
          <template slot-scope="scope">
            <span>{{ scope.row.positionMargin | splitFormat(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="" min-width="100" align="right" :label="$t('message.transactionList.unrealisedPNL')" >
          <template slot-scope="scope">
            <span v-if="scope.row.id!=='last'">{{ getUnrealizedPL(scope.row) | splitFormat(2) }}</span>
            <span v-else>{{ scope.row.totalUnRealised | splitFormat(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="" min-width="150" align="right" :label="$t('message.transactionList.actualLeverage')" >
          <template slot-scope="scope">
            <span>{{ scope.row.leverage | splitFormat(2) }}</span>
          </template>
        </el-table-column>
        
        <el-table-column  prop="" min-width="90" align="right" :label="$t('message.transactionList.profitability')" >
          <template slot-scope="scope">
            <span v-show="scope.row.id !== 'last'">{{ getRate(scope.row) + '%' }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" prop="" min-width="140"
                          :label="$t('message.transactionList.operate')" >
          <template slot-scope="scope">
            <span :class="{'detail-position': themeValue === 'black', 'detail-position-white': themeValue === 'white'}">
              <a v-show="scope.row.id !== 'last'" @click="closeBtn(scope.row)" id="closeTrade1" :class="{'button': true, 'button1': true, 'button3':true}" style="font-weight:600;">{{ $t('message.transactionList.closePosition') }} </a>
              <!-- <a v-show="scope.row.id ==='last'" @click="expand" class="showMore">
                <i :class="{'iconfont':true,'icon-xiangxiazhanhang':!$store.state.dictionary.isExpand,'icon-xiangshangzhanhang':$store.state.dictionary.isExpand}"></i>
                {{ $store.state.dictionary.isExpand?$t('message.transactionList.collapse'):$t('message.transactionList.expand') }}
              </a> -->
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="list1" height="32"  id="table2"  class="el-table-content table2" v-if="list.length > 0"
        :show-header="false"
        :cell-style="selectedHighlight"
        :row-class-name="tableRowClassName1"
        >
        <el-table-column  prop="name" width="130" :label="$t('message.transactionList.currency')" >
          <template slot-scope="scope">
            <div v-show="scope.row.id !=='last'">
              <span :class="[scope.row.side === 1 ? 'buyColorBg point' : 'sellColorBg point']"></span>
              <span style="font-weight: bold;">{{ contractInfo[scope.row.contractId] }}</span>
              <span :class="[scope.row.side === 1 ? 'buyColor' : 'sellColor']">
                {{ scope.row.side === 1 ? $t('message.transactionList.more') : $t('message.transactionList.less') }}
              </span>
            </div>
            <div v-show="scope.row.id ==='last'">
              <span>{{ $t('message.transactionList.total') }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column  prop="" min-width="80" align="right" :label="$t('message.transactionList.totalPosition')" >
          <template slot-scope="scope">
            <span>{{ scope.row.positionQty }}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="" min-width="100"  align="right" :label="$t('message.transactionList.available')" >
          <template slot-scope="scope">
            <span>{{ scope.row.availablePositionQty }}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="" min-width="150" align="right" :label="$t('message.transactionList.avgPrice')" >
          <template slot-scope="scope">
            <span>{{ scope.row.entryPrice | splitFormat(4) }}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="" min-width="120" align="right" :label="$t('message.transactionList.occupationMargin')" >
          <template slot-scope="scope">
            <span>{{ scope.row.positionMargin | splitFormat(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="" min-width="100" align="right" :label="$t('message.transactionList.unrealisedPNL')" >
          <template slot-scope="scope">
            <span v-if="scope.row.id!=='last'">{{ getUnrealizedPL(scope.row) | splitFormat(2) }}</span>
            <span v-else>{{ scope.row.totalUnRealised | splitFormat(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="" min-width="150" align="right" :label="$t('message.transactionList.actualLeverage')" >
          <template slot-scope="scope">
            <span>{{ scope.row.leverage | splitFormat(2) }}</span>
          </template>
        </el-table-column>
        
        <el-table-column  prop="" min-width="90" align="right" :label="$t('message.transactionList.profitability')" >
          <template slot-scope="scope">
            <span v-show="scope.row.id !== 'last'">{{ getRate(scope.row) + '%' }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" prop="" min-width="140"
                          :label="$t('message.transactionList.operate')" >
          <template slot-scope="scope">
            <span :class="{'detail-position': themeValue === 'black', 'detail-position-white': themeValue === 'white'}">
              <a v-show="scope.row.id !== 'last'" @click="closeBtn(scope.row)" id="closeTrade1" :class="{'button': true, 'button1': true, 'button3':true}" style="font-weight:600;">{{ $t('message.transactionList.closePosition') }} </a>
              <!-- <a v-show="scope.row.id ==='last'" @click="expand" class="showMore">
                <i :class="{'iconfont':true,'icon-xiangxiazhanhang':!$store.state.dictionary.isExpand,'icon-xiangshangzhanhang':$store.state.dictionary.isExpand}"></i>
                {{ $store.state.dictionary.isExpand?$t('message.transactionList.collapse'):$t('message.transactionList.expand') }}
              </a> -->
            </span>
          </template>
        </el-table-column>
      </el-table>
      <st-row class="no-data" justify="center" v-if="showN">
        <p>{{ $t('message.transactionList.noPosition') }}</p>
      </st-row>
    </div>
    <popup :title="$t('message.transactionList.A_Close')"
           :callback="popClose"
           :boxWidth="showClosed ? '320px' : '420px'"
           :bottomB='bottomB'
           v-if="showPop">
      <closed :popData="popData"
              v-if="showClosed"
              @popClose="popClose"
              @confirm="closeCallback"
      >
      </closed>
      <layer-trade :orderData="closeReData" v-if="showCloseConfirm"></layer-trade>
      <layer-button :close="popClose" :confirm="orderConfirmCallback" v-if="showCloseConfirm"></layer-button>
    </popup>
    <!--一般提示框 toast 提示-->
    <toast v-show="showToast" :message="toastMessage"></toast>
  </div>
</template>

<script>
  import Popup from './popup.vue';
  import LayerButton from './layer-button.vue'
  import Closed from './closed.vue'
  import StopProfit from './stop-profit.vue'
  import StopLoss from './stop-loss.vue'
  import SwapsApi from '@/assets/js/api/swapsApi'
  import LayerTrade from './layer-trade.vue'
  import LayerClosed from './layer-closed.vue'
  import Toast from '../../components/trade/toast.vue'
  import Utils from '@/assets/js/utils'

  export default {
    name: 'trade-detail-position',
    components: {
      Popup,
      LayerButton,
      Closed,
      // StopProfit,
      // StopLoss,
      LayerTrade,
      LayerClosed,
      Toast
    },
    data () {
      return {
        disPost: false,
        toastMessage: '',
        showToast: false,
        orderData: {
          type: 1,
          side: 123,
          price: 123,
          size: 123,
          leverage: 100
        },
        listData: [],
        list: [],
        list1: [],
        showN: false,
        showPop: false,
        showClosed: false,
        // showStopProfit: false,
        // showStopLoss: false,
        popData: {},
        closeReData: null,
        showCloseConfirm: false,
        current: 0,
        totalUnRealised: 0,
        totalPositionMargin: 0,
        expandTop: 0,
        getindex: 0,
        bottomB: ''
      }
    },
    computed: {
      contractInfo() {
        let tmp = {}
        this.$store.state.market.contract.filter(item => {
          tmp[item.id] = item.name
        })
        return tmp
      },
      contract() {
        return this.$store.state.market.contract || []
      },
      themeValue () {
        return this.$store.state.dictionary.theme
      },
      market () {
        return this.$store.state.market.market || {}
      },
      scrollLeft () {
        return document.getElementById('table1')?document.getElementById('table1').getElementsByClassName('el-table__body-wrapper')[0].scrollLeft:0
      }
    },
    watch: {
      '$route': {
        handler(val) {
          this.refresh()
        },
        immediate: true
      },
      '$store.state.dictionary.isExpand': {
        handler (val) {
          this.getList()
        },
        immediate: true
      },
      '$store.state.market.orderCloseFire' () {
        this.closeBtn(this.$store.state.market.currentPosition)
      },
      '$store.state.dictionary.screenWidth': {
        handler (val) {
          if (val <= 1366) {
            this.expandTop = 340
          } else {
            this.expandTop = 472
          }
          if (this.list.length) {
            this.fixedTotal()
          }
        },
        immediate: true
      },
      "$store.state.user.userInfo" () {
        if (!this.$store.state.user.userInfo) {
          this.list= []
          this.showN = true
        } else {
          this.refresh()
        }
      },
      '$store.state.market.wsOrder' () {
        this.refresh()
      }
    },
    mounted () {
      this.refresh()
      let that = this
      setTimeout(function(){
        if (that.list.length > 0) {
          document.getElementById('table1').getElementsByClassName('el-table__body-wrapper')[0].onscroll = function (e) {
            document.getElementById('table2').getElementsByClassName('el-table__body-wrapper')[0].scrollLeft = e.target.scrollLeft
          }
          document.getElementById('table2').getElementsByClassName('el-table__body-wrapper')[0].onscroll = function (e) {
            document.getElementById('table1').getElementsByClassName('el-table__body-wrapper')[0].scrollLeft = e.target.scrollLeft
          }
        }
        
      },1000)
      
    },
    methods: {
      fixedTotal () {
        setTimeout(function () {
          let headers = document.getElementsByClassName('headerclass')[0].getElementsByTagName('th');
          let last =document.getElementsByClassName('list-last')[0].getElementsByTagName('td')
          let ss=0
          for (let i=0;i<headers.length;i++){
            last[i].style.width = headers[i].offsetWidth +'px'
            ss+= headers[i].offsetWidth
          }
          document.getElementsByClassName('list-last')[0].style.width = ss + 'px'
        },300)
      },
      getInfo (id, arr) {
        let obj = arr.filter(item => {
          return item.id.toString() === id.toString()
        })[0] || {}
        return obj
      },
      getUnrealizedPL (item) {
        if (!(this.market[item.contractId] && this.market[item.contractId].indexPrice)) return 0
        if (!this.getInfo(item.contractId, this.contract)) return 0
        if (item.side === 1) {
          return this.$filter.splitFormat(Utils.mul(Utils.mul(Utils.sub(this.market[item.contractId].indexPrice, item.entryPrice), item.positionQty), this.getInfo(item.contractId, this.contract).value), this.getInfo(item.contractId, this.contract).contractParam.indexPriceFloat)
        } else {
          return this.$filter.splitFormat(Utils.mul(Utils.mul(Utils.sub(item.entryPrice, this.market[item.contractId].indexPrice), item.positionQty), this.getInfo(item.contractId, this.contract).value), this.getInfo(item.contractId, this.contract).contractParam.indexPriceFloat)
        }
      },
      getRate (item) {
        if (!this.market[item.contractId] || !this.market[item.contractId].indexPrice) return 0
        if (item.side === 1) {
          return Utils.splitFormat(Utils.mul(Utils.div(Utils.sub(this.market[item.contractId].indexPrice, item.entryPrice), item.entryPrice), 100), 2)
        } else {
          return Utils.splitFormat(Utils.mul(Utils.div(Utils.sub(item.entryPrice, this.market[item.contractId].indexPrice), item.entryPrice), 100), 2)
        }
      },
      refresh () {
        SwapsApi.getPositionList().then((res) => {
          this.listData = []
          if (res && res.data && res.data.positionTotal && res.data.positionTotal.positionList){
            this.listData = res.data.positionTotal.positionList
          }
          let obj = res.data && res.data.positionTotal || {}
          // this.listData = obj.positionDTOList || []
          this.totalUnRealised = obj.totalUnRealised
          this.totalPositionMargin = obj.totalPositionMargin
          this.getList()
          this.current = 0
          this.getindex = 0
          if (this.listData.length > 0) {
            this.saveItem()
          }
          // this.saveItem()
          this.showN = this.listData.length === 0 ? true : false
        }).catch(err => {
          this.listData = []
          this.list = []
          this.showN = true
        })
      },
      popClose () {
        this.showPop = false
        this.showClosed = false
        this.showCloseConfirm = false
        this.disPost = false
      },
      closeBtn (item) {
        if (!item.availablePositionQty) {
          this.showToastFunc(this.$t('message.createdEntrust.noLeveling'))
          return
        }
        this.popData = item
        this.showPop = true
        this.showClosed = true
        if (this.themeValue === "white") {
          this.bottomB = "1px solid #ECF0F7"
        } else {
          this.bottomB = ""
        }
      },
      closeCallback (data) {
        this.closeReData = data
        this.showClosed = false
        this.showCloseConfirm = true
      },
      showToastFunc (message) {
        if (!message) return
        this.showToast = true
        this.toastMessage = message
        setTimeout( () => {
          this.showToast = false
        }, 2000)
      },
      orderConfirmCallback (val) {
        if (this.disPost) return
        this.disPost = true
        SwapsApi.orderPlace(this.closeReData).then(res => {
          this.showToastFunc(this.$t('message.errorCode.'+res.code))
          this.popClose()
        }).catch(e => {
          this.showToastFunc(this.$t('message.errorCode.'+e.data.code))
          this.popClose()
        })
      },
      expand () {
        this.$store.commit('SET_EXPAND', !this.$store.state.dictionary.isExpand)
        if (this.$store.state.dictionary.isExpand) {
          let odom = document.documentElement || document.body
          odom.scrollTop = this.expandTop
        }
      },
      getList () {
        this.list = []
        let last = {
          "id": 'last',
          "userId": '',
          "contractId": '',//合约ID'
          "leverage": '',//杠杆'
          "positionType": '',//仓位类型 0:全仓 1:逐仓
          "side": '',//仓位方向 1:多 2:空
          "entryPrice": '',//开仓均价
          "liquidationPrice": '',//爆仓价格
          "positionQty": '',// 持仓数量
          "availablePositionQty": '',//可用仓位数量
          "positionMargin": this.totalPositionMargin,// 仓位保证金
          "totalUnRealised": this.totalUnRealised,
          "closeCommission": '',//平仓佣金
          "bankruptPrice": '',//穿仓价格
          "positionValue": '', //仓位价格
          "status":'',
          "createdDate": '',
          "modifyDate": ''
        }
        this.list = Utils.deepCopy(this.listData)
        this.list1= []
        if (this.list.length !==0 ){
          this.$store.commit("SET_POSITION_LIST",true)
          this.list1.push(last)

          this.fixedTotal()
        } else {
          this.$store.commit("SET_POSITION_LIST",false)
        }
        // if (this.$store.state.dictionary.isExpand) {
        //   this.list = Utils.deepCopy(this.listData)
        //   this.list.push(last)
        // } else {
        //   if (this.listData.length > 6) {
        //     this.list = Utils.deepCopy(this.listData.slice(0, 6))
        //     this.list.push(last)
        //   } else {
        //     this.list = Utils.deepCopy(this.listData)
        //     if (this.listData.length !==0 ){
        //       this.list.push(last)
        //     }
        //   }
        // }

      },
      selectedHighlight({row, rowIndex}) {
        if ((this.getindex) === rowIndex  && this.themeValue === "white" && row.id !=='last') {
          return {
            "background-color": "#F3F7FE"
          }
        }
        if ((this.getindex) === rowIndex  && this.themeValue === "black" && row.id !=='last') {
          return {
            "background-color": "#181E2F"
          }
        }
      },
      tableRowClassName({row, rowIndex}) {
        row.index = rowIndex
        return 'headerclass'
      },
      tableRowClassName1({row, rowIndex}) {
        if (row.id ==='last') {
          return 'list-last'
        }
      },
      choice (row, event, column) {
        if (row.id === "last") return
        this.getindex = row.index
        this.current = row.index
        this.saveItem()
      },
      saveItem () {
        this.$store.commit('SET_CURRENTPOSITION', this.listData[this.current])
      }
    },
    destroyed () {
      this.$store.commit('SET_CURRENTPOSITION', {})
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../assets/css/theme';
/deep/.table1 .el-table__body-wrapper::-webkit-scrollbar {
  display: none
 /* 隐藏滚动条，但依旧具备可以滚动的功能 */
}
/deep/.table1 .el-table__body-wrapper {
  /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
  -ms-overflow-style:none;
  /*火狐下隐藏滚动条*/
  overflow:-moz-scrollbars-none !important;
}
/deep/.table2 .el-table__fixed-right{
  height: 32px !important;
  .el-table__fixed-body-wrapper{
    height: 32px !important;
  }
  .list-last{
    height: 32px !important;
    td{
      height: 32px !important;
    }
  }
}

  .trade-detail-position-new {
    .themeBlack();
    float: left;
    width: 100%;
    min-width: 620px;
    .toast {
      position: absolute;
    }
    .table-wrapper {
      width: 100%;
      /deep/.el-table-content tr{
        background: #121723;
      }
      /deep/.el-table-content .list-last td{
        background: rgba(189,46,93,0.14) !important;
        border-bottom: none !important;
        .cell span{
          color:#C12252;
          .showMore{
            color: #CBD7F0;
            i{
              font-size: 8px;
              margin-right: 4px;
            }
          }
        }
      }
      /deep/.el-table-content .list-last td:nth-last-child(1){
        .cell{
          text-align: right;
          padding-right: 20px;
        }
      }
      table {
        width: 100%;
        /*cellspacing: "0";//表示单元格之间间隙为0。*/
        /*cellpadding: "0";*/
        border-collapse: collapse;
        thead {
          tr {
            th {
              height: 30px;
              line-height: 30px;
              color: @tradeListTheadColor;
              text-align: right;
              font-size: 12px;
              &:first-child {
                text-align: left;
                padding-left: 10px;
              }
              &:last-child {
                text-align: center;
              }
            }
          }
        }
        tbody {
          
          tr {
            td {
              height: 32px;
              line-height: 32px;
              color: @tradeListFontColor;
              font-size: 12px;
              text-align: right;
              border-top: 1px solid @tradeListBorderColor;
              border-bottom: 1px solid @tradeListBorderColor;
              &:first-child {
                text-align: left;
                padding-left: 10px;
              }
              &:last-child {
                text-align: center;
              }
            }
            .button {
              display: inline-block;
              // width: 56px;
              padding: 0 4px;
              height: 22px;
              line-height: 22px;
              font-size: 12px;
              color: @tradeListBlueFontColor;
              text-align: center;
              background-color: transparent;
              border: 1px solid transparent;
              border-radius: 3px;
            }
            &:hover {
              background-color: @tradeListHoverColor;
              .button {
                background-color: @tradeListButtonHoverColor;

              }
            }
          }
        }
      }
    }
    .title {
      //width: 100%;
      height: 40px;
      padding: 0 10px;
      border-bottom: 1px solid @tableBorderColor;
      p {
        font-size: 12px;
        color: @normalFontColor;
        text-align: right;
        &:first-child {
          text-align: left;
        }
      }
    }
    .wrap {
      position: relative;
      // width: 100%;
      height: 40px;
      padding: 0 10px;
      border-bottom: 1px solid @tableBorderColor;
      p {
        font-size: 12px;
        color: @fontColor;
        text-align: right;
        &:first-child {
          text-align: left;
        }
        /*&.margin {*/
        /*cursor: pointer;*/
        /*&:hover {*/
        /*color: #7e9efd;*/
        /*}*/
        /*}*/
      }
      .before {
        position: absolute;
        left: 1px;
        top: 0;
        width: 4px;
        height: 100%;
      }
      .input {
        margin-right: 6px;
        width: 122px;
        height: 32px;
        padding-left: 8px;
        border: solid 1px @tradeInputBorderColor;
        border-radius: 3px;
        color: @fontColor;
        background-color: @tradeInputColor;
      }
      .button {
        display: inline-block;
        // width: 110px;
        // width: 56px;
        padding:0 4px;
        height: 22px;
        line-height: 22px;
        font-size: 12px;
        color: @tradeListBlueFontColor;
        text-align: center;
        background-color: #fff;
      }
      .closed {
        color: #fff;
        background-color: #d64172;
      }
      .cancelButton {
        span {
          color: #7e9efd;
          &:hover {
            color: #666b93;
            cursor: pointer;
          }
        }
      }
      .useless {
        display: inline-block;
        width: 64px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        background-color: #313451;
        &:hover {
          background-color: #313451;
        }
      }
    }
    .tip {
      position: relative;
      display: inline-block;
      vertical-align: text-top;
      color: @normalFontColor;
      cursor: pointer;
      span {
        display: none;
      }
      &:hover {
        span {
          display: inline-block;
          width: 160px;
          height: 24px;
          line-height: 24px;
          .border-radius(2px);
          position: absolute;
          left: 58px;
          top: 0px;
          background-color: #646890;
          color: @fontColor;
          text-align: center;
          z-index: 999;
          &::after {
            content: '';
            position: absolute;
            left: -8px;
            bottom: 10px;
            width: 0;
            height: 0;
            border: 4px solid transparent;
            border-right: 4px solid @normalFontColor;
          }
        }
      }
    }
    .tipAuto {
      position: relative;
      display: inline-block;
      vertical-align: text-top;
      color: @normalFontColor;
      cursor: pointer;
      span {
        display: none;
      }
      &:hover {
        span {
          display: inline-block;
          width: 160px;
          line-height: 24px;
          .border-radius(2px);
          position: absolute;
          left: 58px;
          top: 0px;
          background-color: #646890;
          color: @fontColor;
          text-align: center;
          z-index: 999;
          &::after {
            content: '';
            position: absolute;
            left: -8px;
            bottom: 108px;
            width: 0;
            height: 0;
            border: 4px solid transparent;
            border-right: 4px solid @normalFontColor;
          }
        }
      }
    }
    .tipWidth {
      position: relative;
      display: inline-block;
      vertical-align: text-top;
      color: @normalFontColor;
      cursor: pointer;
      span {
        display: none;
      }
      &:hover {
        span {
          display: inline-block;
          width: 370px;
          line-height: 24px;
          .border-radius(2px);
          position: absolute;
          left: 58px;
          top: 0px;
          background-color: #646890;
          color: @fontColor;
          text-align: center;
          z-index: 999;
          &::after {
            content: '';
            position: absolute;
            left: -8px;
            bottom: 108px;
            width: 0;
            height: 0;
            border: 4px solid transparent;
            border-right: 4px solid @normalFontColor;
          }
        }
      }
    }
    .tipValue {
      position: relative;
      display: inline-block;
      vertical-align: text-top;
      color: @normalFontColor;
      cursor: pointer;
      span {
        display: none;
      }
      &:hover {
        span {
          display: inline-block;
          width: 320px;
          line-height: 24px;
          .border-radius(2px);
          position: absolute;
          left: 48px;
          top: 0px;
          background-color: #646890;
          color: @fontColor;
          text-align: center;
          z-index: 999;
          &::after {
            content: '';
            position: absolute;
            left: 2px;
            bottom: 108px;
            width: 0;
            height: 0;
            border: 4px solid transparent;
            border-right: 4px solid @normalFontColor;
          }
        }
      }
    }
    /*.contract-name {*/
    /*position: relative;*/
    /*.point {*/
    /*position: absolute;*/
    /*top: 1px;*/
    /*left: 1px;*/
    /*display: inline-block;*/
    /*width: 4px;*/
    /*height: 4px;*/
    /*line-height: 18px;*/
    /*border-radius: 2px;*/
    /*background-color: #fff;*/
    /*}*/
    /*}*/
    .point {
      display: inline-block;
      margin-bottom: 2px;
      width: 4px;
      height: 4px;
      line-height: 18px;
      border-radius: 2px;
      background-color: #fff;
    }
    .buyColor {
      color: #0ab480 !important;
    }
    .sellColor {
      color: @downColor !important;
    }
    .buyColorBg {
      background: #0ab480 !important;
    }
    .sellColorBg {
      background: @downColor !important;
    }
    .no-data {
      height: 100%;
      padding-top: 170px;
      background: url("../../assets/images/newUI/table-default-bg-black.png") no-repeat center 50px;
      background-size: 206px 110px;
      p {
        font-size: 12px;
        color: @fontColor;
        // color: @noDataFontColor;
      }
    }
  }
  .trade-detail-position-new-white {
    .themeWhite();
    float: left;
    width: 100%;
    min-width: 620px;
    .toast {
      position: absolute;
    }
    .table-wrapper {
      width: 100%;
      /deep/.el-table-content tr{
        background: #fff;
      }
      /deep/.el-table-content .list-last td{
        background: rgba(189,46,93,0.14) !important;
        border-bottom: none !important;
        .cell span{
          color:#C12252;
          .showMore{
            color: #24324C;
            i{
              font-size: 8px;
              margin-right: 4px;
            }
          }
        }
      }
      /deep/.el-table-content .list-last td:nth-last-child(1){
        .cell{
          text-align: right;
          padding-right: 20px;
        }
      }
      table {
        width: 100%;
        /*cellspacing: "0";//表示单元格之间间隙为0。*/
        /*cellpadding: "0";*/
        border-collapse: collapse;
        thead {
          tr {
            th {
              height: 30px;
              line-height: 30px;
              color: @tradeListTheadColor;
              text-align: right;
              font-size: 12px;
              &:first-child {
                text-align: left;
                padding-left: 10px;
              }
              &:last-child {
                text-align: center;
              }
            }
          }
        }
        tbody {
          tr {
            td {
              height: 32px;
              line-height: 32px;
              color: @tradeListFontColor;
              font-size: 12px;
              text-align: right;
              border-top: 1px solid @tradeListBorderColor;
              border-bottom: 1px solid @tradeListBorderColor;
              &:first-child {
                text-align: left;
                padding-left: 10px;
              }
              &:last-child {
                text-align: center;
              }
            }
            .button {
              display: inline-block;
              // width: 56px;
              padding: 0 4px;
              height: 22px;
              line-height: 22px;
              font-size: 12px;
              color: @tradeListBlueFontColor;
              text-align: center;
              background-color: transparent;
              border: 1px solid transparent;
              border-radius: 3px;
              &:hover {
                background-color: #597AB9;
              }
            }
            &:hover {
              background-color: @tradeListHoverColor;
              //.button {
                //background-color: @tradeListButtonHoverColor;
              //}
            }
          }
        }
      }
    }
    .title {
      //width: 100%;
      height: 40px;
      padding: 0 10px;
      border-bottom: 1px solid @tableBorderColor;
      p {
        font-size: 12px;
        color: @normalFontColor;
        text-align: right;
        &:first-child {
          text-align: left;
        }
      }
    }
    .wrap {
      position: relative;
      // width: 100%;
      height: 40px;
      padding: 0 10px;
      border-bottom: 1px solid @tableBorderColor;
      p {
        font-size: 12px;
        color: @fontColor;
        text-align: right;
        &:first-child {
          text-align: left;
        }
        /*&.margin {*/
        /*cursor: pointer;*/
        /*&:hover {*/
        /*color: #7e9efd;*/
        /*}*/
        /*}*/
      }
      .before {
        position: absolute;
        left: 1px;
        top: 0;
        width: 4px;
        height: 100%;
      }
      .input {
        margin-right: 6px;
        width: 122px;
        height: 32px;
        padding-left: 8px;
        border: solid 1px @tradeInputBorderColor;
        border-radius: 3px;
        color: @fontColor;
        background-color: @tradeInputColor;
      }
      .button {
        display: inline-block;
        // width: 110px;
        // width: 56px;
        padding: 0 4px;
        height: 22px;
        line-height: 22px;
        font-size: 12px;
        color: @tradeListBlueFontColor;
        text-align: center;
        background-color: #fff;
        &:hover {
          background-color: #597AB9;
        }
      }
      .closed {
        color: #fff;
        background-color: #d64172;
      }
      .cancelButton {
        span {
          color: #7e9efd;
          &:hover {
            color: #666b93;
            cursor: pointer;
          }
        }
      }
      .useless {
        display: inline-block;
        width: 64px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        background-color: #313451;
        &:hover {
          background-color: #313451;
        }
      }
    }
    .tip {
      position: relative;
      display: inline-block;
      vertical-align: text-top;
      color: @normalFontColor;
      cursor: pointer;
      span {
        display: none;
      }
      &:hover {
        span {
          display: inline-block;
          width: 160px;
          height: 24px;
          line-height: 24px;
          .border-radius(2px);
          position: absolute;
          left: 58px;
          top: 0px;
          background-color: #646890;
          color: @fontColor;
          text-align: center;
          z-index: 999;
          &::after {
            content: '';
            position: absolute;
            left: -8px;
            bottom: 10px;
            width: 0;
            height: 0;
            border: 4px solid transparent;
            border-right: 4px solid @normalFontColor;
          }
        }
      }
    }
    .tipAuto {
      position: relative;
      display: inline-block;
      vertical-align: text-top;
      color: @normalFontColor;
      cursor: pointer;
      span {
        display: none;
      }
      &:hover {
        span {
          display: inline-block;
          width: 160px;
          line-height: 24px;
          .border-radius(2px);
          position: absolute;
          left: 58px;
          top: 0px;
          background-color: #646890;
          color: @fontColor;
          text-align: center;
          z-index: 999;
          &::after {
            content: '';
            position: absolute;
            left: -8px;
            bottom: 108px;
            width: 0;
            height: 0;
            border: 4px solid transparent;
            border-right: 4px solid @normalFontColor;
          }
        }
      }
    }
    .tipWidth {
      position: relative;
      display: inline-block;
      vertical-align: text-top;
      color: @normalFontColor;
      cursor: pointer;
      span {
        display: none;
      }
      &:hover {
        span {
          display: inline-block;
          width: 370px;
          line-height: 24px;
          .border-radius(2px);
          position: absolute;
          left: 58px;
          top: 0px;
          background-color: #646890;
          color: @fontColor;
          text-align: center;
          z-index: 999;
          &::after {
            content: '';
            position: absolute;
            left: -8px;
            bottom: 108px;
            width: 0;
            height: 0;
            border: 4px solid transparent;
            border-right: 4px solid @normalFontColor;
          }
        }
      }
    }
    .tipValue {
      position: relative;
      display: inline-block;
      vertical-align: text-top;
      color: @normalFontColor;
      cursor: pointer;
      span {
        display: none;
      }
      &:hover {
        span {
          display: inline-block;
          width: 320px;
          line-height: 24px;
          .border-radius(2px);
          position: absolute;
          left: 48px;
          top: 0px;
          background-color: #646890;
          color: @fontColor;
          text-align: center;
          z-index: 999;
          &::after {
            content: '';
            position: absolute;
            left: 2px;
            bottom: 108px;
            width: 0;
            height: 0;
            border: 4px solid transparent;
            border-right: 4px solid @normalFontColor;
          }
        }
      }
    }
    .point {
      display: inline-block;
      margin-bottom: 2px;
      width: 4px;
      height: 4px;
      line-height: 18px;
      border-radius: 2px;
      background-color: #fff;
    }
    .buyColor {
      color: #0AB480 !important;
    }
    .sellColor {
      color: #E12961 !important;
    }
    .buyColorBg {
      background: #0AB480 !important;
    }
    .sellColorBg {
      background: #E12961 !important;
    }
    .no-data {
      height: 100%;
      padding-top: 170px;
      background: url("../../assets/images/newUI/table-default-bg-white.png") no-repeat center 50px;
      background-size: 206px 110px;
      p {
        font-size: 12px;
        color: @noDataFontColor;
      }
    }
  }
</style>

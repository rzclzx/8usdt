<template>
  <div :class="{'trade-detail-cancel':'black' === themeValue, 'trade-detail-cancel-white': 'white' === themeValue}">
    <div class="table-wrapper" style="width: 100%;">
      <el-table :data="list" max-height="278" class="el-table-content" v-if="list.length > 0"
        :cell-style="selectedHighlight"
        :row-class-name="tableRowClassName"
        >
        <el-table-column  prop="name" width="140" :label="$t('message.transactionList.currency')" >
          <template slot-scope="scope">
            <span :class="[scope.row.side === 1 ? 'buyColorBg point' : 'sellColorBg point']"></span>
            <span style="font-weight: bold;">{{ scope.row.contractName }}</span>
            <span :class="[scope.row.side === 1 ? 'buyColor' : 'sellColor']">
              {{ scope.row.side === 1 ? $t('message.transactionList.more') : $t('message.transactionList.less') }}
            </span>
          </template>
        </el-table-column>
         <el-table-column  prop="" :width="columnWidth"  align="right" :label="$t('message.transactionList.type')" >
          <template slot-scope="scope">
            <span>{{ priceType[scope.row.priceType] }}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="" min-width="100" align="right" :label="$t('message.transactionList.openLeve')" >
          <template slot-scope="scope">
            <span>{{ openLabel[scope.row.close] }}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="" min-width=""  align="right" :label="$t('message.transactionList.commissionPrice')" >
          <template slot-scope="scope">
            <span>{{ scope.row.price | splitFormat(4) }}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="" min-width="" align="right" :label="$t('message.transactionList.commissionAmount')" >
          <template slot-scope="scope">
            <span>{{ scope.row.size }}</span>
          </template>
        </el-table-column>
       <el-table-column  prop="" min-width="100" align="right" :label="$t('message.transactionList.reamaining')" >
          <template slot-scope="scope">
            <span>{{ utils.sub(scope.row.size , scope.row.executedSize) }}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="" min-width="120" align="center" :label="$t('message.transactionList.status')" >
          <template slot-scope="scope">
            <span>{{ statusFilter[scope.row.status] }}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="" min-width="128" align="center" :label="$t('message.transactionList.time')" >
          <template slot-scope="scope">
            <span>{{scope.row.createdDate | timeFormat()}}</span>
          </template>
        </el-table-column>
      </el-table>
      <st-row class="no-data" justify="center" v-if="showN">
        <p>{{ $t('message.transactionList.noData') }}</p>
      </st-row>
    </div>
  </div>
</template>

<script>
  import SwapsApi from '@/assets/js/api/swapsApi'
  import Utils from '../../assets/js/utils.js'
  export default {
    name: 'trade-detail-cancel',
    data () {
      return {
        list: [],
        showN: false,
        getindex: -1,
        statusFilter: {
          '0': this.$t(`message.transactionList.S_Unfilled`),
          '1': this.$t(`message.transactionList.S_PartialDeal`),
          '2': this.$t(`message.transactionList.S_DealDone`),
          '3': this.$t(`message.transactionList.S_Revoked`),
          '4': this.$t(`message.transactionList.S_failure`)
        },
        openLabel: {
          '0': this.$t(`message.transactionList.S_openPosition`),
          '1': this.$t(`message.transactionList.S_closePosition`)
        },
        priceType: {
          '1': this.$t('message.transactionList.S_LimitPrice'),
          '2': this.$t('message.transactionList.S_MarketPrice')
        },
        utils: Utils,
        columnWidth: '130'
      }
    },
    computed: {
      themeValue () {
        return this.$store.state.dictionary.theme
      },
      // columnWidth () {
      //   if (this.$store.state.dictionary.screenWidth >1366) {
      //     return '130'
      //   } else {
      //     return '100'
      //   }
      // }
    },
    watch: {
      '$store.state.dictionary.screenWidth' () {
        if (this.$store.state.dictionary.screenWidth > 1366) {
          this.columnWidth = '130'
        } else {
          this.columnWidth = "100"
        }
      },
      '$i18n.locale' () {
        this.statusFilter= {
          '0': this.$t(`message.transactionList.S_Unfilled`),
          '1': this.$t(`message.transactionList.S_PartialDeal`),
          '2': this.$t(`message.transactionList.S_DealDone`),
          '3': this.$t(`message.transactionList.S_Revoked`),
          '4': this.$t(`message.transactionList.S_failure`)
        }
        this.priceType= {
          '1': this.$t('message.transactionList.S_LimitPrice'),
          '2': this.$t('message.transactionList.S_MarketPrice')
        }
        this.openLabel= {
          '0': this.$t(`message.transactionList.S_openPosition`),
          '1': this.$t(`message.transactionList.S_closePosition`)
        }
      },
      '$route': {
        handler(val) {
          this.getlist()
        },
        immediate: true
      },
      "$store.state.user.userInfo" () {
        if (!this.$store.state.user.userInfo) {
          this.list= []
          this.showN = true
        } else {
          this.getlist()
        }
      },
      '$store.state.market.wsOrder' () {
        this.getlist()
      }
    },
    methods: {
      getlist () {
        SwapsApi.getOrderList({
          // contractIds: val.params.id,
          status: '3'
        }).then((res) => {
          this.list = res.data && res.data.orderList || []
          this.showN = this.list.length === 0 ? true : false
        }).catch(err => {
          this.showN = true
        })
      },
      selectedHighlight({row, rowIndex}) {
        if ((this.getindex) === rowIndex  && this.themeValue === "white") {
          return {
            "background-color": "#F3F7FE"
          }
        }
        if ((this.getindex) === rowIndex  && this.themeValue === "black") {
          return {
            "background-color": "#181E2F"
          }
        }
      },
      tableRowClassName({row, rowIndex}) {
        row.index = rowIndex
      },
      choice (row, event, column) {
        this.getindex = row.index
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../assets/css/theme';
  .trade-detail-cancel {
    .themeBlack();
    float: left;
    width: 100%;
    min-width: 620px;
    .toast {
      position: absolute;
    }
    .table {
      width: 100%;
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
            .button1 {
              // background-color: #313151;
            }
            .button2 {
              // margin-left: 8px;
              // background-color: #d64172;
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
      .button1 {
        // background-color: #313151;
      }
      .button2 {
        // margin-left: 8px;
        // background-color: #d64172;
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
  .trade-detail-cancel-white {
    .themeWhite();
    float: left;
    width: 100%;
    min-width: 620px;
    .toast {
      position: absolute;
    }
    .table {
      width: 100%;
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
            .button1 {
            }
            .button2 {
              // margin-left: 8px;
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
      .button1 {
        // background-color: #313151;
      }
      .button2 {
        // margin-left: 8px;
        // background-color: #d64172;
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

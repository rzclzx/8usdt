<template>
  <div class="fund">
    <h2>{{ $t(`message.direct.usdtInsurance.title1`) }}</h2>
    <p>{{ $t(`message.direct.usdtInsurance.paragraph1`) }}</p>
    <p style="margin-top: 0">{{ $t(`message.direct.usdtInsurance.paragraph2`) }}</p>
    <ul>
      <li :class="$route.params.id === item.id.toString() ? 'active' : ''"  v-for="(item, index) in contract" :key="index">
        <router-link :to="'/handbook/usdtInsurance/' + item.id">
          {{ item.tableName.toUpperCase() }}
        </router-link>
      </li>
    </ul>
    <direct-table :theadList="theadList" :tbodyList="tbodyList" :tdWidth="tdWidth"></direct-table>
    <st-row class="toHistory" justify="center" align="center">
      <div class="mouse"></div>
      <p class="text1" v-html="$t('message.direct.handbook.paragraph6.p2')"></p>
      <router-link class="text2" to="/handbook/nounExplanation" v-html="$t('message.direct.navigation.title3')"></router-link>
    </st-row>
  </div>
</template>

<script>
  import DirectTable from '@/components/direct-table'
  import Filter from '@/assets/js/filter'
  import SwapsApi from '@/assets/js/api/swapsApi.js'
  import store from '@/store/index'
  export default {
    name: 'fund',
    components: {
      DirectTable
    },
    data () {
      return {
        theadList: this.$t(`message.direct.usdtInsurance.theadList`),
        tbodyList: null,
        contract: null,
        tdWidth: [ '428px', '449px'],
        orderData: {
          contractId: 1001,
          page: 1,
          pageSize: 20
        }
      }
    },
    watch: {
      '$route' () {
        this.getRatioList()
      }
    },
    methods: {
      init () {
        SwapsApi.getContractAllList().then(res => {
          let arr = res.data.contractList || []
          arr.forEach(item => {
            if (!item.contractParam) {
              item.contractParam = {}
            }
          })
          store.commit('SET_CONTRACT', arr)
          this.contract = arr
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取列表
      getRatioList () {
        this.orderData.contractId = this.$route.params.id
        let list = []
        SwapsApi.getInsuranceFundList(this.orderData)
          .then(res => {
            if (res.data.insuranceFundList) {
              res.data.insuranceFundList.forEach(item => {
                let tmp = []
                tmp = [Filter.getDate(item.createdDate), Filter.splitFormat(item.insuranceFund, 4)]
                list.push(tmp)
                this.tbodyList = list
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    mounted () {
      this.getRatioList()
    },
    created () {
      this.init()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";
  .fund {
    h2 {
      margin: 0 20px;
      width: 100%;
      height: 50px;
      font-size: 20px;
      color: #24324C;
      line-height: 50px;
      font-weight: normal;
      border-bottom: 1px solid #ECF0F7;
    }
    p {
      margin-top: 16px;
      padding: 0 20px;
      font-size: 14px;
      color: #24324C;
      line-height: 22px;
    }
    ul {
      margin: 22px 20px 0;
      border-bottom: 1px solid #ECF0F7;
      li {
        display: inline-block;
        width: 74px;
        height: 32px;
        text-align: center;
        a {
          font-size: 16px;
          color: #7889A9;
        }
      }
      .active {
        border-bottom: 2px solid #597AB9;
      }
    }
    .toHistory {
      width: 100%;
      height: 58px;
      background: #F5F6FA;
      .mouse {
        width: 12px;
        height: 16px;
        background: url('../../assets/images/handbook/mouse.svg');
        background-size: 100% 100%;
      }
      .text1 {
        margin-top: 0;
        padding: 0;
        margin-left: 9px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #24324C;
        line-height: 22px;
      }
      .text2 {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #697FD5;
        line-height: 22px;
        text-decoration: underline;
      }
    }
  }
</style>

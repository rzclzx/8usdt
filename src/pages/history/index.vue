<template>
  <div style="padding-top: 50px;" :class="{'history':'black' === themeValue, 'history-white': 'white' === themeValue}">
    <swaps-header></swaps-header>
    <trade-history></trade-history>
    <st-footer style="background-color: #141625;position:inherit; margin-top: 20px;" :product="product"></st-footer>
  </div>
</template>

<script>
  import SwapsHeader from '@/components/swaps-header.vue'
  import TradeHistory from '@/components/history/trade-history.vue'
  import Product from '@/assets/js/config/product'
  export default {
    name: 'historyPage',
    data () {
      return {

      }
    },
    computed: {
      product () {
        return Product(this.$i18n)
      },
      themeValue () {
        // return 'white'
        return this.$store.state.dictionary.theme
      }
    },
    components: {
      SwapsHeader,
      TradeHistory
    },
    watch: {

    },
    created () {

    },
    methods: {

    }
  }
</script>

<style lang="less" scoped="">
  @import "../../assets/css/theme";
  .history {
    background: #0D121D;
    .trade-history {
      margin-top: 20px;
    }
  }
  .history-white {
    background: #F5F6FA;
    .trade-history-white {
      margin-top: 20px;
    }
  }
</style>

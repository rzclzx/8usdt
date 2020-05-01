<template>
  <div :class="{'info':'black' === themeValue, 'info-white': 'white' === themeValue}">
    <swaps-header></swaps-header>

    <st-footer style="background-color: #141625;" :product="product"></st-footer>
  </div>
</template>

<script>
import SwapsHeader from '@/components/swaps-header.vue'
import Product from '@/assets/js/config/product'

export default {
  name: 'InfoPage',
  data () {
    return {
      
    }
  },
  computed: {
    product () {
      return Product(this.$i18n)
    },
    themeValue () {
      return this.$store.state.dictionary.theme
    }
  },
  components: {
    SwapsHeader
  },
  watch: {
    
  },
  created () {
    
  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/css/theme";
  
</style>

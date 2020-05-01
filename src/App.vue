<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import Dictionary from './assets/js/dictionary'
  import Cookie from '../myConfig/cookie'
export default {
  name: 'App',
  watch: {
    '$i18n.locale' (val) {
      let obj = {val: {$dictionary: null}}
      Dictionary.install(obj, this.$i18n)
      Object.assign(this.$dictionary, obj.val.$dictionary)
    }
  },
  methods: {
    initTheme () {
      if (Cookie.getCookie('theme') === 'black') {
        this.$store.commit('SET_THEME', 'black')
      }
      if (Cookie.getCookie('theme') === 'white') {
        this.$store.commit('SET_THEME', 'white')
      }
      if (Cookie.getCookie('theme')) {
        this.$store.commit('SET_THEME', Cookie.getCookie('theme'))
      } else {
        //Cookie.setCookie('theme', 'black', 1, '/', this.apiConfig.domain)
      }
    },
  },
  created () {
    window.onresize = () => {
      this.$store.commit('SAVE_SCREEN_WIDTH', document.body.clientWidth)
      this.$store.commit('SET_SCREENHEIGHT', document.body.clientHeight)
    }
    window.onscroll = () => {
      let left = document.documentElement.scrollLeft || document.body.scrollLeft
      let top = document.documentElement.scrollTop || document.body.scrollTop
      this.$store.commit('SAVE_SCROLLLEFT', left)
      this.$store.commit('SAVE_SCROLLTOP', top)
    }
  },
  mounted () {
    this.initTheme()
  }
}
</script>

<style>
  #app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 1366px;
  }
</style>

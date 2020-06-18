<template>
  <div id="app">
    <Header />

    <router-view v-if="!loading"></router-view>
    <div v-else>loading...</div>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      loading : true
    }
  },
  async mounted() {
    const { token } = localStorage;
    try {
      this.loading = true;
      if(token) {
        await this.$store.dispatch('me')
      }
    } catch (e) {
      this.$router.replace(this.$route.query.redirect || '/')
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style>
</style>

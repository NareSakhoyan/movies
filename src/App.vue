<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header'
import auth from './utils/auth'


export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      loggedIn: auth.loggedIn(),
    }
  },
  created () {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn
    }
  },
}
</script>

<style>
</style>

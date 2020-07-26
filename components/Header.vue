<template>
  <b-navbar class="is-danger">
    <template slot="brand">
     <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="/logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
        </b-navbar-item>
        <b-navbar-item v-if="user" @click="go('/my/profile')">
        {{ user.name }}
        </b-navbar-item>
        </template>

<template slot="start">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                Inicio
            </b-navbar-item>
          
        </template>
<template slot="end">
        <b-navbar-dropdown label="Ubicación" >
                <b-navbar-item href="#">
                    Maracaibo
                </b-navbar-item>
                <b-navbar-item href="#">
                    San Francisco
                </b-navbar-item>
            </b-navbar-dropdown>
            </template>


<template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
       
        <!-- <a class="button is-white" v-if="user" @click="go('/my/profile')"> &nbsp; {{ user.name }}</a> -->
         <a class="button is-danger" >
          <img class="img" v-if="user" :src="user.avatar" @click="go('/my/profile')" />
          <img v-else src="/person.svg" @click="googleSignIn()"  />
         </a>
        <a class="button is-danger" @click="go('/cart', false)">
          <img src="/bag.svg" />
        </a>
        <a class="button is-danger"
          v-if="user"
          role="button"
          aria-label="menu"
          @click="go('/my/orders', true)"
        >
          <img src="/orderstatus.svg" />
        </a>
                </div>
            </b-navbar-item>
        </template>

    
 </b-navbar>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    go(url, auth) {
      if (auth && !this.user) {
        this.googleSignIn()
      } else {
        this.$router.push(url)
      }
    },
    ...mapActions({
      googleSignIn: 'auth/googleSignIn'
    })
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null
    }
  }
}
</script>
<style >
 .img {
  width: 30px;
  height: 30px;
  border-radius: 50px;
} 

</style>

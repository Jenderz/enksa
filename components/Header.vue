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
                <b>Inicio</b>
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




var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/5f32fbc81e6c0725256068a8/default';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();

</script>



</script>
<style >
 .img {
  width: 30px;
  height: 30px;
  border-radius: 50px;
} 

</style>

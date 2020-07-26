
<template>
<footer
      class="footer"
      v-if="getTotalCount!=0"
    >
    <b-navbar class="is-primary" fixed-bottom v-bind:mobile-burger="false">
      <template slot="brand" >
            <b-navbar-item>
              
             {{getTotalCount}} articulo<span v-if="getTotalCount>1">s</span> | {{getTotal | currency}} 
            </b-navbar-item>
            </template>
            <template slot="brand">

               <b-navbar-item tag="router-link" :to="{ path: '/cart' }">
               
               <img src="/carticon.svg" /> &nbsp; <b> Ver carrito </b>

            </b-navbar-item>

            </template>


      </b-navbar>

</footer>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    },
    ...mapGetters({
      getTotalCount: "cart/getTotalCount",
      getTotal: "cart/getTotal"
    })
  }
};

</script>

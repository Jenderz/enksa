<template>
  <div>
    <div class="head">
      <section class="hero is-info">
  <div class="hero-body has-text-centered">
    <div class="container">
      <h1 class="title" >
        Mi carrito
      </h1>
      <h2 class="subtitle" >
       "No puedes comprar la felicidad pero puedes comprar cosas y eso está muy cerca."
      </h2>
    </div>
  </div>
</section>
      <center v-if="cartItems.length == 0">
        <div class="container">

            <img src="/empty-cart.svg" />
          </div>
          <h2>No hay nada aqui</h2>
          <br>
          <h3>Todavía no ha agregado ningún artículo a su carrito.</h3>
          <br>

        <b-button class="is-danger" @click="go('/')">
                              <img src="/backarrow.svg" /> <b>Regresar al inicio</b>

                          </b-button>
      </center>
      <products v-else :products="cartItems" :showcart="true" />
    </div>
<footer
      class="footer"
      v-if="!cartItems.length == 0"
    >
    <b-navbar class="is-danger" fixed-bottom v-bind:mobile-burger="false">
      <template slot="brand" >
            <b-navbar-item>
              <h2 class="big">Cantidad total {{ getTotal | currency }} </h2>
            </b-navbar-item>
            </template>
            <template slot="brand">

               <b-navbar-item
                      :class="[!loading ? '' : '']"
                      :disabled="loading"
                      @click="goToCheckout"
                    >

                        <h2 v-if="!user || !user.email">
                         Ingresa para ordenar
                        </h2>
                        
                        <h2 v-else> 
                          <b-icon icon="check"></b-icon>
                          <b>Ir a la caja</b></h2>
                 

            </b-navbar-item>
           
            </template>


      </b-navbar>

</footer>

  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
const Products = () => import('~/components/Products')
export default {
  props: ['products'],
  data() {
    return {
      loading: false,
    }
  },
  components: { Products },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null
    },
    ...mapState({
      shipping: state => state.shipping || {},
      totalAmount: state => state.cart.totalAmount || 0,
      cartItems: state => state.cart.items || []
    }),
    ...mapGetters({
      checkCart: 'cart/checkCart',
      getTotal: 'cart/getTotal'
    })
  },
  methods: {
    ...mapActions({
      checkout: 'cart/checkout',
      googleSignIn: 'auth/googleSignIn',
      addToCart: 'cart/addToCart'
    }),
    go(url) {
      this.$router.push(url)
    },
    async goToCheckout() {
      this.loading = true
      if (!this.user) {
        await this.googleSignIn()
      } else {
        try {
          this.$router.push('/checkout')
        } catch (e) {}
      }
    }
  }
}
</script>

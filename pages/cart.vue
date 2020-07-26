<template>
  <div>
    <div class="head">
      <section class="hero is-info">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        Mi carrito
      </h1>
      <h2 class="subtitle">
       "No puedes comprar la felicidad pero puedes comprar cosas y eso está muy cerca."
      </h2>
    </div>
  </div>
</section>
      <center v-if="cartItems.length == 0">
        <div class="container">
          <div>
            <img class="empty-cart" src="/empty-cart.svg" />
          </div>
          <h2>No hay nada aqui</h2>
          <h5>Todavía no ha agregado ningún artículo a su carrito.</h5>
          <div class="footer">
            <a>
              <div class="cart-total footer">
                <div class="container2 ">
                  <div class="card shadow-lg2 w100">
                    <div>
                      <div class="is-mobile">
                        <div class="back-arrw">
                          <button class="button" @click="go('/')">
                            <div class="align_pickup">
                              <div class="back_btn"></div>
                              <img src="/backarrow.svg" />
                              <div><span>Regresar al menú</span></div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </center>
      <products v-else :products="cartItems" :showcart="true" />
    </div>
<footer
      class="footer"
      v-if="!cartItems.length == 0"
    >
    <b-navbar class="is-info" fixed-bottom v-bind:mobile-burger="false">
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

                        <spam v-if="!user || !user.email">
                         <b> Ingresa para ordenar </b>
                        </spam>
                        
                        <spam v-else> 
                          <b-icon icon="check"></b-icon>
                          <b>Ir a la caja</b></spam>
                 

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
      loading: false
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
<style scoped>
img.empty-cart {
  width: 200px;
}
.container {
  position: relative;
  padding-top: 19px;
}
.back-arrw {
  padding-bottom: 10px;
  padding-top: 10px;
}
.image {
  padding-left: 0%;
  height: 53px;
}
.align {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.primary {
  background: #167df0 !important;
  border-color: #167df0;
}
.button {
  font-family: Karla, Roboto, sans-serif;
  text-transform: initial;
  color: #fff;

  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 100%;
  display: block;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  padding: 7px;
  outline: none;
}
.h2 {
  font-size: 23px;
  color: #8a6224;
  font-family: monospace;
}
.shadow-lg2 {
  box-shadow: 0 -1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
.w100 {
  width: 100%;
  padding: 0 1.5rem;
}
.head {
  position: relative;
  left: 0;
  right: 0;
  text-align: center;
  margin-bottom: 175px;
}
@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.fadeIn {
  -webkit-animation: fadeIn 3s infinite;
  -moz-animation: fadeIn 3s infinite;
  -o-animation: fadeIn 3s infinite;
  animation: fadeIn 3s infinite;
}
.gps_svg {
  padding-top: 3px;
  padding-left: 6px;
}
.back_btn {
  padding-top: 3px;
  padding-right: 6px;
}
.align_pickup {
  display: flex;
  justify-content: center;
  flex-direction: row;
}
</style>

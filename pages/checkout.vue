<template>
  <div v-if="profile">
     <div class="card">
         <div class="card-content">
     <div class="img1">
      <img :src="profile.avatar" class="rounded" />
 </div>
       <div class="has-text-centered">
        <label for="login"></label>
        <b v-if="profile">
          {{ profile.name }}
        </b>
        </div>
        </div>
        </div>
<div class="card">
    <div class="card-content">
    <section>
        <b-field label="Datos personales">
            <b-input placeholder="Correo lectrónico"
                v-model="profile.email"
                type="email"
                icon="email"
                icon-right="close-circle"
                value="required"
          v-if="profile"
          disabled>
            </b-input>
        </b-field>
         <b-field>
            <b-input placeholder="A nombre de"
                type="text"
                icon="account"
            >
            </b-input>
        </b-field>

          <b-field>
            <b-input placeholder="Teléfono"
                type="tel"
                icon="phone"
                v-model="profile.phone"
            >
            </b-input>
        </b-field>
        <b-field>
            <b-input placeholder="DNI/Cedula"
                type="number"
                icon="card-account-details-outline"
                v-model="profile.dni"
            >
            </b-input>
        </b-field>

        
    <b-field label="Datos de entrega">
       <b-input 
      type="text" 
      placeholder="Ciudad"
      icon="city">
      </b-input>
  </b-field>
  <b-field>
      <b-input 
      type="text" 
      placeholder="Calle/Avenida"
      icon="map-marker">
      </b-input>
</b-field>
      <b-field>
     <b-input 
      type="text" 
      placeholder="Urbanización/Sector"
      icon="home-city-outline"
      v-model="profile.address">
      </b-input>
</b-field>

    </section>
    </div>
</div>
    <div class="footer">
      <a v-if="!cartItems.length == 0">
        <div class="cart-total footer">
          <div class="container2 ">
            <div class="card shadow-lg2 w100">
              <div>
                <div class="is-mobile">
                  <div class="align">
                    <div class="amount_align">
                      <p class="gray">Cantidad total</p>
                    </div>
                    <div>
                      <h2>{{ getTotal | currency }}</h2>
                    </div>
                  </div>
                  <div>
                    <button
                      class="button"
                      :class="disable"
                      :disabled="getTotal == 0 || loading"
                      @click="placeOrder()"
                    >
                      <span :class="fadeIn">{{ text }}</span>
                    </button>
                  </div>
                </div>
                <div class="is-mobile">
                  <p class="green">Permítanos 45 minutos para la entrega.</p>
                </div>
                <div class="cart-total-after"></div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
const Products = () => import('~/components/Products')
export default {
  props: ['products'],
  async asyncData({ store }) {
    let profile = {}
    let userDetails = await store.dispatch('auth/fetch')
    profile = Object.assign({}, userDetails)
    profile.dob = profile.dob || {}
    profile.state = profile.state || {}
    return { profile }
  },
  data() {
    return {
      loading: false,
      text: 'Place order',
      fadeIn: '',
      disable: 'disable'
    }
  },
  components: { Products },
  computed: {
    // user() {
    //   return (this.$store.state.auth || {}).user || null;
    // },
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
    async placeOrder() {
      if (this.loading) return
      if (this.getTotal == 0) return
      if (!this.profile || this.profile.phone == '') {
        alert('Phone number required')
        return
      }
      if (!this.profile.address || this.profile.address == '') {
        alert('Address is mandatory')
        return
      }
      this.text = 'Please Wait. . .'
      this.fadeIn = 'fadeIn'
      this.disable = true
      this.loading = true
      if (!this.profile) {
        try {
          await this.googleSignIn()
          this.loading = false
        } catch (e) {
          this.loading = false
        }
      } else {
        this.checkout({ address: this.profile.address })
      }
    }
  }
}
</script>
<style scoped>
.rounded {
  border-radius: 100px;
}
.img1 {
  text-align: -webkit-center;
  /* height: 92px; */
  padding-top: 3px;
}
img {
    max-width: 15%;
}

</style>



<template>

 <div v-if="profile">
     <div class="card">
         <div class="card-content">
     <div class="img1">
      <img :src="profile.avatar" class="rounded" />
 </div>
       <div class="has-text-centered">
        <label for="login"></label>
        <h2 v-if="profile">
          {{ profile.name }}
        </h2>
        </div>
        </div>
        </div>
<div class="card">
    <div class="card-content">
    <section>
        <h3 class="subtitle">Completa los datos</h3>

        <b-field>
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
            <b-input placeholder="Teléfono"
                v-model="email"
                type="phone"
                icon="phone"
            >
            </b-input>
        </b-field>

        <b-field>
    
      <b-input id="searchTextField" type="text" placeholder="testing">
      </b-input>
    
  </b-field>


    </section>
    </div>
</div>
 </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
const Products = () => import('~/components/Products')
export default {
  mounted: function () {
		var defaultBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(-73.138744, 10.1050619),
		new google.maps.LatLng(-73.138744, 10.105069));
		var input = document.getElementById('searchTextField');
		var options = {
			bounds: defaultBounds,
			types: ['establishment']
		};
		this.autocomplete = new google.maps.places.Autocomplete(input, options);
	},
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



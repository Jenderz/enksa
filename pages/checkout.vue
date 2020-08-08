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
                v-model="newName"
            >
            </b-input>
        </b-field>

          <b-field>
            <b-input placeholder="Teléfono"
                type="tel"
                icon="phone"
                v-model="newPhone"
            >
            </b-input>
        </b-field>
        <b-field>
            <b-input placeholder="DNI/Cedula"
                type="number"
                icon="card-account-details-outline"
                v-model="newDNI"
            >
            </b-input>
        </b-field>

        
    <b-field label="Datos de entrega">
       <b-input 
      type="text" 
      placeholder="Ciudad"
      icon="city"
      v-model="newCity">
      </b-input>
  </b-field>
  <b-field>
      <b-input 
      type="text" 
      placeholder="Calle/Avenida"
      icon="map-marker"
      v-model="newCalle">
      
      </b-input>
</b-field>
      <b-field>
     <b-input 
      type="text" 
      placeholder="Urbanización/Sector"
      icon="home-city-outline"
      v-model="newSector">
      </b-input>
</b-field>

<b-field>
     <b-input 
      type="text" 
      placeholder="Punto de referencia"
      icon="map-marker"
      v-model="profile.address">
      </b-input>
</b-field>

    </section>
    </div>
</div>



<div class="footer">
      <a v-if="!cartItems.length == 0">
<b-navbar class="is-danger" fixed-bottom v-bind:mobile-burger="false">
      <template slot="brand" >
            <b-navbar-item>
              <h2 class="big">Cantidad total {{ getTotal | currency }} </h2>
            </b-navbar-item>
            </template>
            <template slot="brand">

               <b-navbar-item
                      class="is-danger" expanded
                      :class="disable"
                      :disabled="getTotal == 0 || loading"
                      @click="placeOrder()"
                      @click.prevent="addTodo()"
                    >

                        <span :class="fadeIn">{{ text }}</span>
                        
            

            </b-navbar-item>
           
            </template>


      </b-navbar>

</a>
    </div>
</div>
</template>
<script>
import { clientesCollection } from '~/service/firebase'
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
      text: 'Realizar pedido',
      fadeIn: '',
      disable: 'disable',
      newCity: '',
      newCalle: '',
      newSector: '',
      newPhone: '',
      newName: '',
      newDNI: ''
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
      addToCart: 'cart/addToCart',
    }),
    async placeOrder() {
      if (this.loading) return
      if (this.getTotal == 0) return
      if (!this.profile || this.profile.phone == '') {
        alert('Phone number required')
        return
      }
      if (!this.profile.address || this.profile.address == '') {
        alert('El punto de referencia es obligatorio')
        return
      }
      this.text = 'Por favor espere. . .'
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
      
    },
    addTodo() {
      clientesCollection.add({
        number: this.newDNI,
        phone: this.newPhone,
        city: this.newCity,
        calle: this.newCalle,
        sector: this.newSector,
        sector: this.newName,
        completed: false,
        createdAt: new Date()
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
      this.newDNI = '';
      this.newPhone = '';
      this.newCity = '';
      this.newCalle = '';
      this.newSector = '';
      this.newRef = '';
      this.newName = '';
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



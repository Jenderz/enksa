<template>
<div>
      <b-modal :active.sync="isModalActive" has-modal-card :can-cancel="false">
 <div class="modal-card" style="width: auto">
   <header class="modal-card-head">
     <h1 class="modal-card-title has-text-centered" >Bienvenidos a <b>Enksa</b></h1>
                </header>
                
     <section class="modal-card-body has-text-centered">
       <h2> Selecciona la ubicación más cercana </h2>
       <br>
       <b-button type="is-danger" rounded expanded icon-left="map-marker" tag="a"
                href="https://enksa.netlify.app/lc/SanFrancisco" >San Francisco</b-button>
       <br>
       <b-button type="is-danger" rounded expanded icon-left="map-marker" tag="a"
                href="https://enksa.netlify.app/lc/maracaibo">Maracaibo</b-button>
                  
                </section>
 
   </div>
   </b-modal>
 </div>


</template>
<script>
export default {
  data() {
    return {
      settings: [],
      isModalActive: true
    }
  },
  
  methods: {},
  async created() {},
  components: { }
}
</script>

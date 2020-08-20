<template>
  <div>
   <noscript class="noscript">
   <div id="div100">
   Comprueba tu conexión a internet
   </div>
</noscript>
    <Header />
    <nuxt />
  </div>

</template>
<script>
const Header = () => import('~/components/Header')

export default {
  
  components: { Header }
}


</script>
<style>
   body{
      position:relative;
   }
   .noscript {
      width:100%;
      height:100%; /* will cover the text displayed when javascript is enabled*/
      z-index:100000; /* higher than other z-index */
      position:absolute;
   }
   .noscript #div100{
       display:block;
       height:100%;
       background-color:white; 
   }
</style> 
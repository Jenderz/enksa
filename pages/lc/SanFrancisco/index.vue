<template>
  <div>
    <Loading :active="!settings || !settings[0]" />
    <div v-if="settings[0]">
      <Hero :closed="settings[0].closed" />
      <Info />
      <Skeleton v-if="!marca" />
      <Marca :marca="marca" :showcart="true" />
      <Overlay :closed="settings[0].closed" />
    </div>
  </div>
</template>
<script>
const Loading = () => import('~/components/Loading')
const Skeleton = () => import('~/components/Skeleton')
const Overlay = () => import('~/components/Overlay')
const Marca = () => import('~/components/Marca')
const Info = () => import('~/components/Info')
const Hero = () => import('~/components/Hero')
import { db } from '~/service/firebase'
export default {
  data() {
    return {
      loading: false,
      closed: true,
      settings: [],
      marca: []
    }
  },
  firestore() {
    return {
      settings: db.collection('settings'),
      marca: db.collection('marca')
    }
  },
  methods: {},
  async created() {},
  components: { Loading, Skeleton, Overlay, Marca, Info, Hero }
}
</script>

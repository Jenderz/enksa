<template>
    <section>
        <b-carousel
            :progress="progress"
            :progress-type="progressType">
            <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
                <section :class="`hero is-medium is-${carousel.color}`">
                    <div class="hero-body has-text-centered">
                        <h1 class="title">{{carousel.title}}</h1>
                    </div>
                </section>
            </b-carousel-item>
        </b-carousel>
    </section>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      progress: true,
            progressType: 'is-success',
            carousels: [
                { title: 'Enksa', color: 'primary' },
                { title: 'Rápido', color: 'danger' },
                { title: 'Sencillo', color: 'warning' },
                { title: '¡Quédate en casa!', color: 'info' }
            ]
    }
  }
}
</script>
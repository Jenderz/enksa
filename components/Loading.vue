<template>
  <div id="wave" v-if="loading || active">
    <span class="dot olive"></span>
    <span class="dot blue"></span>
    <span class="dot green"></span>
    <span class="dot red"></span>
  </div>
</template>

<script>
export default {
  props: {
    active: { type: Boolean, required: false }
  },
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style lang="css" scoped>
div#wave .fuchsia {
  background: #d35400;
}
div#wave .olive {
  background: #d35400;
}
div#wave .blue {
  background: #d35400;
}
div#wave .green {
  background: #d35400;
}
div#wave .red {
  background: #d35400;
}
div#wave {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  z-index: 10000;
}
div#wave .dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 3px;

  animation: wave 1.3s linear infinite;
}
div#wave .dot:nth-child(2) {
  animation-delay: -1.1s;
}
div#wave .dot:nth-child(3) {
  animation-delay: -0.9s;
}
div#wave .dot:nth-child(4) {
  animation-delay: -0.7s;
}
div#wave .dot:nth-child(5) {
  animation-delay: -0.5s;
}
@keyframes wave {
  0%,
  60%,
  100% {
    transform: initial;
  }

  30% {
    transform: translateY(-7px);
  }
}
</style>

<template>
  <div class="particle-container" ref="particleContainer" :class="{ 'is-visible': isVisible }"></div>
</template>

<script>
import lottie from 'lottie-web'
import particleData from '@/assets/css/rank/lover/lizi.json'

export default {
  name: 'ParticleEffect',
  data() {
    return {
      animation: null,
      isVisible: false
    }
  },
  mounted() {
    this.initAnimation()
  },
  beforeDestroy() {
    this.destroyAnimation()
  },
  methods: {
    initAnimation() {
      if (this.$refs.particleContainer) {
        this.animation = lottie.loadAnimation({
          container: this.$refs.particleContainer,
          renderer: 'svg',
          loop: true,
          autoplay: false,
          animationData: particleData
        })
      }
    },
    playAnimation() {
      this.isVisible = true
      if (this.animation) {
        this.animation.play()
      }
    },
    stopAnimation() {
      this.isVisible = false
      if (this.animation) {
        this.animation.stop()
      }
    },
    destroyAnimation() {
      if (this.animation) {
        this.animation.destroy()
        this.animation = null
      }
    }
  }
}
</script>

<style scoped>
.particle-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
}

.particle-container.is-visible {
  opacity: 1;
  visibility: visible;
}
</style>

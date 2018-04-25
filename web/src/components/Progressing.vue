<template>
  <div class="progress-bar">
    <div class="progress-bar-bar" :style="barStyle"></div>
  </div>
</template>

<script>
  export default {
    name: 'progress-bar',
    props: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 1 },
      value: { type: Number, default: 0 }
    },
    computed: {
      barStyle () {
        const frac = Math.min(1, Math.max(0, (this.value - this.min) / (this.max - this.min) || 0))
        return { width: frac * 100 + '%' }
      }
    }
  }
</script>

<style lang="scss">
  .progress-bar {
    height: 5px;
    background-color: #eee;
  }

  .progress-bar-bar {
    height: 100%;
    background-color: #007fff;
    transition: width 0.2s ease-in-out;
  }
</style>

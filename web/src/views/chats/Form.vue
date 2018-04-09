<template>
  <div class="text">
    <textarea placeholder="Press Ctrl + Enter To Submit" v-model="content" @keyup="onKeyup"></textarea>
  </div>
</template>

<script>
  export default {
    props: ['scrollDown'],
    name: 'chat-form',
    data () {
      return {
        content: null
      }
    },
    methods: {
      onKeyup (e) {
        if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
          this.$store.dispatch('chat/sendMessage', this.content)
          this.content = null
          this.scrollDown()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .text {
    height: 160px;
    border-top: solid 1px #ddd;

    textarea {
      padding: 10px;
      height: 100%;
      width: 100%;
      border: none;
      outline: none;
      font-family: "Micrsofot Yahei", sans-serif;
      resize: none;
    }
  }
</style>

<template>
  <div class="video-player">
    <d-player
      :options="options"
      ref="player">
    </d-player>
  </div>
</template>

<script>
  import VueDPlayer from 'vue-dplayer'

  export default {
    props: {
      src: {
        type: String,
        default: () => String
      }
    },
    name: 'VideoPlayer',
    data () {
      return {
        options: {
          video: {
            url: this.src,
            pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg'
          },
          autoplay: false,
          contextmenu: [
            {
              text: 'GitHub',
              link: 'https://github.com/MoePlayer/vue-dplayer'
            }
          ]
        },
        player: null
      }
    },
    components: {
      'd-player': VueDPlayer
    }
  }
</script>

<style scoped>

</style>

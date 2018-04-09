<template>
  <div class="message direct-chat-messages" v-scroll-bottom="session.messages">
    <ul v-if="session">
      <li v-for="item in session.messages">
        <p class="time">
          <span>{{ item.date | time }}</span>
        </p>
        <div class="main-items" :class="{ self: item.self }">
          <img class="avatar" width="30" height="30" :src="item.self ? user.img : session.user.img"/>
          <div class="text">{{ item.content }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import formInput from '@/views/chats/Form'
  import userList from '@/views/chats/UserList'
  // import Vue from 'vue'

  export default {
    /**
     * The name of the page.
     */
    name: 'chat-index',
    /**
     * The data the page can use.
     *
     * @returns {Object} The data.
     */
    data () {
      return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [
          { text: 'Select One', value: null },
          'Carrots', 'Beans', 'Tomatoes', 'Corn'
        ],
        show: true,
        sessionId: 1
      }
    },
    /**
     * The computed properties the page can use.
     */
    computed: {
      ...mapState('chat', {
        chat: state => state
      }),
      ...mapGetters({
        session: 'chat/session',
        user: 'chat/user'
      })
    },
    /**
     * The methods which the page can use.
     */
    methods: {
      onSubmit (evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset (evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    },
    /**
     * Available watchers for this page.
     */
    watch: {
      //
    },
    /**
     * The components that are being used.
     */
    components: {
      formInput,
      userList
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    mounted () {
      this.$store.watch((state) => {
        if (state.auth.authenticated) {
          this.$store.dispatch('chat/all')
          // this.$echo
          //   .channel('quest')
          //   .listen('User.Created', staff => this.$store.dispatch('quest/created', staff))
          //   .listen('User.Updated', (staff) => {
          //     console.log(staff)
          //     this.$store.dispatch('quest/updated', staff)
          //   })
          //   .listen('User.Deleted', staff => this.$store.dispatch('quest/destroyed', staff))
        }
      })
    },
    filters: {
      // hour:minutes
      time (date) {
        if (typeof date === 'string') {
          date = new Date(date)
        }
        return date.getHours() + ':' + date.getMinutes()
      }
    },
    directives: {
      'scroll-bottom' () {
        //
      }
    }
  }
</script>
<style lang="scss" scoped>
  .message {
    padding: 10px 15px;
    overflow-y: scroll;
    min-height: 400px;
    height: 550px;
    ul {
      list-style: none;
    }
    li {
      margin-bottom: 15px;
    }
    .time {
      margin: 7px 0;
      text-align: center;

      > span {
        display: inline-block;
        padding: 0 18px;
        font-size: 12px;
        color: #fff;
        border-radius: 2px;
        background-color: #dcdcdc;
      }
    }
    .avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;
    }
    .text {
      display: inline-block;
      position: relative;
      padding: 0 10px;
      max-width: calc(100% - 40px);
      min-height: 30px;
      line-height: 2.5;
      font-size: 12px;
      text-align: left;
      word-break: break-all;
      background-color: #fafafa;
      border-radius: 4px;

      &:before {
        content: " ";
        position: absolute;
        top: 9px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: #fafafa;
      }
    }

    .self {
      text-align: right;

      .avatar {
        float: right;
        margin: 0 0 0 10px;
      }
      .text {
        background-color: #b2e281;

        &:before {
          right: inherit;
          left: 100%;
          border-right-color: transparent;
          border-left-color: #b2e281;
        }
      }
    }
  }
</style>

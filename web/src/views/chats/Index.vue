<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <div slot="header">
            <i class="fa fa-edit"></i> Chat Table
          </div>
          <b-card-body>
            <b-row>
              <b-col md="3">
                <user-list/>
              </b-col>
              <b-col md="9">
                <messages/>
              </b-col>
            </b-row>
            <form-input :scrollDown="scrollDown"/>
          </b-card-body>
        </b-card>
      </b-col><!--/.col-->
    </b-row><!--/.row-->
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import formInput from '@/views/chats/Form'
  import userList from '@/views/chats/UserList'
  import messages from '@/views/chats/Message'

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
      },
      scrollDown () {
        const target = this.$el.querySelector('.direct-chat-messages')
        setTimeout(() => {
          const height = target.scrollHeight - target.offsetHeight
          target.scrollTop += 10
          if (height <= target.scrollTop) {
            return this
          } else {
            this.scrollDown()
          }
        }, 0)
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
      userList,
      messages
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
      scrollBottom (el) {
        // let container = el.querySelector('.message')
        // container.scrollTop = container.scrollHeight
      }
    }
  }
</script>
<style lang="scss" scoped>
  .message {
    padding: 10px 15px;
    overflow-y: scroll;
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

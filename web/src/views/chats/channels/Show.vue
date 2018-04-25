<template>
  <div class="animated fadeIn">
    <b-card no-body>
      <div slot="header">
        <i class="fa fa-edit"></i> {{ channel.name }}
        5
      </div>
      <b-card-body>
        <b-row>
          <b-col md="12">
            <div class="chat-list">
              <div class="direct-chat-msg chat-messages">
                <div class="mb-2" v-for="conversation, index in conversations" id="conversations">
                  <b-media :right-align="checkUser(conversation.user)" vertical-align="center">
                    <b-img
                      rounded="circle"
                      slot="aside"
                      blank blank-color="#ccc"
                      width="80" :alt="conversations.user"
                    ></b-img>
                    <h5 class="mt-0 mb-1" :class="{'text-right': checkUser(conversation.user)}">
                      {{ conversation.user ? conversation.user.name : 'Sample' }}
                    </h5>
                    <p v-html="conversation.message"></p>
                    <div class="showcase" v-if="conversation.media.length">
                      <div class="images">
                        <b-img
                          v-for="media,index in conversation.media"
                          v-if="media.mime_type === 'image/png' || media.mime_type === 'image/jpeg' || media.mime_type === 'image/jpg'"
                          v-img:my-group :src="url + 'media/' + media.filename"
                          fluid
                          :key="index"
                          :alt="media.filename"
                        ></b-img>
                        <video-player
                          v-for="media,index in conversation.media"
                          v-if="media.mime_type === 'video/mp4'"
                          :key="index"
                          :src="url + 'media/' + media.filename"></video-player>
                      </div>
                    </div>
                    <like
                      :likes_count="conversation.likes.length"
                      :liked="conversation.isLiked"
                      :item_id="conversation.id"
                      item_type="conversations"
                      :logged_in="auth"
                    ></like>
                  </b-media>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-card-body>
      <b-card-footer>
        <b-form v-if="enabled" @submit.prevent="sendMessage" id="sumbitMessage">
          <b-form-group id="labelName" label-for="name">
            <b-input-group>
              <b-input-group-append>
                <b-btn variant="outline-success" @click.prevent="sendMessage">送信</b-btn>
              </b-input-group-append>
              <b-form-textarea id="message"
                               placeholder="コメントします。"
                               v-model="message.message"
                               :rows="3"
                               :max-rows="6">
              </b-form-textarea>
              <div class="pull-right emoji">
                <emoji-picker @emoji="append" :search="search">
                  <div
                    class="emoji-invoker"
                    slot="emoji-invoker"
                    slot-scope="{ events }"
                    v-on="events"
                  >
                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0h24v24H0z" fill="none"/>
                      <path
                        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                    </svg>
                  </div>
                  <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
                    <div class="emoji-picker">
                      <div class="emoji-picker__search">
                        <input type="text" v-model="search" v-focus>
                      </div>
                      <div>
                        <div v-for="(emojiGroup, category) in emojis">
                          <h5>{{ category }}</h5>
                          <div class="emojis">
                            <span v-for="(emoji, emojiName) in emojiGroup" @click="insert(emoji)" :title="emojiName">{{ emoji }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </emoji-picker>
              </div>
              <div class="pull-right file">
                <span class="fa fa-folder-open" aria-hidden="true" @click="chooseFiles"></span>
                <input type="file" id="fileUpload" class="d-none" multiple @change="handleFileChange($event)">
              </div>
            </b-input-group>
          </b-form-group>
        </b-form>
      </b-card-footer>
      <b-card-body v-if="!enabled">
        <b-button type="button" variant="primary" @click.prevent="joinChannel">Join The Group</b-button>
        <b-button type="button" variant="danger">Leave</b-button>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  import 'DPlayer/dist/DPlayer.min.css'
  import ChannelProxy from '@/proxies/ChannelProxy'
  import ChannelTransformer from '@/transformers/ChannelTransformer'
  import VideoPlayer from '@/components/VideoPlayer'
  import EmojiPicker from 'vue-emoji-picker'
  import Like from '@/components/Like'

  const proxy = new ChannelProxy()

  export default {
    name: 'ShowChannel',
    /**
     * The properties that can be used.
     */
    props: {
      /**
       * The given channel identifier.
       */
      channelId: {
        type: [String, Number],
        required: true
      }
    },
    data () {
      return {
        channel: {
          name: ''
        },
        conversations: [],
        message: {
          message: '',
          channel_id: '',
          images: []
        },
        form: new FormData(),
        token: '',
        search: ''
      }
    },
    computed: {
      user () {
        return this.$store.state.auth.user
      },
      enabled () {
        return this.$store.state.application.isJoined
      },
      url () {
        return process.env.API_LOCATION
      },
      auth () {
        return this.$store.state.auth.authenticated
      }
    },
    methods: {
      append (emoji) {
        this.message.message += emoji
      },
      /**
       * Method to create a new branch.
       * It'll dispatch the create action on the branch module.
       */
      sendMessage () {
        for (let i = 0; i < this.message.images.length; i++) {
          this.form.append('files[]', this.message.images[i])
        }
        if (this.message.message === null && this.message.images.length < 1) {
          alert('Please write something.....')
          return
        }
        this.form.append('message', this.message.message)
        this.form.append('channel_id', this.channelId)
        let input = this.form
        this.$store.dispatch('conversation/create', input)
        this.message = {
          message: null,
          channel_id: null,
          images: []
        }
        this.form = new FormData()
      },
      /**
       * Method used to fetch an channel.
       *
       * @param {channelId|{type, required}} id The id of the channel.
       */
      fetchChannel (id) {
        proxy.find(id)
          .then((data) => {
            this.channel = ChannelTransformer.fetch(data)
            this.show = true
            this.fetchConversations(id)
          })
      },
      /**
       * Method used to find the attached channel.
       */
      fetchConversations (channelId) {
        proxy.findConversations(channelId)
          .then((data) => {
            this.conversations = data
          })
      },
      joinChannel () {
        let con = confirm('Are you sure to join this channel?')
        if (con) {
          this.channel.id = this.channelId
          this.$store.dispatch('channel/addUser', this.channel)
        }
      },

      checkUser (user) {
        if (user) {
          return this.user.id === user.id
        }
      },
      onKeyup (e) {
        if (e.ctrlKey && e.keyCode === 13 && this.message.message !== null) {
          this.sendMessage()
        }
      },
      handleFileChange (e) {
        let selectedFiles = e.target.files
        if (!selectedFiles.length) {
          return false
        }
        for (let i = 0; i < selectedFiles.length; i++) {
          this.message.images.push(selectedFiles[i])
        }
        console.log(this.message.images)
      },
      chooseFiles () {
        document.getElementById('fileUpload').click()
      }
    },
    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the quest using the given quest identifier.
     */
    mounted () {
      this.fetchChannel(this.channelId)
      this.$store.watch((state) => {
        if (state.auth.authenticated) {
          this.$echo
            .channel(`conversation.${this.channelId}`)
            // .listen('Conversation.Created', conversation => this.$store.dispatch('conversation/created', conversation))
            .listen('.Created', (data) => {
              this.conversations.push(data.conversation)
              this.$store.dispatch('conversation/created', data.conversation)
              this.$nextTick(function () {
                let container = this.$el.querySelector('.direct-chat-msg')
                container.scrollTop = container.scrollHeight
              })
            })
            .listenForWhisper('typing', (e) => {
              console.log(e)
            })
            .listen('Conversation.Updated', (conversation) => {
              console.log(conversation)
              this.$store.dispatch('conversation/updated', conversation)
            })
            .listen('Conversation.Deleted', conversation => this.$store.dispatch('conversation/destroyed', conversation))
        }
      })
    },
    components: {
      VideoPlayer,
      EmojiPicker,
      Like
    },
    directives: {
      focus: {
        inserted (el) {
          el.focus()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .direct-chat-msg {
    position: relative;
    height: 80vh;
    overflow-y: scroll;
  }

  .chat-list {
    position: relative;
    min-width: 200px;
    margin: 5px 10px;
    height: auto;
    display: flow-root;
    padding: 0;
    flex-flow: row-reverse;
  }

  .like, .pin {
    padding: 5px;
  }

  .pin > a > i {
    transform: rotate(-40deg);
  }

  .like > .count {
    opacity: .6;
  }

  .emoji, .file {
    position: absolute;
    bottom: 0;
    z-index: 999;
  }

  .emoji {
    right: 30px;
  }

  .file {
    right: 10px;
  }

  #conversations {
    .media-body {
      border: 1px solid lightgray;
      padding: 8px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
    }
  }

  .showcase {
    margin-bottom: 5px;
    .images {
      display: flex;
      justify-content: center;
      overflow-x: auto;
      img {
        max-height: 300px;
        padding: 0 5px;
        flex-shrink: 0;
      }
    }
  }

  .wrapper {
    position: relative;
    display: inline-block;
  }

  .regular-input {
    padding: 0.5rem 1rem;
    border-radius: 3px;
    border: 1px solid #ccc;
    width: 20rem;
    height: 12rem;
  }

  .emoji-invoker {
    position: absolute;
    top: -1.5rem;
    right: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
  }

  .emoji-invoker:hover {
    transform: scale(1.1);
  }

  .emoji-invoker > svg {
    fill: #b1c6d0;
  }

  .emoji-picker {
    position: relative;
    z-index: 1;
    right: 0;
    font-family: Montserrat;
    border: 1px solid #ccc;
    width: 15rem;
    height: 20rem;
    overflow: scroll;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    background: #fff;
    box-shadow: 1px 1px 8px #c7dbe6;
  }

  .emoji-picker__search {
    display: flex;
  }

  .emoji-picker__search > input {
    flex: 1;
    border-radius: 10rem;
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
    outline: none;
  }

  .emoji-picker h5 {
    margin-bottom: 0;
    color: #b1b1b1;
    text-transform: uppercase;
    font-size: 0.8rem;
    cursor: default;
  }

  .emoji-picker .emojis {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .emoji-picker .emojis:after {
    content: "";
    flex: auto;
  }

  .emoji-picker .emojis span {
    padding: 0.2rem;
    cursor: pointer;
    border-radius: 5px;
  }

  .emoji-picker .emojis span:hover {
    background: #ececec;
    cursor: pointer;
  }
</style>

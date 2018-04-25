<template>
  <b-row>
    <b-col lg="12">
      <b-card no-body>
        <div slot="header">
          <i class="fa fa-edit"></i> Channels Edit
        </div>
        <progress-bar :value="value"></progress-bar>
        <b-form @submit.prevent="createChannel" @reset="onReset" v-if="show">
          <b-card-body>
            <b-form-group id="is_public"
                          lable="Is Public?"
                          lable-for="isPublic">
              Private
              <c-switch type="3d" variant="success" :checked="true" v-model="channel.isPublic"/>
              Public
            </b-form-group>
            <b-form-group id="labelGroup"
                          label="Group Name:"
                          label-for="group">
              <v-select v-model="group.selected" @search="fetchGroups" :options="group.items"></v-select>
            </b-form-group>
            <b-form-group id="labelName"
                          label="Name:"
                          label-for="name">
              <b-form-input id="name"
                            type="text"
                            v-model="channel.name"
                            required
                            placeholder="Enter channel name">
              </b-form-input>
            </b-form-group>
            <b-form-group id="labelStaff"
                          label="Staff ID:"
                          label-for="store">
              <v-select multiple @search="fetchUsers" :options="user.items" label="label" v-model="user.selected">
                <template slot="option" slot-scope="option">
                  {{ option.label }}
                </template>
              </v-select>
            </b-form-group>
          </b-card-body>
          <b-card-footer>
            <b-button type="submit" variant="primary" :disabled="disabled">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
            <b-button type="button" variant="warning" @click.prevent="goBack">Back</b-button>
          </b-card-footer>
        </b-form>
      </b-card>
    </b-col><!--/.col-->
  </b-row><!--/.row-->
</template>

<script>
  import ChannelProxy from '@/proxies/ChannelProxy'
  import ChannelTransformer from '@/transformers/ChannelTransformer'
  import VSelect from 'vue-select'
  import cSwitch from '@/components/Switch'
  import debounce from 'lodash.debounce'
  import GroupProxy from '@/proxies/GroupProxy'
  import UserProxy from '@/proxies/UserProxy'
  import ProgressBar from '@/components/Progressing'

  const groupProxy = new GroupProxy()
  const proxy = new ChannelProxy()
  const userProxy = new UserProxy()

  export default {
    name: 'channel-edit',
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
        channel: {},
        show: true,
        group: {
          items: [],
          selected: null
        },
        user: {
          items: [],
          selected: []
        },
        value: 0,
        disabled: false
      }
    },
    computed: {
      selectedUsers () {
        return this.user.selected.length ? this.user.selected.map(o => o.id) : null
      }
    },
    methods: {
      onReset (evt) {
        evt.preventDefault()
        /* Reset our channel values */
        this.channel = {}
        /* Trick to reset/clear native browser channel validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
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
            this.fetchUser(id)
            this.fetchGroup(id)
          })
      },
      /**
       * Method to create a new branch.
       * It'll dispatch the create action on the branch module.
       */
      createChannel () {
        this.channel.groupId = this.group.selected.id
        this.channel.users = this.selectedUsers
        setInterval(() => {
          this.value += 0.1
          if (this.value > 1) this.value = 0
        }, 500)
        this.disabled = true
        this.$store.dispatch('channel/update', this.channel)
      },

      /**
       * Method used to return to the previous page.
       */
      goBack () {
        this.$router.push({
          name: 'channels.index'
        })
      },

      /**
       * Method used to find the attached channel.
       */
      fetchUser (channelId) {
        proxy.findUsers(channelId)
          .then((data) => {
            this.user.selected = data.map(user => ({
              id: user.id,
              label: user.name
            }))
          })
      },

      /**
       * Debounced method to fetch the albums using a given query.
       */
      fetchUsers: debounce(function (query) {
        userProxy.setParameter('q', query)
          .all()
          .then((items) => {
            this.user.items = items.data.map(user => ({
              id: user.id,
              label: user.name
            }))
          })
      }, 500),

      /**
       * Method used to find the attached channel
       */
      fetchGroup (channelId) {
        proxy.findGroup(channelId)
          .then((data) => {
            this.group.selected = {
              id: data.id,
              label: data.name
            }
          })
      },

      /**
       * Debounced method to fetch the albums using a given query.
       */
      fetchGroups: debounce(function (query) {
        groupProxy.setParameter('q', query)
          .all()
          .then((items) => {
            this.group.items = items.data.map(group => ({
              id: group.id,
              label: group.name
            }))
          })
      }, 500),
      /**
       * Method used to find the send the notification for users
       */
      listenForChanges () {
        this.$echo
          .channel(`App.Channel.${this.channelId}`)
          .listen('.user.invited', (data) => {
            if (!('Notification' in window)) {
              alert('Web Notification is not supported')
              return
            }
            Notification.requestPermission((permission) => {
              console.log(permission)
              let notification = new Notification('You invited to join a channel.', {
                body: data.channel.name,
                icon: 'https://pusher.com/static_logos/320x320.png'
              })
              notification.onclick = () => {
                window.open(`/channels/${data.channel.id}/accept/${data.token}`)
              }
            })
          })
      }
    },
    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the quest using the given quest identifier.
     */
    mounted () {
      this.fetchChannel(this.channelId)
      this.listenForChanges()
      if (window.Notification) {
        console.log('Notifications are supported!')
      } else {
        alert('Notifications aren\'t supported on your browser! :(')
      }
    },
    components: {
      cSwitch,
      VSelect,
      ProgressBar
    }
  }
</script>

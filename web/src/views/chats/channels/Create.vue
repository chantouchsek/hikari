<template>
  <b-row>
    <b-col lg="12">
      <b-card no-body>
        <div slot="header">
          <i class="fa fa-edit"></i> Channels Create
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
              <v-select v-model="user.selected" multiple @search="fetchUsers" :options="user.items"></v-select>
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
  import cSwitch from '@/components/Switch'
  import debounce from 'lodash.debounce'
  import GroupProxy from '@/proxies/GroupProxy'
  import VSelect from 'vue-select'
  import UserProxy from '@/proxies/UserProxy'
  import ProgressBar from '@/components/Progressing'

  const groupProxy = new GroupProxy()
  const userProxy = new UserProxy()

  export default {
    name: 'channel-create',
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
        this.$store.dispatch('channel/create', this.channel)
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
      }, 500)
    },
    components: {
      cSwitch,
      VSelect,
      ProgressBar
    }
  }
</script>

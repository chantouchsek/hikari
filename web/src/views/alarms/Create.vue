<template>
  <b-row>
    <b-col lg="12">
      <b-card no-body>
        <div slot="header">
          <i class="fa fa-edit"></i> Alarm Create
        </div>
        <b-card-body>
          <b-form @submit.prevent="createGroup" @reset="onReset" v-if="show">
            <b-form-group id="labelRecipients"
                          label="Recipients:"
                          label-for="recipients">
              <b-form-select v-model="recipients" class="mb-3">
                <option value="1">All</option>
                <option value="2">Positions</option>
                <option value="3">Branches & Staffs</option>
              </b-form-select>
            </b-form-group>
            <b-form-group id="labelRecipients" v-if="!hidden"
                          label="Recipients:"
                          label-for="recipients">
              <treeselect
                :multiple="true"
                :options="options"
                search-nested
                value-consists-of="LEAF_PRIORITY"
                v-model="alarm.recipients"
              />
            </b-form-group>
            <b-row>
              <b-col md="6">
                <b-form-group id="labelAlarmDate"
                              label="Alarm Date:"
                              label-for="alarmDate">
                  <date-picker v-model="alarm.alarmDate" :config="configDate"></date-picker>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group id="labelAlarmTime"
                              label="Alarm Time:"
                              label-for="alarmTime">
                  <date-picker v-model="alarm.alarmTime" :config="configTime"></date-picker>
                </b-form-group>
              </b-col>
            </b-row>
            <b-form-group id="labelMessage"
                          label="Message:"
                          label-for="message">
              <b-form-textarea id="message"
                               type="text"
                               v-model="alarm.message"
                               rows="10"
                               max-rows="13"
                               placeholder="Enter alarm name">
              </b-form-textarea>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
            <b-button type="button" variant="warning" @click.prevent="goBack">Back</b-button>
          </b-form>
        </b-card-body>
      </b-card>
    </b-col><!--/.col-->
  </b-row><!--/.row-->
</template>

<script>
  import '@riophae/vue-treeselect/dist/vue-treeselect.min.css'
  import Treeselect from '@riophae/vue-treeselect'
  import Proxy from '@/proxies/UserProxy'
  import BranchProxy from '@/proxies/BranchProxy'
  import debounce from 'lodash.debounce'

  const proxy = new Proxy()
  const branchProxy = new BranchProxy()

  export default {
    name: 'alarm-create',
    data () {
      return {
        alarm: {},
        show: true,
        user: {
          items: [],
          selected: null
        },
        recipients: 1,
        options: [],
        branches: [],
        hidden: true,
        positions: [
          {
            id: 1,
            label: 'Manager'
          },
          {
            id: 2,
            label: 'Assistant Manager'
          },
          {
            id: 3,
            label: 'Full-time Staff'
          },
          {
            id: 4,
            label: 'Part-time Staff'
          }
        ]
      }
    },
    computed: {
      configDate () {
        return this.$store.state.application.configDate
      },
      configTime () {
        return this.$store.state.application.configTime
      }
    },
    mounted () {
      this.fetchBranches()
    },
    methods: {
      onReset (evt) {
        evt.preventDefault()
        /* Reset our alarm values */
        this.alarm = {}
        /* Trick to reset/clear native browser alarm validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      /**
       * Method to create a new branch.
       * It'll dispatch the create action on the branch module.
       */
      createGroup () {
        this.alarm.recipient = this.recipients
        this.$store.dispatch('alarm/create', this.alarm)
      },

      /**
       * Method used to return to the previous page.
       */
      goBack () {
        this.$router.push({
          name: 'alarms.index'
        })
      },

      /**
       * Debounced method to fetch the branches using a given query.
       */
      fetchUsers: debounce(function (query) {
        proxy.setParameter('q', query)
          .all()
          .then((items) => {
            this.user.items = items.data.map(user => ({
              id: user.id,
              label: user.name,
              children: []
            }))
          })
      }, 500),
      fetchBranches () {
        branchProxy.all()
          .then((items) => {
            this.branches = items.data.map(branch => ({
              id: `b.${branch.id}`,
              label: branch.name,
              children: []
            }))
          })
      }
    },
    components: {
      Treeselect
    },
    watch: {
      recipients (newValue) {
        switch (newValue) {
          case '1':
            this.hidden = true
            this.options = []
            this.alarm.recipients = []
            break
          case '2':
            this.options = this.positions
            this.hidden = false
            this.alarm.recipients = []
            break
          case '3':
            this.options = this.branches
            this.hidden = false
            this.alarm.recipients = []
            break
          default:
            break
        }
      }
    }
  }
</script>

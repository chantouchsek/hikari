<template>
  <b-row>
    <b-col lg="12">
      <b-card no-body>
        <div slot="header">
          <i class="fa fa-edit"></i> TimeCard Edit
        </div>
        <b-card-body>
          <b-form @submit.prevent="createTimeCard" @reset="onReset" v-if="show">
            <b-form-group id="labelDayTime"
                          label="DayTime:"
                          label-for="Daytime">
              <b-form-select id="DayTime"
                             v-model="timeCard.dayTime"
                             :options="dayTime" class="mb-3"
              ></b-form-select>
            </b-form-group>
            <b-form-group id="labelStore"
                          label="Staff ID:"
                          label-for="store">
              <v-select v-model="user.selected" @search="fetchUsers" :options="user.items"></v-select>
            </b-form-group>
            <b-form-group id="labelTimeType"
                          label="TimeType:"
                          label-for="TimeType">
              <b-form-select id="TimeType"
                             v-model="timeCard.timeType"
                             :options="timeType" class="mb-3"
              ></b-form-select>
            </b-form-group>
            <b-form-group id="labelStatus"
                          label="Status:"
                          label-for="status">
              <b-form-checkbox id="status"
                               v-model="timeCard.status"
                               value="1"
                               unchecked-value="0">
                Status
              </b-form-checkbox>
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
  import Proxy from '@/proxies/UserProxy'
  import debounce from 'lodash.debounce'
  import VSelect from 'vue-select'

  const proxy = new Proxy()

  export default {
    name: 'time-card-create',
    data () {
      return {
        timeCard: {
          status: null,
          timeType: null,
          userId: null,
          dayTime: null
        },
        user: {
          items: [],
          selected: null
        },
        show: true,
        timeType: [
          { value: null, text: 'Please select an item' },
          { value: '0', text: '出勤' },
          { value: '1', text: '退勤' },
          { value: '2', text: '休憩開始' },
          { value: '3', text: '休憩終了' }
        ],
        dayTime: [
          { value: null, text: 'Please select an item' },
          { value: '0', text: 'Morning' },
          { value: '1', text: 'Evening' },
          { value: '2', text: 'All Day' },
          { value: '3', text: 'A Week' }
        ]
      }
    },
    methods: {
      onReset (evt) {
        evt.preventDefault()
        /* Reset our user values */
        this.user.address = ''
        this.user.name = ''
        this.user.status = null
        /* Trick to reset/clear native browser user validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      /**
       * Method to create a new album.
       * It'll dispatch the create action on the album module.
       */
      createTimeCard () {
        if (this.user.selected !== null) {
          this.timeCard.userId = this.user.selected.id
          this.$store.dispatch('timecard/create', this.timeCard)
        } else {
          return false
        }
      },

      /**
       * Debounced method to fetch the albums using a given query.
       */
      fetchUsers: debounce(function (query) {
        proxy.setParameter('q', query)
          .all()
          .then((items) => {
            this.user.items = items.data.map(user => ({
              id: user.id,
              label: user.name
            }))
          })
      }, 500),

      /**
       * Method used to return to the previous page.
       */
      goBack () {
        this.$router.push({
          name: 'time_cards.index'
        })
      }
    },
    components: {
      VSelect
    }
  }
</script>

<template>
  <b-row>
    <b-col lg="12">
      <b-card no-body>
        <div slot="header">
          <i class="fa fa-edit"></i> TimeCards Edit
        </div>
        <b-card-body>
          <b-form @submit.prevent="updateTimeCard" @reset="onReset" v-if="show">
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
  import debounce from 'lodash.debounce'
  import TimeCardProxy from '@/proxies/TimeCardProxy'
  import TimeCardTransformer from '@/transformers/TimeCardTransformer'
  import UserProxy from '@/proxies/UserProxy'

  import VSelect from 'vue-select'

  const proxy = new TimeCardProxy()
  const userProxy = new UserProxy()

  export default {
    name: 'time-card-edit',

    /**
     * The properties that can be used.
     */
    props: {
      /**
       * The given card identifier.
       */
      cardId: {
        type: [String, Number],
        required: true
      }
    },
    data () {
      return {
        timeCard: null,
        show: false,
        user: {
          items: [],
          selected: null
        },
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
        /* Reset our timeCard values */
        this.timeCard.hourly_wage = ''
        this.timeCard.name = ''
        this.timeCard.birth_date = null
        this.timeCard.staff_id = null
        /* Trick to reset/clear native browser timeCard validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },

      /**
       * Method used to find the attached album.
       */
      fetchUser (songId) {
        proxy.findUser(songId)
          .then((data) => {
            this.user.selected = {
              id: data.id,
              label: data.name
            }
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
       * Method used to fetch an timeCard.
       *
       * @param {cardId|{type, required}} id The id of the timeCard.
       */
      fetchTimeCard (id) {
        proxy.find(id)
          .then((data) => {
            this.timeCard = TimeCardTransformer.fetch(data)
            this.show = true
            this.fetchUser(this.cardId)
          })
      },

      /**
       * Method used to return to the previous page.
       */
      goBack () {
        this.$router.push({
          name: 'time_cards.index',
          props: {
            cardId: this.cardId
          }
        })
      },

      /**
       * Method used to update an timeCard.
       * It'll dispatch the update action on the timeCard module.
       */
      updateTimeCard () {
        this.timeCard.userId = this.user.selected.id
        this.$store.dispatch('timecard/update', this.timeCard)
      }
    },

    /**
     * Available watchers for this page.
     */
    watch: {
      cardId (id) {
        this.fetchTimeCard(id)
      }
    },

    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the timeCard using the given timeCard identifier.
     */
    mounted () {
      this.fetchTimeCard(this.cardId)
    },
    components: {
      VSelect
    }
  }
</script>

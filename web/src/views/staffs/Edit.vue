<template>
  <b-row>
    <b-col lg="12">
      <b-card no-body>
        <div slot="header">
          <i class="fa fa-edit"></i> Staffs Edit
        </div>
        <b-card-body>
          <b-form @submit.prevent="updateStaff" @reset="onReset" v-if="show">
            <b-form-group id="labelStaffId"
                          label="Staff ID:"
                          label-for="staffId">
              <b-form-input id="staffId"
                            type="text"
                            v-model="staff.staffId"
                            required
                            placeholder="Enter staff id">
              </b-form-input>
            </b-form-group>
            <b-form-group id="labelName"
                          label="Name:"
                          label-for="name"
                          description="We'll never share your email with anyone else.">
              <b-form-input id="name"
                            type="text"
                            v-model="staff.name"
                            required
                            placeholder="Enter staff name">
              </b-form-input>
            </b-form-group>
            <b-form-group id="labelAddress"
                          label="Birth Date:"
                          label-for="birth_date">
              <b-form-input id="birth_date"
                            type="text"
                            v-model="staff.birthDate"
                            required
                            placeholder="Enter staff birth date">
              </b-form-input>
            </b-form-group>
            <b-form-group id="labelHourlyWage"
                          label="Hourly Wage:"
                          label-for="hourlyWage">
              <b-form-input id="hourlyWage"
                            type="text"
                            v-model="staff.hourlyWage"
                            required
                            placeholder="Enter staff hourly wage">
              </b-form-input>
            </b-form-group>
            <b-form-group id="labelStore"
                          label="Store:"
                          label-for="store">
              <v-select v-model="store.selected" @search="fetchStores" :options="store.items"></v-select>
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
  import UserProxy from '@/proxies/UserProxy'
  import UserTransformer from '@/transformers/UserTransformer'
  import StoreProxy from '@/proxies/StoreProxy'

  import VSelect from 'vue-select'

  const proxy = new UserProxy()
  const storeProxy = new StoreProxy()

  export default {
    name: 'staff-edit',

    /**
     * The properties that can be used.
     */
    props: {
      /**
       * The given staff identifier.
       */
      staffId: {
        type: [String, Number],
        required: true
      }
    },
    data () {
      return {
        staff: null,
        show: false,
        store: {
          items: [],
          selected: null
        }
      }
    },
    methods: {
      onReset (evt) {
        evt.preventDefault()
        /* Reset our staff values */
        this.staff.hourly_wage = ''
        this.staff.name = ''
        this.staff.birth_date = null
        this.staff.staff_id = null
        /* Trick to reset/clear native browser staff validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },

      /**
       * Method used to find the attached album.
       */
      fetchStore (songId) {
        proxy.findStore(songId)
          .then((data) => {
            this.store.selected = {
              id: data.id,
              label: data.name
            }
          })
      },

      /**
       * Debounced method to fetch the albums using a given query.
       */
      fetchStores: debounce(function (query) {
        storeProxy.setParameter('q', query)
          .all()
          .then((items) => {
            this.store.items = items.data.map(store => ({
              id: store.id,
              label: store.name
            }))
          })
      }, 500),

      /**
       * Method used to fetch an staff.
       *
       * @param {staffId|{type, required}} id The id of the staff.
       */
      fetchStaff (id) {
        proxy.find(id)
          .then((data) => {
            this.staff = UserTransformer.fetch(data)
            this.show = true
            this.fetchStore(this.staffId)
          })
      },

      /**
       * Method used to return to the previous page.
       */
      goBack () {
        this.$router.push({
          name: 'staffs.index',
          props: {
            staffId: this.staffId
          }
        })
      },

      /**
       * Method used to update an staff.
       * It'll dispatch the update action on the staff module.
       */
      updateStaff () {
        this.staff.storeId = this.store.selected.id
        this.$store.dispatch('user/update', this.staff)
      }
    },

    /**
     * Available watchers for this page.
     */
    watch: {
      staffId (id) {
        this.fetchStaff(id)
      }
    },

    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the staff using the given staff identifier.
     */
    mounted () {
      this.fetchStaff(this.staffId)
    },
    components: {
      VSelect
    }
  }
</script>

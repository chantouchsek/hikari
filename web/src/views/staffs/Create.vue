<template>
  <b-row>
    <b-col lg="12">
      <b-card no-body>
        <div slot="header">
          <i class="fa fa-edit"></i> Stores Edit
        </div>
        <b-card-body>
          <b-form @submit.prevent="createStaff" @reset="onReset" v-if="show">
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
  import Proxy from '@/proxies/StoreProxy'
  import debounce from 'lodash.debounce'
  import VSelect from 'vue-select'

  const proxy = new Proxy()

  export default {
    name: 'staff-create',
    data () {
      return {
        staff: {
          name: null,
          hourlyWage: null,
          birthDate: null,
          staffId: null,
          storeId: null
        },
        store: {
          items: [],
          selected: null
        },
        show: true
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
      createStaff () {
        this.staff.storeId = this.store.selected.id
        this.$store.dispatch('user/create', this.staff)
      },

      /**
       * Debounced method to fetch the albums using a given query.
       */
      fetchStores: debounce(function (query) {
        proxy.setParameter('q', query)
          .all()
          .then((items) => {
            this.store.items = items.data.map(store => ({
              id: store.id,
              label: store.name
            }))
          })
      }, 500),

      /**
       * Method used to return to the previous page.
       */
      goBack () {
        this.$router.push({
          name: 'staffs.index'
        })
      }
    },
    components: {
      VSelect
    }
  }
</script>

<template>
  <b-row>
    <b-col lg="12">
      <b-card no-body>
        <div slot="header">
          <i class="fa fa-edit"></i> DailyReports Edit
        </div>
        <b-form @submit.prevent="updateDailyReport" @reset="onReset" v-if="show">
          <b-card-body>
            <b-row>
              <b-col md="6">
                <b-form-group id="labelBranchId"
                              label="Branch Name:"
                              label-for="branchId">
                  <v-select v-model="branch.selected" @search="fetchBranches" :options="branch.items"></v-select>
                </b-form-group>
                <b-form-group id="labelTotalPrice"
                              label="Total Price:"
                              label-for="TotalPrice">
                  <b-form-input id="TotalPrice"
                                type="text"
                                v-model="dailyreport.totalPrice"
                                required
                                placeholder="Enter the report total price">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="labelNumberCustomers"
                              label="Number Customers:"
                              label-for="NumberCustomers">
                  <b-form-input id="NumberCustomers"
                                type="text"
                                v-model="dailyreport.numberCustomers"
                                required
                                placeholder="Enter the report number customers">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="labelPricePerCustomer"
                              label="Price/Customer:"
                              label-for="PricePerCustomer">
                  <b-form-input id="PricePerCustomer"
                                type="text"
                                v-model="dailyreport.pricePerCustomer"
                                required
                                placeholder="Enter price/customer">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="labelQuestA"
                              label="Quest A:"
                              label-for="questA">
                  <b-form-input id="questA"
                                type="text"
                                v-model="dailyreport.questA"
                                required
                                placeholder="Enter the report quest A">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="labelQuestC"
                              label="labelQuestC:"
                              label-for="labelQuestC">
                  <b-form-input id="name"
                                type="text"
                                v-model="dailyreport.questC"
                                placeholder="Enter the report quest C">
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group id="labelDate"
                              label="Date:"
                              label-for="date">
                  <b-input-group prepend="<i class='fa fa-calendar fa-sm'></i>">
                    <date-picker v-model="dailyreport.date" :config="configDate"></date-picker>
                  </b-input-group>
                </b-form-group>
                <b-form-group id="labelVoucherCost"
                              label="Cost:"
                              label-for="cost">
                  <b-form-input id="cost"
                                type="text"
                                v-model="dailyreport.cost"
                                placeholder="Enter the report cost">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="labelCustomerType"
                              label="Customer Type:"
                              label-for="CustomerType">
                  <b-form-select v-model="dailyreport.customerType"
                                 :options="this.$store.state.application.customerType"
                  ></b-form-select>
                </b-form-group>
                <b-form-group id="labelRoughInterest"
                              label="Rough interest:"
                              label-for="RoughInterest">
                  <b-form-input id="RoughInterest"
                                type="text"
                                v-model="dailyreport.roughInterest"
                                placeholder="Enter the report rough interest">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="labelQuestB"
                              label="QuestB:"
                              label-for="QuestB">
                  <b-form-input id="QuestB"
                                type="text"
                                v-model="dailyreport.questB"
                                placeholder="Enter the report quest B">
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-form-group id="labelNotes"
                          label="Notes:"
                          label-for="notes">
              <b-form-textarea id="notes"
                               type="text"
                               rows="5"
                               max-rows="10"
                               v-model="dailyreport.notes"
                               placeholder="Enter the report notes">
              </b-form-textarea>
            </b-form-group>
          </b-card-body>
          <b-card-footer>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
            <b-button type="button" variant="warning" @click.prevent="goBack">Back</b-button>
          </b-card-footer>
        </b-form>
      </b-card>
    </b-col><!--/.col-->
  </b-row><!--/.row-->
</template>

<script>
  import DailyReportProxy from '@/proxies/DailyReportProxy'
  import DailyReportTransformer from '@/transformers/DailyReportTransformer'
  import debounce from 'lodash.debounce'
  import BranchProxy from '@/proxies/BranchProxy'
  import VSelect from 'vue-select'

  const proxy = new DailyReportProxy()
  const branchProxy = new BranchProxy()

  export default {
    name: 'dailyreport-edit',

    /**
     * The properties that can be used.
     */
    props: {
      /**
       * The given dailyreport identifier.
       */
      dailyreportId: {
        type: [String, Number],
        required: true
      }
    },
    data () {
      return {
        dailyreport: null,
        show: false,
        branch: {
          items: [],
          selected: null
        }
      }
    },
    methods: {
      onReset (evt) {
        evt.preventDefault()
        /* Reset our dailyreport values */
        this.dailyreport = {}
        /* Trick to reset/clear native browser dailyreport validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      /**
       * Method used to fetch an dailyreport.
       *
       * @param {dailyreportId|{type, required}} id The id of the dailyreport.
       */
      fetchDailyReport (id) {
        proxy.find(id)
          .then((data) => {
            this.dailyreport = DailyReportTransformer.fetch(data)
            this.show = true
            this.fetchBranch(this.dailyreportId)
          })
      },

      /**
       * Method used to find the attached album.
       */
      fetchBranch (userId) {
        proxy.findBranch(userId)
          .then((data) => {
            this.branch.selected = {
              id: data.id,
              label: data.name
            }
          })
      },

      /**
       * Debounced method to fetch the users using a given query.
       */
      fetchBranches: debounce(function (query) {
        branchProxy.setParameter('q', query)
          .all()
          .then((items) => {
            this.branch.items = items.data.map(user => ({
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
          name: 'dailyreports.index',
          props: {
            dailyreportId: this.dailyreportId
          }
        })
      },

      /**
       * Method used to update an dailyreport.
       * It'll dispatch the update action on the dailyreport module.
       */
      updateDailyReport () {
        if (this.branch.selected !== null) {
          this.dailyreport.branchId = this.branch.selected.id
          this.$store.dispatch('dailyreport/update', this.dailyreport)
        }
      }
    },

    /**
     * Available watchers for this page.
     */
    watch: {
      dailyreportId (id) {
        this.fetchDailyReport(id)
      }
    },

    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the dailyreport using the given dailyreport identifier.
     */
    mounted () {
      this.fetchDailyReport(this.dailyreportId)
    },
    computed: {
      configTime () {
        return this.$store.state.application.configTime
      },
      configDate () {
        return this.$store.state.application.configDate
      }
    },
    components: {
      VSelect
    }
  }
</script>

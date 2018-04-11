<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <div slot="header">
            <i class="fa fa-edit"></i> Branches Table
            <div class="card-actions">
              <a href="#" class="btn btn-setting"><i class="icon-settings"></i></a>
              <b-btn class="btn btn-minimize" v-b-toggle.collapse1><i class="icon-arrow-up"></i></b-btn>
              <a href="#" class="btn btn-close" @click="reload"><i class="icon-refresh"></i></a>
              <b-link href="#/stores/create"><i class="icon-plus"></i></b-link>
            </div>
          </div>
          <b-collapse id="collapse1" visible>
            <b-card-body>
              <b-row>
                <b-col md="6" class="my-1">
                  <b-form-group horizontal label="Filter" class="mb-0">
                    <b-input-group>
                      <b-form-input v-model="query" placeholder="Type to Search"></b-form-input>
                      <b-input-group-append>
                        <b-btn :disabled="!query" @click="query = ''">Clear</b-btn>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col md="6" class="my-1">
                  <b-form-group horizontal label="Sort" class="mb-0">
                    <b-input-group>
                      <b-form-select v-model="sortBy" :options="sortOptions">
                        <option slot="first" :value="null">-- none --</option>
                      </b-form-select>
                      <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                        <option :value="false">Asc</option>
                        <option :value="true">Desc</option>
                      </b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-table
                show-empty
                stacked="md"
                responsive="sm"
                :items="dailyreport.all"
                :fields="fields"
                :current-page="currentPage"
                :per-page="dailyreport.pagination.perPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                @filtered="onFiltered"
                :filter="query"
                :busy="true"
              >
                <template slot-scope="row" slot="branch">
                  {{ row.item.branch ? row.item.branch.name : null }}
                </template>
                <template slot-scope="row" slot="user">
                  {{ row.item.user ? row.item.user.name : null }}
                </template>
                <template slot="actions" slot-scope="row">
                  <b-button size="sm" class="mr-1" :to="getDailyReportShowRoute(row.item.id)" variant="info">
                    Details
                  </b-button>
                  <b-button size="sm" class="mr-1" :to="getDailyReportRoute(row.item.id)" variant="success">
                    Edit
                  </b-button>
                  <b-button size="sm" class="mr-1" @click.prevent="destroyDailyReport(row.item.id)" variant="danger">
                    Delete
                  </b-button>
                </template>
              </b-table>
              <b-row>
                <b-col md="6" class="my-1">
                  <b-pagination
                    :total-rows="dailyreport.pagination.totalCount"
                    :per-page="limit"
                    v-model="currentPage"
                    prev-text="Prev"
                    next-text="Next"
                    class="my-0"
                  ></b-pagination>
                </b-col>
                <b-col md="6" class="my-1">
                  <b-form-group horizontal label="Per page" class="mb-0">
                    <b-form-select
                      v-model="limit"
                      :options="pageNumbers"
                      class="mb-3"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-col><!--/.col-->
    </b-row><!--/.row-->
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import debounce from 'lodash.debounce'
  import cTable from '@/components/Table/Table'

  export default {
    /**
     * The name of the page.
     */
    name: 'dailyreport-index',
    /**
     * The data the page can use.
     *
     * @returns {Object} The data.
     */
    data () {
      return {
        fields: [
          { key: 'branch', label: 'Branch Name', sortable: true },
          { key: 'user', label: 'Reporter Name', sortable: true },
          { key: 'totalPrice', label: 'Sales', sortable: true },
          { key: 'numberCustomers', label: 'Total Guest', sortable: true },
          { key: 'pricePerCustomer', label: 'Unit Sales', sortable: true },
          { key: 'cost', label: 'Cost', sortable: true },
          { key: 'roughInterest', label: 'Gross Profit', sortable: true },
          { key: 'date', label: 'Date', sortable: true },
          { key: 'actions', label: 'Actions' }
        ],
        query: null,
        pageNumbers: [
          5,
          10,
          30,
          50,
          500
        ],
        sortBy: 'name',
        sortDesc: false
      }
    },
    /**
     * The computed properties the page can use.
     */
    computed: {
      ...mapState('dailyreport', {
        dailyreport: state => state
      }),
      limit: {
        get () {
          return this.dailyreport.pagination.limit
        },
        set (limit) {
          this.setLimit(limit)
        }
      },
      currentPage: {
        get () {
          return this.dailyreport.pagination.currentPage
        },
        set (page) {
          this.setPage(page)
        }
      },
      sortOptions () {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    /**
     * The methods which the page can use.
     */
    methods: {
      onFiltered (filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        // this.totalRows = filteredItems.length
        this.currentPage = this.dailyreport.pagination.currentPage
      },
      /**
       * Method used to get the dailyreport route.
       *
       * @param {Number} id The dailyreport identifier.
       *
       * @returns {Object} The dailyreport route.
       */
      getDailyReportRoute (id) {
        return {
          name: 'dailyreports.edit',
          params: { dailyreportId: id }
        }
      },
      getDailyReportShowRoute (id) {
        return {
          name: 'dailyreports.show',
          params: { dailyreportId: id }
        }
      },
      /**
       * Method used to redirect the dailyreport to the dailyreport create page.
       */
      redirectToCreatePage () {
        this.$router.push({
          name: 'dailyreports.create'
        })
      },
      /**
       * Method used to go to a different page.
       *
       * @param {Number} page The page number.
       */
      setPage (page) {
        this.$store.dispatch('dailyreport/all', (proxy) => {
          proxy.setParameter('page', page)
        })
      },
      /**
       * Method used to set the limit of the items being displayed.
       *
       * @param {Number} limit The limit of items being displayed.
       */
      setLimit (limit) {
        this.$store.dispatch('dailyreport/all', (proxy) => {
          proxy.setParameter('limit', limit)
            .removeParameter('page')
        })
      },
      /**
       * Method used to set the query of the search bar.
       * The results will be debounced using the lodash debounce method.
       */
      setQuery: debounce(function (query) {
        this.$store.dispatch('dailyreport/all', (proxy) => {
          proxy.setParameter('q', query)
            .removeParameter('page')
        })
      }, 500),
      /**
       * Reload the resource
       */
      reload () {
        this.$store.dispatch('dailyreport/all')
      },
      /**
       * Delete the resource
       */
      destroyDailyReport (staff, index) {
        this.$store.dispatch('dailyreport/destroy', staff)
        this.dailyreport.splice(index, 1)
      },

      /**
       * format the type for time type
       */
      formatDailyReportType (type) {
        switch (type) {
          case 1:
            return 'DailyReport type 1'
          case 2:
            return 'DailyReport type 2'
          case 3:
            return 'DailyReport type 3'
          case 4:
            return 'DailyReport type 4'
          default:
            return 'None'
        }
      }
    },
    /**
     * Available watchers for this page.
     */
    watch: {
      query (query) {
        console.log(query)
        this.setQuery(query)
      }
    },
    /**
     * The components that are being used.
     */
    components: {
      cTable
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    mounted () {
      this.$store.watch((state) => {
        if (state.auth.authenticated) {
          this.$store.dispatch('dailyreport/all')
          // this.$echo
          //   .channel('dailyreport')
          //   .listen('User.Created', staff => this.$store.dispatch('dailyreport/created', staff))
          //   .listen('User.Updated', (staff) => {
          //     console.log(staff)
          //     this.$store.dispatch('dailyreport/updated', staff)
          //   })
          //   .listen('User.Deleted', staff => this.$store.dispatch('dailyreport/destroyed', staff))
        }
      })
    }
  }
</script>

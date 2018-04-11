<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <div slot="header">
            <i class="fa fa-edit"></i> Attendance Detail
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
                :items="attendance.all"
                :fields="fields"
                :current-page="currentPage"
                :per-page="attendance.pagination.perPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                @filtered="onFiltered"
                :filter="query"
                :busy="true"
              >
                <template slot="user" slot-scope="row">
                  {{ row.item.user ? row.item.user.name : null }}
                </template>
                <template slot="meal" slot-scope="row">
                  {{ formatTakeFood(row.item.meal) }}
                </template>
                <template slot="branch" slot-scope="row">
                  {{ row.item.branch ? row.item.branch.name : null }}
                </template>
                <template slot="actions" slot-scope="row">
                  <b-button size="sm" class="mr-1" :to="getAttendanceShowRoute(row.item.id)" variant="success">
                    Details
                  </b-button>
                  <b-button size="sm" class="mr-1" :to="getAttendanceRoute(row.item.id)" variant="info">
                    Edit
                  </b-button>
                  <b-button size="sm" class="mr-1" @click.prevent="destroyAttendance(row.item.id)" variant="danger">
                    Delete
                  </b-button>
                </template>
              </b-table>
              <b-row>
                <b-col md="6" class="my-1">
                  <b-pagination
                    :total-rows="attendance.pagination.totalCount"
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
    name: 'attendance-index',
    /**
     * The data the page can use.
     *
     * @returns {Object} The data.
     */
    data () {
      return {
        fields: [
          { key: 'user', label: 'Name', sortable: true },
          { key: 'branch', label: 'Branch', sortable: true },
          { key: 'startTime', label: 'Start', sortable: true },
          { key: 'leaveTime', label: 'Leave', sortable: true },
          { key: 'breakStart', label: 'Break Start', sortable: true },
          { key: 'breakFinish', label: 'Break Finish', sortable: true },
          { key: 'meal', label: 'Meal', sortable: true },
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
      ...mapState('attendance', {
        attendance: state => state
      }),
      limit: {
        get () {
          return this.attendance.pagination.limit
        },
        set (limit) {
          this.setLimit(limit)
        }
      },
      currentPage: {
        get () {
          return this.attendance.pagination.currentPage
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
        this.currentPage = this.attendance.pagination.currentPage
      },
      /**
       * Method used to get the attendance route.
       *
       * @param {Number} id The attendance identifier.
       *
       * @returns {Object} The attendance route.
       */
      getAttendanceRoute (id) {
        return {
          name: 'attendances.edit',
          params: { attendanceId: id }
        }
      },

      /**
       * Method used to get the attendance route.
       *
       * @param {Number} id The attendance identifier.
       *
       * @returns {Object} The attendance route.
       */
      getAttendanceShowRoute (id) {
        return {
          name: 'attendances.show',
          params: { attendanceId: id }
        }
      },
      /**
       * Method used to redirect the attendance to the attendance create page.
       */
      redirectToCreatePage () {
        this.$router.push({
          name: 'attendances.create'
        })
      },
      /**
       * Method used to go to a different page.
       *
       * @param {Number} page The page number.
       */
      setPage (page) {
        this.$store.dispatch('attendance/all', (proxy) => {
          proxy.setParameter('page', page)
        })
      },
      /**
       * Method used to set the limit of the items being displayed.
       *
       * @param {Number} limit The limit of items being displayed.
       */
      setLimit (limit) {
        this.$store.dispatch('attendance/all', (proxy) => {
          proxy.setParameter('limit', limit)
            .removeParameter('page')
        })
      },
      /**
       * Method used to set the query of the search bar.
       * The results will be debounced using the lodash debounce method.
       */
      setQuery: debounce(function (query) {
        this.$store.dispatch('attendance/all', (proxy) => {
          proxy.setParameter('q', query)
            .removeParameter('page')
        })
      }, 500),
      /**
       * Reload the resource
       */
      reload () {
        this.$store.dispatch('attendance/all')
      },
      /**
       * Delete the resource
       */
      destroyAttendance (staff, index) {
        this.$store.dispatch('attendance/destroy', staff)
        this.attendance.splice(index, 1)
      },

      /**
       * format the type for time type
       */
      formatTakeFood (type) {
        switch (type) {
          case 1:
            return 'Yes'
          case 0:
            return 'No'
          default:
            return 'None'
        }
      },

      /**
       * format the type for time type
       */
      formatAttendanceType (type) {
        switch (type) {
          case 1:
            return 'Work time'
          case 2:
            return 'Extra payable h. part-time'
          case 3:
            return 'Overtime w/flexitime'
          case 4:
            return 'Paid nursing leave'
          case 5:
            return 'Paid overtime'
          case 6:
            return 'Work travel'
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
          this.$store.dispatch('attendance/all')
          // this.$echo
          //   .channel('attendance')
          //   .listen('User.Created', staff => this.$store.dispatch('attendance/created', staff))
          //   .listen('User.Updated', (staff) => {
          //     console.log(staff)
          //     this.$store.dispatch('attendance/updated', staff)
          //   })
          //   .listen('User.Deleted', staff => this.$store.dispatch('attendance/destroyed', staff))
        }
      })
    }
  }
</script>

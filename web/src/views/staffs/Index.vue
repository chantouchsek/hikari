<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <div slot="header">
            <i class="fa fa-edit"></i> Staffs Table
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
                      <b-form-input v-model="query" placeholder="Type to Search"/>
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
                :items="user.all"
                :fields="fields"
                :current-page="currentPage"
                :per-page="user.pagination.perPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                @filtered="onFiltered"
                :filter="query"
                busy
              >
                <template slot="registered" slot-scope="row">
                  {{ row.item.registered }}
                </template>
                <template slot="store" slot-scope="row">
                  {{ row.item.store ? row.item.store.name : 'None' }}
                </template>
                <template slot="name" slot-scope="row">
                  <router-link :to="getStaffRoute(row.item.id)">{{ row.item.name }}</router-link>
                </template>
                <template slot="status" slot-scope="data">
                  <b-badge>
                    {{data.item.status}}
                  </b-badge>
                </template>
                <template slot="actions" slot-scope="row">
                  <b-button size="sm" class="mr-1" :to="getStaffRoute(row.item.id)" variant="info">
                    Edit
                  </b-button>
                  <b-button size="sm" class="mr-1" @click.prevent="destroyStore(row.item.id)" variant="danger">
                    Delete
                  </b-button>
                </template>
              </b-table>
              <b-row>
                <b-col md="6" class="my-1">
                  <b-pagination
                    :total-rows="user.pagination.totalCount"
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
    name: 'staff-index',
    /**
     * The data the page can use.
     *
     * @returns {Object} The data.
     */
    data () {
      return {
        fields: [
          { key: 'staffId', label: 'Staff ID', sortable: true },
          { key: 'name', label: 'Name', sortable: true },
          { key: 'store', label: 'Store', sortable: true },
          { key: 'registered', label: 'Registered at', sortable: true },
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
      ...mapState('user', {
        user: state => state
      }),
      limit: {
        get () {
          return this.user.pagination.limit
        },
        set (limit) {
          this.setLimit(limit)
        }
      },
      currentPage: {
        get () {
          return this.user.pagination.currentPage
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
        this.currentPage = this.user.pagination.currentPage
      },
      /**
       * Method used to get the user route.
       *
       * @param {Number} id The user identifier.
       *
       * @returns {Object} The user route.
       */
      getStaffRoute (id) {
        return {
          name: 'staffs.show',
          params: { staffId: id }
        }
      },
      /**
       * Method used to redirect the user to the user create page.
       */
      redirectToCreatePage () {
        this.$router.push({
          name: 'staffs.create'
        })
      },
      /**
       * Method used to go to a different page.
       *
       * @param {Number} page The page number.
       */
      setPage (page) {
        this.$store.dispatch('user/all', (proxy) => {
          proxy.setParameter('page', page)
        })
      },
      /**
       * Method used to set the limit of the items being displayed.
       *
       * @param {Number} limit The limit of items being displayed.
       */
      setLimit (limit) {
        this.$store.dispatch('user/all', (proxy) => {
          proxy.setParameter('limit', limit)
            .removeParameter('page')
        })
      },
      /**
       * Method used to set the query of the search bar.
       * The results will be debounced using the lodash debounce method.
       */
      // eslint-disable-next-line
      setQuery: debounce(function (query) {
        this.$store.dispatch('user/all', (proxy) => {
          proxy.setParameter('q', query)
            .removeParameter('page')
        })
      }, 500),
      /**
       * Reload the resource
       */
      reload () {
        this.$store.dispatch('user/all')
      },
      /**
       * Delete the resource
       */
      destroyStore (staff, index) {
        this.$store.dispatch('user/destroy', staff)
        this.user.splice(index, 1)
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
          this.$store.dispatch('user/all')
          // this.$echo
          //   .channel('user')
          //   .listen('User.Created', staff => this.$store.dispatch('user/created', staff))
          //   .listen('User.Updated', (staff) => {
          //     console.log(staff)
          //     this.$store.dispatch('user/updated', staff)
          //   })
          //   .listen('User.Deleted', staff => this.$store.dispatch('user/destroyed', staff))
        }
      })
    }
  }
</script>

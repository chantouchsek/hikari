<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <div slot="header">
            <i class="fa fa-edit"></i> Stores Table
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
                :items="store.all"
                :fields="fields"
                :current-page="currentPage"
                :per-page="store.pagination.perPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                @filtered="onFiltered"
                :filter="query"
                busy
              >
                <template slot="registered" slot-scope="row">
                  {{ row.item.registered }}
                </template>
                <template slot="name" slot-scope="row">
                  <router-link :to="getStoreRoute(row.item.id)">{{ row.item.name }}</router-link>
                </template>
                <template slot="status" slot-scope="data">
                  <b-badge>
                    {{data.item.status}}
                  </b-badge>
                </template>
                <template slot="actions" slot-scope="row">
                  <b-button size="sm" class="mr-1" :to="getStoreRoute(row.item.id)" variant="info">
                    Edit
                  </b-button>
                  <b-button size="sm" class="mr-1" @click.prevent="deleteStore(row.item.id)" variant="danger">
                    Delete
                  </b-button>
                </template>
              </b-table>
              <b-row>
                <b-col md="6" class="my-1">
                  <b-pagination
                    :total-rows="store.pagination.totalCount"
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
    name: 'store-index',
    /**
     * The data the page can use.
     *
     * @returns {Object} The data.
     */
    data () {
      return {
        fields: [
          { key: 'name', label: 'Name', sortable: true },
          { key: 'status', label: 'Status', sortable: true },
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
      ...mapState('store', {
        store: state => state
      }),
      limit: {
        get () {
          return this.store.pagination.limit
        },
        set (limit) {
          this.setLimit(limit)
        }
      },
      currentPage: {
        get () {
          return this.store.pagination.currentPage
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
        this.currentPage = this.store.pagination.currentPage
      },
      /**
       * Method used to get the store route.
       *
       * @param {Number} id The store identifier.
       *
       * @returns {Object} The store route.
       */
      getStoreRoute (id) {
        return {
          name: 'stores.show',
          params: { storeId: id }
        }
      },
      /**
       * Method used to redirect the store to the store create page.
       */
      redirectToCreatePage () {
        this.$router.push({
          name: 'stores.create'
        })
      },
      /**
       * Method used to go to a different page.
       *
       * @param {Number} page The page number.
       */
      setPage (page) {
        this.$store.dispatch('store/all', (proxy) => {
          proxy.setParameter('page', page)
        })
      },
      /**
       * Method used to set the limit of the items being displayed.
       *
       * @param {Number} limit The limit of items being displayed.
       */
      setLimit (limit) {
        this.$store.dispatch('store/all', (proxy) => {
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
        this.$store.dispatch('store/all', (proxy) => {
          proxy.setParameter('q', query)
            .removeParameter('page')
        })
      }, 500),
      /**
       * Reload the resource
       */
      reload () {
        this.$store.dispatch('store/all')
      },
      /**
       * Delete the resource
       */
      deleteStore (store) {
        this.$store.dispatch('store/destroy', store)
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
          this.$store.dispatch('store/all')
          this.$echo
            .channel('store')
            .listen('Store.Created', store => this.$store.dispatch('store/created', store))
            .listen('Store.Updated', (store) => {
              this.$store.dispatch('store/updated', store)
            })
            .listen('Store.Deleted', store => this.$store.dispatch('store/destroyed', store))
        }
      })
    }
  }
</script>

<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <div slot="header">
            <i class="fa fa-edit"></i> Schedule Post Table
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
                :items="post.all"
                :fields="fields"
                :current-page="currentPage"
                :per-page="post.pagination.perPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                @filtered="onFiltered"
                :filter="query"
                :busy="true"
              >
                <template slot="user" slot-scope="row">
                  <b-media vertical-align="center">
                    <b-img rounded="circle" slot="aside" blank blank-color="#ccc" width="80" alt="placeholder"></b-img>
                    <h5 class="mt-0 mb-1">{{ row.item.user ? row.item.user.name : null}}</h5>
                    {{ row.item.comments }}
                  </b-media>
                </template>
                <template slot="actions" slot-scope="row">
                  <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1" variant="primary">
                    Details
                  </b-button>
                </template>
              </b-table>
              <b-row>
                <b-col md="6" class="my-1">
                  <b-pagination
                    :total-rows="post.pagination.totalCount"
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
    <b-modal id="modalInfo" centered @hide="resetModal" title="Hello" v-if="schedulePost" hide-footer footerBgVariant="info">
      <b-row>
        <b-col md="12">
          <h5>{{ schedulePost.scheduledAt }}</h5>
          <h5>{{ schedulePost.type }}</h5>
          <p>{{ schedulePost.comments }}</p>
          <div slot="modal-footer" class="w-100">
            <b-dropdown id="actions" text="Edit" class="m-md-2">
              <b-dropdown-item>Edit</b-dropdown-item>
              <b-dropdown-item>Post</b-dropdown-item>
              <b-dropdown-item>Reschedule</b-dropdown-item>
              <b-dropdown-item>Remove Sechdule</b-dropdown-item>
              <b-dropdown-item @click.prevent="destroySchedulePost(schedulePost.id)">Delete</b-dropdown-item>
            </b-dropdown>
          </div>
        </b-col>
      </b-row>
    </b-modal>
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
    name: 'post-index',
    /**
     * The data the page can use.
     *
     * @returns {Object} The data.
     */
    data () {
      return {
        fields: [
          { key: 'user', label: 'Schedule Post', sortable: true },
          { key: 'scheduledAt', label: 'Scheduled At', sortable: true },
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
        sortDesc: false,
        schedulePost: {
          id: null,
          comments: null
        }
      }
    },
    /**
     * The computed properties the page can use.
     */
    computed: {
      ...mapState('post', {
        post: state => state
      }),
      limit: {
        get () {
          return this.post.pagination.limit
        },
        set (limit) {
          this.setLimit(limit)
        }
      },
      currentPage: {
        get () {
          return this.post.pagination.currentPage
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
        this.currentPage = this.post.pagination.currentPage
      },
      /**
       * Method used to get the post route.
       *
       *
       * @returns {Object} The post route.
       * @param item
       * @param index
       * @param button
       */
      info (item, index, button) {
        this.schedulePost = item
        this.$root.$emit('bv::show::modal', 'modalInfo', button)
      },

      resetModal () {
        this.schedulePost = {}
      },
      /**
       * Method used to redirect the post to the post create page.
       */
      redirectToCreatePage () {
        this.$router.push({
          name: 'posts.create'
        })
      },
      /**
       * Method used to go to a different page.
       *
       * @param {Number} page The page number.
       */
      setPage (page) {
        this.$store.dispatch('post/all', (proxy) => {
          proxy.setParameter('page', page)
        })
      },
      /**
       * Method used to set the limit of the items being displayed.
       *
       * @param {Number} limit The limit of items being displayed.
       */
      setLimit (limit) {
        this.$store.dispatch('post/all', (proxy) => {
          proxy.setParameter('limit', limit)
            .removeParameter('page')
        })
      },
      /**
       * Method used to set the query of the search bar.
       * The results will be debounced using the lodash debounce method.
       */
      setQuery: debounce(function (query) {
        this.$store.dispatch('post/all', (proxy) => {
          proxy.setParameter('q', query)
            .removeParameter('page')
        })
      }, 500),
      /**
       * Reload the resource
       */
      reload () {
        this.$store.dispatch('post/all')
      },
      /**
       * Delete the resource
       */
      destroySchedulePost (staff) {
        this.$store.dispatch('post/destroy', staff)
        // this.post.splice(index, 1)
        this.$root.$emit('bv::hide::modal', 'modalInfo')
      },

      /**
       * format the type for time type
       */
      formatSchedulePostType (type) {
        switch (type) {
          case 1:
            return 'SchedulePost type 1'
          case 2:
            return 'SchedulePost type 2'
          case 3:
            return 'SchedulePost type 3'
          case 4:
            return 'SchedulePost type 4'
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
          this.$store.dispatch('post/all')
          // this.$echo
          //   .channel('post')
          //   .listen('User.Created', staff => this.$store.dispatch('post/created', staff))
          //   .listen('User.Updated', (staff) => {
          //     console.log(staff)
          //     this.$store.dispatch('post/updated', staff)
          //   })
          //   .listen('User.Deleted', staff => this.$store.dispatch('post/destroyed', staff))
        }
      })
    }
  }
</script>

<template>
  <b-card no-body>
    <div slot="header">
      <i class="fa fa-edit"></i> {{ caption }}
      <div class="card-actions">
        <a href="#" class="btn btn-setting"><i class="icon-settings"></i></a>
        <b-btn class="btn btn-minimize" v-b-toggle.collapse1><i class="icon-arrow-up"></i></b-btn>
        <a href="#" class="btn btn-close" @click="add"><i class="icon-close"></i></a>
        <b-link href="#/setting/permissions/create"><i class="icon-close"></i></b-link>
      </div>
    </div>
    <b-collapse id="collapse1" visible>
      <b-card-body>
        <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items.all" :fields="fields" :current-page="items.pagination.currentPage" :per-page="items.pagination.perPage">
          <template slot="status" slot-scope="data">
            <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
          </template>
        </b-table>
        <nav>
          <b-pagination :total-rows="items.pagination.totalCount" :per-page="items.pagination.perPage" v-model="currentPage" prev-text="Prev" next-text="Next"></b-pagination>
        </nav>
        <nav>
          <b-form-select v-model="limit" :options="pageNumbers" class="mb-3"></b-form-select>
        </nav>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
  /* eslint-disable no-unused-vars */

  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }

  export default {
    name: 'c-table',
    props: {
      caption: {
        type: String,
        default: 'Table'
      },
      hover: {
        type: Boolean,
        default: false
      },
      striped: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: false
      },
      items: {
        type: Object,
        default: []
      },
      add: {
        type: Function,
        default: false
      },
      currentPageNow: {
        type: Number,
        default: 1
      },
      currentLimit: {
        type: Number,
        default: 10
      }
    },
    data: () => {
      return {
        fields: [
          {key: 'name'},
          {key: 'created_at'}
        ],
        currentPage: this.currentPageNow,
        limit: this.currentLimit,
        perPage: 5,
        totalRows: 0,
        pageNumbers: [
          5,
          10,
          15,
          25,
          50,
          100,
          150
        ]
      }
    },
    methods: {
      getBadge (status) {
        return status === 'Active' ? 'success'
          : status === 'Inactive' ? 'secondary'
            : status === 'Pending' ? 'warning'
              : status === 'Banned' ? 'danger' : 'primary'
      },
      getRowCount (items) {
        return items
      }
    }
  }
</script>

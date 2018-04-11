<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <div slot="header">
            <i class="fa fa-edit"></i> Attendances Table
          </div>
          <b-card-body>
            <b-row>
              <b-col md="4">
                <b-media left-align vertical-align="center">
                  <b-img slot="aside"
                         rounded="circle"
                         blank width="75"
                         height="75"
                         blank-color="#777"
                         alt="img"
                         class="m-1"
                  ></b-img>
                  <h5 class="mt-0 mb-1">Staff ID</h5>
                  {{ attendance.user.staff_id }}
                </b-media>
              </b-col>
              <b-col md="8">
                <h5>Name:</h5>
                <p>{{ attendance.user.name}}</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4">
                <h5>Birth Day:</h5>
                <p>{{attendance.user.birth_date}}</p>
              </b-col>
              <b-col md="8">
                <h5>Hourly Rate:</h5>
                <p>{{attendance.user.hourly_rate}}</p>
              </b-col>
              <b-col md="4">
                <h5>Branch Name:</h5>
                <p>{{ attendance.branch ? attendance.branch.name : null }}</p>
              </b-col>
              <b-col md="8">
                <h5>Type:</h5>
                <p>{{attendance.user.attendanceType}}</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4">
                <b-form-select v-model="selected" :options="options" class="mb-3">
                  <template slot="first">
                    <!-- this slot appears above the options from 'options' prop -->
                    <option :value="null" disabled>-- Please select an option --</option>
                  </template>
                  <!-- these options will appear after the ones from 'options' prop -->
                  <option value="C">Option C</option>
                  <option value="D">Option D</option>
                </b-form-select>
              </b-col>
              <b-col md="3">
                <b-form-select v-model="selected" :options="options" class="mb-3">
                  <template slot="first">
                    <!-- this slot appears above the options from 'options' prop -->
                    <option :value="null" disabled>-- Please select an option --</option>
                  </template>
                  <!-- these options will appear after the ones from 'options' prop -->
                  <option value="C">Option C</option>
                  <option value="D">Option D</option>
                </b-form-select>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6" class="my-1">
                <b-form-group horizontal label="Filter" class="mb-0">
                  <b-input-group>
                    <b-form-input v-model="filter" placeholder="Type to Search" />
                    <b-input-group-append>
                      <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
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

            <!-- Main table element -->
            <b-table show-empty
                     stacked="md"
                     :items="items"
                     :fields="fields"
                     :current-page="currentPage"
                     :per-page="perPage"
                     :filter="filter"
                     :sort-by.sync="sortBy"
                     :sort-desc.sync="sortDesc"
                     @filtered="onFiltered"
                     bordered
                     outlined
                     hover
            >
              <template slot="name" slot-scope="row">{{row.value.first}} {{row.value.last}}</template>
              <template slot="isActive" slot-scope="row">{{row.value?'Yes :)':'No :('}}</template>
              <template slot="actions" slot-scope="row">
                <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
                <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
                  Info modal
                </b-button>
                <b-button size="sm" @click.stop="row.toggleDetails">
                  {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                </b-button>
              </template>
              <template slot="row-details" slot-scope="row">
                <b-card>
                  <ul>
                    <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
                  </ul>
                </b-card>
              </template>
            </b-table>
            <b-row>
              <b-col md="2" class="my-1">
                <b-button type="button" variant="info" @click.prevent="goBack">Back</b-button>
              </b-col>
              <b-col md="5" class="my-1">
                <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0"></b-pagination>
              </b-col>
              <b-col md="5" class="my-1">
                <b-form-group horizontal label="Per page" class="mb-0">
                  <b-form-select :options="pageOptions" v-model="perPage"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>

            <!-- Info modal -->
            <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
              <pre>{{ modalInfo.content }}</pre>
            </b-modal>
          </b-card-body>
        </b-card>
      </b-col><!--/.col-->
    </b-row><!--/.row-->
  </div>
</template>

<script>
  import AttendanceProxy from '@/proxies/AttendanceProxy'
  import AttendanceTransformer from '@/transformers/AttendanceTransformer'

  const proxy = new AttendanceProxy()
  const items = [
    { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } },
    { isActive: false, age: 21, name: { first: 'Larsen', last: 'Shaw' } },
    {
      isActive: false,
      age: 9,
      name: { first: 'Mini', last: 'Navarro' },
      _rowVariant: 'success'
    },
    { isActive: false, age: 89, name: { first: 'Geneva', last: 'Wilson' } },
    { isActive: true, age: 38, name: { first: 'Jami', last: 'Carney' } },
    { isActive: false, age: 27, name: { first: 'Essie', last: 'Dunlap' } },
    { isActive: true, age: 40, name: { first: 'Thor', last: 'Macdonald' } },
    {
      isActive: true,
      age: 87,
      name: { first: 'Larsen', last: 'Shaw' },
      _cellVariants: { age: 'danger', isActive: 'warning' }
    },
    { isActive: false, age: 26, name: { first: 'Mitzi', last: 'Navarro' } },
    { isActive: false, age: 22, name: { first: 'Genevieve', last: 'Wilson' } },
    { isActive: true, age: 38, name: { first: 'John', last: 'Carney' } },
    { isActive: false, age: 29, name: { first: 'Dick', last: 'Dunlap' } }
  ]
  export default {
    name: 'attendance-edit',

    /**
     * The properties that can be used.
     */
    props: {
      /**
       * The given attendance identifier.
       */
      attendanceId: {
        type: [String, Number],
        required: true
      }
    },
    data () {
      return {
        attendance: null,
        show: false,
        selected: null,
        options: [
          { value: 'A', text: 'Option A (from options prop)' },
          { value: 'B', text: 'Option B (from options prop)' }
        ],
        items: items,
        fields: [
          { key: 'name', label: 'Person Full name', sortable: true },
          { key: 'age', label: 'Person age', sortable: true, 'class': 'text-center' },
          { key: 'isActive', label: 'is Active' },
          { key: 'actions', label: 'Actions' }
        ],
        currentPage: 1,
        perPage: 5,
        totalRows: items.length,
        pageOptions: [ 5, 10, 15 ],
        sortBy: null,
        sortDesc: false,
        filter: null,
        modalInfo: { title: '', content: '' }
      }
    },
    computed: {
      sortOptions () {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => { return { text: f.label, value: f.key } })
      }
    },
    methods: {
      info (item, index, button) {
        this.modalInfo.title = `Row index: ${index}`
        this.modalInfo.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', 'modalInfo', button)
      },
      resetModal () {
        this.modalInfo.title = ''
        this.modalInfo.content = ''
      },
      onFiltered (filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      /**
       * Method used to fetch an attendance.
       *
       * @param {attendanceId|{type, required}} id The id of the attendance.
       */
      fetchAttendance (id) {
        proxy.find(id)
          .then((data) => {
            this.attendance = AttendanceTransformer.fetch(data)
            this.show = true
          })
      },

      /**
       * Method used to return to the previous page.
       */
      goBack () {
        this.$router.push({
          name: 'attendances.index',
          props: {
            attendanceId: this.attendanceId
          }
        })
      },

      /**
       * Delete the resource
       */
      destroyAttendance (attendance) {
        this.$store.dispatch('attendance/destroy', attendance)
      }
    },

    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the attendance using the given attendance identifier.
     */
    mounted () {
      this.fetchAttendance(this.attendanceId)
    }
  }
</script>

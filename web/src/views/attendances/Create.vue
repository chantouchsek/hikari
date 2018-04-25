<template>
  <b-row>
    <b-col lg="12">
      <b-card no-body>
        <div slot="header">
          <i class="fa fa-edit"></i> Attendance Create
        </div>
        <b-form @submit.prevent="createAttendance" @reset="onReset" v-if="show">
          <b-card-body>
            <b-row>
              <b-col lg="5">
                <b-form-group id="labelUserId"
                              label="Staff ID:"
                              label-for="staffId">
                  <b-form-file v-model="attendance.thumbnail_id" placeholder="Choose a file..."></b-form-file>
                </b-form-group>
              </b-col><!--/.col-->
              <b-col lg="7">
                <b-row>
                  <b-col lg="6">
                    <b-form-group id="labelBranchName"
                                  label="Branch Name:"
                                  label-for="branchName">
                      <v-select v-model="branch.selected" @search="fetchBranches" :options="branch.items"></v-select>
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group id="labelUserId"
                                  label="Staff ID:"
                                  label-for="staffId">
                      <v-select v-model="user.selected" @search="fetchUsers" :options="user.items"></v-select>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
              <b-col lg="6">
                <b-form-group id="labelTypeAttendance"
                              label="TypeAttendance:"
                              label-for="TypeAttendance">
                  <b-form-select v-model="attendance.typeAttendance"
                                 :options="options"
                                 class=""
                                 id="TypeAttendance"
                  ></b-form-select>
                </b-form-group>
                <b-row>
                  <b-col lg="6">
                    <b-form-group id="labelStartTime"
                                  label="Start:"
                                  label-for="startMorning">
                      <date-picker v-model="attendance.startTime" :config="configDate"></date-picker>
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group id="labelStartTimer"
                                  label="."
                                  label-for="startTimer">
                      <date-picker v-model="attendance.startTimer" :config="configTime"></date-picker>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="6">
                    <b-form-group id="labelLeaveTimer"
                                  label="Leave:"
                                  label-for="leaveTime">
                      <date-picker v-model="attendance.leaveTime" :config="configDate"></date-picker>
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group id="labelLeaveTimer"
                                  label="."
                                  label-for="leaveTimer">
                      <date-picker v-model="attendance.leaveTimer" :config="configTime"></date-picker>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-form-group id="labelTotalWorking"
                              label="Total working hours"
                              label-for="Total working hours">
                  <p class="mt-1">35 Hrs</p>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group id="labelHourlyWage"
                              label="Hourly Wage:"
                              label-for="hourlyWage">
                  <p class="mt-1 mb-4">36,500 Hrs</p>
                </b-form-group>
                <b-row>
                  <b-col lg="6">
                    <b-form-group id="labelBreakStart"
                                  label="Break Start:"
                                  label-for="breakStart">
                      <date-picker v-model="attendance.breakStart" :config="configDate"></date-picker>
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group id="labelBreakStartTime"
                                  label="."
                                  label-for="breakStartTime">
                      <date-picker v-model="attendance.breakStartTime" :config="configTime"></date-picker>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="6">
                    <b-form-group id="labelBreakFinish"
                                  label="Break Finish:"
                                  label-for="breakFinish">
                      <date-picker v-model="attendance.breakFinish" :config="configDate"></date-picker>
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group id="labelBreakFinishTime"
                                  label="."
                                  label-for="breakFinishTime">
                      <date-picker v-model="attendance.breakFinishTime" :config="configTime"></date-picker>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="3">
                    <b-form-group id="labelMeal"
                                  label="Meal:"
                                  label-for="meal">
                      <b-form-checkbox id="meal"
                                       v-model="attendance.meal"
                                       value="1"
                                       unchecked-value="0">
                      </b-form-checkbox>
                    </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group id="labelLate"
                                  label="Late:"
                                  label-for="late">
                      <b-form-checkbox id="late"
                                       v-model="attendance.late"
                                       value="1"
                                       unchecked-value="0">
                      </b-form-checkbox>
                    </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group id="labelEarlyLeave"
                                  label="Early Leave:"
                                  label-for="earlyLeave">
                      <b-form-checkbox id="earlyLeave"
                                       v-model="attendance.earlyLeave"
                                       value="1"
                                       unchecked-value="0">
                      </b-form-checkbox>
                    </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group id="labelOverTime"
                                  label="OverTime:"
                                  label-for="overTime">
                      <b-form-checkbox id="overtTime"
                                       v-model="attendance.overTime"
                                       value="1"
                                       unchecked-value="0">
                      </b-form-checkbox>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-form-group id="labelNotes"
                              label="Notes:"
                              label-for="notes">
                  <b-form-input id="notes"
                                type="text"
                                v-model="attendance.notes"
                                placeholder="Enter attendance notes">
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row><!--/.row-->
          </b-card-body>
          <b-card-footer>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="warning">Reset</b-button>
            <b-button type="button" variant="info" @click.prevent="goBack">Back</b-button>
          </b-card-footer>
        </b-form>
      </b-card>
    </b-col>
  </b-row><!--/.row-->
</template>

<script>
  import debounce from 'lodash.debounce'
  import UserProxy from '@/proxies/UserProxy'
  import BranchProxy from '@/proxies/BranchProxy'
  import VSelect from 'vue-select'

  const userProxy = new UserProxy()
  const branchProxy = new BranchProxy()

  export default {
    name: 'attendance-create',
    data () {
      return {
        attendance: {},
        show: true,
        options: [
          { value: null, text: 'Please select some item' },
          { value: '1', text: 'Work time' },
          { value: '2', text: 'Extra payable h. part-time' },
          { value: '3', text: 'Overtime w/flexitime ' },
          { value: '4', text: 'Paid nursing leave' },
          { value: '5', text: 'Paid overtime' },
          { value: '6', text: 'Work travel' }
        ],
        user: {
          items: [],
          selected: null
        },
        branch: {
          items: [],
          selected: null
        },
        configDate: {
          format: 'YYYY-MM-DD',
          useCurrent: true,
          showClear: false,
          showClose: false
        },
        configTime: {
          format: 'h:mm:ss',
          useCurrent: true,
          showClear: false,
          showClose: false
        },
        attendanceType: [
          { text: 'Type 1', value: '1' },
          { text: 'Type 2', value: '2' },
          { text: 'Type 3', value: '3' },
          { text: 'Type 4', value: '4' }
        ]
      }
    },
    methods: {
      onReset (evt) {
        evt.preventDefault()
        /* Reset our attendance values */
        this.attendance = {}
        /* Trick to reset/clear native browser attendance validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },

      /**
       * Debounced method to fetch the users using a given query.
       */
      fetchUsers: debounce(function (query) {
        userProxy.setParameter('q', query)
          .all()
          .then((items) => {
            this.user.items = items.data.map(user => ({
              id: user.id,
              label: user.name
            }))
          })
      }, 500),

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
       * Method to create a new attendance.
       * It'll dispatch the create action on the attendance module.
       */
      createAttendance () {
        if (this.user.selected !== null && this.branch.selected !== null) {
          this.attendance.userId = this.user.selected.id
          this.attendance.branchId = this.branch.selected.id
          this.$store.dispatch('attendance/create', this.attendance)
        } else {
          return false
        }
      },

      /**
       * Method used to return to the previous page.
       */
      goBack () {
        this.$router.push({
          name: 'attendances.index'
        })
      }
    },
    components: {
      VSelect
    }
  }
</script>

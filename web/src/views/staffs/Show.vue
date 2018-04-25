<template>
  <b-row>
    <b-col lg="12">
      <b-card no-body>
        <div slot="header">
          <i class="fa fa-edit"></i> Staffs Edit
        </div>
        <b-card-body>
          <b-form @submit.prevent="updateStaff" @reset="onReset" v-if="show">
            <b-row>
              <b-col md="2">
                <b-form-group id="labelStaffId"
                              label-for="staffId">
                  <div class="content-image" @click="openStaffImage"
                       :style="{ 'background-image': 'url(' + staff.thumbnailId + ')' }">
                    <input type="file" name="staff_image" style="display: none" id="staff_image" @change="onFileChange">
                    <i class="fa fa-plus-circle custom-font"></i>
                  </div>
                </b-form-group>
              </b-col>
              <b-col md="5">
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
              </b-col>
              <b-col md="5">
                <b-form-group id="labelName"
                              label="Name:"
                              label-for="name">
                  <b-form-input id="name"
                                type="text"
                                v-model="staff.name"
                                required
                                placeholder="Enter staff name">
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="6">
                <b-form-group id="labelBirthDay"
                              label="Birthday:"
                              label-for="birthDay">
                  <b-form-input id="birthDay"
                                type="date"
                                v-model="staff.birthDay">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="labelBranchName"
                              label="Branch Name:"
                              label-for="branchName">
                  <v-select v-model="branch.selected" @search="fetchBranches" :options="branch.items"></v-select>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group id="labelHourlyRate"
                              label="Hourly Rate:"
                              label-for="hourlyRate">
                  <b-form-input id="hourlyRate"
                                type="text"
                                v-model="staff.hourlyRate"
                                required
                                placeholder="Enter staff hourly wage">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="labelUserType"
                              label="User Type:"
                              label-for="userType">
                  <b-form-select v-model="staff.userType">
                    <option value="1">Admin</option>
                    <option value="2">Sub admin</option>
                    <option value="3">Full-time</option>
                    <option value="4">Part-time</option>
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>

            <b-form-group id="labelAddress"
                          label="Address:"
                          label-for="address">
              <b-form-input id="address"
                            type="text"
                            v-model="staff.address"
                            required
                            placeholder="Enter staff address">
              </b-form-input>
            </b-form-group>
            <b-row>
              <b-col md="6">
                <b-form-group id="labelEmailAddress"
                              label="Email Address:"
                              label-for="emailAddress">
                  <b-form-input id="emailAddress"
                                type="email"
                                v-model="staff.email"
                                placeholder="Enter staff email">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="labelStartDate"
                              label="Start Date:"
                              label-for="startDate">
                  <b-form-input id="startDate"
                                type="date"
                                v-model="staff.startDate"
                                placeholder="Enter staff start date">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="labelBirthPlace"
                              label="Birth Place:"
                              label-for="birthPlace">
                  <b-form-input id="birthPlace"
                                type="text"
                                v-model="staff.birthPlace"
                                placeholder="Enter staff start birth place">
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group id="labelTel"
                              label="Tel:"
                              label-for="telephone">
                  <b-form-input id="telephone"
                                type="text"
                                v-model="staff.telephone"
                                placeholder="Enter staff hourly wage">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="labelStatus"
                              label="Status:"
                              label-for="status">
                  <b-form-select v-model="staff.status">
                    <option value="1">Active</option>
                    <option value="2">Inactive</option>
                    <option value="3">Resigned</option>
                    <option value="4">Deleted</option>
                  </b-form-select>
                </b-form-group>
                <b-form-group id="labelBloodType"
                              label="Blood Type:"
                              label-for="bloodType">
                  <b-form-select v-model="staff.bloodType">
                    <option value="1">A</option>
                    <option value="2">B</option>
                    <option value="3">O</option>
                    <option value="4">AB</option>
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>

            <b-form-group id="labelHobbies"
                          label="Hobbies:"
                          label-for="hobbies">
              <b-form-input id="hobbies"
                            type="text"
                            v-model="staff.hobbies"
                            placeholder="Enter staff hobbies">
              </b-form-input>
            </b-form-group>

            <b-form-group id="labelPrComment"
                          label="PR Comments:"
                          label-for="prComment">
              <b-form-textarea id="prComment"
                               v-model="staff.hobbies"
                               rows="10"
                               max-rows="15"
                               placeholder="Enter staff profile comment">
              </b-form-textarea>
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
  import debounce from 'lodash.debounce'
  import UserProxy from '@/proxies/UserProxy'
  import UserTransformer from '@/transformers/UserTransformer'
  import BranchProxy from '@/proxies/BranchProxy'

  import VSelect from 'vue-select'

  const proxy = new UserProxy()
  const branchProxy = new BranchProxy()

  export default {
    name: 'staff-edit',

    /**
     * The properties that can be used.
     */
    props: {
      /**
       * The given staff identifier.
       */
      staffId: {
        type: [String, Number],
        required: true
      }
    },
    data () {
      return {
        staff: {},
        show: false,
        store: {
          items: [],
          selected: null
        }
      }
    },
    methods: {
      onReset (evt) {
        evt.preventDefault()
        /* Reset our staff values */
        this.staff.hourly_wage = ''
        this.staff.name = ''
        this.staff.birth_date = null
        this.staff.staff_id = null
        /* Trick to reset/clear native browser staff validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },

      /**
       * Method used to find the attached album.
       */
      fetchStore (songId) {
        proxy.findStore(songId)
          .then((data) => {
            this.store.selected = {
              id: data.id,
              label: data.name
            }
          })
      },

      /**
       * Debounced method to fetch the albums using a given query.
       */
      fetchBranches: debounce(function (query) {
        branchProxy.setParameter('q', query)
          .all()
          .then((items) => {
            this.store.items = items.data.map(store => ({
              id: store.id,
              label: store.name
            }))
          })
      }, 500),

      /**
       * Method used to fetch an staff.
       *
       * @param {staffId|{type, required}} id The id of the staff.
       */
      fetchStaff (id) {
        proxy.find(id)
          .then((data) => {
            this.staff = UserTransformer.fetch(data)
            this.show = true
            this.fetchStore(this.staffId)
          })
      },

      /**
       * Method used to return to the previous page.
       */
      goBack () {
        this.$router.push({
          name: 'staffs.index',
          props: {
            staffId: this.staffId
          }
        })
      },

      /**
       * Method used to update an staff.
       * It'll dispatch the update action on the staff module.
       */
      updateStaff () {
        this.staff.storeId = this.store.selected.id
        this.$store.dispatch('user/update', this.staff)
      },

      openStaffImage () {
        document.getElementById('staff_image').click()
      },

      onFileChange (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.createImage(files[0])
      },
      createImage (file) {
        let reader = new FileReader()
        let vm = this
        reader.onload = (e) => {
          vm.staff.thumbnailId = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },

    /**
     * Available watchers for this page.
     */
    watch: {
      staffId (id) {
        this.fetchStaff(id)
      }
    },

    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the staff using the given staff identifier.
     */
    mounted () {
      this.fetchStaff(this.staffId)
    },
    components: {
      VSelect
    }
  }
</script>

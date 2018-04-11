<template>
  <b-row>
    <b-col lg="12">
      <b-card no-body>
        <div slot="header">
          <i class="fa fa-edit"></i> Quests Create
        </div>
        <b-form @submit.prevent="createBranch" @reset="onReset" v-if="show">
          <b-card-body>
            <b-row>
              <b-col md="3">
                <b-form-group id="labelImage"
                              label="Image:"
                              label-for="name">
                  <div class="content-image" @click="openBranchImage"
                       :style="{ 'background-image': 'url(' + branch.thumbnailId + ')' }">
                    <input type="file" name="branch_image" style="display: none" id="branch_image" @change="onFileChange">
                    <i class="fa fa-plus-circle custom-font"></i>
                  </div>
                </b-form-group>
              </b-col>
              <b-col md="9" class="mt-5">
                <b-row>
                  <b-col md="6">
                    <b-form-group id="labelName"
                                  label="Name:"
                                  label-for="name">
                      <b-form-input id="name"
                                    type="text"
                                    v-model="branch.name"
                                    required
                                    placeholder="Enter branch name">
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group id="labelStatus"
                                  label="Status:"
                                  label-for="status">
                      <b-form-checkbox id="status" class="mt-1"
                                       v-model="branch.status"
                                       value="1"
                                       unchecked-value="0">
                      </b-form-checkbox>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-form-group id="labelSuperUserDailyReportTemplate"
                          label="Super User DailyReport Template:"
                          label-for="superUserDailyReportTemplate">
              <b-form-textarea id="superUserDailyReportTemplate"
                               type="text"
                               rows="5"
                               max-rows="10"
                               v-model="branch.superUserDailyReportTemplate"
                               required
                               placeholder="Enter super user daily report template">
              </b-form-textarea>
            </b-form-group>
            <b-form-group id="labelManagerDailyReportTemplate"
                          label="Manager DailyReport Template:"
                          label-for="managerDailyReportTemplate">
              <b-form-textarea id="managerDailyReportTemplate"
                               type="text"
                               rows="5"
                               max-rows="10"
                               v-model="branch.managerDailyReportTemplate"
                               required
                               placeholder="Enter manager daily report template">
              </b-form-textarea>
            </b-form-group>
            <b-form-group id="labelSubManagerDailyReportTemplate"
                          label="SubManager DailyReport Template:"
                          label-for="subManagerDailyReportTemplate">
              <b-form-textarea id="subManagerDailyReportTemplate"
                               type="text"
                               rows="5"
                               max-rows="10"
                               v-model="branch.subManagerDailyReportTemplate"
                               required
                               placeholder="Enter sub-manager daily report template">
              </b-form-textarea>
            </b-form-group>
            <b-form-group id="labelFullTimeStaffDailyReportTemplate"
                          label="FullTime Staff DailyReport Template:"
                          label-for="fullTimeStaffDailyReportTemplate">
              <b-form-textarea id="fullTimeStaffDailyReportTemplate"
                               type="text"
                               rows="5"
                               max-rows="10"
                               v-model="branch.fullTimeStaffDailyReportTemplate"
                               required
                               placeholder="Enter fulltime staff daily report template">
              </b-form-textarea>
            </b-form-group>
            <b-form-group id="labelPartTimeStaffDailyReportTemplate"
                          label="PartTime Staff DailyReport Template:"
                          label-for="partTimeStaffDailyReportTemplate">
              <b-form-textarea id="partTimeStaffDailyReportTemplate"
                               type="text"
                               rows="5"
                               max-rows="10"
                               v-model="branch.partTimeStaffDailyReportTemplate"
                               required
                               placeholder="Enter part-time staff daily report template">
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
  export default {
    name: 'branch-create',
    data () {
      return {
        branch: {},
        show: true
      }
    },
    methods: {
      onReset (evt) {
        evt.preventDefault()
        /* Reset our branch values */
        this.branch = {}
        /* Trick to reset/clear native browser branch validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      /**
       * Method to create a new branch.
       * It'll dispatch the create action on the branch module.
       */
      createBranch () {
        this.$store.dispatch('branch/create', this.branch)
      },

      openBranchImage (e) {
        document.getElementById('branch_image').click()
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
          vm.branch.thumbnailId = e.target.result
        }
        reader.readAsDataURL(file)
      },

      /**
       * Method used to return to the previous page.
       */
      goBack () {
        this.$router.push({
          name: 'branches.index'
        })
      }
    }
  }
</script>

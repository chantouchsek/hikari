<template>
  <b-row>
    <b-col lg="12">
      <b-card no-body>
        <div slot="header">
          <i class="fa fa-edit"></i> Groups Edit
        </div>
        <b-card-body>
          <b-form @submit.prevent="createGroup" @reset="onReset" v-if="show">
            <b-form-group id="labelName"
                          label="Name:"
                          label-for="name">
              <b-form-input id="name"
                            type="text"
                            v-model="group.name"
                            required
                            placeholder="Enter group name">
              </b-form-input>
            </b-form-group>
            <b-form-group id="labelStatus"
                          label="Status:"
                          label-for="status">
              <b-form-checkbox id="status"
                               v-model="group.status"
                               value="1"
                               unchecked-value="0">
                Status
              </b-form-checkbox>
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
  import GroupProxy from '@/proxies/GroupProxy'
  import GroupTransformer from '@/transformers/GroupTransformer'

  const proxy = new GroupProxy()

  export default {
    name: 'group-edit',
    /**
     * The properties that can be used.
     */
    props: {
      /**
       * The given group identifier.
       */
      groupId: {
        type: [String, Number],
        required: true
      }
    },
    data () {
      return {
        group: {},
        show: true
      }
    },
    methods: {
      onReset (evt) {
        evt.preventDefault()
        /* Reset our group values */
        this.group = {}
        /* Trick to reset/clear native browser group validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      /**
       * Method used to fetch an group.
       *
       * @param {groupId|{type, required}} id The id of the group.
       */
      fetchGroup (id) {
        proxy.find(id)
          .then((data) => {
            this.group = GroupTransformer.fetch(data)
            this.show = true
          })
      },
      /**
       * Method to create a new branch.
       * It'll dispatch the create action on the branch module.
       */
      createGroup () {
        this.$store.dispatch('group/update', this.group)
      },

      /**
       * Method used to return to the previous page.
       */
      goBack () {
        this.$router.push({
          name: 'groups.index'
        })
      }
    },
    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the quest using the given quest identifier.
     */
    mounted () {
      this.fetchGroup(this.groupId)
    }
  }
</script>

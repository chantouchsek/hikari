<template>
  <b-row>
    <b-col lg="12">
      <b-card no-body>
        <div slot="header">
          <i class="fa fa-edit"></i> Stores Edit
        </div>
        <b-card-body>
          <b-form @submit.prevent="createStore" @reset="onReset" v-if="show">
            <b-form-group id="labelName"
                          label="Name:"
                          label-for="name"
                          description="We'll never share your email with anyone else.">
              <b-form-input id="name"
                            type="text"
                            v-model="store.name"
                            required
                            placeholder="Enter store name">
              </b-form-input>
            </b-form-group>
            <b-form-group id="labelAddress"
                          label="Address:"
                          label-for="address">
              <b-form-input id="address"
                            type="text"
                            v-model="store.address"
                            required
                            placeholder="Enter store address">
              </b-form-input>
            </b-form-group>
            <b-form-checkbox id="status"
                             v-model="store.status"
                             value="true"
                             unchecked-value="false">
              Status
            </b-form-checkbox>
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
  export default {
    name: 'store-create',
    data () {
      return {
        store: {
          name: null,
          address: null,
          status: null
        },
        show: true
      }
    },
    methods: {
      onReset (evt) {
        evt.preventDefault()
        /* Reset our store values */
        this.store.address = ''
        this.store.name = ''
        this.store.status = null
        /* Trick to reset/clear native browser store validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      /**
       * Method to create a new album.
       * It'll dispatch the create action on the album module.
       */
      createStore () {
        this.$store.dispatch('store/create', this.store)
      },

      /**
       * Method used to return to the previous page.
       */
      goBack () {
        this.$router.push({
          name: 'stores.index'
        })
      }
    }
  }
</script>

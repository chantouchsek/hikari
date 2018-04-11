<template>
  <b-row>
    <b-col lg="12">
      <b-card no-body>
        <div slot="header">
          <i class="fa fa-edit"></i> Stores Edit
        </div>
        <b-card-body>
          <b-form @submit.prevent="updateStore" @reset="onReset" v-if="show">
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
  import StoreProxy from '@/proxies/StoreProxy'
  import StoreTransformer from '@/transformers/StoreTransformer'

  const proxy = new StoreProxy()

  export default {
    name: 'store-edit',

    /**
     * The properties that can be used.
     */
    props: {
      /**
       * The given store identifier.
       */
      storeId: {
        type: [String, Number],
        required: true
      }
    },
    data () {
      return {
        store: null,
        show: false
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
       * Method used to fetch an store.
       *
       * @param {storeId|{type, required}} id The id of the store.
       */
      fetchStore (id) {
        proxy.find(id)
          .then((data) => {
            this.store = StoreTransformer.fetch(data)
            this.show = true
          })
      },

      /**
       * Method used to return to the previous page.
       */
      goBack () {
        this.$router.push({
          name: 'stores.index',
          props: {
            storeId: this.storeId
          }
        })
      },

      /**
       * Method used to update an store.
       * It'll dispatch the update action on the store module.
       */
      updateStore () {
        this.$store.dispatch('store/update', this.store)
      }
    },

    /**
     * Available watchers for this page.
     */
    watch: {
      storeId (id) {
        this.fetchStore(id)
      }
    },

    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the store using the given store identifier.
     */
    mounted () {
      this.fetchStore(this.storeId)
    }
  }
</script>

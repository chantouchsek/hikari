<template>
  <b-row>
    <b-col lg="12">
      <b-card no-body>
        <div slot="header">
          <i class="fa fa-edit"></i> Quests Create
        </div>
        <b-card-body>
          <b-form @submit.prevent="createQuest" @reset="onReset" v-if="show">
            <b-form-group id="labelName"
                          label="Name:"
                          label-for="name">
              <b-form-input id="name"
                            type="text"
                            v-model="quest.name"
                            required
                            placeholder="Enter quest name">
              </b-form-input>
            </b-form-group>
            <!--<b-form-group id="labelStore"-->
            <!--label="Store:"-->
            <!--label-for="store">-->
            <!--<v-select @search="fetchStores" v-model="store.selected" :options="store.items"></v-select>-->
            <!--</b-form-group>-->
            <b-form-group id="labelUser"
                          label="Staff ID:"
                          label-for="user">
              <v-select v-model="user.selected" @search="fetchUsers" :options="user.items"></v-select>
            </b-form-group>
            <b-form-group id="labelQuestType"
                          label="Quest Type:"
                          label-for="quest_type">
              <b-form-select v-model="quest.questType"
                             :options="options"
                             class="mb-3"
                             id="quest_type"
              ></b-form-select>
            </b-form-group>
            <b-form-group id="labelDateTerm"
                          label="Date Term:"
                          label-for="date_term">
              <b-form-input id="date_term"
                            type="text"
                            v-model="quest.dateTerm"
                            required
                            placeholder="Enter staff date term">
              </b-form-input>
            </b-form-group>
            <b-form-group id="labelStatus"
                          label="Status:"
                          label-for="status">
              <b-form-checkbox id="status"
                               v-model="quest.status"
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
  import Proxy from '@/proxies/UserProxy'
  import debounce from 'lodash.debounce'
  import VSelect from 'vue-select'

  const proxy = new Proxy()

  export default {
    name: 'quest-create',
    data () {
      return {
        quest: {
          status: null,
          questType: null,
          userId: null,
          name: null
        },
        user: {
          items: [],
          selected: null
        },
        store: {
          items: [],
          selected: null
        },
        show: true,
        options: [
          { value: null, text: 'Please select some item' },
          { value: '0', text: 'Quest Type 1' },
          { value: '1', text: 'Quest Type 2' },
          { value: '2', text: 'Quest Type 3' },
          { value: '3', text: 'Quest Type 4' }
        ]
      }
    },
    methods: {
      onReset (evt) {
        evt.preventDefault()
        /* Reset our quest values */
        this.quest.address = ''
        this.quest.name = ''
        this.quest.status = null
        /* Trick to reset/clear native browser quest validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      /**
       * Method to create a new branch.
       * It'll dispatch the create action on the branch module.
       */
      createQuest () {
        if (this.user.selected !== null) {
          this.quest.userId = this.user.selected.id
          this.$store.dispatch('quest/create', this.quest)
        } else {
          return false
        }
      },

      /**
       * Debounced method to fetch the branches using a given query.
       */
      fetchUsers: debounce(function (query) {
        proxy.setParameter('q', query)
          .all()
          .then((items) => {
            this.user.items = items.data.map(user => ({
              id: user.id,
              label: user.name
            }))
          })
      }, 500),

      /**
       * Method used to return to the previous page.
       */
      goBack () {
        this.$router.push({
          name: 'quest.index'
        })
      }
    },
    components: {
      VSelect
    }
  }
</script>

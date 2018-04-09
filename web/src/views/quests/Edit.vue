<template>
  <b-row>
    <b-col lg="12">
      <b-card no-body>
        <div slot="header">
          <i class="fa fa-edit"></i> Quests Edit
        </div>
        <b-card-body>
          <b-form @submit.prevent="updateQuest" @reset="onReset" v-if="show">
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
  import debounce from 'lodash.debounce'
  import QuestProxy from '@/proxies/QuestProxy'
  import QuestTransformer from '@/transformers/QuestTransformer'
  import UserProxy from '@/proxies/UserProxy'
  import StoreProxy from '@/proxies/StoreProxy'

  import VSelect from 'vue-select'

  const proxy = new QuestProxy()
  const userProxy = new UserProxy()
  const storeProxy = new StoreProxy()

  export default {
    name: 'quest-edit',

    /**
     * The properties that can be used.
     */
    props: {
      /**
       * The given quest identifier.
       */
      questId: {
        type: [String, Number],
        required: true
      }
    },
    data () {
      return {
        quest: null,
        show: false,
        user: {
          items: [],
          selected: null
        },
        store: {
          items: [],
          selected: null
        },
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
        this.quest.hourly_wage = ''
        this.quest.name = ''
        this.quest.birth_date = null
        this.quest.staff_id = null
        /* Trick to reset/clear native browser quest validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },

      /**
       * Method used to find the attached album.
       */
      fetchUser (userId) {
        proxy.findUser(userId)
          .then((data) => {
            this.user.selected = {
              id: data.id,
              label: data.name
            }
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
       * Method used to fetch an quest.
       *
       * @param {questId|{type, required}} id The id of the quest.
       */
      fetchQuest (id) {
        proxy.find(id)
          .then((data) => {
            this.quest = QuestTransformer.fetch(data)
            this.show = true
            this.fetchUser(this.questId)
          })
      },

      /**
       * Method used to return to the previous page.
       */
      goBack () {
        this.$router.push({
          name: 'quests.index',
          props: {
            questId: this.questId
          }
        })
      },

      /**
       * Method used to update an quest.
       * It'll dispatch the update action on the quest module.
       */
      updateQuest () {
        if (this.user.selected !== null) {
          this.quest.userId = this.user.selected.id
          this.$store.dispatch('quest/update', this.quest)
        } else {
          return false
        }
      },

      /**
       * Debounced method to fetch the stores using a given query.
       */
      fetchStores: debounce(function (query) {
        storeProxy.setParameter('q', query)
          .all()
          .then((items) => {
            this.store.items = items.data.map(store => ({
              id: store.id,
              label: store.name
            }))
          })
      }, 500)
    },

    /**
     * Available watchers for this page.
     */
    watch: {
      questId (id) {
        this.fetchQuest(id)
      }
    },

    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the quest using the given quest identifier.
     */
    mounted () {
      this.fetchQuest(this.questId)
    },
    components: {
      VSelect
    }
  }
</script>

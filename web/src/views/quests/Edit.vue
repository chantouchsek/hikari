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
            <b-form-group id="labelQuestType"
                          label="Quest Type:"
                          label-for="quest_type">
              <b-form-select v-model="quest.questType"
                             :options="questType"
                             class="mb-3"
                             id="quest_type"
              ></b-form-select>
            </b-form-group>
            <b-form-group id="labelUser"
                          label="Staff ID:"
                          label-for="user">
              <treeselect
                :multiple="true"
                :options="user.items"
                search-nested
                value-consists-of="LEAF_PRIORITY"
                v-model="user.selected"
              />
            </b-form-group>
            <b-row>
              <b-col md="6">
                <b-form-group id="labelStartDate"
                              label="Start Date:"
                              label-for="start_date">
                  <b-form-input id="start_date"
                                type="text"
                                v-model="quest.dateTerm"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group id="labelEndDate"
                              label="End Date:"
                              label-for="end_date">
                  <b-form-input id="end_date"
                                type="text"
                                v-model="quest.dateTerm"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-form-group id="labelDescription"
                          label="Description:"
                          label-for="user">
              <b-form-textarea id="description"
                               v-model="quest.description"
                               placeholder="Enter something"
                               :rows="10"
                               :max-rows="15">
              </b-form-textarea>
            </b-form-group>
            <b-form-group id="labelStatus"
                          label="Status:"
                          label-for="status">
              <b-form-checkbox id="status"
                               v-model="quest.status"
                               value="1"
                               unchecked-value="0">
                Active
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
  import '@riophae/vue-treeselect/dist/vue-treeselect.min.css'
  import debounce from 'lodash.debounce'
  import QuestProxy from '@/proxies/QuestProxy'
  import QuestTransformer from '@/transformers/QuestTransformer'
  import UserProxy from '@/proxies/UserProxy'
  import BranchProxy from '@/proxies/BranchProxy'
  import Treeselect from '@riophae/vue-treeselect'

  import VSelect from 'vue-select'

  const proxy = new QuestProxy()
  const userProxy = new UserProxy()
  const branchProxy = new BranchProxy()

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
        quest: {},
        show: false,
        user: {
          items: [],
          selected: null
        },
        branch: {
          items: [],
          selected: null
        },
        questType: [
          { value: '', text: 'Please select some item' },
          { value: '0', text: 'Number quest' },
          { value: '1', text: 'Action quest' }
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
       * Debounced method to fetch the branches using a given query.
       */
      fetchStores: debounce(function (query) {
        branchProxy.setParameter('q', query)
          .all()
          .then((items) => {
            this.branch.items = items.data.map(branch => ({
              id: branch.id,
              label: branch.name
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
      VSelect,
      Treeselect
    }
  }
</script>

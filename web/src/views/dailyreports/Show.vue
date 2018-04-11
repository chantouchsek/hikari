<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <div slot="header">
            <i class="fa fa-edit"></i> DailyReports Table
          </div>
          <b-card-body>
            <b-row>
              <b-col md="6">
                <h5>Branch name:</h5>
                <p>Branch name 1</p>
                <h5>Sales:</h5>
                <p>300,000R</p>
                <h5>Total Guest:</h5>
                <p>150</p>
                <h5>Unit Sales</h5>
                <p>150</p>
                <h5>Result of Quest A</h5>
                <p>150</p>
                <h5>Result of Quest C</h5>
                <p>10</p>
              </b-col>
              <b-col md="6">
                <h5>Date:</h5>
                <p>2018/1/10</p>
                <h5>Cost:</h5>
                <p>200,000R</p>
                <h5>Guest Type:</h5>
                <p>Type 1</p>
                <h5>Gross Profit</h5>
                <p>Profit 1</p>
                <h5>Result of Quest B</h5>
                <p>150</p>
                <h5>Result of Quest</h5>
                <p>10</p>
              </b-col>
              <b-col md="12">
                <h5>Comment</h5>
                <p>Comment</p>
              </b-col>
              <b-col md="12">
                <h5>Photos</h5>
                <carousel :navigationEnabled="true"
                          paginationActiveColor="#42b983"
                          paginationColor="#b2ebd1"
                          easing="linear"
                          :speed="300"
                          :perPage="3"
                          :paginationEnabled="true"
                          :perPageCustom="[[480, 2], [768, 3]]"
                >
                  <slide v-for="slide in 50" :key="slide">
                    <b-img src="https://lorempixel.com/400/400/" fluid alt="Responsive image" />
                  </slide>
                </carousel>
              </b-col>
              <b-col md="12">
                <h5>Videos</h5>
                <p>Below is video</p>
              </b-col>
              <b-col md="12">
                <hr>
                <div class="content-edit">
                  <div class="pull-left">
                    <b-button type="button" variant="primary">Back</b-button>
                    <b-button type="button" variant="info">Edit</b-button>
                  </div>
                  <div class="pull-right">
                    <b-button type="button" variant="primary">Like</b-button>
                    <b-button type="button" variant="info">Comment</b-button>
                  </div>
                </div>
              </b-col>
              <b-col md="12">
                <hr>
                <b-card>
                  <b-media left-align vertical-align="center">
                    <b-img slot="aside" blank blank-color="#ccc" width="80" alt="placeholder" rounded="circle"></b-img>
                    <h5 class="mt-0 mb-1">Staff 1 <span>10:30 2018/04/10</span></h5>
                    <p>Comments</p>
                  </b-media>
                </b-card>
              </b-col>
              <b-col md="12">
                <b-form>
                  <b-input-group>
                    <b-dropdown text="+" variant="outline-secondary" slot="prepend" v-for="i in 1" :key="i">
                      <b-dropdown-item>Action A</b-dropdown-item>
                      <b-dropdown-item>Action B</b-dropdown-item>
                    </b-dropdown>
                    <b-form-input></b-form-input>
                  </b-input-group>
                </b-form>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col><!--/.col-->
    </b-row><!--/.row-->
  </div>
</template>

<script>
  import DailyReportProxy from '@/proxies/DailyReportProxy'
  import DailyReportTransformer from '@/transformers/DailyReportTransformer'
  import { Carousel, Slide } from 'vue-carousel'

  const proxy = new DailyReportProxy()

  export default {
    name: 'dailyreport-edit',

    /**
     * The properties that can be used.
     */
    props: {
      /**
       * The given dailyreport identifier.
       */
      dailyreportId: {
        type: [String, Number],
        required: true
      }
    },
    data () {
      return {
        dailyreport: null
      }
    },
    computed: {
      //
    },
    methods: {
      /**
       * Method used to fetch an dailyreport.
       *
       * @param {dailyreportId|{type, required}} id The id of the dailyreport.
       */
      fetchDailyReport (id) {
        proxy.find(id)
          .then((data) => {
            this.dailyreport = DailyReportTransformer.fetch(data)
            this.show = true
          })
      },

      /**
       * Method used to return to the previous page.
       */
      goBack () {
        this.$router.push({
          name: 'dailyreports.index',
          props: {
            dailyreportId: this.dailyreportId
          }
        })
      },

      /**
       * Delete the resource
       */
      destroyDailyReport (dailyreport) {
        this.$store.dispatch('dailyreport/destroy', dailyreport)
      }
    },

    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the dailyreport using the given dailyreport identifier.
     */
    mounted () {
      this.fetchDailyReport(this.dailyreportId)
    },
    component: {
      Carousel,
      Slide
    }
  }
</script>
<style>
  .VueCarousel-slide {
    flex-basis: initial !important;
  }
</style>

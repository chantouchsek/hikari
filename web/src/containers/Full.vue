<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <breadcrumb :list="list"/>
        <div class="container-fluid">
          <b-alert variant="danger" v-for="(alert, index) in application.alerts"
                   dismissible
                   :key="index"
                   :show="alert.showDismissibleAlert"
                   @dismissed="removeAlert(alert)"
          >
            {{ alert.message }}
          </b-alert>
          <router-view/>
        </div>
      </main>
      <AppAside/>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
  import nav from '../_nav'
  import {Header as AppHeader, Sidebar, Aside as AppAside, Footer as AppFooter, Breadcrumb} from '../components/'
  import {mapState} from 'vuex'

  export default {
    /**
     * The name of the layout.
     */
    name: 'full',
    /**
     * The components of the layout
     */
    components: {
      AppHeader,
      Sidebar,
      AppAside,
      AppFooter,
      Breadcrumb
    },
    data () {
      return {
        nav: nav.items
      }
    },
    computed: {
      name () {
        return this.$route.name
      },
      list () {
        return this.$route.matched
      },
      ...mapState('application', {
        application: state => state
      })
    },
    methods: {
      /**
       * Method use to remove alert
       */
      removeAlert (alert) {
        this.$store.dispatch('application/removeAlert', alert)
      }
    }
  }
</script>

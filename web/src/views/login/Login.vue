<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-form @submit.prevent="login">
        <b-row class="justify-content-center">
          <b-col md="8">
            <b-card-group>
              <b-card no-body class="p-4">
                <b-card-body>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <input type="text" class="form-control" placeholder="Username" v-model="user.username">
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <input type="password" class="form-control" placeholder="Password" v-model="user.password">
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4" @click="login">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-card-body>
              </b-card>
              <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
                <b-card-body class="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                  </div>
                </b-card-body>
              </b-card>
            </b-card-group>
          </b-col>
        </b-row>
      </b-form>
    </div>
  </div>
</template>

<script>
  export default {
    /**
     * The name of the page
     */
    name: 'login-page',

    /**
     * The data of the page can use
     *
     * @return {Object} The data
     */
    data () {
      return {
        user: {
          username: null,
          password: null
        }
      }
    },

    /**
     * The methods of the page can be used
     */

    methods: {
      /**
       * Method can be used to login the user
       */

      login () {
        this.$store.dispatch('auth/login', this.user)
      }
    }
  }
</script>

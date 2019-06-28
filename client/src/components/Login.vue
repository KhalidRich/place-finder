<template>
  <div class="auth_form">
    <div class="authentication-status" v-if="isAuthenticated">
      You are successfully authenticated
      <div class="authentication-status__token">{{$auth.getToken()}}</div>
    </div>
    <button @click="authLogin()">Login</button>
    <button @click="authRegister()">Register</button>
    <button @click="authLogout()">Logout</button>      
    <hr />
    <button @click="auth('google')" class="button--google">Auth google</button>
    <hr />      
    <pre class="response" v-if="response !== null">{{JSON.stringify(response, null, 2)}}</pre>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      isAuthenticated: this.$auth.isAuthenticated(),
      access_token: null,
      response: null
    }
  },
  methods: {
    authLogin: function () {
      var this_ = this;
      let user = {
        email: 'john.doe@domain.com', 
        password: 'pass123456'
      };

      if (this.$auth.isAuthenticated()) {
        this.$auth.logout()
      }

      this.$auth.login(user).then(function (response) {
        this_.isAuthenticated = this_.$auth.isAuthenticated();
        this_.response = response
      })
    },

    authRegister: function () {
      var this_ = this;
      let user = {
        name: 'John Doe',
        email: 'john.doe@domain.com', 
        password: 'pass123456'
      };

      if (this.$auth.isAuthenticated()) {
        this.$auth.logout()  
      }
      
      this.$auth.register(user).then(function (response) {
        this_.isAuthenticated = this_.$auth.isAuthenticated();
        this_.response = response
      })
    },

    authLogout: function () {
      var this_ = this;
      this.$auth.logout().then(function () {
        if (!this_.$auth.isAuthenticated()) {
          this_.response = null
        }

        this_.isAuthenticated = this_.$auth.isAuthenticated();
      })
    },

    auth: function(provider) {
      if (this.$auth.isAuthenticated()) {
        this.$auth.logout()
      }

      this.response = null

      var this_ = this;
      this.$auth.authenticate(provider).then(function (authResponse) {
        alert('hi')
        this_.isAuthenticated = this_.$auth.isAuthenticated();

        if (provider === 'google') {
          this_.$http.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect').then(function (response) {
            this_.response = response
          })
        }
      }).catch(function (err) {
        this_.isAuthenticated = this_.$auth.isAuthenticated()
        this_.response = err
      })
    }
  }
}
</script>
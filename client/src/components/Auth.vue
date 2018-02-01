<template>
<v-app v-if="!authToken">
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center align-center >
        <v-form v-model="valid" ref="form" lazy-validation>
          <p>{{ this.mode }}</p>
          <v-text-field
            label="Login"
            v-model="login"
            required
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            :type="showPassword"
            required
          ></v-text-field>
          <input type="checkbox" v-model="showPasswordTrigger"><label>show password</label><br>
          <v-btn
            @click="auth"
            :disabled="!valid">
            {{ modes[this.mode].button }}
          </v-btn>
          <p> <a @click="changeMode()">{{ modes[this.mode].transfer }}</a> </p>
          <p v-if="errorMessage"> {{ errorMessage }}</p>
        </v-form>
      </v-layout>
    </v-container>
  </v-content>
</v-app>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    authToken: null,
    valid: true,
    mode: 'login',
    modes: {
      login: {
        button: 'Log in',
        transfer: 'Need a new account?'
      },
      signup: {
        button: 'Sign up',
        transfer: 'Already have an account?'
      }
    },
    login: '',
    password: '',
    showPasswordTrigger: false,
    errorMessage: ''
  }),
  created () {
    this.authToken = localStorage.getItem('authToken')
    if (this.authToken) {
      this.getUserByToken(this.authToken)
        .then(res => this.enterApp(res.data))
        .catch(err => {
          if (err.response) {
            if (err.response.status === 403) {
              this.authToken = localStorage.removeItem('authToken')
            }
          } else {
            this.errorMessage = 'Connection error'
          }
        })
    }
  },
  computed: {
    showPassword () {
      return this.showPasswordTrigger ? 'text' : 'password'
    }
  },
  methods: {
    changeMode () {
      this.mode === 'login' ? this.mode = 'signup' : this.mode = 'login'
    },
    auth () {
      if (this.$refs.form.validate()) {
        axios.post(`/${this.mode}`, {
          login: this.login,
          password: this.password
        })
          .then(res => {
            if (!res || !res.headers['x-auth']) {
              throw new Error()
            }
            localStorage.setItem('authToken', res.headers['x-auth'])
            this.enterApp(res.data)
          })
          .catch(err => {
            this.clear()
            this.errorMessage = err.response
              ? err.response.data
              : 'Connection error'
          })
      }
    },
    clear () {
      this.$refs.form.reset()
    },
    getUserByToken (token) {
      return axios({
        method: 'post',
        url: '/login',
        headers: {'x-auth': token}
      })
    },
    enterApp (user) {
      this.$store.state.user = user
      this.$router.push({name: 'Homepage'})
    }
  }
}
</script>

<style scoped>
</style>

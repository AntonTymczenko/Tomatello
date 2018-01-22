<template>
<v-app>
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
    showPasswordTrigger: false
  }),
  created () {
    this.$store.state.user = {}
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
            if (!res) {
              throw new Error()
            }
            this.$store.state.user = res.data
            this.$router.push({name: 'Homepage'})
          })
          .catch(err => {
            this.clear()
            console.log(err.message)
          })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
</style>

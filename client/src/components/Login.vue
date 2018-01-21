<template>
<v-app>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center align-center >
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Login"
      v-model="login"
      required
    ></v-text-field>
    <v-text-field
      label="Password"
      v-model="password"
      type="password"
      required
    ></v-text-field>
    <v-btn
      @click="submit"
      :disabled="!valid">
      Log in
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
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
    login: '',
    password: ''
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        axios.post('/login', {
          login: this.login,
          password: this.password
        })
          .then(res => {
            this.$store.state.user = res.data
            this.$router.push({ name: 'Homepage' })
          })
          .catch(err => {
            console.log(err)
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

<template>
<v-list dense>
  <v-list-tile @click="">
    <v-list-tile-action>
      <v-icon>home</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>Home</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
  <v-list-tile @click="">
    <v-list-tile-action>
      <v-icon>contact_mail</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>Contact</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
  <v-list-tile @click="resetDatabase()">
    <v-list-tile-action>
      <v-icon>settings_backup_restore</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>Reset Database</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</v-list>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    resetDatabase () {
      axios.delete('/reset')
        .then(res => {
          location.reload(true)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>

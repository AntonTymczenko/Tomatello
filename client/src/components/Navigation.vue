<template>
<v-list dense>
  <v-list-tile avatar>
    <v-list-tile-avatar>
      <img src="https://randomuser.me/api/portraits/men/85.jpg" />
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>John Doe</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
  <v-divider></v-divider>
  <v-list-tile v-for="item in items" :key="item.title" @click="">
    <v-list-tile-action>
      <v-icon>{{ item.icon }}</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</v-list>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    items: [
      {title: 'Home', icon: 'home'},
      {title: 'Contacts', icon: 'contact_mail'},
      {title: 'Reset Database', icon: 'settings_backup_restore', click: 'poop()'}
    ]
  }),
  methods: {
    poop () {
      alert('poop')
    },
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

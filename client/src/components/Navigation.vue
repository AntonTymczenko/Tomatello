<template>
<v-list dense class="pt-0">
  <v-list-tile avatar v-if="user" :to="'/profile'">
    <v-list-tile-avatar v-if="user.userpic">
      <img :src="user.userpic">
    </v-list-tile-avatar>
    <v-list-tile-action v-else>
      <v-icon>account_circle</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>{{ user.publicName }}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
  <v-divider v-if="user"></v-divider>
  <v-list-tile v-for="item in items" :key="item.title" :to="item.link">
    <v-list-tile-action>
      <v-icon>{{ item.icon }}</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
  <div v-if="devItems">
    <v-divider></v-divider>
    <v-list-tile
      v-for="(item, index) in devItems"
      :key="item.title"
      @click="devTools(index)">
      <v-list-tile-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </div>
  <v-list-tile></v-list-tile>
</v-list>
</template>

<script>
import axios from 'axios'

export default {
  props: ['user'],
  data: () => ({
    items: [
      {title: 'Home', icon: 'home', link: '/'},
      {title: 'Contacts', icon: 'contact_mail', link: '/profile'}
    ],
    devItems: [
      {title: 'Reset Database',
        icon: 'settings_backup_restore',
        click: () => {
          axios.delete('/reset')
            .then(res => {
              location.reload(true)
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    ]
  }),
  methods: {
    devTools (index) {
      this.devItems[index].click()
    }
  }
}
</script>

<style lang="css" scoped>
</style>

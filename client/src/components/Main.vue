<template>
<v-app id="inspire">
  <v-navigation-drawer fixed v-model="drawer" app >
    <app-navigation
      :user="user"
    ></app-navigation>
  </v-navigation-drawer>
  <v-toolbar color="indigo" dark fixed app>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>Turbo Trello</v-toolbar-title>
  </v-toolbar>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center align-center >
        <app-homepage
          :user="user"
        ></app-homepage>
      </v-layout>
    </v-container>
  </v-content>
  <v-footer color="indigo" app>
    <span class="white--text">&copy; 2017</span>
  </v-footer>
</v-app>
</template>

<script>
import Navigation from './Navigation.vue'
import Homepage from './Homepage.vue'
import axios from 'axios'

export default {
  components: {
    appNavigation: Navigation,
    appHomepage: Homepage
  },
  data: () => ({
    drawer: null,
    user: null
  }),
  created () {
    axios.get('/user/1')
      .then(res => {
        this.user = res.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  props: {
    source: String
  }
}
</script>

<style scoped>
</style>

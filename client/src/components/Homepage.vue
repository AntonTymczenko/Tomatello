<template>
<v-app id="inspire">
  <v-navigation-drawer fixed v-model="drawer" app >
    <app-navigation/>
  </v-navigation-drawer>
  <v-toolbar color="indigo" dark fixed app>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>Turbo Trello</v-toolbar-title>
  </v-toolbar>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center align-center >
        <app-list/>
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
import List from './List.vue'

export default {
  components: {
    appList: List,
    appNavigation: Navigation
  },
  data () {
    return {
      drawer: null
    }
  },
  props: {
    source: String
  }
}
</script>

<style scoped>
</style>

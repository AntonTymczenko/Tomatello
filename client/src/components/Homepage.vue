<template>
<v-app v-if="user._id">
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
    <app-breadcrumbs></app-breadcrumbs>
    <v-container fluid fill-height>
      <v-layout justify-center align-center >
        <router-view></router-view>
      </v-layout>
    </v-container>
  </v-content>
  <v-footer color="indigo" app>
    <span class="white--text">&copy; {{ currentYear }}</span>
  </v-footer>
</v-app>
</template>
<script>
import Navigation from './Navigation'
import Breadcrumbs from './Breadcrumbs'

export default {
  data: () => ({
    drawer: null
  }),
  computed: {
    user () {
      return this.$store.state.user
    },
    currentYear () {
      return (new Date()).getFullYear()
    }
  },
  created () {
    if (!this.user) {
      this.$router.push({name: 'Auth'})
    }
  },
  components: {
    appNavigation: Navigation,
    appBreadcrumbs: Breadcrumbs
  }
}
</script>

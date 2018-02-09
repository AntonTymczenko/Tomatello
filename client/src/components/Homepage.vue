<template>
<v-app v-if="user">
  <v-navigation-drawer fixed v-model="drawer" app >
    <app-navigation
      :user="user"
    ></app-navigation>
  </v-navigation-drawer>
  <v-toolbar color="indigo" dark fixed app>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>Turbo Trello</v-toolbar-title>
    <app-breadcrumbs></app-breadcrumbs>
  </v-toolbar>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center align-center >
        <router-view></router-view>
      </v-layout>
    </v-container>
  </v-content>
  <v-footer color="indigo" app>
    <span class="white--text">&copy; {{ currentYear }}
      <a href="https://github.com/chingu-voyage3/geckos-17#readme"
      target="_blank">Chingu Voyage-3/Geckos-17</a>
    </span>
    <v-spacer></v-spacer>
    <span class="white--text text-xs-right">version 0.3</span>
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
    this.$store.state.authToken = localStorage.getItem('authToken')
  },
  components: {
    appNavigation: Navigation,
    appBreadcrumbs: Breadcrumbs
  }
}
</script>

<style lang="css" scoped>
a {
  text-decoration: none;
  color: inherit;
}
a:visited {
  color: inherit;
}
</style>

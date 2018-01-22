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
  <v-list-tile v-for="item in items" :key="item.title" :to="item.route">
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
export default {
  props: ['user'],
  data: () => ({
    items: [
      {title: 'Home', icon: 'home', route: {name: 'Homepage'}},
      {title: 'Contacts', icon: 'contact_mail'},
      {title: 'Log out', icon: 'exit_to_app', route: {name: 'Auth'}}
    ]
  })
}
</script>

<style lang="css" scoped>
</style>

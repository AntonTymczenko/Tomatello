<template>
<v-layout row v-if="boards">
  <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-list two-line subheader>
        <v-subheader inset>My boards</v-subheader>
        <v-list-tile avatar v-for="item in boards" v-bind:key="item.title" :to="boardRoute(item._id)">
          <v-list-tile-avatar>
            <v-icon class="grey lighten-1 white--text">folder</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.boardName }}</v-list-tile-title>
            <v-list-tile-sub-title>Jan 9, 2014</v-list-tile-sub-title>
          </v-list-tile-content>
          <!-- <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">info</v-icon>
            </v-btn>
          </v-list-tile-action> -->
        </v-list-tile>
        <!-- <v-divider inset></v-divider>
        <v-subheader inset>Shared with me</v-subheader>
        <v-list-tile v-for="item in items2" v-bind:key="item.title" avatar @click="">
          <v-list-tile-avatar>
            <v-icon v-bind:class="[item.iconClass]">{{ item.icon }}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">info</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile> -->
      </v-list>
    </v-card>
  </v-flex>
</v-layout>
</template>
<script>
import axios from 'axios'

export default {
  data: () => ({
    boards: null,
    items2: [
      { icon: 'assignment', iconClass: 'blue white--text', title: 'Vacation itinerary', subtitle: 'Jan 20, 2014' },
      { icon: 'call_to_action', iconClass: 'amber white--text', title: 'Kitchen remodel', subtitle: 'Jan 10, 2014' }
    ]
  }),
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  created () {
    this.$store.state.board = null
    if (this.user._id) {
      axios.get(`/boards/${this.user._id}`)
        .then(res => {
          if (!res) {
            throw new Error()
          }
          this.boards = res.data
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      this.$router.push({name: 'Auth'})
    }
  },
  methods: {
    boardRoute (id) {
      return {name: 'Board', params: {id}}
    }
  }
}
</script>

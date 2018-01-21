<template>
<v-app>
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
        <app-board
          :board="board"
        ></app-board>
      </v-layout>
    </v-container>
  </v-content>
  <v-footer color="indigo" app>
    <span class="white--text">&copy; 2017</span>
  </v-footer>
</v-app>
</template>
<script>
import Board from './Board.vue'
import axios from 'axios'

export default {
  props: {
    user: {required: true}
  },
  data: () => ({
    board: null
  }),
  components: {
    appBoard: Board
  },
  created () {
    console.log(this.user)
    axios.get(`/board/${this.user.boards[0]}`)
      .then(res => {
        this.board = res.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

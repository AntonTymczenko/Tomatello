<template>
<v-layout row v-if="boards">
  <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-list two-line subheader>
        <v-subheader inset>My boards</v-subheader>
        <v-list-tile avatar
          v-for="(item, index) in boards"
          v-bind:key="item.title"
          @click="goRoute(item._id)"
        >
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
        <v-list-tile avatar @click.stop="openDialog">
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-sub-title>create new board</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-flex>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field
            label="New board's name"
            v-model="newBoardName"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click.stop="createBoard">Save</v-btn>
        <v-btn color="primary" flat @click.stop="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-layout>
</template>
<script>
import axios from 'axios'

export default {
  data: () => ({
    boards: null,
    dialog: false,
    newBoardName: ''
  }),
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  created () {
    this.$store.state.board = null
    if (this.user._id) {
      this.fetchBoards()
    } else {
      this.$router.push({name: 'Auth'})
    }
  },
  methods: {
    fetchBoards () {
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
    },
    goRoute (id) {
      this.$router.push(this.boardRoute(id))
    },
    boardRoute (id) {
      return {name: 'Board', params: {id}}
    },
    createBoard () {
      if (this.newBoardName === '') {
        return this.closeDialog()
      }
      axios.post('/board/new', {
        boardName: this.newBoardName,
        _user: this.user._id
      })
        .then(id => {
          if (!id) {
            throw new Error()
          }
          this.fetchBoards()
          this.closeDialog()
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteBoard (index) {
      const id = this.boards[index]._id
      axios.delete(`/board/${id}`)
        .then(res => {
          if (!res.data) {
            throw new Error()
          }
          this.boards.splice(index, 1)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editBoard (index, event) {
      console.log(`edit ${index} board`)
    },
    openDialog () {
      this.dialog = true
    },
    closeDialog () {
      this.dialog = false
      this.newBoardName = ''
    }
  }
}
</script>

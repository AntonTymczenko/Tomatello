<template>
<v-layout row wrap
  v-if="board"
>
    <v-flex xs12>
      <h2>{{ board.boardName }}</h2>
      <v-btn
        small dark fab
        top left
        color="pink"
        @click.stop="dialog=true"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex
          xs12 sm4 offset-sm1
          v-for="listId in board.lists"
          :key="listId"
        >
          <app-list
            :listId="listId"
          ></app-list>
        </v-flex>
      </v-layout>
    </v-flex>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field
            label="New list's name"
            v-model="newListName"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click.stop="createList">Create</v-btn>
        <v-btn color="primary" flat @click.stop="closeDialog">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-layout>
</template>

<script>
import axios from 'axios'
import List from './List.vue'

export default {
  props: ['id'],
  data: () => ({
    dialog: false,
    newListName: ''
  }),
  computed: {
    user () {
      return this.$store.state.user
    },
    board () {
      return this.$store.state.board
    }
  },
  created () {
    axios.get(`/board/${this.id}`)
      .then(res => {
        if (!res) {
          throw new Error()
        }
        this.$store.state.board = res.data
      })
      .catch(err => {
        console.log(err)
        this.$router.push({name: 'Homepage'})
      })
  },
  components: {
    appList: List
  },
  methods: {
    createList () {
      if (this.newListName === '') {
        return console.log('Trying to save empty name')
      }
      console.log('create new list ' + this.newListName)
      this.closeDialog()
    },
    closeDialog () {
      this.dialog = false
      this.newListName = ''
    }
  }
}
</script>

<style scoped>
</style>

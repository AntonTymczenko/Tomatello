<template>
<div>
  <app-board
    :board="board"
  ></app-board>
</div>
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

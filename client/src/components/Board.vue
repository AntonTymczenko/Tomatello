<template>
<div v-if="board">
  <h2>{{ board.boardName }}</h2>
  <div v-for="listId in board.lists">
    <app-list
      :listId="listId"
      ></app-list>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import List from './List.vue'

export default {
  props: ['id'],
  data: () => ({
    board: null
  }),
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  created () {
    axios.get(`/board/${this.id}`)
      .then(res => {
        if (!res) {
          throw new Error()
        }
        this.board = res.data
      })
      .catch(err => {
        console.log(err)
        this.$router.push({name: 'Homepage'})
      })
  },
  components: {
    appList: List
  }
}
</script>

<style scoped>
</style>

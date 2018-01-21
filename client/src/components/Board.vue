<template>
<div>
  <h2>{{ board.boardName }}</h2>
  <div v-for="listId in board.lists">
    <app-list
      :listId="listId"
      ></app-list>
  </div>
</div>
</template>

<script>
import List from './List.vue'

export default {
  props: {
    board: {
      required: true
    }
  },
  components: {
    appList: List
  }
}
</script>

<style scoped>
</style>

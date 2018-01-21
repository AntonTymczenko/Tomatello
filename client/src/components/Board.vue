<template>
<div>
  <h2>{{ boardName }}</h2>
  <div v-for="listId in lists">
    <app-list
      :listId="listId"
      ></app-list>
  </div>
</div>
</template>

<script>
import List from './List.vue'
import axios from 'axios'

export default {
  components: {
    appList: List
  },
  data: () => ({
    boardName: '',
    lists: [],
  }),
  created () {
    axios.get(`/board/1`)
      .then(res => {
        this.boardName = res.data.boardName
        this.lists = res.data.lists
        this.user = res.data._user
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
</style>

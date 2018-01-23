<template>
<v-breadcrumbs>
  <v-icon slot="divider">chevron_right</v-icon>
  <v-breadcrumbs-item
    v-for="item in items" :key="item.text"
    :disabled="item.disabled"
    :to="item.route"
  >
    {{ item.text }}
  </v-breadcrumbs-item>
</v-breadcrumbs>
</template>

<script>
export default {
  computed: {
    board () {
      return this.$store.state.board
    },
    items () {
      const items = [
        {
          text: 'Dashboard',
          route: {name: 'Homepage'}
        }
      ]
      if (this.board) {
        items.push({
          text: this.board.boardName,
          route: {name: 'Board', params: {id: this.board._id}},
          disabled: true
        })
      }
      return items
    }
  }
}
</script>

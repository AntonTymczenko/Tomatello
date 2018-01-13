<template>
<div>
  <h3>Do today</h3>
  <ul class="todo-list">
    <li v-for="(task, index) in tasks">
      <button @click="toggleDone(index)">
        <v-icon
          v-if="task.done">check_box</v-icon>
        <v-icon
          v-else>check_box_outline_blank</v-icon>
      </button>
      {{ task.task }}
    </li>
    <li class="new-list-item">
      <button @click="toggleAddingItem"><v-icon>add</v-icon></button>
      <input
        ref="newItem"
        v-model="newItemText"
        v-if="addingItem"
        @keyup.enter="addItem()"
        @blur="addItem()">
    </li>
  </ul>
</div>
</template>

<script>
export default {
  data () {
    return {
      tasks: [],
      addingItem: false,
      newItemText: ''
    }
  },
  methods: {
    toggleDone (taskIndex) {
      this.tasks[taskIndex].done = !this.tasks[taskIndex].done
    },
    toggleAddingItem () {
      this.addingItem = !this.addingItem
      if (this.addingItem) {
        this.$nextTick(() => {
          this.$refs.newItem.focus()
        })
      }
    },
    addItem () {
      if (this.newItemText !== '') {
        this.tasks.push({task: this.newItemText, done: false})
      }
      this.newItemText = ''
      this.addingItem = false
    }
  }
}
</script>

<style scoped>
.todo-list li {
  list-style: none;
}
.new-list-item input {
  border-bottom: 1px solid black
}
</style>

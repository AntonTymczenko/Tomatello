<template>
<div>
  <h3>Do today</h3>
  <ul class="todo-list">
    <li v-for="(todo, index) in todos">
      <button @click="toggleDone(index)">
        <v-icon
          v-if="todo.done">check_box</v-icon>
        <v-icon
          v-else>check_box_outline_blank</v-icon>
      </button>
      {{ todo.task }}
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
      todos: [
        {task: 'Walk a dog', done: false},
        {task: 'Go groceries', done: true},
        {task: 'Do dishes', done: false}
      ],
      addingItem: false,
      newItemText: ''
    }
  },
  methods: {
    toggleDone (todoIndex) {
      this.todos[todoIndex].done = !this.todos[todoIndex].done
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
        this.todos.push({task: this.newItemText, done: false})
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

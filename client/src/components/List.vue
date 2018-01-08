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
      ]
    }
  },
  methods: {
    toggleDone (todoIndex) {
      this.todos[todoIndex].done = !this.todos[todoIndex].done
    }
  }
}
</script>

<style scoped>
.todo-list li {
  list-style: none;
}
</style>

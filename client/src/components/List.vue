<template>
<div>
  <h3>Do today</h3>
  <ul>
    <li v-for="todo in todos">
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
        {task: "Walk a dog"},
        {task: "Go groceries"},
        {task: "Do dishes"}
      ]
    }
  }
}
</script>

<style scoped>

</style>

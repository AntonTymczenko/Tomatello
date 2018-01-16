<template>
<div>
  <h3 contenteditable="true"
    ref="listName"
    @focus="backupListName()"
    @blur="renameList()">
    {{ list.listName }} </h3>
  <ul class="todo-list">
    <li v-for="(task, index) in list.tasks">
      <button @click="toggleDone(index)">
        <v-icon
          v-if="task.done">check_box</v-icon>
        <v-icon
          v-else>check_box_outline_blank</v-icon>
      </button>
      {{ task.task }}
      <button
        @click="deleteTask(index)"
        class="delete-task">
        <v-icon>clear</v-icon>
      </button>
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
import axios from 'axios'

export default {
  data: () => ({
    list: {
      listName: '',
      tasks: []
    },
    addingItem: false,
    newItemText: '',
    backupedListName: ''
  }),
  created () {
    axios.get(`/list/1`)
      .then(res => {
        this.list = res.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    toggleDone (taskIndex) {
      const task = this.list.tasks[taskIndex]
      axios.put(`/task/${task._id}`, {done: !task.done})
        .then(res => {
          task.done = !task.done
        })
        .catch(err => {
          console.log(err)
        })
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
        this.list.tasks.push({task: this.newItemText, done: false})
      }
      this.newItemText = ''
      this.addingItem = false
    },
    backupListName () {
      this.backupedListName = this.list.listName
    },
    renameList () {
      const newName = this.$refs.listName.innerHTML.trim()
      this.list.listName = newName
      axios.put(`/list/${this.list._id}`, {listName: newName})
        .catch(err => {
          console.log(err.message)
          this.list.listName = this.backupedListName
        })
    }
  }
}
</script>

<style scoped>
.todo-list li {
  list-style: none;
}
.todo-list li .delete-task {
  visibility: hidden;
}
.todo-list li:hover .delete-task {
  visibility: visible;
}
.new-list-item input {
  border-bottom: 1px solid black
}
</style>

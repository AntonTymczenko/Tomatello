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
      <span contenteditable="true"
        ref="tasks"
        @focus="backupTaskText(index)"
        @blur="renameTask(index)">
        {{ task.task }}
      </span>
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
    backupedListName: '',
    backupedTaskText: ''
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
      const newState = !task.done
      task.done = newState
      axios.put(`/task/${task._id}`, {done: newState})
        .then(res => {
          if (res.data.done !== newState) {
            return Promise.reject(new Error('304 Not modified'))
          }
        })
        .catch(err => {
          console.log(err)
          task.done = !newState
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
    deleteTask (index) {
      const id = this.list.tasks[index]._id
      this.list.tasks.splice(index, 1)
      axios.delete(`/task/${id}`)
        .catch(err => {
          console.log(err)
          // TODO: add some error handling.
          // Undo the change in data() if back-end returned an error
        })
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
          this.backupedListName = ''
        })
    },
    backupTaskText (index) {
      this.backupedTaskText = this.list.tasks[index].task
    },
    renameTask (index) {
      const newText = this.$refs.tasks[index].innerHTML.trim()
      const id = this.list.tasks[index]._id
      this.list.tasks[index].task = newText
      axios.put(`/task/${id}`, {task: newText})
        .then(res => {
          if (res.data.task !== newText) {
            return Promise.reject(new Error('304 Not modified'))
          }
        })
        .catch(err => {
          console.log(err.message)
          this.list.tasks[index].task = this.backupedTaskText
          this.backupedTaskText = ''
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

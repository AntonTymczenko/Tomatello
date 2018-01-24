<template>
<v-speed-dial
  v-model="fab"
  direction="left"
  transition="slide-x-reverse-transition"
>
  <v-btn
    slot="activator"
    color="transparent"
    light fab hover small
    v-model="fab"
  >
    <v-icon>more_horiz</v-icon>
    <v-icon>close</v-icon>
  </v-btn>
  <v-btn
    @click.stop="editBoard(index)"
    fab dark small color="green"
  >
    <v-icon>edit</v-icon>
  </v-btn>
  <v-btn
    @click.stop="deleteBoard(index)"
    fab dark small color="red"
  >
    <v-icon>delete</v-icon>
  </v-btn>
</v-speed-dial>
</template>


<script>
export default {
  props: ['index', 'deleteBoard', 'editBoard'],
  data: () => ({
    fab: false
  })
}
</script>


<template>

    <form>
      <label>
        New Todo:
        <input v-model="newTodo" type="text"/>
        <button type="submit" @click.prevent="addTodo()">Add</button>
      </label>
    </form>
</template>

<script>
import { clientesCollection } from '~/service/firebase'
export default {
  data () {
    return {
      newTodo: ''
    }
  },
  methods: {
    addTodo() {
      clientesCollection.add({
        text: this.newTodo,
        completed: false,
        createdAt: new Date()
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
      this.newTodo = '';
    }
  }
}
</script>
<template>
  <main>
    <h1>VTStore demo</h1>

    <button @click="addItem">Add item</button>
    <p>update count: {{ state.updateCount }}</p>
    <p>update count squared: {{ countSquared }}</p>

    <section>
      <label for="list-name">List name</label>
      <input id="list-name" v-model="name" />
    </section>
    <h2>{{ state.listName }}</h2>

    <ul v-for="item in listItems" :key="item">
      <li>{{ item }}</li>
    </ul>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, watch, } from "vue"

import { VTStore, createStore } from "../lib/vtstore"

// Define the data we'll use in the Store
interface TodoData {
  listName: string,
  listItems: string[],
  updateCount: number,
}

export default defineComponent({
  name: "Demo",

  setup() {
    // Initialize a new store with a default instance of the data.
    const store = createStore<TodoData>({
      listName: "default list",
      listItems: ["item 0"],
      updateCount: 0,
    })

    // Create a method to mutate the store
    const addItem = () => {
      store.mutate("listItems", [...store.state.listItems, `item ${store.state.listItems.length}`])
    }

    const name = computed({
      get: () => store.state.listName,
      set: (val) => store.mutate("listName", val),
    })

    // Watch a nested property in the store. If we just watched store.state, we'd get recursion
    // every time we called mutate() within the watcher.
    watch(() => store.state.listItems, () => {
      store.mutate("updateCount", store.state.updateCount + 1)
    })

    // Run our addItem a whole bunch
    const interval = setInterval(() => {
      if (store.state.listItems.length > 50) {
        clearInterval(interval)
        return
      }
      addItem()
    }, 10)

    // mutating the store directly will error out, as it's readonly
    // store.state.listName = "abc" - Cannot assign to 'listName' because it is a read-only property (Vetur)

    // Destructure using .refs
    const { listItems } = store.refs

    const countSquared = computed(() => store.state.updateCount * store.state.updateCount)

    return { addItem, state: store.state, listItems, name, countSquared, }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

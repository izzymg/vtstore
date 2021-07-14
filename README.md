# Vue3 + Typescript Store pattern example

This repo shows an example of a dead simple (20 lines of code) store pattern for Vue 3 with Typescript, without using Vuex.

This is intended as a reference for showing how developers can use only standard Vue 3 + TS can create a strongly typed global store system, and not as an actual library for use in code.

See the [code](lib/vtstore.ts)

Or clone and run `yarn && yarn dev` to see an example.

## Use

Instantiation

```ts
interface TodoData {
    name: string,
    items: string[],
}

const store = new VTStore<TodoData>({
    name: "My list", items: ["Example item"],
})
```

Mutations

```ts
store.mutate("items", [...store.state.items, "New item"])
store.mutate("name", "new name")
store.mutate("count", 10) //  Argument of type '"count"' is not assignable to parameter of type 'keyof TodoData'
```

Destructure refs

```ts
    ///...
    setup() {
        const { items } = store.refs
        return { items }
    }
}
```

Watch

```ts
let count = ref(0)
// only watch the items property of the store state
watch(() => store.state.items, () => {
    count++
})
```

Computed properties

```ts
const formattedName = computed(() => "name: " + store.state.name)
```

## About mutations

As `underlying` is returned by `reactive()` in the store's constructor,
reassigning `underlying` would break the reference, and subsequently break reactivity
for consumers. This method simply takes a key for the underlying store's type T as an argument,
and a value of the corresponding value type, and updates the property at that key.

```ts
public mutate<K extends keyof T>(key: K, val: T[K]) {
    this.underlying[key] = val
}
```

In other words, don't do this: `this.underlying = { newstuff }`

In terms of v-model, it's probably easiest to just bind the value to the store's state,
and then create an update method that calls `mutate()`.

Otherwise use a computed property, as the [Vuex docs](https://vuex.vuejs.org/guide/forms.html) suggest:

```ts
const name = computed({
    get: () => store.state.listName,
    set: (val: string) => store.mutate("listName", val),
})
```

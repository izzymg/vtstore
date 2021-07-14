import { reactive, readonly, toRefs, } from "vue"

class VTStore<T extends Object> {
    private underlying: T

    constructor(initial: T) {
        this.underlying = reactive(initial) as T
    }

    public mutate<K extends keyof T>(key: K, val: T[K]) {
        this.underlying[key] = val
    }

    get state() {
        return readonly(this.underlying)
    }

    get refs() {
        return toRefs(this.state)
    }
}

export { VTStore, }
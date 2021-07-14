import { DeepReadonly, reactive, readonly, ToRefs, toRefs, } from "vue"

// eslint-disable-next-line @typescript-eslint/ban-types
class VTStore<T extends object> {
    private underlying: T

    constructor(initial: T) {
        this.underlying = reactive(initial) as T
    }

    public mutate<K extends keyof T>(key: K, val: T[K]): void {
        this.underlying[key] = val
    }

    get state(): DeepReadonly<T> {
        return readonly(this.underlying) as DeepReadonly<T>
    }

    get refs(): ToRefs<DeepReadonly<T>> {
        return toRefs(this.state)
    }
}

export { VTStore, }
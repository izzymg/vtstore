import { reactive, readonly, toRefs, } from "vue"
import type { DeepReadonly, ToRefs } from "vue"

// eslint-disable-next-line @typescript-eslint/ban-types
class VTStore<T extends Object> {
  private _state: T

  constructor(initial: T) {
    this._state = reactive(initial) as T
  }

  mutate<K extends keyof T>(key: K, val: T[K]): void {
    this._state[key] = val
  }

  get state(): DeepReadonly<T> {
    return readonly(this._state) as DeepReadonly<T>
  }

  get refs(): ToRefs<DeepReadonly<T>> {
    return toRefs(this.state)
  }
}

const createStore = <T extends Object>(initial: T) => new VTStore<T>(initial);

export { VTStore, createStore }

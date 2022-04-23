import { CommitOptions, createStore, DispatchOptions, Store as VuexStore } from "vuex";
import { Mutations, mutations } from "@/store/mutations";
import { AppStateTypes, state } from "@/store/state";
import { AppGetters, getters } from "@/store/getters";
import { Actions, actions } from "@/store/actions";

/** 项目store仓库对象 */
export const store: AppStore = createStore({
  state,
  getters,
  mutations,
  actions
})

/**
 * Omit以一个类型为基础，支持剔除某些类型，然后返回新的类型
 */
/** store仓库对象类型 */
export type AppStore = Omit<
  VuexStore<AppStateTypes>, 'getters' | 'commit' | 'dispatch'
> & {
  getters: {
    [K in keyof AppGetters]: ReturnType<AppGetters[K]>
  }
} & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    k: K,
    payload: P, // 一定有参数
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions, P extends Parameters<Actions[K]>[1]>(
    k: K,
    payload?: P, // 不一定有参数
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
}
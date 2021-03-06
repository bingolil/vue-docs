import { GetterTree } from "vuex"
import { AppStateTypes } from "@/store/state"

export type AppGetters = {
  /** 用户姓名 */
  username(state: AppStateTypes): string
}

export const getters: GetterTree<AppStateTypes, AppStateTypes> & AppGetters = {
  username: (state) => state.userInfo.username || ''
}
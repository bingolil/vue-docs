import { ActionContext, ActionTree } from "vuex";

import { apiUser } from "@/api";
import { ActionTypes } from "@/store/action-types";
import { MutationTypes } from "@/store/mutation-types";
import { Mutations } from "@/store/mutations";
import { AppStateTypes } from "@/store/state";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<AppStateTypes, AppStateTypes>, 'commit'>

/** 定义store的action接口 */
export interface Actions {
  [ActionTypes.GET_USER_INFO]({ commit }: AugmentedActionContext): void
}

/** 项目store的actions */
export const actions: ActionTree<AppStateTypes, AppStateTypes> & Actions = {
  [ActionTypes.GET_USER_INFO]({ commit }) {
    apiUser.getUserInfo().then(res => {
      commit(MutationTypes.SET_USER_INFO, res.data)
    })
  }
}
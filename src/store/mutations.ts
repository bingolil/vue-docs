import { MutationTree } from "vuex";

import { getUILocale, i18n } from "@/i18n";
import { StorageUtil } from "@/utils";
import { MutationTypes } from "@/store/mutation-types";
import { AppStateTypes } from "@/store/state";
import { langValueType } from "@/types";
import { UserInfo } from "@/interfaces/user/user-info";

/** store的mutaions类型 */
export type Mutations<S = AppStateTypes> = {
  [MutationTypes.SET_LOADING](state: S, payload: boolean): void,
  [MutationTypes.SET_LANG](state: S, payload: langValueType): void,
  [MutationTypes.SET_USER_INFO](state: S, payload: UserInfo): void,
  [MutationTypes.SET_TOKEN](state: S, payload: string): void
}

export const mutations: MutationTree<AppStateTypes> & Mutations = {
  [MutationTypes.SET_LOADING](state, payload: boolean) {
    state.loading = payload;
  },
  [MutationTypes.SET_LANG](state, payload: langValueType) {
    state.lang = payload;
    StorageUtil.setLang(payload); // 将lang写入localStorage，下次使用
    i18n.global.locale = payload; // 变更i18n的语言
    state.uiLocale = getUILocale(payload); // 变更ui库语言
  },
  [MutationTypes.SET_USER_INFO](state, payload: UserInfo) {
    state.userInfo = payload;
    StorageUtil.setUserInfo(payload); // 将用户信息写入localStorage
  },
  [MutationTypes.SET_TOKEN](state, payload: string) { // 写入令牌
    state.token = payload;
    StorageUtil.setToken(payload);
  }
}
import { LANG } from "@/constant";
import { IUserInfo } from "@/interfaces/user/user-info";
import { langKeyType, langValueType } from "@/types";

/** 本地存储工具 */
export class StorageUtil {

    /** 语言 */
    static lang = 'Lang';
    /** 令牌token */
    static tokenKey = 'Access-Token';
    /** 用户信息 */
    static userInfo = 'User-Info';

    /**
     * @description 写入语言
     * @param newLang 新语言
     */
    static setLang(newLang: langValueType): void {
        localStorage.setItem(this.lang, newLang);
    }

    /**
    * @description 获取语言
    * @returns 语言字符串
    */
    static getLang(): langValueType {
        let langStr = localStorage.getItem(this.lang) as langValueType;
        const langList = Object.keys(LANG).map(kk => LANG[kk as langKeyType]);

        if (!langStr || langList.indexOf(langStr) === -1) { // 语言不存在或存在的值错误
            langStr = LANG.zhCn;
            this.setLang(langStr);
        }
        return langStr;
    }

    /**
     * @description 写入令牌
     * @param token 令牌
     */
    static setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    /**
     * @description 获取令牌
     * @returns 令牌
     */
    static getToken(): string {
        return localStorage.getItem(this.tokenKey) || '';
    }

    /**
     * @description 移除令牌
     */
    static removeToken(): void {
        localStorage.removeItem(this.tokenKey);
    }

    /**
     * @description 设置用户信息
     * @param info 用户信息
     */
    static setUserInfo(info: IUserInfo): void {
        localStorage.setItem(this.userInfo, JSON.stringify(info));
    }

    /**
     * @description 移除用户信息
     */
    static removeUserInfo(): void {
        localStorage.removeItem(this.userInfo);
    }

    /**
     * 获取用户信息
     * @returns 用户信息
     */
    static getUserInfo(): IUserInfo {
        return JSON.parse(localStorage.getItem(this.userInfo) || '{}') as IUserInfo;
    }

}

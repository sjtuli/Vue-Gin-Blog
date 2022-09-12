import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserProfile,
} from '/@/api/user/index';
import { setToken, clearToken } from '/@/utils/auth';

export const useUserStore = defineStore('user', {
  state: () => ({
    ID: undefined,
    avatar: undefined,
    CreatedAt: undefined,
    DeletedAt: undefined,
    role:undefined,
    name:undefined,
    desc:undefined,
    qq_chat:undefined,
    wechat:undefined,
    bili:undefined,
    email:undefined,
    github:undefined,
    img:undefined,
    aboutMe:undefined,
  }),
  getters: {
    userProfile(state) {
      return { ...state };
    },
    isLogin() {
      if (typeof this.ID === 'undefined') {
      return false
      } else {
          return true
      }
    }
  },
  actions: {
    // 设置用户的信息
    setInfo(partial) {
      this.$patch(partial);
    },
    // 重置用户信息
    resetInfo() {
      this.$reset();
    },
    // 获取用户信息
    async info() {
      const result = await getUserProfile();
      this.setInfo(result);
    },
    // 异步登录并存储token
    async login(loginForm) {
      const result = await userLogin();
      const token = result?.token;
      if (token) {
        setToken(token);
      }
      return result;
    },
    // Logout
    async logout() {
      await userLogout();
      this.resetInfo();
      clearToken();
      // 路由表重置
      // location.reload();
    },
  },
});

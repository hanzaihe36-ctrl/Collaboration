import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userId: "user-01",
    username: "He Kai",
    avatar: "📋",
  }),
  actions: {
    updateProfile(updates) {
      if (updates.username) this.username = updates.username;
    },
  },
});

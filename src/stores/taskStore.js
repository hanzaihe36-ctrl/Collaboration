import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [], // 任务数组
    filter: {
      priority: "all", // all | low | medium | high
      tags: [], // 选中的标签数组
    },
    searchKeyword: "", // 搜索关键词
  }),

  getters: {
    // 1. 基础状态分类
    todoTasks: (state) => state.tasks.filter((t) => t.status === "todo"),
    doingTasks: (state) => state.tasks.filter((t) => t.status === "doing"),
    doneTasks: (state) => state.tasks.filter((t) => t.status === "done"),

    // 2. 核心联动过滤 (支持多标签交集与模糊搜索)
    filteredTasks() {
      return this.tasks.filter((task) => {
        const matchesKeyword =
          task.title.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
          task.description
            .toLowerCase()
            .includes(this.searchKeyword.toLowerCase());
        const matchesPriority =
          this.filter.priority === "all" ||
          task.priority === this.filter.priority;
        const matchesTags =
          this.filter.tags.length === 0 ||
          this.filter.tags.every((tag) => task.tags.includes(tag));
        return matchesKeyword && matchesPriority && matchesTags;
      });
    },

    // 3. 按优先级分组计数
    tasksByPriority() {
      const counts = { low: 0, medium: 0, high: 0 };
      this.tasks.forEach((t) => {
        if (counts[t.priority] !== undefined) counts[t.priority]++;
      });
      return counts;
    },

    // 4. 逾期未完成任务数 (当前时间 > 截止时间 且 状态不为 done)
    overdueTasksCount: (state) => {
      const now = Date.now();
      return state.tasks.filter(
        (t) => t.status !== "done" && t.deadline && now > t.deadline,
      ).length;
    },

    // 5. 今日完成任务数
    todayCompletedCount: (state) => {
      const todayStr = new Date().toLocaleDateString();
      return state.tasks.filter(
        (t) =>
          t.status === "done" &&
          t.completedTime &&
          new Date(t.completedTime).toLocaleDateString() === todayStr,
      ).length;
    },

    // 6. 完成率
    completionRate: (state) => {
      const total = state.tasks.length;
      if (total === 0) return 0;
      const done = state.tasks.filter((t) => t.status === "done").length;
      return Math.round((done / total) * 100);
    },

    // 获取所有去重后的可用标签 (用于筛选栏)
    allTags: (state) => {
      const tagsSet = new Set();
      state.tasks.forEach(
        (t) => t.tags && t.tags.forEach((tag) => tagsSet.add(tag)),
      );
      return Array.from(tagsSet);
    },
  },

  actions: {
    addTask(taskData) {
      const now = Date.now();
      this.tasks.push({
        id: now,
        title: taskData.title,
        description: taskData.description || "",
        status: "todo",
        priority: taskData.priority || "medium",
        tags: taskData.tags || [],
        deadline: taskData.deadline
          ? new Date(taskData.deadline).getTime()
          : null,
        createTime: now,
        updateTime: now,
        completedTime: null,
        creatorId: "user-01",
      });
    },

    updateTask(id, updates) {
      const idx = this.tasks.findIndex((t) => t.id === id);
      if (idx !== -1) {
        this.tasks[idx] = {
          ...this.tasks[idx],
          ...updates,
          updateTime: Date.now(),
        };
        // 如果中途被改成完成，附带记录时间
        if (updates.status === "done" && !this.tasks[idx].completedTime) {
          this.tasks[idx].completedTime = Date.now();
        } else if (updates.status && updates.status !== "done") {
          this.tasks[idx].completedTime = null;
        }
      }
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },

    moveTask(id, newStatus) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) {
        task.status = newStatus;
        task.updateTime = Date.now();
        task.completedTime = newStatus === "done" ? Date.now() : null;
      }
    },

    clearFilters() {
      this.filter.priority = "all";
      this.filter.tags = [];
      this.searchKeyword = "";
    },
  },
  persist: {
    key: "taskboard-tasks",
    storage: localStorage,
  },
});

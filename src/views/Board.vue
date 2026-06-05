<template>
  <div class="board-view">
    <div class="board-toolbar">
      <FilterBar />
      <button @click="showCreateForm = true" class="btn-primary-add">
        ➕ 创建任务
      </button>
    </div>

    <div class="board-columns-container">
      <TaskColumn
        title="待处理 📝"
        status="todo"
        :tasks="filteredTodo"
        @move-task="handleMove"
        @delete-task="handleDelete"
      />
      <TaskColumn
        title="进行中 ⚡"
        status="doing"
        :tasks="filteredDoing"
        @move-task="handleMove"
        @delete-task="handleDelete"
      />
      <TaskColumn
        title="已完成 ✅"
        status="done"
        :tasks="filteredDone"
        @move-task="handleMove"
        @delete-task="handleDelete"
      />
    </div>

    <TaskForm
      v-if="showCreateForm"
      mode="create"
      @cancel="showCreateForm = false"
      @submit="handleCreateSubmit"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTaskStore } from "../stores/taskStore";
import FilterBar from "../components/FilterBar.vue";
import TaskColumn from "../components/TaskColumn.vue";
import TaskForm from "../components/TaskForm.vue";

const taskStore = useTaskStore();
const showCreateForm = ref(false);

// 基于全剧 store 统一过滤后的结果分流分列
const filteredTodo = computed(() =>
  taskStore.filteredTasks.filter((t) => t.status === "todo"),
);
const filteredDoing = computed(() =>
  taskStore.filteredTasks.filter((t) => t.status === "doing"),
);
const filteredDone = computed(() =>
  taskStore.filteredTasks.filter((t) => t.status === "done"),
);

const handleCreateSubmit = (data) => {
  taskStore.addTask(data);
  showCreateForm = false;
};

const handleMove = ({ id, newStatus }) => {
  taskStore.moveTask(id, newStatus);
};

const handleDelete = (id) => {
  if (confirm("确定彻底删除该任务吗？")) {
    taskStore.deleteTask(id);
  }
};
</script>

<style scoped>
.board-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.board-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}
.board-toolbar :deep(.filter-bar) {
  flex-grow: 1;
}
.btn-primary-add {
  background: var(--accent);
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 15px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: var(--shadow);
}
.btn-primary-add:hover {
  opacity: 0.9;
}

.board-columns-container {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  align-items: flex-start;
  padding-bottom: 12px;
}
</style>

<template>
  <div class="detail-view">
    <div v-if="!task" class="not-found">
      <h3>🔍 找不到对应的任务记录</h3>
      <button @click="$router.push('/')">返回看板</button>
    </div>

    <div v-else class="detail-container">
      <div class="detail-header">
        <button class="btn-back" @click="$router.push('/')">⬅ 退出详情</button>
        <span class="status-tag" :class="task.status">{{ statusLabel }}</span>
      </div>

      <h2 class="title">{{ task.title }}</h2>

      <div class="metadata">
        <p><strong>创建时间：</strong> {{ formatTime(task.createTime) }}</p>
        <p><strong>最近修润：</strong> {{ formatTime(task.updateTime) }}</p>
        <p v-if="task.completedTime">
          <strong>完工打卡：</strong> {{ formatTime(task.completedTime) }}
        </p>
      </div>

      <div class="desc-box">
        <h5>📝 详细要求与备忘内容</h5>
        <p class="desc-content">{{ task.description || "暂无详细描述..." }}</p>
      </div>

      <div class="control-actions">
        <div class="status-changer">
          <span>流转任务状态：</span>
          <select
            :value="task.status"
            @change="changeStatus($event.target.value)"
          >
            <option value="todo">移至 待处理</option>
            <option value="doing">移至 进行中</option>
            <option value="done">移至 已完成</option>
          </select>
        </div>

        <div class="danger-btns">
          <button @click="showEditForm = true" class="btn-edit">
            📝 修改信息
          </button>
          <button @click="triggerDelete" class="btn-del">❌ 抹去任务</button>
        </div>
      </div>
    </div>

    <TaskForm
      v-if="showEditForm"
      mode="edit"
      :task="task"
      @cancel="showEditForm = false"
      @submit="handleEditSubmit"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTaskStore } from "../stores/taskStore";
import TaskForm from "../components/TaskForm.vue";

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();
const showEditForm = ref(false);

const taskId = computed(() => Number(route.params.id));
const task = computed(() => taskStore.tasks.find((t) => t.id === taskId.value));

const statusLabel = computed(() => {
  const map = { todo: "待处理 ⏳", doing: "进行中 🚀", done: "全面做完 ✅" };
  return map[task.value?.status] || "未知";
});

const changeStatus = (val) => {
  taskStore.updateTask(taskId.value, { status: val });
};

const handleEditSubmit = (updatedData) => {
  taskStore.updateTask(taskId.value, updatedData);
  showEditForm = false;
};

const triggerDelete = () => {
  if (confirm("删除后无法撤销，确定执行吗？")) {
    taskStore.deleteTask(taskId.value);
    router.push("/");
  }
};

const formatTime = (ts) => new Date(ts).toLocaleString();
</script>

<style scoped>
.detail-view {
  text-align: left;
  max-width: 700px;
  margin: 0 auto;
  padding: 10px;
}
.detail-container {
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow);
}
.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.btn-back {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}
.status-tag {
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 14px;
}
.status-tag.todo {
  background: #fef9c3;
  color: #854d0e;
}
.status-tag.doing {
  background: #dbeafe;
  color: #1e40af;
}
.status-tag.done {
  background: #d1fae5;
  color: #065f46;
}

.metadata {
  font-size: 13px;
  color: var(--text);
  border-bottom: 1px solid var(--border);
  padding-bottom: 12px;
  margin-bottom: 16px;
}
.desc-box {
  background: var(--bg);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--border);
  margin-bottom: 24px;
}
.desc-box h5 {
  margin: 0 0 10px;
  font-size: 14px;
  color: var(--text-h);
}
.desc-content {
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
  white-space: pre-wrap;
}

.control-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  border-top: 1px solid var(--border);
  padding-top: 16px;
}
select {
  padding: 6px 12px;
  border-radius: 6px;
  background: var(--bg);
  color: var(--text-h);
  border: 1px solid var(--border);
}
.danger-btns {
  display: flex;
  gap: 10px;
}
.btn-edit {
  background: var(--accent);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}
.btn-del {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}
</style>

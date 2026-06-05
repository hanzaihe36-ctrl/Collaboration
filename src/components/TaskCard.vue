<template>
  <div
    class="task-card"
    :class="[task.priority, { 'is-overdue': isOverdue }]"
    draggable="true"
    @dragstart="handleDragStart"
  >
    <div class="card-header">
      <span class="priority-badge">{{ priorityLabel }}</span>
      <span v-if="isOverdue" class="overdue-tag">⚠️ 已逾期</span>
    </div>

    <h4 class="task-title" @click="goToDetail">{{ task.title }}</h4>
    <p class="task-desc">{{ task.description || "暂无描述" }}</p>

    <div class="tags-list" v-if="task.tags?.length">
      <span v-for="tag in task.tags" :key="tag" class="tag-item"
        >#{{ tag }}</span
      >
    </div>

    <div class="card-footer">
      <span class="date-info" v-if="task.deadline"
        >📅 截止: {{ formatDate(task.deadline) }}</span
      >
      <button @click.stop="$emit('delete', task.id)" class="btn-card-del">
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  task: { type: Object, required: true },
});
const emit = defineEmits(["delete"]);
const router = useRouter();

const isOverdue = computed(() => {
  return (
    props.task.status !== "done" &&
    props.task.deadline &&
    Date.now() > props.task.deadline
  );
});

const priorityLabel = computed(() => {
  const maps = { high: "🔥 高", medium: "⚡ 中", low: "☕ 低" };
  return maps[props.task.priority] || "中";
});

const handleDragStart = (e) => {
  e.dataTransfer.setData("text/plain", props.task.id.toString());
};

const goToDetail = () => {
  router.push(`/task/${props.task.id}`);
};

const formatDate = (ts) => new Date(ts).toLocaleDateString();
</script>

<style scoped>
.task-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  cursor: grab;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.task-card:active {
  cursor: grabbing;
}
.task-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

/* 侧边高亮色块体现优先级 */
.task-card.high {
  border-left: 5px solid #ef4444;
}
.task-card.medium {
  border-left: 5px solid #eab308;
}
.task-card.low {
  border-left: 5px solid #10b981;
}
.task-card.is-overdue {
  background: rgba(239, 68, 68, 0.04);
  border: 1px dashed #ef4444;
}

.card-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 6px;
}
.priority-badge {
  font-weight: bold;
}
.overdue-tag {
  color: #ef4444;
  font-weight: bold;
}

.task-title {
  margin: 4px 0;
  color: var(--text-h);
  cursor: pointer;
  font-size: 16px;
}
.task-title:hover {
  color: var(--accent);
  text-decoration: underline;
}
.task-desc {
  font-size: 13px;
  color: var(--text);
  margin: 6px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tags-list {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}
.tag-item {
  font-size: 11px;
  background: var(--accent-bg);
  color: var(--accent);
  padding: 2px 6px;
  border-radius: 4px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  border-top: 1px solid var(--border);
  padding-top: 8px;
  margin-top: 8px;
}
.btn-card-del {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
}
.btn-card-del:hover {
  transform: scale(1.2);
}
</style>

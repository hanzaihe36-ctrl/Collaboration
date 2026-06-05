<template>
  <div class="task-column" @dragover.prevent @drop="handleDrop">
    <div class="column-title">
      <h3>
        {{ title }} <span class="badge">{{ tasks.length }}</span>
      </h3>
    </div>

    <div class="cards-area">
      <div v-if="tasks.length === 0" class="empty-state">📭 暂无相关任务</div>
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @delete="$emit('delete-task', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import TaskCard from "./TaskCard.vue";

const props = defineProps({
  title: String,
  status: String,
  tasks: Array,
});
const emit = defineEmits(["move-task", "delete-task"]);

const handleDrop = (e) => {
  const taskId = e.dataTransfer.getData("text/plain");
  if (taskId) {
    emit("move-task", { id: Number(taskId), newStatus: props.status });
  }
};
</script>

<style scoped>
.task-column {
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.column-title h3 {
  margin: 0;
  font-size: 18px;
  color: var(--text-h);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.badge {
  background: var(--accent-bg);
  color: var(--accent);
  font-size: 13px;
  padding: 2px 8px;
  border-radius: 12px;
}
.cards-area {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
  min-height: 350px;
}
.empty-state {
  text-align: center;
  color: var(--text);
  padding: 40px 0;
  font-size: 14px;
  border: 2px dashed var(--border);
  border-radius: 8px;
}
</style>

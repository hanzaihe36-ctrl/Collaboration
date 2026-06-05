<template>
  <div class="stats-view">
    <h2>📈 数据洞察与大屏统计</h2>

    <div class="metrics-grid">
      <div class="metric-card">
        <h5>总任务量</h5>
        <span class="num">{{ taskStore.totalCount }}</span>
      </div>
      <div class="metric-card overdue">
        <h5>🔥 逾期未结</h5>
        <span class="num">{{ taskStore.overdueTasksCount }}</span>
      </div>
      <div class="metric-card today">
        <h5>✨ 今日闭环</h5>
        <span class="num">{{ taskStore.todayCompletedCount }}</span>
      </div>
      <div class="metric-card rate">
        <h5>🎯 整体复习胜率</h5>
        <span class="num">{{ taskStore.completionRate }}%</span>
      </div>
    </div>

    <div class="charts-layout">
      <StatsChart title="各工作流状态分布" :data="statusChartData" />
      <StatsChart title="高低优先级分配情况" :data="priorityChartData" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTaskStore } from "../stores/taskStore";
import StatsChart from "../components/StatsChart.vue";

const taskStore = useTaskStore();

// 精准重算三种状态的任务数量，避免出现全满 Bug
const statusChartData = computed(() => [
  { label: "待处理", value: taskStore.todoTasks.length, color: "#eab308" },
  { label: "进行中", value: taskStore.doingTasks.length, color: "#3b82f6" },
  { label: "已完成", value: taskStore.doneTasks.length, color: "#10b981" },
]);

const priorityChartData = computed(() => {
  const pData = taskStore.tasksByPriority;
  return [
    { label: "高级", value: pData.high, color: "#ef4444" },
    { label: "中级", value: pData.medium, color: "#f59e0b" },
    { label: "低级", value: pData.low, color: "#10b981" },
  ];
});
</script>

<style scoped>
.stats-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
.metric-card {
  background: var(--code-bg);
  padding: 16px;
  border-radius: 10px;
  border: 1px solid var(--border);
  text-align: center;
}
.metric-card h5 {
  margin: 0 0 8px;
  color: var(--text);
  font-size: 14px;
}
.metric-card .num {
  font-size: 32px;
  font-weight: bold;
  color: var(--text-h);
}
.metric-card.overdue .num {
  color: #ef4444;
}
.metric-card.today .num {
  color: #10b981;
}
.metric-card.rate .num {
  color: var(--accent);
}

.charts-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
@media (max-width: 768px) {
  .charts-layout {
    grid-template-columns: 1fr;
  }
}
</style>

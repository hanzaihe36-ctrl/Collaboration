<template>
  <div class="stats-chart">
    <h4>📊 {{ title }}</h4>
    <div class="chart-body">
      <div v-for="item in data" :key="item.label" class="chart-row">
        <span class="row-label">{{ item.label }}</span>
        <div class="row-track">
          <div
            class="row-fill"
            :style="{
              width:
                totalSum === 0 ? '0%' : (item.value / totalSum) * 100 + '%',
              backgroundColor: item.color,
            }"
          ></div>
        </div>
        <span class="row-val">{{ item.value }} 个</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: String,
  data: Array, // 格式: [{ label: '待处理', value: 5, color: '#ff0000' }]
});

// 计算当前图表所有项的数量总和，作为百分比基数
const totalSum = computed(() => {
  return props.data.reduce((sum, item) => sum + item.value, 0);
});
</script>

<style scoped>
.stats-chart {
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  text-align: left;
}
.stats-chart h4 {
  margin: 0 0 16px;
  font-size: 16px;
  color: var(--text-h);
}
.chart-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.chart-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.row-label {
  width: 70px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}
.row-track {
  flex-grow: 1;
  height: 16px;
  background: var(--bg);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border);
}
.row-fill {
  height: 100%;
  border-radius: 8px;
  transition: width 0.4s ease;
}
.row-val {
  width: 50px;
  font-size: 13px;
  font-weight: bold;
  text-align: right;
  color: var(--text-h);
  white-space: nowrap;
}
</style>

<template>
  <div class="filter-bar">
    <div class="search-box">
      <input
        v-model="taskStore.searchKeyword"
        type="text"
        placeholder="🔍 实时搜索任务标题或描述..."
      />
    </div>

    <div class="selectors">
      <select v-model="taskStore.filter.priority">
        <option value="all">所有优先级</option>
        <option value="high">🔴 高优先级</option>
        <option value="medium">🟡 中优先级</option>
        <option value="low">🟢 低优先级</option>
      </select>

      <div class="tags-picker" v-if="taskStore.allTags.length">
        <span class="picker-label">标签过滤:</span>
        <label v-for="tag in taskStore.allTags" :key="tag" class="tag-checkbox">
          <input type="checkbox" :value="tag" v-model="taskStore.filter.tags" />
          {{ tag }}
        </label>
      </div>

      <button @click="taskStore.clearFilters" class="btn-clear">
        🧹 重置筛选
      </button>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "../stores/taskStore";
const taskStore = useTaskStore();
</script>

<style scoped>
.filter-bar {
  background: var(--code-bg);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
}
.search-box input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text-h);
  font-size: 15px;
}
.selectors {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text-h);
}
.tags-picker {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.picker-label {
  font-size: 14px;
  font-weight: bold;
}
.tag-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  background: var(--bg);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--border);
  cursor: pointer;
}
.btn-clear {
  padding: 6px 12px;
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
  border-radius: 6px;
  cursor: pointer;
  margin-left: auto;
}
.btn-clear:hover {
  background: var(--accent-bg);
}
</style>

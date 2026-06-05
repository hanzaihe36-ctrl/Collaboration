<template>
  <div class="task-form-overlay" @click.self="$emit('cancel')">
    <div class="form-card">
      <h3>{{ mode === "edit" ? "📝 编辑任务" : "🚀 创建新协作任务" }}</h3>

      <form @submit.prevent="submitForm">
        <div class="form-item">
          <label>任务标题 * (最多50字)</label>
          <input
            v-model="formData.title"
            type="text"
            maxlength="50"
            required
            placeholder="例如：完成Web程序设计实验五"
          />
        </div>

        <div class="form-item">
          <label>描述信息</label>
          <textarea
            v-model="formData.description"
            rows="3"
            placeholder="添加具体的细节补充..."
          ></textarea>
        </div>

        <div class="grid-2">
          <div class="form-item">
            <label>优先级</label>
            <select v-model="formData.priority">
              <option value="low">低 (☕)</option>
              <option value="medium">中 (⚡)</option>
              <option value="high">高 (🔥)</option>
            </select>
          </div>

          <div class="form-item">
            <label>截止日期</label>
            <input v-model="formData.deadline" type="date" :min="minDate" />
          </div>
        </div>

        <div class="form-item">
          <label>自定义标签 (以英文逗号或空格隔开)</label>
          <input
            v-model="tagsInput"
            type="text"
            placeholder="例如：期末复习, 算法, 必做"
          />
        </div>

        <div class="form-actions">
          <button type="button" @click="$emit('cancel')" class="btn-cancel">
            取消
          </button>
          <button type="submit" class="btn-save">保存提交</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  task: Object,
  mode: { type: String, default: "create" },
});
const emit = defineEmits(["submit", "cancel"]);

const formData = ref({
  title: "",
  description: "",
  priority: "medium",
  deadline: "",
});
const tagsInput = ref("");
const minDate = ref(new Date().toISOString().split("T")[0]); // 限制未来日期

onMounted(() => {
  if (props.mode === "edit" && props.task) {
    formData.value = {
      title: props.task.title,
      description: props.task.description,
      priority: props.task.priority,
      deadline: props.task.deadline
        ? new Date(props.task.deadline).toISOString().split("T")[0]
        : "",
    };
    tagsInput.value = props.task.tags?.join(", ") || "";
  }
});

const submitForm = () => {
  if (!formData.value.title.trim()) return;

  // 转换标签输入为干净数组
  const processedTags = tagsInput.value
    .split(/[,，\s]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  emit("submit", {
    ...formData.value,
    tags: processedTags,
  });
};
</script>

<style scoped>
.task-form-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.form-card {
  background: var(--bg);
  border: 1px solid var(--border);
  width: 480px;
  max-width: 90%;
  padding: 24px;
  border-radius: 12px;
  box-shadow: var(--shadow);
  text-align: left;
}
.form-card h3 {
  margin-top: 0;
  margin-bottom: 16px;
}
.form-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}
.form-item label {
  font-size: 13px;
  font-weight: bold;
  color: var(--text-h);
}
input[type="text"],
input[type="date"],
select,
textarea {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--code-bg);
  color: var(--text-h);
  font-size: 14px;
}
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
button {
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
.btn-cancel {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
}
.btn-save {
  background: var(--accent);
  border: none;
  color: white;
}
</style>

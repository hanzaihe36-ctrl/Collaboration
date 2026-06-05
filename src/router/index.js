import { createRouter, createWebHistory } from "vue-router";
import Board from "../views/Board.vue";
import Stats from "../views/Stats.vue";
import TaskDetail from "../views/TaskDetail.vue";

const routes = [
  { path: "/", name: "Board", component: Board },
  { path: "/stats", name: "Stats", component: Stats },
  { path: "/task/:id", name: "TaskDetail", component: TaskDetail, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

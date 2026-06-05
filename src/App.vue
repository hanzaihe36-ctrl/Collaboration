<template>
  <div id="center">
    <header class="main-navigator">
      <div class="logo-title">
        <span class="user-avatar"> He Kai</span>
        <h2>协作任务板系统</h2>
      </div>
      <nav class="nav-links">
        <router-link to="/" class="nav-btn" active-class="active-route"
          >📋 任务画布</router-link
        >
        <router-link to="/stats" class="nav-btn" active-class="active-route"
          >📊 度量分析</router-link
        >
      </nav>
    </header>

    <main class="router-view-body">
      <router-view />
    </main>
  </div>
  <div id="spacer"></div>
</template>

<style scoped>
.main-navigator {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border);
  box-sizing: border-box;
}
.logo-title {
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo-title h2 {
  margin: 0;
  font-size: 22px;
}
.user-avatar {
  background: var(--accent-bg);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: bold;
  color: var(--accent);
}

.nav-links {
  display: flex;
  gap: 12px;
}
.nav-btn {
  text-decoration: none;
  font-size: 15px;
  color: var(--text);
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.3s;
}
.nav-btn:hover {
  background: var(--code-bg);
  color: var(--text-h);
}
.active-route {
  background: var(--accent-bg) !important;
  color: var(--accent) !important;
  font-weight: bold;
}

.router-view-body {
  width: 100%;
  padding: 24px;
  box-sizing: border-box;
  flex-grow: 1;
}
</style>

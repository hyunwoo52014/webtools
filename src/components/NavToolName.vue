<template>
  <nav class="nav-tabs">
    <router-link
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      class="nav-tab"
      :class="{ active: route.path === item.path }"
    >
      {{ item.label }}
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { path: '/', label: '홈' },
  { path: '/textEditor', label: '텍스트 에디터' },
  { path: '/calculator', label: '계산기' },
  { path: '/timerNcounter', label: '타이머/카운터' },
  //{ path: '/paintBoard', label: '그림판' },
]
</script>

<style scoped>
nav {
  background-color: rgb(100, 200, 100);
  width: 100%;
  height: 10%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  top: 0;
  left: 0;
  display: flex;
  z-index: -1;
}

.nav-tabs {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  z-index: 0;
}

.nav-tab {
  padding: 0.5rem 1.2rem;
  text-decoration: none;
  color: #333;
  border-radius: 5px;
  transition: all 0.2s ease;
  font-weight: 500;
  z-index: 0;
}

.nav-tab:hover {
  background-color: #d5d5d5;
  z-index: 0;
}

.nav-tab:active {
  transform: scale(0.95); /* 눌림 효과 */
  background-color: rgb(192, 192, 192);
  z-index: 0;
}

.nav-tab.active {
  background-color: #333;
  color: white;
  z-index: 0;
}
</style>

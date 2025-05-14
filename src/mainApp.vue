<template>
  <NavApp />
  <div class="page-layout">
    <div class="content">
      <router-view></router-view>
    </div>
    <Logos />
  </div>
</template>

<script setup>
import NavApp from './components/NavToolName.vue'
import Logos from './components/LogosMadeBy.vue'
</script>
<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.page-layout {
  display: grid; /* 그리드 레이아웃 사용 */
  grid-template-columns: 1fr; /* 기본적으로 하나의 열 */
  grid-template-rows: auto 1fr auto; /* 상단, 본문, 하단 */
  grid-template-areas:
    'header'
    'main'
    'footer'; /* 그리드 영역을 정의 */
  height: 100vh; /* 전체 화면 크기 */
}

header {
  grid-area: header; /* header 영역 지정 */
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
}

main {
  grid-area: main; /* main 영역 지정 */
  padding: 1rem;
  overflow-y: auto; /* 콘텐츠가 넘치면 스크롤 */
}

footer {
  grid-area: footer; /* footer 영역 지정 */
  background-color: #f5f5f5;
  padding: 1rem;
  text-align: center;
}
</style>

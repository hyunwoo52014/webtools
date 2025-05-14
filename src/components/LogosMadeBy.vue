<template>
  <footer class="container">
    <div id="logos">
      <div id="left-label">
        <strong>사용된 프레임워크 및 언어</strong>
      </div>
      <a v-for="item in logo_path" :key="item" :href="item.httpsURL">
        <img :src="item.logoPath" :title="`다음 URL로 이동합니다 ${item.httpsURL}`" />
      </a>
    </div>
    <div id="versionControl">
      <div id="right-label">
        <strong>Version Control 및 소스파일</strong>
      </div>
      <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
        <img src="/src/assets/github-mark.svg" title="다음 URL로 이동합니다 https://github.com/" />
      </a>
    </div>
  </footer>
</template>

<script setup>
const logo_path = [
  {
    httpsURL: 'https://www.java.com/',
    logoPath: new URL('@/assets/Java.svg', import.meta.url).href,
  },
  {
    httpsURL: 'https://ecma-international.org/publications-and-standards/standards/ecma-262/',
    logoPath: new URL('@/assets/Javascript-logo-svgrepo-com.svg', import.meta.url).href,
  },
  {
    httpsURL: 'https://www.eclipse.org/',
    logoPath: new URL('@/assets/Eclipse.svg', import.meta.url).href,
  },
  {
    httpsURL: 'https://spring.io/',
    logoPath: new URL('@/assets/Spring_Boot.svg', import.meta.url).href,
  },
  {
    httpsURL: 'https://vuejs.org/',
    logoPath: new URL('@/assets/Vue.js_Logo_2.svg', import.meta.url).href,
  },
  {
    httpsURL: 'https://code.visualstudio.com/',
    logoPath: new URL('@/assets/Visual_Studio_Code_1.35_icon.svg', import.meta.url).href,
  },
]
</script>

<style scoped>
img {
  width: 25px;
  height: 25px;
  padding: 25px;
  transition: transform 0.2s;
}

img:hover {
  transform: scale(2);
}

/* 기본 footer는 고정 */
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10vh;
  background: #f5f5f5;
  text-align: center;
  padding: 0.5rem 0;
  border-top: 1px solid #ddd;
  z-index: 100;
  background-color: rgb(220, 220, 220);
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15rem;
}

/* 세로가 좁을 경우 - 반응형 */
@media (max-height: 600px) {
  footer {
    position: static; /* 고정 해제 */
    padding: 1rem;
  }

  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    gap: 1rem;
    justify-items: center;
  }

  /* 텍스트 라벨은 숨김 */
  #left-label,
  #right-label {
    display: none;
  }

  /* div 감싸는 구조를 초기화하여 grid 안에 로고만 배치 */
  #logos,
  #versionControl {
    display: contents;
  }
}

@media (max-width: 600px) {
  footer {
    position: static; /* 고정 해제 */
    padding: 1rem;
  }

  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    gap: 1rem;
    justify-items: center;
  }

  #left-label,
  #right-label {
    display: none;
  }

  #logos,
  #versionControl {
    display: contents;
  }
}
</style>

<template>
  <CommonLayout direction="column">
    <template #menuBar>
      <div class="menuBar">
        <h1>텍스트 에디터</h1>
        <button v-for="label in buttonLabel" :key="label" @click="handleButtonClick(label)">
          {{ label }}
        </button>
        <!-- 파일 입력 (사용자에게 파일을 선택하게 함) -->
        <input type="file" id="fileInput" style="display: none" @change="loadFromFile" />
      </div>
    </template>
    <template #mainView>
      <textarea class="full-textarea" v-model="textContent"></textarea>
    </template>
  </CommonLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CommonLayout from '@/layout/CommonLayout.vue'

const buttonLabel = [
  '임시저장',
  '파일로 저장',
  '파일로 불러오기',
  //'서버에 저장',
  //'서버에서 불러오기',
  '초기화',
]

const textContent = ref('')
const userId = ref('')
const userPassword = ref('')

// 임시저장: 쿠키에 저장
const saveToCookies = () => {
  document.cookie = `textContent=${encodeURIComponent(textContent.value)}; path=/; max-age=3600`
  alert('내용이 임시 저장되었습니다.')
}

// 파일로 저장: 텍스트 파일로 다운로드
const saveToFile = () => {
  const blob = new Blob([textContent.value], { type: 'text/plain' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'text-editor.txt'
  link.click()
}

// 서버에 저장: 아이디, 비밀번호 입력 후 hash 생성하여 서버로 전송
const saveToServer = async () => {
  const hashedPassword = await hashPassword(userPassword.value)
  // 서버에 데이터를 전송하는 코드 (예시)
  const payload = {
    id: userId.value,
    password: hashedPassword,
    content: textContent.value,
  }
  // 서버에 CRUD 요청 (예시)
  // const response = await fetch('/api/save', { method: 'POST', body: JSON.stringify(payload) });
  // alert('서버에 저장되었습니다.');
  console.log('Server save request:', payload)
}

// 비밀번호 해시 생성 (SHA256 예시)
const hashPassword = async (password) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('')
  return hashHex
}

// 파일로 불러오기: 파일 선택 후 내용 불러오기
const loadFromFile = (event) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    textContent.value = reader.result
  }
  reader.readAsText(file)
}

// 서버에서 불러오기: 아이디, 비밀번호 입력 후 서버에서 데이터 불러오기
const loadFromServer = async () => {
  const hashedPassword = await hashPassword(userPassword.value)
  const payload = { id: userId.value, password: hashedPassword }
  // 서버에 요청하여 데이터 가져오기 (예시)
  // const response = await fetch('/api/load', { method: 'POST', body: JSON.stringify(payload) });
  // const data = await response.json();
  // textContent.value = data.content;
  console.log('Server load request:', payload)
}

// 버튼 클릭 핸들러
const handleButtonClick = (label) => {
  if (label === '임시저장') {
    saveToCookies()
  } else if (label === '파일로 저장') {
    saveToFile()
  } else if (label === '파일로 불러오기') {
    document.getElementById('fileInput').click()
  } else if (label === '서버에 저장') {
    saveToServer()
  } else if (label === '서버에서 불러오기') {
    loadFromServer()
  } else if (label == '초기화') {
    resetEditor()
  }
}

const resetEditor = () => {
  // 쿠키 삭제 (만료 날짜를 과거로 설정)
  document.cookie = 'textContent=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'

  // textarea 내용 초기화
  textContent.value = ''
}

// 쿠키에서 저장된 문자열 읽기
const loadFromCookies = () => {
  const match = document.cookie.match(/(?:^|; )textContent=([^;]*)/)
  if (match) {
    textContent.value = decodeURIComponent(match[1])
  }
}

onMounted(() => {
  loadFromCookies()
})
</script>

<style scoped>
.full-textarea {
  flex: 1;
  resize: none;
  width: 100%;
  min-height: 300px;
  padding: 1rem;
  font-size: 1rem;
  box-sizing: border-box;
}
</style>

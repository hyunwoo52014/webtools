<template>
  <CommonLayout direction="row">
    <template #menuBar>
      <div class="timer">
        <div>Timer: {{ formattedTime }}</div>
        <button @click="toggleTimer">
          {{ isRunning ? 'Stop' : 'Start' }}
        </button>
        <button @click="recordLap" :disabled="!isRunning">Record</button>
        <button @click="resetTimer">Reset</button>

        <div class="laps" v-if="laps.length > 0">
          <div v-for="(lap, index) in laps" :key="index">Lap {{ index + 1 }}: {{ lap }}</div>
        </div>
      </div>
    </template>
    <template #mainView>
      <div class="counter">
        <div class="display">Count: {{ count }}</div>

        <div class="grid-buttons">
          <button @click="increment(5)">+5</button>
          <button @click="increment(10)">+10</button>
          <button @click="increment(15)">+15</button>
          <button @click="increment(20)">+20</button>

          <button @click="increment(-5)">-5</button>
          <button @click="increment(-10)">-10</button>
          <button @click="increment(-15)">-15</button>
          <button @click="increment(-20)">-20</button>
        </div>

        <button class="reset-btn" @click="count = 0">Reset</button>
      </div>
    </template>
  </CommonLayout>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import CommonLayout from '@/layout/CommonLayout.vue'

// 타이머
const time = ref(0)
const isRunning = ref(false)
const intervalId = ref(null)
const laps = ref([])

const toggleTimer = () => {
  if (isRunning.value) {
    clearInterval(intervalId.value)
  } else {
    intervalId.value = setInterval(() => {
      time.value++
    }, 1000)
  }
  isRunning.value = !isRunning.value
}

const resetTimer = () => {
  clearInterval(intervalId.value)
  isRunning.value = false
  time.value = 0
  laps.value = []
}

// Lap 기록
const recordLap = () => {
  laps.value.push(formattedTime.value)
}

// 종료 시 타이머 정리
onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value)
})

// 시간 포맷 (초 → mm:ss)
const formattedTime = computed(() => {
  const minutes = Math.floor(time.value / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (time.value % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
})

// 카운터
const count = ref(0)

const increment = (value) => {
  count.value += value
}
</script>
<style scoped>
.timer {
  font-weight: bold;
  font-size: 1.2rem;
  padding: 1rem;
  background: #f0f0f0;
  border-radius: 6px;
}

.counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.display {
  font-size: 1.5rem;
  font-weight: bold;
}

.grid-buttons {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 0.5rem;
}

.grid-buttons button,
.reset-btn {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.grid-buttons button:hover,
.reset-btn:hover {
  background-color: #ccc;
}
</style>

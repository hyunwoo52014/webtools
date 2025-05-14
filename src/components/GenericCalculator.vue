<template>
  <CommonLayout direction="row" :menuBarOrder="2" :mainViewOrder="1">
    <template #menuBar></template>
    <template #mainView>
      <div class="calculator">
        <div class="display">{{ display }}</div>
        <div class="buttons">
          <button v-for="btn in buttons" :key="btn" @click="onClick(btn)">{{ btn }}</button>
        </div>
      </div>
    </template>
  </CommonLayout>
</template>

<script setup>
import CommonLayout from '@/layout/CommonLayout.vue'
import { ref } from 'vue'
import { evaluate } from 'mathjs'

const buttons = ['7', '8', '9', '+', '4', '5', '6', '÷', '1', '2', '3', 'x', '0', '-', '=', 'AC']

const display = ref('0')

function onClick(btn) {
  if (btn === 'AC') {
    display.value = '0'
  } else if (btn === '=') {
    try {
      display.value = evaluate(display.value).toString()
    } catch (e) {
      display.value = 'Error'
    }
  } else {
    display.value += btn
  }
}
</script>

<style scoped>
.calculator {
  width: 260px;
  margin: 0px 0px;
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 12px;
  background: #f9f9f9;
}

.display {
  height: 40px;
  margin-bottom: 12px;
  padding: 8px;
  font-size: 24px;
  text-align: right;
  border: 1px solid #aaa;
  border-radius: 6px;
  background: #fff;
  overflow: hidden;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

button {
  padding: 16px;
  font-size: 18px;
  border: none;
  border-radius: 6px;
  background: #eee;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #ddd;
}

button:active {
  transform: scale(0.7);
}
</style>

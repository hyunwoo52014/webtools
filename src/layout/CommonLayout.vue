<template>
  <div :class="['slot-wrapper', directionClass]">
    <article :style="{ order: menuBarOrder }"><slot name="menuBar"></slot></article>
    <article :style="{ order: mainViewOrder }"><slot name="mainView"></slot></article>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  direction: {
    type: String,
    default: 'column',
    validator: (value) => ['column', 'row'].includes(value),
  },
  menuBarOrder: {
    type: Number,
    default: 1,
  },
  mainViewOrder: {
    type: Number,
    default: 2,
  },
})

const directionClass = computed(() => `dir-${props.direction}`) // 'dir-'+ props.direction과 같은 의미
</script>

<style scoped>
.slot-wrapper {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  height: 100vh;
  flex-direction: column;
}

.dir-column {
  flex-direction: column;
}

.dir-row {
  flex-direction: row;
}
</style>

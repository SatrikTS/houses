<template>
  <header class="header">
    header 1
    {{ text }}
  </header>
</template>
<script setup lang="ts">
interface Props {
  text: string
}

const props = defineProps<Props>()
</script>
<style scoped lang="scss">
.header {
  background: #ccc;
}
</style>
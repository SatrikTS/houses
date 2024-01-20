<template>
  <div class="container">
    <div class="content-block">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  text: string;
}

defineProps<Props>();
</script>
<style scoped lang="scss">
.content-block {
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>

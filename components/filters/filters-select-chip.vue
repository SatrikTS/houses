<template>
  <v-chip v-if="index < 2" size="x-small">
    <span>{{ item.title }}</span>
  </v-chip>
  <span v-if="index === 2" class="select-slot">(+{{ value.length - 2 }})</span>
</template>
<script setup lang="ts">
interface Props {
  value: any;
  item: any;
  index: number;
}

defineProps<Props>();
</script>
<style scoped lang="scss">
.select-slot {
  background: $bg-light;
  border-radius: 4px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  font-size: 11px;
}
</style>

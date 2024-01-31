<template>
  <div class="houses-list">
    <div class="container">
      <div class="houses-list__wrap">
        <House v-for="item in projects?.data" :key="item.id" :data="item" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  projects: any;
}

defineProps<Props>();
</script>
<style scoped lang="scss">
.houses-list {
  //background: $bg-base;
  padding: $offset-xlarge 0;
  min-height: 500px;

  @media (max-width: $laptop-h) {
    padding: 0 0 $offset-xlarge;
  }

  &__wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
}
</style>

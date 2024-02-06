<template>
  <div class="houses-list">
    <div class="container">
      <div v-if="!loader" class="houses-list__wrap">
        <House
          v-for="item in projects?.data" :key="item.id" :data="item" />
      </div>
      <v-progress-circular
        v-if="loader"
        class="houses-list__loader"
        :size="100"
        :width="8"
        indeterminate
        color="#ee3643"
      />
    </div>
  </div>
</template>
<script setup lang="ts">

interface Props {
  projects: any;
  loader: boolean
}

defineProps<Props>();
</script>
<style scoped lang="scss">
.houses-list {
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

  &__loader {
    position: absolute;
    left: 50%;
    margin-left: -50px;
  }
}
</style>

<template>
  <div class="houses-list">
    <House v-for="item in 4" :key="item"/>
  </div>
</template>
<script
  setup
  lang="ts"
>
</script>
<style
  scoped
  lang="scss"
>
.houses-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
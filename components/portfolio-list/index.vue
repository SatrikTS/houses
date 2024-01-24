<template>
  <div class="portfolio-list">
    <div class="container">
      <div class="portfolio-list__wrap">
        <Portfolio-item
          v-for="item in list.data"
          :key="item.id"
          :data="item"
        />
      </div>
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
interface Props {
  list: any;
}

defineProps<Props>();
</script>
<style
  scoped
  lang="scss"
>
.portfolio-list {
  background: $bg-main;
  padding: $offset-xlarge 0;
  min-height: 500px;

  &__wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 28px;
  }
}
</style>

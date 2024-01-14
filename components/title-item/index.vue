<template>
  <div class="title">
    <div class="container">
      <h2>
        {{ caption }}
      </h2>
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
interface Props {
  /**
   * Заголовок
   */
  caption: string;
}

defineProps<Props>();
</script>
<style
  scoped
  lang="scss"
>
.title {
  background: $bg-base;
  padding: $offset-base 0;

  h2 {
    margin: 0;
  }
}
</style>
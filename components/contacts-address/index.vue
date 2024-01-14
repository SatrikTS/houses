<template>
  <div>
      <h2 class="title">{{ title }}</h2>
      <h3 class="subtitle">{{ address }}</h3>
  </div>
</template>

<script
  setup
  lang="ts"
>
interface Props {
  title: string;
  address: string;
}

defineProps<Props>();
</script>

<style
  scoped
  lang="scss"
>
.title {
  margin-bottom: 20px;
}

.link {
  display: block;

  &:not(:last-child) {
    margin-bottom: 15px;
  }
}
</style>
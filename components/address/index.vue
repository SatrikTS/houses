<template>
  <div class="address">
    <span class="address__label">Наш адрес</span>
    <span class="address__text">{{ address }}</span>
  </div>
</template>
<script
  setup
  lang="ts"
>
interface Props {
  address: string;
}

defineProps<Props>();
</script>
<style
  scoped
  lang="scss"
>
.address {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 200px;

  &__label {
    font-size: 0.9em;
    font-weight: 600;
  }

  &__text {
    font-size: 13px;
    text-align: right;
  }
}
</style>
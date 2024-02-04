<template>
  <div class="address">
    <span class="address__label">Наш адрес</span>
    <span class="address__text">{{ address }}</span>
  </div>
</template>
<script setup lang="ts">
interface Props {
  address: string;
}

defineProps<Props>();
</script>
<style scoped lang="scss">
.address {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 200px;

  @media (max-width: $laptop-w) {
    flex-direction: row;
    max-width: max-content;
  }

  &__label {
    font-size: 0.9em;
    font-weight: 600;
    white-space: nowrap;
  }

  &__text {
    font-size: 13px;
    text-align: right;
  }

  @media (max-width: $laptop-w) {
    flex-direction: row;
    gap: 12px;
    max-width: max-content;
  }

  @media (max-width: $mobile) {
    flex-direction: column;
    gap: 0;

    &__text {
      text-align: left;
    }
  }
}
</style>

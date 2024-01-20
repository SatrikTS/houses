<template>
  <div class="phones">
    <span class="phones__label">Телефоны</span>
    <a v-if="phone1" :href="`tel:${phone1}`" class="phones__text"
      >{{ phone1 }}
    </a>
    <a v-if="phone2" :href="`tel:${phone2}`" class="phones__text"
      >{{ phone2 }}
    </a>
  </div>
</template>
<script setup lang="ts">
interface Props {
  /**
   * Телефон1
   */
  phone1: string;
  /**
   * Телефон2
   */
  phone2: string;
}

defineProps<Props>();
</script>
<style scoped lang="scss">
.phones {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &__label {
    font-size: 0.9em;
    font-weight: 600;
  }

  &__text {
    font-size: 13px;
  }
}
</style>

<template>
  <div class="phones">
    <span class="phones__label">Телефоны</span>
    <a
      v-if="phone_1"
      :href="`tel:${phone_1}`"
      class="phones__text"
    >{{ phone_1 }}
    </a>
    <a
      v-if="phone_2"
      :href="`tel:${phone_2}`"
      class="phones__text"
    >{{ phone_2 }}
    </a>
  </div>
</template>
<script
  setup
  lang="ts"
>
interface Props {
  /**
   * Телефон1
   */
  phone_1: string,
  /**
   * Телефон2
   */
  phone_2: string,
}

defineProps<Props>();
</script>
<style
  scoped
  lang="scss"
>
.phones {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__label {
    font-size: 0.9em;
    font-weight: 600;
  }

  &__text {
    font-size: 13px;
  }
}
</style>
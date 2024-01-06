<template>
  <div class="phones">
    <span class="phones__label">Телефоны</span>
    <a
      href="tel:+7978787878"
      class="phones__text"
    >7978787878
    </a>
    <a
      href="tel:+7978787878"
      class="phones__text"
    >7978787878
    </a>
  </div>
</template>
<script>
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
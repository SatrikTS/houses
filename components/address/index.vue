<template>
  <div class="address">
    <span class="address__label">Наш адрес</span>
    <span class="address__text">Cанкт-Петербург, ул.Достоевского д.138</span>
  </div>
</template>
<script>
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
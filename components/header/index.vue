<template>
  <header class="header">
    <div class="container">
      <div class="header__wrap">
        <div class="header__logo">
          <Logo />
        </div>
        <div class="header__contact-info">
          <span class="header__label">Время работы</span>
          <span class="header__text">пн-сб: 9:00-18:00</span>
          <span class="header__text">вс: выходной</span>
        </div>
        <div class="header__contact-info">
          <Phones />
        </div>
        <div class="header__contact-info header__contact-info--last">
          <Address />
        </div>
      </div>
    </div>
  </header>
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
.header {
  background-color: $bg-light;
  color: $bg-dark;
  padding: 10px;

  &__wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  &__label {
    font-size: 0.9em;
    font-weight: 600;
  }

  &__contact-info {
    display: flex;
    flex-direction: column;

    &--last {
      align-items: flex-end;
    }
  }

  &__slogan {
    font-size: 14px;
  }

  &__text {
    font-size: 14px;
  }

  .address {
    align-items: flex-end;
  }
}
</style>
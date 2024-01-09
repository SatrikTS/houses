<template>
  <div class="logo">
    <div class="logo__icon">
      <LogoIcon/>
    </div>
    <div class="logo__wrap">
      <span class="logo__name">Монолит Строй</span>
      <div class="logo__slogan">
        Проектирование и строительство
        загородных домов
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import LogoIcon from '../../assets/icons/logo-icon.vue'
</script>
<style scoped lang="scss">

.logo {
  display: flex;
  align-items: center;

  &__icon {
    font-size: 1.5em;
    font-weight: bold;
    width: 60px;
    height: 70px;
    display: flex;
  }


  &__wrap {
    display: flex;
    flex-direction: column;
    padding: 0 8px;
  }

  &__name {
    font-size: 32px;
    line-height: 1;
    text-transform: uppercase;
    font-weight: bold;
    color: $danger;
  }

  &__slogan {
    letter-spacing: -0.2px;
    font-size: 11px;
    width: 300px;
    font-weight: bold;
  }
}
</style>
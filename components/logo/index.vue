<template>
  <NuxtLink to="/" class="logo">
    <div class="logo__icon">
      <LogoIcon />
    </div>
    <div class="logo__wrap">
      <span class="logo__name">Монолит Строй</span>
      <div class="logo__slogan">
        Проектирование и строительство загородных домов
      </div>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
import LogoIcon from '../../assets/icons/logo-icon.vue';
</script>
<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;

  svg {
    fill: $primary;

    @media (max-width: $laptop-h) {
      fill: white;
    }
  }

  &__icon {
    font-size: 1.5em;
    font-weight: bold;
    width: 60px;
    height: 70px;
    display: flex;

    @media (max-width: $laptop-h) {
      width: 35px;
      height: 35px;
      flex-shrink: 0;
    }
  }

  &__wrap {
    display: flex;
    flex-direction: column;
    padding: 0 8px;

    @media (max-width: $laptop-w) {
      //text-align: center;
    }

    @media (max-width: $laptop-h) {
      //display: none;
    }
  }

  &__name {
    font-size: 32px;
    line-height: 1;
    text-transform: uppercase;
    font-weight: bold;
    color: $danger;

    @media (max-width: $laptop-w) {
      word-break: break-all;
      font-size: 28px;
    }

    @media (max-width: $laptop-h) {
      color: $bg-base;
    }

    @media (max-width: 380px) {
      font-size: 22px;
      width: fit-content;
      white-space: nowrap;
    }
  }

  &__slogan {
    letter-spacing: -0.2px;
    font-size: 11px;
    width: 300px;
    font-weight: bold;

    @media (max-width: $laptop-w) {
      letter-spacing: -0.3px;
      font-size: 10px;
      word-break: break-all;
    }

    @media (max-width: $laptop-h) {
      color: $bg-base;
    }

    @media (max-width: 380px) {
      font-size: 8px;
      width: fit-content;
      white-space: nowrap;
    }
  }
}
</style>

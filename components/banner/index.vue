<template>
  <div class="banner">
    <div class="banner__wrap">
      <img src="@/assets/images/banner2.jpg" alt="Строительство домов" />
      <div class="container">
        <h1 class="main-title">
          {{ title }}
        </h1>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
</script>
<style scoped lang="scss">
.banner {
  position: relative;

  &__wrap {
    position: relative;
    overflow: hidden;
    height: 530px;

    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.25);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .main-title {
    position: absolute;
    bottom: 32px;
    left: 0;
    color: #fff;
    width: 580px;
    max-width: 100%;
    text-shadow: 1px 1px 1px #000;
  }
}
</style>

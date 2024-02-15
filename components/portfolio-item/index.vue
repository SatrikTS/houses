<template>
  <div class="portfolio-item">
    <div
      class="portfolio-item__link"
      @click="navigateTo({ path: `/portfolio/${data.id}` }, { external: true })"
    >
      <div
        class="portfolio-item__image"
      >
        <img
          :src="MAIN_URL + data.images[0]?.img"
          alt="House Image"
        >
      </div>
      <div class="portfolio-item__title">
        {{ data.title }}
      </div>
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
interface Props {
  data: any;
}

defineProps<Props>();
const MAIN_URL = useRuntimeConfig().public.MAIN_URL;
</script>
<style
  scoped
  lang="scss"
>
.portfolio-item {
  position: relative;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  width: calc(33% - 15px);
  transition: box-shadow .25s ease-in-out;

  &__link {
    cursor: pointer;
  }

  @media (max-width: $desktop) {
    width: calc(33% - 16px);
  }

  @media (max-width: $laptop-w) {
    width: calc(50% - 10px);
  }

  @media (max-width: $laptop-h) {
    width: 100%;
  }

  &:hover {
    box-shadow: 0 0 20px #0003, 0 0 10px #0000001a;
  }

  &__image {
    position: relative;
    overflow: hidden;
    background: linear-gradient(45deg, #ff7e5f, #feb47b);
    transition: all 0.25s ease-in-out;
    height: 300px;

    @media (max-width: $laptop-h) {
      height: 360px;
    }

    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.25);
    }

    img {
      width: 100%;
      height: 100%;
      display: block;
      transition: transform 0.3s ease-in-out;
      object-fit: cover;
    }

    &:hover img {
      transform: scale(1.1);
    }
  }

  &__title {
    font-size: 1.2em;
    font-weight: bold;
    position: absolute;
    bottom: 20px;
    padding: 8px;

    font-size: 16px;
    margin: 10px 0;
    color: #fff;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    z-index: 1;
    width: 90%;
    background: rgba(255, 255, 255, 0.5);
  }
}
</style>
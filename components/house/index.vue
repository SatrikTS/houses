<template>
  <article class="house">
    <div class="house__wrap">
      <NuxtLink :to="{ path: `/projects/${data.id}` }">
        <div class="house__title">
          {{ data.title }}
        </div>
      </NuxtLink>
      <div class="house__img">
        <NuxtLink
          :to="{ path: `/projects/${data.id}` }"
          class="house__img-link"
        >
          <img
            :src="MAIN_URL + data.images[0]?.img"
            alt="house type"
          />
        </NuxtLink>
      </div>
      <div class="house__btn-group">
        <v-btn class="house-btn">
          <IconHeart />
        </v-btn>
      </div>
      <div class="house__char">
        <div class="house__char-item">
          <span class="house__char-key">Площадь: </span>
          <span class="house__char-dots"></span>
          <span
            class="house__char-value"
          >{{ data.total_area }} м<sup>2</sup></span
          >
        </div>
        <div class="house__char-item">
          <span class="house__char-key">Количество комнат: </span>
          <span class="house__char-dots"></span>
          <span class="house__char-value">{{ data.room_count?.title }}</span>
        </div>
        <div class="house__char-item">
          <span class="house__char-key">Этажи: </span>
          <span class="house__char-dots"></span>
          <span class="house__char-value">{{ data.level_type?.title }}</span>
        </div>
      </div>
    </div>
  </article>
</template>
<script
  setup
  lang="ts"
>
import IconHeart from '@/assets/icons/icon-heart.vue';

const MAIN_URL = useRuntimeConfig().public.MAIN_URL;

interface Props {
  data: any;
}

defineProps<Props>();
</script>
<style
  scoped
  lang="scss"
>
.house {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out,
  box-shadow 0.3s ease-in-out;
  width: calc(25% - 15px);

  @media (max-width: $laptop-w) {
    width: calc(50% - 10px);
  }

  @media (max-width: $laptop-h) {
    width: 100%
  }

  &:hover {
    box-shadow: 0 0 20px #0003, 0 0 10px #0000001a;
  }

  &__wrap {
    position: relative;
  }

  &__img {
    position: relative;
    overflow: hidden;
    background: linear-gradient(45deg, #ff7e5f, #feb47b);
    transition: all 0.25s ease-in-out;

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
    font-size: 16px;
    font-weight: bold;
    margin: 10px 0;
    color: #fff;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 1;
    top: 12px;
    width: 90%;
    background: rgba(255, 255, 255, 0.5);
    padding: 8px;
  }

  &__btn-group {
    display: flex;
    bottom: 94px;
    right: 8px;
    position: absolute;
  }

  &__char {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 16px;
    background-color: #fff;

    &__item {
      font-size: 16px;
      color: #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-key {
      font-size: 13px;
    }

    &-value {
      font-size: 14px;
      font-weight: 600;
    }

    &__dots {
      flex: 1;
      margin: 0 8px;
    }
  }

  &__img-link {
    display: block;
    text-decoration: none;
    color: inherit;
    height: 200px;

    @media (max-width: $laptop-w) {
      height: 270px;
    }
  }

  &-btn {
    position: relative;

    svg {
      max-width: 16px;
      height: 16px;
    }

    &:hover {
      svg {
        fill: $danger;
      }
    }
  }
}
</style>

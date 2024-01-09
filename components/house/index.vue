<template>
  <article class="house">
    <div class="house__wrap">
      <NuxtLink
        to="/"
      >
        <div class="house__title">
          Dom
        </div>
      </NuxtLink>
      <div class="house__img">
        <NuxtLink
          to="/"
          class="house__img-link"
        >
          <img
            src="@/assets/images/house.jpeg"
            alt="house type"
          >
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
          <span class="house__char-value">300м</span>
        </div>
        <div class="house__char-item">
          <span class="house__char-key">Комнаты:</span>
          <span class="house__char-dots"></span>
          <span class="house__char-value">5</span>
        </div>
        <div class="house__char-item">
          <span class="house__char-key">Спальни:</span>
          <span class="house__char-dots"></span>
          <span class="house__char-value">5</span>
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
</script>
<style
  scoped
  lang="scss"
>
.house {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  width: calc(25% - 15px);

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }

  &__wrap {
    position: relative;
  }

  &__img {
    position: relative;
    overflow: hidden;
    background: linear-gradient(45deg, #ff7e5f, #feb47b);

    img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.3s ease-in-out;
    }

    &:hover img {
      transform: scale(1.1);
    }
  }

  &__title {
    font-size: 24px;
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
    bottom: 122px;
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

    &__key {
      font-size: 13px;
    }

    &__value {
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
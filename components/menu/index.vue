<template>
  <nav
    class="menu"
    :class="{ active: isActiveMenu }"
  >
    <div class="container">
      <div
        v-if="isMobileSize"
        class="menu__service"
      >
        <Button
          buttonStyle="inverse"
          class="menu__btn"
          @click="isActiveMenu = !isActiveMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </Button>
        <Logo />
      </div>
      <ul class="menu__list">
        <li
          v-for="item in menuList"
          :key="item.text"
          class="menu-item"
        >
          <NuxtLink
            :href="item.link"
          >{{ item.text }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { menuList } from './menuList';

interface Props {
  isMobileSize: boolean;
}

defineProps<Props>();

const isActiveMenu = ref(false);
</script>
<style
  scoped
  lang="scss"
>
.menu {
  @media (max-width: $laptop-h) {
    padding: 8px 0;
  }

  &__list {
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: $offset-base 0;
    transition: all 0.55s ease-in-out;

    @media (max-width: $laptop-h) {
      overflow: hidden;
      max-height: 0;
      flex-direction: column;
      padding: 0;
      opacity: 0;
    }
  }

  &__btn {
    padding: 8px;
    display: flex;
    flex-direction: column;
    min-width: 40px;
    height: 40px;
    position: relative;

    span {
      position: absolute;
      width: 22px;
      height: 2px;
      background: $bg-main;
      margin: 0 0 4px;
      transition: transform 0.25s ease-in-out;

      &:first-child {
        top: 12px;
      }

      &:nth-child(2) {
        top: 18px;
      }

      &:last-child {
        margin: 0;
        top: 24px;
      }
    }
  }

  &__service {
    display: none;

    @media (max-width: $laptop-h) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    @media (max-width: $laptop-h) {
      flex-direction: row-reverse;
    }
  }

  .logo {
    max-width: calc(100% - 40px);
  }

  &__cart {
  }

  &.active {
    .menu__btn {
      span:first-child {
        top: 18px;
        transform: rotate(45deg);
      }

      span:nth-child(2) {
        opacity: 0;
      }

      span:last-child {
        top: 18px;
        transform: rotate(-45deg);
      }
    }

    .menu__list {
      max-height: 1000px;
      opacity: 1;
    }
  }

  .menu-item {
    //margin-right: $offset-small;

    @media (max-width: $laptop-w) {
      display: flex;
    }

    a {
      text-decoration: none;
      font-size: 18px;
      //color: $text;

      @media (max-width: $laptop-w) {
        font-size: 14px;
        line-height: 1.5;
      }

      @media (max-width: $laptop-h) {
        width: 100%;
        padding: 8px 0;
      }

      //@media (max-width: $mobile) {
      //  width: 100%;
      //  padding: 8px 0;
      //}

      &:hover {
        color: $bg-main;
      }
    }

    .router-link-active {
      color: $bg-main;
    }
  }
}
</style>

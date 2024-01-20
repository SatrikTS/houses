<template>
  <div>
    <div class="admin">
      <div class="admin-column">
        <div class="admin-top">
          <div class="admin-logo">
            <Logo />
          </div>
        </div>
        <h4 class="admin-column__caption">Меню админ-панели</h4>
        <div class="admin-menu">
          <NuxtLink class="admin-link" to="/admin">Главная</NuxtLink>
          <NuxtLink class="admin-link" to="/admin/projects">Проекты</NuxtLink>
          <NuxtLink class="admin-link" to="/admin/contacts">Контакты</NuxtLink>
          <div class="admin-service-item">Служебные</div>
          <NuxtLink
            class="admin-link admin-link--small"
            to="/admin/roof-materials"
            >Материал крыши
          </NuxtLink>
          <NuxtLink
            class="admin-link admin-link--small"
            to="/admin/wall-materials"
            >Материал стен
          </NuxtLink>
          <NuxtLink
            class="admin-link admin-link--small"
            to="/admin/heating-type"
            >Тип Отопления
          </NuxtLink>
          <NuxtLink
            class="admin-link admin-link--small"
            to="/admin/foundation-types"
            >Тип фундамента
          </NuxtLink>
          <NuxtLink
            class="admin-link admin-link--small"
            to="/admin/rooms-options"
            >Количество комнат
          </NuxtLink>
          <NuxtLink
            class="admin-link admin-link--small"
            to="/admin/stage-completion"
            >Стадии завершения
          </NuxtLink>
          <NuxtLink
            class="admin-link admin-link--small"
            to="/admin/levels-options"
            >Этажность
          </NuxtLink>
          <NuxtLink class="admin-link admin-link--small" to="/admin/roof-type"
            >Тип крыши
          </NuxtLink>
        </div>
        <div class="admin-service">
          <v-btn @click="logOut">Выход из админ-панели</v-btn>
        </div>
      </div>
      <div class="admin-content">
        <slot />
      </div>
    </div>
    <ErrorAlert />
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/store/auth';

const { logUserOut } = useAuthStore();

const logOut = (): void => {
  logUserOut();
  navigateTo('/');
};
</script>
<style scoped lang="scss">
.admin {
  display: flex;
  height: 100%;
  min-height: 100vh;
}

.admin-logo {
  background: $bg-base;
  border-radius: 3px;
  padding: $offset-small;
}

.admin-menu {
  display: flex;
  flex-direction: column;
}

.admin-service-item {
  background: $danger;
  color: $bg-light;
  padding: $offset-base;
}

.admin-link {
  background: $bg-dark;
  color: $bg-light;
  padding: $offset-base;

  &:hover {
    background: $bg-main;
    color: $bg-dark;
  }

  &.router-link-active {
    background: $bg-main;
    color: $bg-dark;
  }

  &--small {
    font-size: 14px;
    padding: $offset-small $offset-base;
  }
}

.admin-column {
  background: $bg-dark;

  &__caption {
    padding: $offset-large;
    background: #3c4b64;
    color: $bg-light;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 1.3px;
    margin: 0;
  }
}

.admin-top {
  padding: $offset-large;
}

.admin-menu {
}

.admin-content {
  flex: 1;
  padding: $offset-base;
}

.admin-service {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
}
</style>

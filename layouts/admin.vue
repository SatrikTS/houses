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
          <NuxtLink to="/admin">Главная</NuxtLink>
          <NuxtLink to="/admin/projects">Проекты</NuxtLink>
          <NuxtLink to="/admin/contacts">Контакты</NuxtLink>
        </div>
        <div class="admin-service">
          <v-btn @click="logOut">Выход из админ-панели</v-btn>
        </div>
      </div>
      <div class="admin-content">
        <slot />
      </div>
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
const logOut = (): void => {
  navigateTo('/');
};
</script>
<style
  scoped
  lang="scss"
>
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
  a {
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
  }
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
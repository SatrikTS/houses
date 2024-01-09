<template>
  <div>
    <div class="auth">
      <div class="container">
        <div class="auth__wrap">
          <div class="auth__top">
            <div class="auth__logo">
              <Logo />
            </div>
          </div>
          <h3>Авторизация</h3>
          <div class="auth__form">
            <slot />
          </div>
          <div class="auth__service">
            <v-btn
              size="large"
              color="red-darken-2"
              @click="navigateTo({ path: `/` })"
            >Вернуться на главную
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <div v-if="errorText">
      <v-alert
        class="alert"
        color="error"
        icon="$error"
      >{{ errorText }}
      </v-alert>
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { useAuthStore } from '../store/auth';
import { storeToRefs } from 'pinia';

const { errorText } = storeToRefs(useAuthStore());

</script>
<style
  scoped
  lang="scss"
>
.auth {
  display: flex;
  flex-direction: column;

  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__logo {
    margin: 16px 0;
  }

  &__service {
    margin: 16px 0;
  }

  &__form {
    margin: 32px 0;
    width: 376px;
  }
}
</style>
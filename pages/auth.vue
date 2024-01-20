<template>
  <v-form ref="form" @submit.prevent @submit="getAuth">
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Email"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Пароль"
    ></v-text-field>
    <v-btn color="indigo-darken-3" type="submit" block class="mt-2"
      >Войти
    </v-btn>
  </v-form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { emailRules, passwordRules } from '@/utils/validation';
import { useAuthStore } from '../store/auth';

definePageMeta({
  layout: 'auth',
  middleware: 'auth',
});

const { authenticateAdmin } = useAuthStore();
const email = ref();
const password = ref();
const form = ref();

const getAuth = async (): Promise<void> => {
  if (form.value.isValid) {
    const formData = new FormData();
    formData.append('email', email.value);
    formData.append('password', password.value);

    const response = await authenticateAdmin(formData);
    if (response?.token && response?.role === 'admin') {
      navigateTo('/admin');
    }
  }
};
</script>
<style scoped></style>

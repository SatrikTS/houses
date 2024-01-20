<template>
  <div class="form-feedback">
    <h2 class="form-feedback__title">Обратная связь:</h2>
    <v-form ref="form" @submit.prevent @submit="submitMessage">
      <v-text-field
        v-model="name"
        class="form-feedback__input"
        :rules="emptyRules"
        label="Имя"
      />
      <v-text-field
        v-model="email"
        class="form-feedback__input"
        :rules="emailRules"
        label="Email"
      />
      <v-text-field
        v-model="phone"
        class="form-feedback__input"
        :rules="phoneRules"
        label="Номер телефона"
      />
      <v-select
        v-model="preferConnection"
        label="Предпочтительный cпособ связи"
        :items="['Звонок', 'Telegram', 'WatsApp', 'Viber', 'Email']"
        clearable
      />
      <v-textarea
        v-model="message"
        class="form-feedback__input"
        :rules="emptyRules"
        label="Сообщение"
      />
      <v-btn color="#27ae60" class="btn submit-btn" block type="submit">
        ОТПРАВИТЬ
      </v-btn>
    </v-form>
    <v-alert v-if="successMsg" class="alert" type="success"
      >{{ successMsg }}
    </v-alert>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { emailRules, emptyRules } from '@/utils/validation';

const name = ref();
const email = ref();
const phone = ref();
const message = ref();
const form = ref();
const successMsg = ref();
const preferConnection = ref();

const submitMessage = (): void => {
  if (form.value.isValid) {
    const data = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      message: message.value,
    };
    console.log('data', data);
    successMsg.value = 'Cообщение отправлено!';
    setTimeout(() => {
      successMsg.value = null;
    }, 3000);
    message.value = '';
  }
};

interface Props {
  title: string;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.form-feedback {
  &__input {
    margin: 0 0 $offset-small;
  }

  &__title {
    margin-bottom: $offset-base;
  }
}
</style>

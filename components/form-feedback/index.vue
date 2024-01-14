<template>
  <div>
    <h2 class="title">{{ title }}</h2>
    <v-form
      ref="form"
      @submit.prevent
      @submit="submitMessage"
    >
      <v-text-field
        v-model="name"
        class="input"
        :rules="emptyRules"
        label="Имя"
      />
      <v-text-field
        v-model="email"
        class="input"
        :rules="emailRules"
        label="Email"
      />
      <v-text-field
        v-model="topic"
        class="input"
        :rules="emptyRules"
        label="Тема"
      />
      <v-textarea 
        v-model="message"
        class="input"
        :rules="emptyRules"
        label="Сообщение"
      />
      <v-btn
        class="btn submit-btn"
        type="submit"
      >
        ОТПРАВИТЬ
      </v-btn>
    </v-form>
    <v-alert
      v-if="successMsg"
      class="alert"
      type="success"
    >{{ successMsg }}
    </v-alert>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { emailRules, emptyRules } from '@/utils/validation';

const name = ref();
const email = ref();
const topic = ref();
const message = ref();
const form = ref();
const successMsg = ref();

const submitMessage = async (): Promise<void> => {
  if (form.value.isValid) {
    const data = {
      name: name.value,
      email: email.value,
      topic: topic.value,
      message: message.value,
    };
    console.log('data', data);
    successMsg.value = 'Cообщение отправлено!';
    setTimeout(() => {
      successMsg.value = null;
    }, 3000);
    topic.value = '';
    message.value = '';
  }
};

interface Props {
  title: string;
}

defineProps<Props>();
</script>

<style
  scoped
  lang="scss"
>
.title {
  margin-bottom: 20px;
}

.input {
  margin-bottom: 20px;
}
</style>
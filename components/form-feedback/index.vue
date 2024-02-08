<template>
  <div class="form-feedback">
    <h2 class="form-feedback__title">{{ title }}</h2>
    <v-form
      ref="form"
      @submit.prevent
      @submit="submitMessage"
    >
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
        :rules="emptyRules"
        :items="['Звонок', 'Telegram', 'WatsApp', 'Viber', 'Email']"
        clearable
      />
      <v-textarea
        v-model="message"
        class="form-feedback__input"
        :rules="emptyRules"
        label="Сообщение"
      />
      <v-btn
        color="#27ae60"
        class="btn submit-btn"
        block
        type="submit"
      >
        ОТПРАВИТЬ
      </v-btn>
      <v-checkbox
        label="Согласие на обработку персональных данных"
        :rules="emptyCheckbox "
      >
        <template v-slot:label>
          <div class="form-feedback__checkbox">
            Согласие на обработку
            <v-tooltip location="bottom">
              <template v-slot:activator="{ props }">
                <NuxtLink
                  target="_blank"
                  href="/policy"
                  v-bind="props"
                  @click.stop
                >
                  персональных данных
                </NuxtLink>
              </template>
              Открытие в новом окне
            </v-tooltip>
          </div>
        </template>
      </v-checkbox>
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
import { useMessagesStore } from '@/store/user-messages-store';
import { emailRules, emptyRules, emptyCheckbox } from '@/utils/validation';

interface Props {
  title: string;
}

defineProps<Props>();

const { postMessagesItem } = useMessagesStore();
const name = ref();
const email = ref();
const phone = ref();
const message = ref();
const form = ref();
const successMsg = ref();
const preferConnection = ref();

const submitMessage = async (): Promise<void> => {
  if (form.value.isValid) {
    const data = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      message: message.value,
      method_communication: preferConnection.value,
    };

    const response = await postMessagesItem(data);
    successMsg.value = response;

    name.value = null;
    email.value = null;
    phone.value = null;
    message.value = null;
    preferConnection.value = null;
    setTimeout(() => {
      successMsg.value = null;
    }, 3000);
  }
};
</script>
<style
  scoped
  lang="scss"
>
.form-feedback {
  &__input {
    margin: 0 0 $offset-small;
  }

  &__title {
    margin-bottom: $offset-base;
  }

  &__checkbox {
    width: 100%;
    font-size: 12px;

    a {
      color: $active;

      &:hover {
        color: $danger;
      }
    }
  }
}
</style>

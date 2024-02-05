<template>
  <div>
    <h2>Контакты бизнеса</h2>
    <h4>
      Сохраните контактные данные которые будут отображаться на старнице
      "контакты", в шапке сайта и футере
    </h4>
    <v-form class="form" @submit.prevent @submit="submitContacts">
      <v-text-field v-model="phone1" class="input" label="Номер телефона 1" />
      <v-text-field v-model="phone2" class="input" label="Номер телефона 2" />
      <v-text-field
        v-model="email1"
        class="input"
        :rules="emailRules"
        label="Электронная почта 1"
      />
      <v-text-field
        v-model="email2"
        class="input"
        :rules="emailRules"
        label="Электронная почта 2"
      />
      <v-text-field v-model="address" label="Адрес" />
      <v-text-field v-model="schedule" label="Время работы" />
      <v-text-field v-model="whereabouts" label="Cсылка на карту" />
      <v-btn class="btn submit-btn" type="submit"> ОТПРАВИТЬ </v-btn>
    </v-form>
    <v-alert v-if="successMsg" class="alert" type="success"
      >{{ successMsg }}
    </v-alert>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { emailRules } from '@/utils/validation';
import { useContactsStore } from '@/store/contacts-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { getContacts, putContacts } = useContactsStore();
const { contacts, successMsg } = storeToRefs(useContactsStore());

await getContacts();

const phone1 = ref(contacts.value.phone_1);
const phone2 = ref(contacts.value.phone_2);
const email1 = ref(contacts.value.email_1);
const email2 = ref(contacts.value.email_2);
const address = ref(contacts.value.address);
const schedule = ref(contacts.value.schedule);
const whereabouts = ref(contacts.value.whereabouts);


const submitContacts = async (): Promise<void> => {
  const params = {
    phone_1: phone1.value,
    phone_2: phone2.value,
    email_1: email1.value,
    email_2: email2.value,
    address: address.value,
    schedule: schedule.value,
    whereabouts: whereabouts.value,
  };
  await putContacts(params);
};
</script>
<style scoped lang="scss">
h2 {
  margin-bottom: 30px;
}

h4 {
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.form {
  padding-top: 30px;
  width: 100%;
  max-width: 600px;
}

.input {
  margin-bottom: 20px;
}

.btn {
  margin-bottom: 20px;
}

.submit-btn {
  margin: 0 20px 24px 0;
}
</style>
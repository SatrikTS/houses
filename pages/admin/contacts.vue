<template>
    <h2>Контакты бизнеса</h2>
    <h4>Сохраните контактные данные которые будут отображаться на старнице "контакты", в шапке сайта и футере</h4>
    <v-form 
        @submit.prevent
        class="form"
        ref="form"
        @submit="submitContacts"
    >
        <v-text-field
            class="input"
            v-model="phone_1"
            label="Номер телефона 1"
        />

        <v-text-field
            class="input"
            v-model="phone_2"
            label="Номер телефона 2"
        />

        <v-text-field
            class="input"
            v-model="email_1"
            :rules="emailRules"
            label="Электронная почта 1"
        />
        
        <v-text-field
            class="input"
            v-model="email_2"
            :rules="emailRules"
            label="Электронная почта 2"
        />

        <v-text-field
            v-model="address"
            label="Адрес"
        />

        <v-text-field
            v-model="schedule"
            label="Время работы"
        />

        <v-text-field
            v-model="whereabouts"
            label="Cсылка на карту"
        />

        <v-btn
            class="btn submit-btn"
            type="submit"
        >
            ОТПРАВИТЬ
        </v-btn>

    </v-form>
</template>

<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { emailRules } from '@/utils/validation';
import { useContactsStore } from '@/store/contacts-store';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const { getContacts, putContacts } = useContactsStore();
const { contacts } = storeToRefs(useContactsStore());
const form = ref();

await getContacts();

const phone_1 = ref(contacts.value.phone_1);
const phone_2 = ref(contacts.value.phone_2);
const email_1 = ref(contacts.value.email_1);
const email_2 = ref(contacts.value.email_2);
const address = ref(contacts.value.address);
const schedule = ref(contacts.value.schedule);
const whereabouts = ref(contacts.value.whereabouts);

const submitContacts = () => {
    const param = {
        phone_1: phone_1.value,
        phone_2: phone_2.value,
        email_1: email_1.value,
        email_2: email_2.value,
        address: address.value,
        schedule: schedule.value,
        whereabouts: whereabouts.value,
    }
    putContacts(param);
}
</script>

<style 
    scoped
    lang="scss"
>
    .form {
        padding-top: 30px;
        width: 100%;
        max-width: 540px;
    }
    .input {
        margin-bottom: 20px;
    }

    .btn {
        margin-bottom: 20px;
    }

    .submit-btn {
        margin-right: 20px;
    }
</style>
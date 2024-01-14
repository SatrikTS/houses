<template>
  <div class="contacts">
    <h1>Контакты</h1>
    <div class="contacts__wrap">
      <div class="contacts__info">
        <div class="contacts__row">
          <ContactsItem
            class="contacts__item" 
            :title="contact_1.title"
            :phone="contact_1.phone"
            :email="contact_1.email"
          /> 
          <ContactsItem 
            class="contacts__item" 
            :title="contact_2.title"
            :phone="contact_2.phone"
            :email="contact_2.email"
          /> 
        </div>
        <ContactsAddress 
          class="contacts__address"
          :title="address.title"
          :address="address.address"
        />
        <div style="position:relative;overflow:hidden;">
          <iframe 
            :src="mapLink" 
            width="100%" 
            height="400" 
            frameborder="1" 
            allowfullscreen="true" 
            style="position:relative;">
          </iframe>
        </div>
      </div>
      <div class="contacts__form">
        <form-feedback 
          class="contacts__feedback"
          :title="feedback.title"
        />
      </div>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { useContactsStore } from '@/store/contacts-store';

const { getContacts } = useContactsStore();
const { contacts } = storeToRefs(useContactsStore());

await getContacts();

const mapLink = ref(contacts.value.whereabouts);
const contact_1 = ref({
  title: 'Отдел продаж:',
  phone: contacts.value.phone_1,
  email: contacts.value.email_1,
});
const contact_2 = ref({
  title: 'Технический отдел:',
  phone: contacts.value.phone_2,
  email: contacts.value.email_2,
});
const address = ref({
  title: 'Наш адрес:',
  address: contacts.value.address,
});
const feedback = ref({
  title: 'Обратная связь:',
});

</script>

<style
  scoped
  lang="scss"
>
.contacts {
  margin: 30px 0 100px;
  padding: 0 40px;
}
.contacts__wrap {
  display: flex;
  justify-content: space-between;
}

h1 {
  margin-bottom: 50px;
}

.contacts__info {
  width: 55%;
}

.contacts__row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 70px;
}

.contacts__item {
  &:not(:last-child) {
    margin-right: 90px;
  }
}

.contacts__address {
  margin-bottom: 30px;
}
.contacts__form {
  width: 30%;
}
</style>
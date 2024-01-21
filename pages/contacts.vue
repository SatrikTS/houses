<template>
    <div class="contacts">
      <TitleItem class="contacts__caption" caption="Контакты"/>
      <div class="container">
      <div class="contacts__wrap">
        <div class="contacts__info">
          <div class="contacts__row">
            <ContactsItem
              class="contacts__item"
              :title="contact1.title"
              :phone="contact1.phone"
              :email="contact1.email"
            />
            <ContactsItem
              class="contacts__item"
              :title="contact2.title"
              :phone="contact2.phone"
              :email="contact2.email"
            />
          </div>
          <div class="contacts__address">
            <h2 class="contacts__title">Наш адрес:</h2>
            <h3 class="subtitle">{{contacts.address}}</h3>
          </div>
          <iframe
            :src="mapLink"
            width="100%"
            height="400"
            frameborder="1"
            allowfullscreen="true"
            style="position:relative;"
          >
            </iframe>
        </div>
        <div class="contacts__form">
          <FormFeedback />
        </div>
      </div>
    </div>
    <div class="slider__wrap" style="width: 70%; height: 700px; padding-left: 20px;">
      <card-slider />
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref, reactive } from 'vue';
import { useContactsStore } from '@/store/contacts-store';

const { getContacts } = useContactsStore();
const { contacts } = storeToRefs(useContactsStore());

await getContacts();

const mapLink = ref(contacts.value.whereabouts);
const contact1 = reactive({
  title: 'Отдел продаж:',
  phone: contacts.value.phone_1,
  email: contacts.value.email_1,
});
const contact2 = reactive({
  title: 'Технический отдел:',
  phone: contacts.value.phone_2,
  email: contacts.value.email_2,
});
</script>
<style
  scoped
  lang="scss"
>
.contacts {
  margin-bottom: $offset-large-2;

  &__caption {
    margin-bottom: $offset-large-2;
  }

  &__title {
    margin-bottom: $offset-base;
  }

  &__wrap {
    display: flex;
    justify-content: space-between;
  }

  &__info {
    width: 55%;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    margin-bottom: $offset-large-2;
  }

  &__item {
    &:not(:last-child) {
      margin-right: 90px;
    }
  }

  &__address {
    margin-bottom: $offset-large-2;
  }

  &__form {
    width: 30%;
  }

}

</style>
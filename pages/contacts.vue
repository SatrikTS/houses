<template>
  <div class="contacts">
    <TitleItem class="contacts__caption" caption="Контакты" />
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
            <h3 class="subtitle">{{ contacts.address }}</h3>
          </div>
          <iframe
            :src="getSrcIframe(mapLink)"
            width="100%"
            height="400"
            frameborder="1"
            allowfullscreen="true"
            style="position: relative"
          >
          </iframe>
        </div>
        <div class="contacts__form">
          <FormFeedback :title="title"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useContactsStore } from '@/store/contacts-store';

const { getContacts } = useContactsStore();
const { contacts } = storeToRefs(useContactsStore());
const title = ref('Обратная связь:');

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

const getSrcIframe = (html: string) => {
  const iframeSrcRegex = /<iframe[^>]+src=["'](.*?)["']/i;
  const match = html.match(iframeSrcRegex);
  return match ? match[1] : "";
};
</script>
<style scoped lang="scss">
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

    @media (max-width: $laptop-h) {
      flex-direction: column;
    }
  }

  &__info {
    width: 55%;

    @media (max-width: $laptop-h) {
      width: 100%;
    }
  }

  &__row {
    display: flex;
    justify-content: space-between;
    margin-bottom: $offset-large-2;

    @media (max-width: $mobile) {
      flex-direction: column;
    }
  }

  &__item {
    &:not(:last-child) {
      margin-right: 90px;
    }

    @media (max-width: $mobile) {
      &:not(:last-child) {
        margin-bottom: $offset-large-2;
      }
    }
  }

  &__address {
    margin-bottom: $offset-large-2;
  }

  &__form {
    width: 30%;

    @media (max-width: $laptop-h) {
      width: 100%;
    }
  }
}
</style>

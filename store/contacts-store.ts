import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useContactsStore = defineStore('contactsStore', () => {
  const serverUrl = `${useRuntimeConfig().public.SERVER_URL}`;
  const contacts = ref();
  const isLoading = ref(false);

  /**
   * получение контактов для отображения сайте
   */
  const getContacts = async () => {
    isLoading.value = true;
    return fetch(`${serverUrl}/contacts`)
    .then(response => response.json())
    .then((response) => {
      contacts.value = response;
    })
    .finally(() => isLoading.value = false);
  };

  return {
    getContacts,
    contacts,
    isLoading,
  };
});


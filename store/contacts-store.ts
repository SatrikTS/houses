import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useContactsStore = defineStore('contactsStore', () => {
  const contacts = ref();
  const successMsg = ref();
  const isLoading = ref(false);
  const { $api } = useNuxtApp();

  /**
   * получение контактов для отображения сайте
   */
  const getContacts = async (): Promise<void> => {
    const { data } = await $api.get('/contacts');
    contacts.value = data;
  };

  const putContacts = async (params: any): Promise<void> => {
    const { data } = await $api.put('/contacts/1', {
      ...params,
    });
    successMsg.value = data.message;
    setTimeout(() => {
      successMsg.value = null;
    }, 3000);
  };

  return {
    getContacts,
    putContacts,
    contacts,
    successMsg,
    isLoading,
  };
});

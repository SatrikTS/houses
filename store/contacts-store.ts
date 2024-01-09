import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useContactsStore = defineStore('contactsStore', () => {
  const serverUrl = `${useRuntimeConfig().public.SERVER_URL}`;
  const contacts = ref();
  const isLoading = ref(false);
  const token = useCookie('token');
  
  /**
   * получение контактов для отображения сайте
   */
  const getContacts = async (): Promise<void> => {
    
    isLoading.value = true;
    return await fetch(`${serverUrl}/contacts`)
    .then(response => response.json())
    .then((response) => {
      contacts.value = response;
    })
    .finally(() => isLoading.value = false);
  };

  const putContacts = async (param): Promise<void> => {
    
    isLoading.value = true;
    return await fetch(`${serverUrl}/contacts/1`, {
      headers: {
        'Authorization': 'Bearer ' + token.value,
      },
      method: 'PUT',
      body: JSON.stringify(param),
    })
    .then(response => response.json())
    .then((response) => {
      console.log('response', response);
    })
    .finally(() => isLoading.value = false);
  };

  return {
    getContacts,
    putContacts,
    contacts,
    isLoading,
  };
});


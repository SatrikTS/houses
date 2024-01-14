import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useApiErrorsStore } from '@/store/api-errors-store';

export const useAuthStore = defineStore('auth-store', () => {
  const successText = ref();
  const { createErrorMessage } = useApiErrorsStore();
  /**
   * Авторизация админа
   * @param dataForm
   */
  const authenticateAdmin = async (dataForm: any): Promise<any> => {
    try {
      const response = await fetch(`${useRuntimeConfig().public.SERVER_URL}/admin`, {
        method: 'POST',
        body: dataForm,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }

      const responseData = await response.json();
      const userToken = useCookie('token', {
        maxAge: 10000,
      });
      userToken.value = responseData.token;
      successText.value = responseData.message;

      return responseData;
    }
    catch (error) {
      createErrorMessage(error);
    }
  };

  /**
   * Разлогинизация
   */
  const logUserOut = (): void => {
    const token = useCookie('token');
    token.value = null;
  };

  return {
    authenticateAdmin,
    logUserOut,
    successText,
  };
});
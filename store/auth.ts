import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth-store', () => {
  const errorText = ref();
  const successText = ref();

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
    } catch (error) {
      errorText.value = error;
      setTimeout(() => {
        errorText.value = null
      }, 3000)
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
    errorText,
    successText,
  };
});
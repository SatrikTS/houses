import { ref } from "vue";

export const emailRules = ref([
  // (value) => !!value || "Заполните поле.",
  (value) => {
    if (!value) return true; // Если поле пустое, правило проходит
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Невалидный e-mail.";
  },
]);

export const passwordRules = ref([
  (value) => !!value || "Заполните поле.",
  (value) => (value || "").length > 7 || "Минимум 7 символов",
]);

export const phoneRules = ref([
    (v) => !!v || 'Поле обязательно',
    value => {
      const valid = /^((\+7|7|8)+([0-9]){10})$/.test(value);
      return valid || 'Введите правильный формат телефона 7(***)******* (11 цифр)';
    },
  ],
);

export const numbersRules = ref([
  (value) => {
    const pattern = /^\d+$/;
    return pattern.test(value) || "Введите только цифры";
  },
]);

export const requiredRules = ref([(value) => !!value || "Поле обязательно"]);

export const emptyRules = ref([(value) => !!value || "Заполните поле."]);
export const emptyCheckbox = ref([(value) => !!value || "Для отправки необходимо дать согласие."]);

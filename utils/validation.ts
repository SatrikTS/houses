import { ref } from "vue";

export const emailRules = ref([
  (value) => !!value || "Заполните поле.",
  (value) => {
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
  (value) => !!value || "Заполните поле.",
  (value) => {
    const pattern =
      /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return pattern.test(value) || "Невалидный телефон";
  },
]);

export const requiredRules = ref([(value) => !!value || "Поле обязательно"]);

// export const requiredRules = ref([
//   value => !!value || 'Заполните поле.',
//   value => (value || '').length > 2 || 'Минимум 2 символа',
// ])

export const emptyRules = ref([(value) => !!value || "Заполните поле."]);

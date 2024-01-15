<template>
  <div class="contacts-item">
      <h2 class="contacts-item__title">{{ title }}</h2>
      <div class="contacts-item__subtitle">Телефон: </div>
      <a
          class="link"
          href="tel:{{ phone }}">
          {{ phone }}
      </a>
      <div class="contacts-item__subtitle">Электронная почта: </div>
      <a
          class="link"
          href="mailto:{{ email }}">
          {{ email }}
      </a>
  </div>
</template>

<script
  setup
  lang="ts"
>
interface Props {
  title: string;
  phone: string;
  email: string;
}

defineProps<Props>();
</script>

<style
  scoped
  lang="scss"
>
.contacts-item {
  display: flex;
  flex-direction: column;

  &__title {
    margin-bottom: $offset-base;
  }

  &__subtitle {
    font-size: 16px;
    font-weight: 700;
  }
}

.link {

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
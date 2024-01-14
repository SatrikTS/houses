<template>
  <div class="contacts__item">
      <h2 class="title">{{ title }}</h2>
      <h3 class="subtitle">Телефон: </h3>
      <a 
          class="link" 
          href="tel:{{ phone }}">
          {{ phone }}
      </a>
      <h3 class="subtitle">Электронная почта: </h3>
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
.contacts__item {
  display: flex;
  flex-direction: column;
}
.title {
  margin-bottom: 20px;
}

.link {
  display: block;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
<template>
  <div>
    admin main page
    <b>редактор текста для примера:</b>
    <ClientOnly>
      <Editor v-model="content" />
    </ClientOnly>
    <div>content is:{{ content }}</div>
  </div>
</template>
<script
  setup
  lang="ts"
>
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const content = ref('asd');
</script>
<style scoped>
</style>
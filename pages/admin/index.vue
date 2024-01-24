<template>
  <div>
    Админ панель компании Монолитстрой
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});
</script>
<style scoped></style>

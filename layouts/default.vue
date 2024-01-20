<template>
  <div>
    <Header :isLoading="isLoading" :contacts="contacts" />
    <Menu class="menu" />
    <main class="main">
      <slot />
    </main>
    <Footer :isLoading="isLoading" :contacts="contacts" />
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useContactsStore } from '../store/contacts-store';

const { isLoading, contacts } = storeToRefs(useContactsStore());
useContactsStore().getContacts();
</script>
<style scoped lang="scss">
.main {
}

.menu {
  background: $danger;
}
</style>

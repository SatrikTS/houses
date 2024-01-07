<template>
  <div>
    <Header
      :isLoading="isLoading"
      :contacts="contacts"
    />
    <Menu class="menu"/>
    <main>
      <div class="container">
        main
        <slot />
      </div>
    </main>
    <Footer
      :isLoading="isLoading"
      :contacts="contacts"/>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useContactsStore } from '../store/contacts-store';

const {isLoading, contacts} = storeToRefs(useContactsStore())
useContactsStore().getContacts()
</script>
<style scoped lang="scss">
.menu {
  background: $danger;
}
</style>
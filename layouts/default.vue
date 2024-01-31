<template>
  <div>
    <Header
      :isLoading="isLoading"
      :contacts="contacts"
      :isMobileSize="isMobileSize"
    />
    <Menu
      :isMobileSize="isMobileSize"
      class="menu"
    />
    <main class="main">
      <slot />
    </main>
    <Footer
      :isLoading="isLoading"
      :contacts="contacts"
    />
  </div>
</template>
<script
  setup
  lang="ts"
>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useContactsStore } from '../store/contacts-store';
import { updateScreenSize } from '~/utils/updateResize';

const isMobileSize = ref(false);
const { isLoading, contacts } = storeToRefs(useContactsStore());
useContactsStore().getContacts();

onMounted(() => {
  isMobileSize.value = updateScreenSize();

  window.addEventListener('resize', () => {
    isMobileSize.value = updateScreenSize();
  });
});
</script>
<style
  scoped
  lang="scss"
>
.main {
}

.menu {
  background: $danger;
}
</style>

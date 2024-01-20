<template>
  <div class="container">
    <div v-html="aboutPost.data.html_content"></div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useAboutStore } from '@/store/about-store';

const { aboutPost } = storeToRefs(useAboutStore());
const { getAboutData } = useAboutStore();

await getAboutData();
</script>
<style scoped></style>

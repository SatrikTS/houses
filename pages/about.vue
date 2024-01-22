<template>
  <div class="about">
    <TitleItem
      :caption="aboutPost.data.title"
    />
    <div class="container">
      <img
        v-if="images"
        :src="MAIN_URL +'/'+ images[0]?.img"
        class="about__img"
        alt="Монолит строй СПб"
      >
      <div
        class="content"
        v-html="aboutPost.data.html_content"
      ></div>
      <div class="clear">
      </div>
      <div class="about__images">
        <ImagesList
          :images="images.slice(1)"
        />
      </div>
      <div v-if="aboutPost.data.company_video " class="about__video">
        <h2>Видео</h2>
        <div v-html="aboutPost.data.company_video"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAboutStore } from '@/store/about-store'

const { aboutPost } = storeToRefs(useAboutStore())
const { getAboutData } = useAboutStore()
const MAIN_URL = useRuntimeConfig().public.MAIN_URL
await getAboutData()
const images = ref(aboutPost.value.data.images)
</script>
<style
  scoped
  lang="scss"
>
.about {
  position: relative;

  &__img {
    width: 450px;
    max-width: 100%;
    padding: $offset-large-2 $offset-base $offset-small 0;
    float: left;
  }

  &__images {
    margin: 0 0 $offset-xlarge;
  }

  &__video {
    max-width: 100%;
    margin: 0 0 $offset-xlarge;
  }
}
</style>

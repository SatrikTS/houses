<template>
  <div class="about">
    <TitleItem
      caption="О компании"
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
      <div
        v-if="aboutPost.data.company_video "
        class="about__video"
      >
        <h2>Видео</h2>
        <div
          v-if="aboutPost.data.company_video"
          style="height: 500px"
        >
          <iframe
            width="100%"
            height="100%"
            title="RAM Effect Vehicle"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            :src="'https://www.youtube.com/embed/' + getIdVideo(aboutPost.data.company_video)"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAboutStore } from '@/store/about-store';

const { aboutPost } = storeToRefs(useAboutStore());
const { getAboutData } = useAboutStore();
const MAIN_URL = useRuntimeConfig().public.MAIN_URL;
await getAboutData();
const images = ref(aboutPost.value.data.images);

const getIdVideo = (link): string => {
  const idVidoRegex = /(?:\?v=|\/embed\/|\/\d\/|\/v\/|https:\/\/youtu.be\/|\/embed\/|\/\d\/|\/v\/|https:\/\/www.youtube.com\/watch?v=)([a-zA-Z0-9_-]{11})/;
  const match = link.match(idVidoRegex);
  return match ? match[1] : '';
};
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

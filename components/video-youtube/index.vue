<template>
  <div class="video">
    <div class="video__wrap">
      <iframe
        width="100%"
        height="100%"
        title="RAM Effect Vehicle"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        :src="'https://www.youtube.com/embed/' + idVideo"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  linkVideo: string;
}

const props = defineProps<Props>();

const getIdVideo = (link): string => {
  const idVidoRegex = /(?:\?v=|\/embed\/|\/\d\/|\/v\/|https:\/\/youtu.be\/|\/embed\/|\/\d\/|\/v\/|https:\/\/www.youtube.com\/watch?v=)([a-zA-Z0-9_-]{11})/;
  const match = link.match(idVidoRegex);
  return match ? match[1] : '';
};

const idVideo = ref(getIdVideo(props.linkVideo));
</script>

<style scoped lang="scss">
.video {
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 40px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 15px rgba(0, 0, 0, 0.25);

    &__wrap {
      width: 100%;
      padding-bottom: 56.25%;

      iframe {
        position: absolute;
        width: 100%;
        height: 101%;
      }
    }
  }
</style>

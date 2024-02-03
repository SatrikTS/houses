<template>
  <div class="post">
    <Head>
      <Title>Монолитстрой | {{ article?.data.keywords }}</Title>
      <Meta name="description" content="Проектирование и строительство домов, бань, дач в Санкт-Петербурге"/>
    </Head>
    <TitleItem
      :caption="article.data.title"
    />
    <div class="container">
      <img
        v-if="images"
        :src="MAIN_URL +'/'+ images[0]?.img"
        class="post__img"
        alt="Монолит строй СПб"
      >
      <div
        class="content"
        v-html="article.data.html_content"
      ></div>
      <div class="clear">
      </div>
      <div class="post__images">
        <ImagesList
          :images="images.slice(1)"
        />
      </div>
      <div
        v-if="article.data.video "
        class="post__video"
      >
        <h2>Видео</h2>
        <div v-html="article.data.video"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useArticlesStore } from '@/store/articles-store'
import { useRoute } from 'nuxt/app'

const { article } = storeToRefs(useArticlesStore())
const { getPostItem } = useArticlesStore()
const MAIN_URL = useRuntimeConfig().public.MAIN_URL
await getPostItem(useRoute().params.id)
const images = ref(article.value.data.images)
</script>
<style
  scoped
  lang="scss"
>
.post {
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
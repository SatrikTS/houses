<template>
  <div class="article">
    <TitleItem
      caption="Проектирование"
    />
    <div class="container">
      <div class="article__wrap">
        <div
          v-for="post in posts.data"
          :key="post.id"
          class="post"
        >
          <NuxtLink :to="{ path: `/buildings-posts/${post.id}` }">
            <div class="post__image">
              <img
                :src="MAIN_URL +'/'+ post.images[0]?.img"
                :alt="post.title"
              >
            </div>
          </NuxtLink>
          <div class="post__title">
            <NuxtLink :to="{ path: `/buildings-posts/${post.id}` }">
              {{ post.title }}
            </NuxtLink>
          </div>
          <div class="post__keywords">
            <span
              v-for="word in post.keywords.split(',')"
              :key="word"
            >
              {{ word }} /
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { storeToRefs } from 'pinia';
import { useArticlesBuildingsStore } from '@/store/articles-buildings-store';

const { posts } = storeToRefs(useArticlesBuildingsStore());
const { getPosts } = useArticlesBuildingsStore();
const MAIN_URL = useRuntimeConfig().public.MAIN_URL;
await getPosts();
</script>
<style
  scoped
  lang="scss"
>
.article {
  position: relative;

  &__wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; /* Два столбца с равными долями ширины */
    gap: 40px; /* Расстояние между элементами */
    padding: 40px 0;
  }

  .post {
    text-align: left;

    &__title {
      font-size: 18px;
      font-weight: bold;
      line-height: 1.5;
      padding: $offset-small 0;
    }

    &__keywords {
      font-size: 13px;
      line-height: 1.4;
    }

    &__image {
      width: 100%;
      height: 250px;
      position: relative;
      overflow: hidden;

      &::before {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.25);
      }

      &:hover {
        img {
          transform: scale(1.1);
        }
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease-in-out;
      }
    }
  }
}
</style>
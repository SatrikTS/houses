<template>
  <ArticleList
    title="Услуги"
    :list="posts.data"
    path="services"
  />
</template>
<script
  setup
  lang="ts"
>
import { storeToRefs } from 'pinia';
import { useArticlesStore } from '@/store/articles-store';
import ArticleList from '/components/articles-list';

const { posts } = storeToRefs(useArticlesStore());
const { getPosts } = useArticlesStore();
await getPosts('Услуги');
</script>
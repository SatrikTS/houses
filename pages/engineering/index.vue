<template>
  <ArticleList
    v-if="posts"
    title="Инженерные системы"
    :list="posts.data"
    path="engineering"
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
getPosts('Инженерные системы');
</script>
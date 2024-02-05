<template>
  <ArticleList
    v-if="posts"
    title="Статьи о строительстве"
    :list="posts.data"
    path="buildings"
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
getPosts('Строительство');
</script>
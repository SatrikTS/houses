<template>
  <div class="portfolio">
    <TitleItem
      class="contacts__caption"
      caption="Наши работы"
    />
    <PortfolioList :list="portfolioList" />
  </div>
</template>
<script
  setup
  lang="ts"
>
import { usePortfolioStore } from '@/store/portfolio-store';
import { storeToRefs } from 'pinia';

const { getPortfolioList } = usePortfolioStore();
const { portfolioList } = storeToRefs(usePortfolioStore());

await getPortfolioList();
</script>
<style scoped>
</style>
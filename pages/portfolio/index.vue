<template>
  <div v-if="portfolioList" class="portfolio">
    <Head>
      <Title>Монолитстрой | Выполненные работы</Title>
      <Meta name="description" content="Строительство загородных домов в Санкт-Петербурге. Примеры работ"/>
    </Head>
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

getPortfolioList();
</script>
<style scoped>
</style>
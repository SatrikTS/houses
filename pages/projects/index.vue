<template>
  <div
    v-if="projectsList"
    class="projects"
  >
    <Head>
      <Title>Монолитстрой | Проекты домов</Title>
      <Meta
        name="description"
        content="Проектирование и строительство домов, бань, дач в Санкт-Петербурге"
      />
    </Head>
    <TitleItem
      class="contacts__caption"
      caption="Проекты домов"
    />
    <div class="container">
      <Filters
        class="projects__filters"
        :wallsOptions="wallMaterials.data"
        :roofsOptions="roofMaterials.data"
        :foundationsOptions="foundationsTypes.data"
        :heatingOptions="heatingList.data"
        :roomsOptions="roomList.data"
        :levelsOptions="levelsList.data"
        :roofsTypeOptions="roofTypesList.data"
        :count="projectsList?.total"
        @filters="filtersProjects"
      />
    </div>
    <HousesList
      class="projects__list"
      :projects="projectsList"
    />
  </div>
</template>
<script
  setup
  lang="ts"
>
import type { FiltersList } from '@/utils/types';
import { storeToRefs } from 'pinia';
import {onMounted} from 'vue'
import { useWallsStore } from '@/store/wall-store';
import { useRoofsStore } from '@/store/roofs-store';
import { useFoundationsStore } from '@/store/foundation-store';
import { useHeatingStore } from '@/store/heating-store';
import { useRoomsStore } from '@/store/rooms-store';
import { useLevelsStore } from '@/store/levels-store';
import { useRoofsTypeStore } from '@/store/roofs-type-store';
import { useProjectsStore } from '@/store/projects-store';

const { getWallsMaterials } = useWallsStore();
const { getRoofMaterials } = useRoofsStore();
const { getFoundationsTypes } = useFoundationsStore();
const { getHeatingList } = useHeatingStore();
const { getRoomsList } = useRoomsStore();
const { getLevelsList } = useLevelsStore();
const { getRoofsTypeList } = useRoofsTypeStore();
const { getProjectsList } = useProjectsStore();

const { wallMaterials } = storeToRefs(useWallsStore());
const { roofMaterials } = storeToRefs(useRoofsStore());
const { foundationsTypes } = storeToRefs(useFoundationsStore());
const { heatingList } = storeToRefs(useHeatingStore());
const { roomList } = storeToRefs(useRoomsStore());
const { levelsList } = storeToRefs(useLevelsStore());
const { roofTypesList } = storeToRefs(useRoofsTypeStore());
const { projectsList } = storeToRefs(useProjectsStore());

getWallsMaterials();
getRoofMaterials();
getFoundationsTypes();
getHeatingList();
getRoomsList();
getLevelsList();
getRoofsTypeList();

onMounted(() => {
  getProjectsList();
})

const filtersProjects = (params: FiltersList): void => {
  getProjectsList(params);
};
</script>
<style
  scoped
  lang="scss"
>
.projects {
  &__filters {
    margin: $offset-large-2 0 0;
  }
}
</style>

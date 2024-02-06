<template>
  <div class="filters">
    <div class="filters__group filters__group--triple">
      <div class="filters__caption">Фильтр по проектам</div>
      <v-select
        v-model="filtersList.roof_types"
        label="Тип крыши"
        :items="roofsTypeOptions"
        clearable
        multiple
        density="compact"
        variant="outlined"
        class="filters__item-single"
      >
        <template #selection="{ item, index }">
          <FiltersSelectChip
            :value="filtersList.roof_types"
            :item="item"
            :index="index"
          />
        </template>
      </v-select>
      <div class="filters__slider">
        <label
          for=""
          class="filters-label"
        >Площадь
        </label>
        <v-range-slider
          v-model="totalArea"
          :max="1000"
          :min="0"
          :step="1"
          hide-details
          density="compact"
        >
          <template #prepend>
            <v-text-field
              v-model="totalArea[0]"
              hide-details
              single-line
              disabled
              type="number"
              variant="outlined"
              density="compact"
              min="0"
              max="1000"
              style="width: 80px"
            ></v-text-field>
          </template>
          <template #append>
            <v-text-field
              v-model="totalArea[1]"
              hide-details
              single-line
              disabled
              type="number"
              min="0"
              max="1000"
              variant="outlined"
              style="width: 80px"
              density="compact"
            ></v-text-field>
          </template>
        </v-range-slider>
      </div>
    </div>
    <div class="filters__group">
      <v-select
        v-model="filtersList.wall_materials"
        label="Материалы стен"
        :items="wallsOptions"
        density="compact"
        clearable
        multiple
        variant="outlined"
      >
        <template #selection="{ item, index }">
          <FiltersSelectChip
            :value="filtersList.wall_materials"
            :item="item"
            :index="index"
          />
        </template>
      </v-select>
      <v-select
        v-model="filtersList.roof_materials"
        label="Материалы крыши"
        :items="roofsOptions"
        clearable
        multiple
        density="compact"
        variant="outlined"
      >
        <template #selection="{ item, index }">
          <FiltersSelectChip
            :value="filtersList.roof_materials"
            :item="item"
            :index="index"
          />
        </template>
      </v-select>
      <v-select
        v-model="filtersList.foundation_types"
        label="Тип фундамента"
        :items="foundationsOptions"
        clearable
        multiple
        density="compact"
        variant="outlined"
      >
        <template #selection="{ item, index }">
          <FiltersSelectChip
            :value="filtersList.foundation_types"
            :item="item"
            :index="index"
          />
        </template>
      </v-select>
      <v-select
        v-model="filtersList.room_counts"
        label="Количество комнат"
        :items="roomsOptions"
        clearable
        multiple
        density="compact"
        variant="outlined"
      >
        <template #selection="{ item, index }">
          <FiltersSelectChip
            :value="filtersList.room_counts"
            :item="item"
            :index="index"
          />
        </template>
      </v-select>
    </div>
    <div class="filters__group filters__group--wide">
      <v-select
        v-model="filtersList.heating_types"
        label="Тип отопления"
        :items="heatingOptions"
        clearable
        multiple
        density="compact"
        variant="outlined"
      >
        <template #selection="{ item, index }">
          <FiltersSelectChip
            :value="filtersList.heating_types"
            :item="item"
            :index="index"
          />
        </template>
      </v-select>
      <v-select
        v-model="filtersList.level_types"
        label="Кол-во этажей"
        :items="levelsOptions"
        clearable
        multiple
        density="compact"
        variant="outlined"
      >
        <template #selection="{ item, index }">
          <FiltersSelectChip
            :value="filtersList.level_types"
            :item="item"
            :index="index"
          />
        </template>
      </v-select>
    </div>
    <b>
      Всего найдено проектов: {{ count }} шт.
    </b>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref, watch, reactive } from 'vue';
import type { OptionsListItem, FiltersList } from '@/utils/types';
import FiltersSelectChip from './filters-select-chip.vue';
import debounce from '~/utils/debounce';

interface Props {
  wallsOptions: OptionsListItem[];
  roofsOptions: OptionsListItem[];
  foundationsOptions: OptionsListItem[];
  heatingOptions: OptionsListItem[];
  roomsOptions: OptionsListItem[];
  levelsOptions: OptionsListItem[];
  roofsTypeOptions: OptionsListItem[];
  count: number;
}

interface IEmits {
  /**
   * Фильтруем проекты
   * @param e
   * @param value
   */
  (e: 'filters', value: FiltersList): void;
}

defineProps<Props>();
const emit = defineEmits<IEmits>();

const totalArea = ref([0, 1000]);
const filtersList = reactive<FiltersList>({
  roof_materials: [],
  wall_materials: [],
  foundation_types: [],
  roof_types: [],
  heating_types: [],
  level_types: [],
  room_counts: [],
});

watch(filtersList, () => {
  emit('filters', {
    ...filtersList,
    min_area: totalArea.value[0],
    max_area: totalArea.value[1],
  });
});

watch(totalArea, () => {
  debounce(() => {
    emit('filters', {
      ...filtersList,
      min_area: totalArea.value[0],
      max_area: totalArea.value[1],
    });
  }, 1000);
});
</script>
<style
  scoped
  lang="scss"
>
.filters {
  display: flex;
  flex-direction: column;

  &__group {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* Создает 4 равных столбца */
    grid-gap: $offset-base; /* Отступ между блоками */

    @media (max-width: $laptop-h) {
      grid-template-columns: repeat(1, 1fr);
    }

    &--wide {
      grid-template-columns: repeat(2, 1fr);
    }

    &--triple {
      display: grid;
      align-items: flex-end;
      gap: 16px;
      margin: 0 0 22px;

      @media (max-width: $laptop-h) {
        gap: 16px 0;
      }
    }
  }

  &__slider {
    grid-column: span 2;

    & > div {
      margin: 0 !important;
    }
  }

  &__item-single {
    grid-column: span 1;
    position: relative;
    top: 23px;

    @media (max-width: $laptop-h) {
      grid-column: 1;
    }
  }

  &__item {
    padding: $offset-base 0 0;
  }

  &__caption {
    display: flex;
    align-items: center;
    font-size: 22px;
    font-weight: bold;
    display: flex;
    align-items: center;
    grid-column: span 1;
  }
}
</style>

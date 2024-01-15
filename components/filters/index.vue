<template>
  <div class="filters">
    <div class="filters-item">
      <label
        for=""
        class="filters-label"
      >Площадь
      </label>
      <div class="filters__group filters__group--wide">
        <v-range-slider
          v-model="rangeSquare"
          :max="1000"
          :min="0"
          :step="1"
          hide-details
          class="filters__slider"
        >
          <template #prepend>
            <v-text-field
              v-model="rangeSquare[0]"
              hide-details
              single-line
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
              v-model="rangeSquare[1]"
              hide-details
              single-line
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
        label="Материалы стен"
        v-model="walls"
        :items="wallsOptions"
        clearable
        multiple
        variant="outlined"
      >
        <template v-slot:selection="{ item, index }">
          <FiltersSelectChip
            :value="walls"
            :item="item"
            :index="index"
          />
        </template>
      </v-select>
      <v-select
        label="Материалы крыши"
        :items="roofsOptions"
        v-model="roofs"
        clearable
        multiple
        variant="outlined"
      >
        <template v-slot:selection="{ item, index }">
          <FiltersSelectChip
            :value="roofs"
            :item="item"
            :index="index"
          />
        </template>
      </v-select>
      <v-select
        label="Тип фундамента"
        :items="foundationsOptions"
        v-model="founds"
        clearable
        multiple
        variant="outlined"
      >
        <template v-slot:selection="{ item, index }">
          <FiltersSelectChip
            :value="founds"
            :item="item"
            :index="index"
          />
        </template>
      </v-select>
    </div>
    <div class="filters-item">
    </div>
  </div>
</template>
<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import type { OptionsListItem } from '@/utils/types';
import FiltersSelectChip from './filters-select-chip.vue';

interface Props {
  wallsOptions: OptionsListItem[],
  roofsOptions: OptionsListItem[],
  foundationsOptions: OptionsListItem[]
}

defineProps<Props>();

const rangeSquare = ref([0, 100]);
const walls = ref();
const roofs = ref();
const founds = ref();
</script>
<style
  scoped
  lang="scss"
>
.filters {
  gap: $offset-base;
  display: flex;
  flex-direction: column;

  &__group {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* Создает 4 равных столбца */
    grid-gap: $offset-base; /* Отступ между блоками */

    &--wide {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__slider {
    margin: 0 !important;
  }

}
</style>
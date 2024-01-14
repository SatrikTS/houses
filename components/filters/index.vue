<template>
  <div class="filters">
    <div class="filters-item">
      <label for="" class="filters-label">Площадь</label>
      <v-range-slider
        v-model="rangeSquare"
        :max="1000"
        :min="0"
        :step="1"
        hide-details
        class="align-center"
      >
        <template #prepend>
          <v-text-field
            v-model="rangeSquare[0]"
            hide-details
            single-line
            type="number"
            variant="outlined"
            density="compact"
            style="width: 100px"
          ></v-text-field>
        </template>
        <template #append>
          <v-text-field
            v-model="rangeSquare[1]"
            hide-details
            single-line
            type="number"
            variant="outlined"
            style="width: 100px"
            density="compact"
          ></v-text-field>
        </template>
      </v-range-slider>
    </div>
    <div class="filters__group">
      <v-select
        label="Количество комнат"
        :items="['1', '2', '3', '4', '5', '6+']"
        clearable
        chips
        multiple
      ></v-select>
      <v-select
        label="Количество этажей"
        :items="['1', '2', '3', '4+']"
        clearable
        chips
        multiple
      ></v-select>
      <v-select
        label="Материалы стен"
        :items="['Газобетон', 'Кирпич', 'Монолитный железобетон']"
        clearable
        chips
        multiple
      ></v-select>
      <v-select
        label="Доп строения"
        :items="['Гараж', 'Баня', 'Беседка', 'Гостевой дом']"
        clearable
        chips
        multiple
      ></v-select>
      <v-select
        label="Отопление"
        :items="['Камин', 'Твердотопливное', 'Газовый котел', 'Гостевой дом']"
        clearable
        chips
        multiple
      ></v-select>
    </div>
    <div class="filters-item">
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
const rangeSquare = ref([0, 100])

</script>
<style scoped lang="scss">
.filters{
  &__group {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* Создает 4 равных столбца */
    grid-gap: 10px; /* Отступ между блоками */
  }
}
</style>
<template>
  <div>
    <TitleItem class="contacts__caption" caption="Контакты"/>
    <div class="container">
      <Filters
        :wallsOptions="wallMaterials.data"
        :roofsOptions="roofMaterials.data"
        :foundationsOptions="foundationsTypes.data"
      />
      <HousesList />
    </div>
  </div>
</template>
<script setup>
import { useWallsStore } from '@/store/wall-store'
import { useRoofsStore } from '@/store/roofs-store'
import { useFoundationsStore } from '@/store/foundation-store'
import { storeToRefs } from 'pinia'

const { getWallsMaterials } = useWallsStore()
const { getRoofMaterials } = useRoofsStore()
const { getFoundationsTypes } = useFoundationsStore()

const { wallMaterials } = storeToRefs(useWallsStore())
const { roofMaterials } = storeToRefs(useRoofsStore())
const { foundationsTypes } = storeToRefs(useFoundationsStore())

await getWallsMaterials()
await getRoofMaterials()
await getFoundationsTypes()
</script>
<style scoped>
</style>
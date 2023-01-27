<template>
  <customInput
    v-model.trim="searchInput"
    placeholder="Введите название"
    required
  />

  <div class="result-list">
    <resultRow
      v-for="el in searchResult"
      :key="el.place_id"
      :data="el"
      @choose-result="choose(el)"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, defineAsyncComponent, computed } from 'vue'
  import { Place } from '../types'
  import { useSearchStore } from '../store/searchStore'

  const customInput = defineAsyncComponent(() => import('./blocks/CustomInput.vue'))
  const resultRow = defineAsyncComponent(() => import('./blocks/Row.vue'))
  
  const store = useSearchStore()

  const searchInput = ref<string>('')
  const searchResult = computed<Array<Place>>(
    () => store.getResults
  )

  function choose(el: Place) {
    searchInput.value = el.display_name
  }

</script>

<style lang="scss">
  .result-list {
    position: absolute;
    min-width: 400px;
    width: 400px;
    border: 2px solid var(--dark);
    border-radius: 8px;
    margin: 0 0 40px;
    &::after {
      content: "";
    }
  }
</style>

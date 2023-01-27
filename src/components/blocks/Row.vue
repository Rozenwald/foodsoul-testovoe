<template>
  <div
    class="result-row"
    @click="chooseResult(props.data)">  {{ props.data.display_name }}
  </div>
</template>

<script setup lang="ts">
  import { Place } from '../../types'
  import { useSearchStore } from '../../store/searchStore'

  export interface customRowProps {
    data: Place,
  }

  const props = defineProps<customRowProps>()

  const emit = defineEmits<{
    (evt: 'chooseResult', item: Place): void,
  }>()

  const store = useSearchStore()

  function chooseResult(el: Place) {
    emit('chooseResult', el)
    store.clearData()
  }

</script>

<style lang="scss">
  .result-row {
    cursor: pointer;
    width: 100%;
    padding: 16px 24px;
    background-color: field;
    &:hover {
      background-color: #8b8b8b;
    }
    &:first-child {
      border-radius: 8px 8px 0 0;
    }
    &:last-child {
      border-radius: 0 0 8px 8px;
      margin-bottom: 80px;
    }
  }
</style>

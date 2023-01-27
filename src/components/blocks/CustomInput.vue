<template>
  <input
    :value="props.modelValue"
    :placeholder="props.placeholder"
    :type="props.type"
    class="search"
    @keyup="startSearch()"
    @input="emit('update:modelValue', (<HTMLInputElement>$event.target).value )"
  />
</template>

<script setup lang="ts">
  import { debounce } from 'lodash'
  import { useSearchStore } from '../../store/searchStore'

  export interface customInputProps {
    modelValue: string
    placeholder?: string,
    type?: string,
    alt?: string,
    required?: boolean,
  }

  const props = withDefaults(defineProps<customInputProps>(), {
    requaired: true,
    alt: "Поле ввода для поиска",
  })

  const emit = defineEmits<{
    (evt: 'update:modelValue', item: string): void,
  }>()

  const store = useSearchStore()

  const dbnc = debounce(
    (store) => {
      if (props.modelValue) {
        store.getData(props.modelValue)
      }
    },
    1000,
  )

  function startSearch() {
    if (props.modelValue) {
      dbnc(store)
    } else {
      store.clearData()
    }
  }
  
</script>

<style lang="scss">
  .search {
    position: relative;
    width: 400px;
    padding: 16px 24px;
    border-radius: 8px;
    border: 2px solid var(--dark);
    font-size: 1vw;
    &:hover{
      border: 2px solid var(--grey);
    }
    &:focus-visible {
      outline: none;
      border: 2px solid var(--white);
      background-color: field;
    }
  }
</style>

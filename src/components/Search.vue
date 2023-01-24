<template lang="pug">
input.search(
  v-model="searchInput"
  @keyup="startSearch()"
  placeholder="Введите название")

.result
  .result__row(v-for="el in searchResult" v-on:click="chooseResult(el)") {{ el.display_name }}

</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { AxiosResponse } from 'axios'
  import axios from 'axios'
  import { debounce } from 'lodash'

  const searchInput = ref<String>('')
  const searchResult = reactive<Place[]>([])

  type Place = {
    boundingbox: {
      0: string,
      1: string,
      2: string,
      3: string,
    },
    class: string,
    display_name: string,
    importance: number,
    lat: string,
    lon: string,
    licence: string,
    osm_id: number,
    osm_type: string,
    place_id: number,
    type: string,
  }

  const dbnc = debounce(
    getData,
    1000,
  )

  function chooseResult(el: Place) {
    searchInput.value = el.display_name
    searchResult.splice(0, searchResult.length)
  }

  function startSearch() {
    if (searchInput.value.length > 0) dbnc()
    else {
      searchResult.splice(0, searchResult.length)
    }
  }

  function getData() {
    const url = `/search?format=json&q=${searchInput.value}`
    axios
      .post(url)
      .then((res) => handler(res))
      .catch((err) => console.log(err))
  }

  function handler(res: AxiosResponse) {
    if (searchResult.length > 0)
      searchResult.splice(0, searchResult.length)
    res.data.forEach((el: Place) => {
      searchResult.push(el)
    })
  }

</script>

<style lang="scss">

:root {
  --dark: #242424;
  --black: #0f0f0f;
  --white: #e5e5e5;
  --grey: #929292;
}

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

.result {
  position: absolute;
  min-width: 400px;
  width: 400px;
  border: 2px solid var(--dark);
  border-radius: 8px;
  margin: 0 0 40px;
  &::after {
    content: "";
  }
  &__row {
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
}

</style>

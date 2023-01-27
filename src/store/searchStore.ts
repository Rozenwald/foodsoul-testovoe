import axios from 'axios'
import { AxiosResponse } from 'axios'
import { defineStore } from "pinia"
import { Place } from '../types'

export const useSearchStore = defineStore('search', {

  state: () => ({
    results: [] as Place[],
    url: '' as string,
  }),

  getters: {
    getResults: (state) => state.results,
  },

  actions: {
    clearData() {
      this.results = []
    },
    getData(value: string) {
      if (this.url != `/search?format=json&q=${value}`) {
        this.url = `/search?format=json&q=${value}`
        axios
          .post(this.url)
          .then((res) => this.dataHandler(res))
          .catch((err) => console.log(err))
      }
    },
    dataHandler(res: AxiosResponse) {
      if (this.results.length > 0)
        this.clearData()
      this.results = [ ...res.data ]
    }
  }
})

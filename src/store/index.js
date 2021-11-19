import { createStore } from 'vuex'
import axios from 'axios'

const url = 'https://restcountries.com/v3.1/'

export default createStore({
  state: {
    countries: {},
    borders: [],
    loadingBorders: false,
    theme: true
  },
  mutations: {
    setCountries(state, payload) {
      state.countries = payload
    },
    setBorders(state, payload) {
      state.borders = payload
      state.loadingBorders = false
    },
    setLoadingBorders(state) {
      state.loadingBorders = true
    },
    setTheme(state, payload) {
      state.theme = payload
    }
  },
  actions: {
    async fetchCountries({ commit }, value) {
      try {
        const response = await axios.get(`${url}${value}`)
        commit('setCountries', await Promise.all(response.data))
      } catch (error) {
        console.log(error)
        commit('setCountries', {})
      }
    },
    async getBorderCountries({ commit }, arr) {
      if (arr) {
        commit('setLoadingBorders')
        const borderCountries = arr.map(async (e) => {
          const { data } = await axios.get(
            `https://restcountries.com/v3.1/alpha/${e}`
          )
          return data[0].name.common
        })
        commit('setBorders', await Promise.all(borderCountries))
      } else {
        commit('setBorders', undefined)
        console.log('No borders')
      }
    },
    setTheme({ commit }, theme) {
      document.querySelector('body').setAttribute('class', theme)
      commit('setTheme', theme)
    }
  },
  modules: {}
})

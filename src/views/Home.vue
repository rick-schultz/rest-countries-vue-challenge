<template>
  <section class="home">
    <header class="searchBar">
      <div class="searchField" :class="theme === true ? 'dark' : 'light'">
        <img
          v-if="theme === true"
          src="@/assets/search_white_24dp.svg"
          alt="search icon"
        />
        <img v-else src="@/assets/search_black_24dp.svg" alt="search icon" />
        <input
          type="text"
          v-model="input"
          placeholder="Search for a Country..."
        />
      </div>
      <select
        required
        @change="onChange($event)"
        :class="theme === true ? 'dark' : 'light'"
      >
        <option value="Filter by Region" hidden selected>
          Filter by Region
        </option>
        <option value="africa">Africa</option>
        <option value="americas">Americas</option>
        <option value="antarctic">Antarctic</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>
    </header>
    <article class="cards">
      <MapCard
        v-for="country in countries"
        :key="country.cca3"
        :name="country.name.common"
        :population="country.population"
        :region="country.region"
        :capital="country.capital"
        :flag="country.flags.svg"
      />
    </article>
  </section>
</template>

<script>
import MapCard from '@/components/MapCard.vue'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    MapCard
  },
  data: () => ({
    debouncedInput: '',
    timeout: null
  }),
  computed: {
    input: {
      get() {
        return this.debouncedInput
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.debouncedInput = val
          if (val) {
            this.fetchCountries(`name/${val}`)
          } else {
            this.fetchCountries('all')
          }
        }, 500)
      }
    },
    ...mapState({
      countries: (state) => state.countries
    }),
    ...mapState({
      theme: (state) => state.theme
    })
  },
  mounted() {
    this.fetchCountries('all')
  },
  methods: {
    ...mapActions(['fetchCountries']),
    onChange(e) {
      const selectValue = e.target.value
      this.fetchCountries(`region/${selectValue}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 5rem;
  padding-top: 3rem;

  .light {
    background: var(--white) !important;
    box-shadow: 0 0.1rem 0.5rem rgba(0, 0, 0, 0.25);
    color: var(--black) !important;
    border-right: 1rem solid var(--white) !important;
    input {
      color: var(--black) !important;
    }
  }

  .searchBar {
    padding-bottom: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    select {
      width: 12rem;
      background: var(--darkBlue);
      font-size: 0.5rem;
      color: var(--white);
      border: none;
      font-size: 0.8rem;
      padding: 1.1rem;
      padding-right: 2rem;
      margin: 0;
      border-right: 1rem solid var(--darkBlue);
      cursor: pointer;
      transition: 0.2s;
      border-radius: 0.25rem;
    }

    select:hover {
      filter: brightness(1.1);
      box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
    }
  }

  .searchField {
    display: flex;
    align-items: center;
    background: var(--darkBlue);
    transition: 0.2s;
    border-radius: 0.25rem;

    img {
      width: 1.2rem;
      padding: 1rem;
      padding-left: 1.2rem;
      padding-right: 1rem;
    }

    input {
      background: transparent;
      font-size: 0.5rem;
      color: var(--white);
      border: none;
      font-size: 0.8rem;
      padding: 1rem;
      padding-left: 0;
      padding-right: 15rem;
      margin: 0;
    }

    input:focus {
      outline: none;
    }
  }

  .searchField:hover {
    filter: brightness(1.1);
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 4.3rem;
    justify-content: center;
  }
}

@media screen and (max-width: 800px) {
  .home {
    .searchField {
      input {
        padding-right: 7.5rem;
      }
    }
  }
}

@media screen and (max-width: 675px) {
  .home {
    padding: 2rem;
    .searchBar {
      display: grid;
      select {
        margin-top: 2rem;
        justify-self: left;
      }
    }
    .searchField {
      input {
        padding-right: 7.5rem;
      }
    }
  }
}
</style>

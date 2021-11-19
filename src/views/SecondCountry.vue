<template>
  <div class="home">
    <router-link class="event-link" :to="{ name: 'Home' }">
      <div class="backButton" :class="theme === true ? 'dark' : 'light'">
        <img
          v-if="theme === true"
          src="@/assets/keyboard_backspace_white_24dp.svg"
          alt="arrow back"
        />
        <img
          v-else
          src="@/assets/keyboard_backspace_black_24dp.svg"
          alt="arrow back"
        />
        <p>Back</p>
      </div>
    </router-link>
    <div class="countryBox">
      <img
        :src="countries[0].flags.svg"
        :alt="name + ' flag'"
        :class="theme === true ? 'dark' : 'light'"
      />
      <div>
        <h1>{{ countries[0].name.common }}</h1>
        <div class="countryInfo">
          <div>
            <p v-if="countries[0].name.nativeName == undefined">
              <strong>Native Name:</strong>
              {{ countries[0].name.common }}
            </p>
            <p v-else>
              <strong>Native Name:</strong>
              {{
                Object.entries(countries[0].name.nativeName).filter(
                  (e, i, a) => i === a.length - 1
                )[0][1].official
              }}
            </p>
            <p>
              <strong>Population:</strong>
              {{ countries[0].population.toLocaleString('eu') }}
            </p>
            <p><strong>Region:</strong> {{ countries[0].region }}</p>
            <p v-if="countries[0].subregion == undefined"></p>
            <p v-else>
              <strong>Sub Region:</strong> {{ countries[0].subregion }}
            </p>
            <p v-if="countries[0].capital == undefined"></p>
            <p v-else>
              <strong>Capital:</strong>
              {{ countries[0].capital[0] }}
            </p>
          </div>
          <div>
            <p><strong>Top Level Domain:</strong> {{ countries[0].tld[0] }}</p>
            <p v-if="countries[0].currencies == undefined"></p>
            <p v-else>
              <strong>Currencies:</strong>
              {{
                Object.entries(countries[0].currencies).filter(
                  (e, i, a) => i === a.length - 1
                )[0][1].name
              }}
            </p>
            <p v-if="countries[0].languages == undefined"></p>
            <p v-else>
              <strong>Languages:</strong>
              {{
                Object.values(countries[0].languages)
                  .filter((e) => e)
                  .join(', ')
              }}
            </p>
          </div>
        </div>
        <div class="borderCountries">
          <p v-if="loadingBorders">Loading...</p>
          <p v-else-if="borders == undefined"></p>
          <p v-else>
            <strong>Border Countries: </strong>
            <span
              :class="theme === true ? 'dark' : 'light'"
              v-for="(border, index) in borders"
              :key="index"
              @click="goTo(border)"
            >
              {{ border }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'secondCountry',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      countries: (state) => state.countries
    }),
    ...mapState({
      borders: (state) => state.borders
    }),
    ...mapState({
      loadingCountries: (state) => state.loadingCountries
    }),
    ...mapState({
      loadingBorders: (state) => state.loadingBorders
    }),
    ...mapState({
      theme: (state) => state.theme
    })
  },
  watch: {
    countries: function (newValue) {
      this.getBorderCountries(newValue[0].borders)
    }
  },
  beforeMount() {
    this.fetchCountries(`name/${this.name}`)
  },
  beforeRouteUpdate() {
    this.fetchCountries(`name/${this.name}`)
  },
  methods: {
    ...mapActions(['fetchCountries']),
    ...mapActions(['getBorderCountries']),
    goTo(e) {
      this.$router.push({ name: 'Country', params: { name: e } })
    }
  }
}
</script>

<style lang="scss" scoped>
.event-link {
  text-decoration: none;
  color: var(--white);
}

.light {
  background: var(--white) !important;
  box-shadow: 0 0.1rem 0.5rem rgba(0, 0, 0, 0.25);
  color: var(--black) !important;
}

.home {
  padding: 5rem;
  padding-top: 3rem;

  p {
    font-size: 0.9rem;
  }

  .backButton {
    display: flex;
    justify-content: center;
    width: 5rem;
    background: var(--darkBlue);
    font-size: 0.9rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: 0.2s;

    img {
      width: 1.4rem;
      margin: 0;
      margin-right: 0.5rem;
    }

    p {
      margin: 0;
      padding: 0.5rem;
    }
  }

  .backButton:hover {
    filter: brightness(1.1);
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
  }

  .countryBox {
    margin-top: 3rem;
    display: flex;
    text-align: left;
    align-items: center;
    justify-content: center;

    img {
      width: 35rem;
      margin-right: 5rem;
    }
  }

  .countryInfo {
    display: flex;

    div:first-child {
      width: 25rem;
      padding-right: 2rem;
    }
  }

  .borderCountries {
    p {
      strong {
        padding-right: 1rem;
      }
    }
    span {
      display: inline-block;
      padding: 0.3rem;
      padding-left: 1rem;
      padding-right: 1rem;
      margin-top: 0.6rem;
      background: var(--darkBlue);
      border-radius: 0.25rem;
      margin-right: 0.5rem;
      cursor: pointer;
      transition: 0.2s;
    }

    span:hover {
      filter: brightness(1.1);
      box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
    }

    .span-nothing {
      display: none;
    }
  }
}

@media screen and (max-width: 1250px) {
  .home {
    justify-content: center;
    .countryBox {
      display: block;
    }
    .countryInfo {
      display: block;
      div:first-child {
        width: 20rem;
        margin-right: 0;
      }
    }
  }
}

@media screen and (max-width: 700px) {
  .home {
    padding: 2rem;
    .countryBox {
      img {
        width: 100%;
        margin-right: 0;
      }

      .countryInfo {
        display: block;
        div:first-child {
          width: 20rem;
          margin-right: 0;
        }
        div:last-child {
          width: 20rem;
          padding-right: 0;
        }
      }
    }
  }
}
</style>

<template>
  <router-link
    class="event-link"
    :to="{ name: 'Country', params: { name: name } }"
  >
    <div class="mapCard" :class="theme === true ? 'dark' : 'light'">
      <img :src="flag" :alt="name + ' flag'" />
      <h3>{{ name }}</h3>
      <p><strong>Population:</strong> {{ population.toLocaleString('eu') }}</p>
      <p><strong>Region:</strong> {{ region }}</p>
      <p v-if="capital === undefined"></p>
      <p v-else><strong>Capital:</strong> {{ capital[0] }}</p>
    </div>
  </router-link>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MapCard',
  components: {},
  props: ['name', 'population', 'region', 'capital', 'flag'],
  computed: {
    ...mapState({
      theme: (state) => state.theme
    })
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

.mapCard {
  width: 17rem;
  background: var(--darkBlue);
  border-radius: 0.25rem;
  text-align: left;
  cursor: pointer;
  transition: 0.2s;

  img {
    width: 100%;
    border-radius: 0.25rem 0.25rem 0 0;
  }

  p,
  h3 {
    padding-left: 1rem;
  }

  p {
    line-height: 0.7rem;
  }

  p:last-child {
    padding-bottom: 2rem;
  }
}

.mapCard:hover {
  filter: brightness(1.1);
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
}
</style>

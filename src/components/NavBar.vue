<template>
  <div id="nav" :class="theme === true ? 'dark' : 'light'">
    <router-link class="event-link" :to="{ name: 'Home' }">
      <h1>Where in the world?</h1>
    </router-link>
    <div class="darkMode" @click="setTheme(!theme)">
      <img
        v-if="theme === true"
        src="@/assets/nightlight_round_white_24dp.svg"
        alt="moon icon"
      />
      <img
        v-else
        src="@/assets/nightlight_round_black_24dp.svg"
        alt="moon icon"
      />
      <button v-if="theme === true">Light Mode</button>
      <button v-else>Dark Mode</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'NavBar',
  computed: {
    ...mapState({
      theme: (state) => state.theme
    })
  },
  methods: {
    ...mapActions(['setTheme'])
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
  box-shadow: 0 0.1rem 0.5rem rgba(78, 71, 71, 0.25);

  h1,
  p,
  a,
  button {
    color: var(--black) !important;
  }
}

#nav {
  padding: 0.5rem;
  padding-left: 5rem;
  padding-right: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--darkBlue);

  .darkMode {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 1rem;
    padding-right: 0;

    img {
      width: 1rem;
      transform: rotate(-40deg);
    }
  }

  button {
    background: transparent;
    color: var(--white);
    border: none;
    font-size: 0.9rem;
    cursor: pointer;
    padding-left: 0.5rem;
  }
}

@media screen and (max-width: 570px) {
  #nav {
    padding: 1rem;

    h1,
    button {
      font-size: 1rem;
    }
  }
}
</style>

<template>
  <NavBar />
  <router-view />
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
:root {
  --darkBlue: hsl(209, 23%, 22%);
  --veryDarkBlueDark: hsl(207, 26%, 17%);
  --veryDarkBlueLight: hsl(200, 15%, 8%);
  --darkGray: hsl(0, 0%, 52%);
  --veryLightGray: hsl(0, 0%, 98%);
  --white: hsl(0, 0%, 100%);
  --black: hsl(0, 0%, 0%);
}

html {
  justify-content: center;
  display: flex;
}

body {
  background: var(--veryDarkBlueDark);
  color: var(--white);
  padding: 0;
  margin: 0;
  max-width: 1460px;
}

.true {
  background: var(--veryDarkBlueDark);
  color: var(--white);
}

.false {
  background: var(--veryLightGray);
  color: var(--black);
}

#app {
  font-family: 'Nunito Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

h1 {
  font-size: 1.4rem;
}
</style>

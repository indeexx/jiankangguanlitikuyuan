<template>
  <div id="app">
    <router-view />
  </div>
</template>


<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  /* background-color: #292D32; */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
img {
  -webkit-touch-callout: none;
  pointer-events: none;
}
div {
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}
</style>

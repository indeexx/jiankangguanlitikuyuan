<template>
  <div class="home">
    <HomePage />
  </div>
</template>

<script>
// @ is an alias to /src
import HomePage from "@/components/HomePage.vue";

export default {
  name: "Home",
  components: {
    HomePage,
  },
  mounted() {
    console.log("Home");
  },
};
</script>
<style lang="scss">
.home {
  width: 100%;
  height: 100%;
}
</style>
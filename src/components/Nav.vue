<template>
    <div class="nav-wrapper">
        <router-link to="/money">money</router-link>
        <router-link to="/labels">labels</router-link>
        <router-link to="/statistics">statistics</router-link>
    </div>
</template>

<script lang="ts">
  export default {
    name: 'Nav.vue'
  };
</script>

<style lang="scss" scoped>
.nav-wrapper{
    display: flex;
    justify-content: space-between;
    border: 1px solid red;
}
.nav-wrapper > a{
    flex-grow: 1;
    text-align: center;
}
</style>
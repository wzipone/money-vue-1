<template>
    <button>
      <slot/>
    </button>
</template>

<script lang="ts">
  export default {
    name: 'Button'
  };
</script>

<style lang="scss" scoped>
  button {
    background-color: #767676;
    color: #fff;
    border-radius: 4px;
    border: none;
    font-size: 16px;
    padding: 0 16px;
    height: 40px;
  }
</style>
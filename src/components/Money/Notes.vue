<template>
  <label class="notes">
    <span class="name">备注</span>
    <input type="text" :value="value"
           @input="oninput">
    {{value}}
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    value = '';

    oninput(e: InputEvent) {
      this.value = (e.target as HTMLInputElement).value;
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .notes {
    display: flex;
    align-items: center;
    padding: 0 16px;

    > .name {
      padding-right: 16px;
    }

    > input {
      flex-grow: 1;
      height: 64px;
      border: none;
      background: transparent;
    }
  }
</style>
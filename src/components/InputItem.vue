<template>
  <label class="input-wrapper">
    <span>{{label}}</span>
    <input type="text"
           :value="value"
           :placeholder="placeholder"
           @input="onInput" />
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Input extends Vue {

    @Prop({type: String, required: true})
    label!: string;
    @Prop({type: String, default: ''})
    value!: string;
    @Prop({type: String, default: ''}) //这里填了默认值好不好使用，还需要在ts中断言非空
    placeholder!: string;


    onInput(e: InputEvent) {
      this.$emit('update:value', (e.target as HTMLInputElement).value);
    }

  }
</script>

<style lang="scss" scoped>
  .input-wrapper {
    display: flex;
    align-items: center;
    padding: 0 16px;

    > span {
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
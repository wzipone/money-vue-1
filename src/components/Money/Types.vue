<template>
  <ul class="types">
    <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
    <li :class="type === '+' && 'selected'" @click="selectType('+')">收人</li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator'; //这个不是尤写的
  @Component //装饰器
  export default class Types extends Vue {
    type = '-'; //这里相当于data
    selectType(type: '-' | '+') { //这里相当于method
      this.type = type;
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .types {
    background-color: #c4c4c4;
    display: flex;
    font-size: 24px;

    > li {
      flex-grow: 1;
      text-align: center;
      line-height: 64px;

      &.selected {
        @extend %outerShadow;
      }
    }
  }
</style>
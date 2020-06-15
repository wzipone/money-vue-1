<template>
  <ul :class="`${classPrefix}-tabs`" class="tabs">
    <li v-for="item in dataSource" :key="item.value"
        :class="{[`${classPrefix}-tabs-item`]: classPrefix, selected: item.value === value}"
        :style="{lineHeight: height}"
        @click="select(item)">
      {{item.text}}
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type TabItem = {
    value: string;
    text: string;
  }
  @Component
  export default class Types extends Vue {
    @Prop({type: String, required: true})
    readonly value !: string;
    @Prop({type: Array, required: true})
    readonly dataSource !: TabItem[];
    @Prop({type: String})
    readonly classPrefix?: string;
    @Prop({type: String, default: '64px'})
    height?: string;

    select(item: TabItem) {
      this.$emit('update:value', item.value);
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .tabs {
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
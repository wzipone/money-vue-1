<template>
  <section class="numberPad">
    <div class="output">{{output}}</div>
    <div class="buttons" @click="onInput">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="ok" @click="onOk">OK</button>
      <button class="last">0</button>
      <button class="last">.</button>
      <button class="last">+</button>
    </div>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import {generateOutput} from '@/lib/generateOutput.ts';

  @Component
  export default class NumberPad extends Vue {
    @Prop(Number) readonly value!: number;
    output = this.value.toString();

    onInput(e: MouseEvent) {
      const input = (e.target as HTMLButtonElement).textContent;
      if (input) this.output = generateOutput(input, this.output);

    }

    onOk(e: MouseEvent) {
      e.stopPropagation();
      this.$emit('update:value', parseFloat(this.output)); //用来更新record
      this.$emit('submit');// 用来提交数据
      this.output = '0'
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .numberPad {
    > .output {
      @extend %innerShadow;
      font-size: 36px;
      font-family: Consolas, monospace;
      padding: 9px 16px;
      text-align: right;

    }

    > .buttons {
      display: flex;
      flex-wrap: wrap;

      > button {
        width: 25%;
        height: 64px;
        border: none;
        background: transparent;

        &.ok {
          height: 128px;
          align-self: end;
        }

        &.last {
          margin-top: -64px;
        }

        $bg: #f2f2f2;

        &:nth-child(1) {
          background: $bg;
        }

        &:nth-child(2),
        &:nth-child(5) {
          background: darken($bg, 4%);
        }

        &:nth-child(3),
        &:nth-child(6),
        &:nth-child(9) {
          background: darken($bg, 4*2%);
        }

        &:nth-child(4),
        &:nth-child(7),
        &:nth-child(10),
        &:nth-child(13) {
          background: darken($bg, 4*3%);
        }

        &:nth-child(8),
        &:nth-child(11),
        &:nth-child(14) {
          background: darken($bg, 4*4%);
        }

        &:nth-child(12) {
          background: darken($bg, 4*6%);
        }

        &:nth-child(15) {
          background: darken($bg, 4*5%);
        }

      }
    }
  }
</style>
<template>
  <section class="tags">
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag"
          :class="{selected:selectedTags.indexOf(tag) >= 0}"
          @click="toggle(tag)">
        {{tag}}
      </li>
    </ul>
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Tags extends Vue {
    @Prop() readonly dataSource: string[] | undefined;
    selectedTags: string[] = [];

    toggle(tag: string) {
      const index = this.selectedTags.indexOf(tag);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.$emit('update:selected', this.selectedTags);
    }

    create() {
      const tagName = prompt('请输入新的标签名');
      console.log(tagName);
      if (tagName === '') {
        alert('标签明不能为空');
      } else if (tagName === null) {
        return;
      } else if (this.dataSource) {
        this.$emit('update:dataSource', [...this.dataSource, tagName]);
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .tags {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 16px;
    background: #fff;

    > .current {
      flex-grow: 1;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-end;

      > li {
        margin-right: 12px;
        line-height: 24px;
        padding: 0 12px;
        border-radius: 16px;
        background: #d9d9d9;
        margin-top: 12px;

        &.selected {
          background: #f60
        }
      }
    }

    > .new {
      padding-top: 16px;

      > button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }
</style>
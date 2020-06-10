<template>
  <Layout>
    <ul class="tags">
      <li v-for="tag in tags" :key="tag"><span>{{tag}}</span>
        <Icon name="right"/>
      </li>
    </ul>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新增标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import {tagListModel} from '@/models/tagListModel';

  tagListModel.fetch();

  @Component
  export default class Labels extends Vue {

    tags = tagListModel.data;

    createTag() {
      const tagName = prompt('请输入新标签名');
      if (tagName === null) return;
      if (tagName === '') {
        alert('标签名不能为空');
        return;
      }

      const message = tagListModel.create(tagName);
      if (message === 'duplicated') {
        alert('标签名重复');
      } else if (message === 'success') {
        alert('添加成功');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    background-color: #fff;
    font-size: 16px;
    padding-left: 16px;

    > li {
      min-height: 44px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;

      > svg {
        width: 18px;
        height: 18px;
        color: #666;
        margin-right: 16px;
      }
    }
  }

  .createTag {
    background-color: #767676;
    color: #fff;
    border-radius: 4px;
    border: none;
    font-size: 16px;
    padding: 0 16px;
    height: 40px;

    &-wrapper {
      padding: 16px;
      margin-top: 44-16px;
      text-align: center;
    }


  }
</style>
<template>
  <Layout>
    <div class="tags">
      <router-link :to="`/labels/edit/${tag.id}`" v-for="tag in tags" :key="tag.id"><span>{{tag.name}}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button @click.native="createTag">新增标签</Button>
    </div>

  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import store from '@/store/storeIndex';


  @Component({
    components: {Button}
  })
  export default class Labels extends Vue {

    tags = store.tagList;

    createTag() {
      const tagName = prompt('请输入新标签名');
      if (tagName === null) return;
      if (tagName === '') {
        alert('标签名不能为空');
        return;
      }

      store.createTag(tagName)
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    background-color: #fff;
    font-size: 16px;
    padding-left: 16px;

    > a {
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

  .createTag-wrapper {
    padding: 16px;
    margin-top: 44-16px;
    text-align: center;
  }

</style>
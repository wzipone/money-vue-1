<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left"></Icon>
      <span class="title">编辑标签</span>
      <span class="rightSpace"></span>
    </div>
    <div class="inputItem-wrapper">
      <InputItem label="标签名" :value.sync="tag.name" placeholder="请输入标签名"/>
    </div>
  <div class="button-wrapper">
    <Button>删除标签</Button>
  </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import {tagListModel} from '@/models/tagListModel';
  import InputItem from '@/components/InputItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, InputItem}
  })
  export default class EditLabel extends Vue {
    tag: Tag = {id: '', name: ''};

    created() {
      console.log('life');
      tagListModel.fetch();
      const {id} = this.$route.params;
      this.tag = tagListModel.data.filter(tag => tag.id === id)[0];
      if (!this.tag) {
        this.$router.replace(`/404`);
      }
    }

    @Watch('tag')
    onTagChanged() {
      this.tag && tagListModel.updateTag(this.tag.id, this.tag.name);
    }

  }
</script>

<style lang="scss" scoped>
  .navBar {
    font-size: 16px;
    padding: 12px 16px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > .leftIcon {
      width: 20px;
      height: 20px;
    }

    > .rightSpace {
      width: 20px;
      height: 20px;
    }
  }
  .inputItem-wrapper{
    margin-top: 16px;
    background-color: white;
  }
  .button-wrapper{
    display: flex;
    justify-content: center;
    padding-top: 16px;
    margin-top: 44-16px;
  }
</style>
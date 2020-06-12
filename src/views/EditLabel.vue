<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click.native="goBack"></Icon>
      <span class="title">编辑标签</span>
      <span class="rightSpace"></span>
    </div>
    <div class="inputItem-wrapper">
      <InputItem label="标签名" :value="tag && tag.name" @update:value="onUpdateValue" placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button @click.native="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import {tagListModel} from '@/models/tagListModel';
  import InputItem from '@/components/InputItem.vue';
  import Button from '@/components/Button.vue';
  tagListModel.fetch();
  @Component({
    components: {Button, InputItem}
  })
  export default class EditLabel extends Vue {
    tag: Tag | undefined = undefined;


    onUpdateValue(newName: string) {
      if (this.tag) {
        const sign = tagListModel.update(this.tag.id, newName);
        if (sign === 'success') {
          alert('修改成功');
        } else if (sign === 'duplicated') {
          alert('标签名重复');
        } else if (sign === 'not_found') {
          alert('没有找到该标签');
        }

      }
    }

    remove() {
      console.log(1);
      if (this.tag) {
        if (tagListModel.remove(this.tag.id)) {
          alert('删除成功');
          this.$router.replace('/labels');
        }
      }
    }

    goBack() {
      this.$router.push('/labels')
    }

    created() {
      // tagListModel.fetch();
      const {id} = this.$route.params;
      const tag = tagListModel.find(id);
      console.log(tag);
      if (tag) {
        this.tag = tag;
      } else {
        this.$router.replace(`/404`);
      }
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

  .inputItem-wrapper {
    margin-top: 16px;
    background-color: white;
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
    padding-top: 16px;
    margin-top: 44-16px;
  }
</style>
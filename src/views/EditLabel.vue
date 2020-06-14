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
  import {Component} from 'vue-property-decorator';
  import InputItem from '@/components/InputItem.vue';
  import Button from '@/components/Button.vue';
  import {mapMutations, mapState} from 'vuex';
  import storeHelper from '@/store/storeHelper';

  @Component({
    components: {Button, InputItem},
    computed: {...mapState({tagList: 'tagList'})},
    methods: {...mapMutations({updateTag: 'updateTag', removeTag: 'removeTag', fetchTags: 'fetchTags'})}
  })
  export default class EditLabel extends Vue {
    [x: string]: any;
    tag: Tag | undefined = undefined;

    created() {
      this.fetchTags();
      const {id} = this.$route.params;
      const tag = storeHelper.findTag(this.tagList, id);
      if (tag) {
        this.tag = tag;
      } else {
        this.$router.replace(`/404`);
      }
    }

    onUpdateValue(name: string) {
      if (this.tag) {
        this.updateTag({id: this.tag.id, name});
      }
    }

    remove() {
      if (this.tag) {
        this.removeTag({
          id: this.tag.id,
          callback: () => {
            this.$router.replace('/labels');
          }
        });
      }
    }

    goBack() {
      this.$router.push('/labels');
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
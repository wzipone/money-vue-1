<template>
  <Layout>
    <div>
      <Icon name="left"></Icon>
      <span>编辑标签</span>
    </div>
    <label>
      <!--      <Input label="标签名" :value.sync="tag.name"/>-->
      <Input label="标签名" :value.sync="tag.name" placeholder="请输入标签名" />
    </label>
    {{tag.name}}
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import {tagListModel} from '@/models/tagListModel';
  import Input from '@/components/Input.vue';

  @Component({
    components: {Input}
  })
  export default class EditLabel extends Vue {
    tag: Tag = {id: '', name: ''};

    created() {
      console.log('life');
      // tagListModel.fetch();

      const {id} = this.$route.params;
      console.log(tagListModel.data.filter(tag => tag.id === id)[0]);
      this.tag = tagListModel.data.filter(tag => tag.id === id)[0];
      // console.log(this.tag);
      if (!this.tag) {
        this.$router.replace(`/404`);
      }

    }


    // onUpdateTag(name: string) {
    //   console.log(2);
    //   this.tag && (this.tag.name = name);
    //   console.log(this.tag);
    //   this.tag && tagListModel.updateTag(this.tag.id, name);
    // }

    @Watch('tag')
    onTagChanged() {
      this.tag && tagListModel.updateTag(this.tag.id, this.tag.name);
    }

  }
</script>

<style lang="scss" scoped>

</style>
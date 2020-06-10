<template>
  <Layout>
    编辑label
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import {tagListModel} from '@/models/tagListModel';

  @Component
  export default class EditLabel extends Vue {

    created(){
      tagListModel.fetch();
      const {id} = this.$route.params
      const tag = tagListModel.data.filter(tag=>tag.id === id)[0]
      console.log(tag);
    }

  }
</script>

<style lang="scss" scoped>

</style>
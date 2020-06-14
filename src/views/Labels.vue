<template>
  <Layout>
    <div class="tags">
      <router-link :to="`/labels/edit/${tag.id}`" v-for="tag in tagList" :key="tag.id"><span>{{tag.name}}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button @click.native="onCreateTag">新增标签</Button>
    </div>

  </Layout>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import {mapMutations, mapState} from 'vuex';
  import {mixins} from 'vue-class-component';
  import {TagHelper} from '@/mixins/TagHelper';

  @Component({
    components: {Button},
    computed: mapState({tagList: 'tagList'}),
    methods: mapMutations({fetchTags: 'fetchTags'})
  })
  export default class Labels extends mixins(TagHelper) {
    fetchTags!: () => void;
    tagList!: Tag[];

    created() {
      this.fetchTags();
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
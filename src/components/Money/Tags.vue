<template>
  <section class="tags">
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected:selectedTags.indexOf(tag.id) >= 0}"
          @click="toggle(tag.id)">
        {{tag.name}}
      </li>
    </ul>
    <div class="new">
      <button @click="onCreateTag">新增标签</button>
    </div>
  </section>
</template>

<script lang="ts">
  import {Component, Prop} from 'vue-property-decorator';
  import {mapMutations, mapState} from 'vuex';
  import {mixins} from 'vue-class-component';
  import {TagHelper} from '@/mixins/TagHelper';

  @Component({
    // computed: mapState({tagList: 'tagList'}),
    // computed:{
    //   tagList(){
    //     return this.$store.state.tagList
    //   }
    // },
    methods: mapMutations({createTag: 'createTag', fetchTagList: 'fetchTags'})
  })
  export default class Tags extends mixins(TagHelper) {
    createTag !: (name: string) => void;
    fetchTagList !: () => void;
    // tagList !: Tag[];
    @Prop(Array) selectedTags!: string[];

    get tagList(){
      return this.$store.state.tagList
    }

    created() {
      this.fetchTagList();
    }

    toggle(tagId: string) {
      this.$emit('update:selected', tagId);
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
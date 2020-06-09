<template>
  <section class="tags">
    <ul class="current">
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
    </ul>
    <div class="new">
      <button>新增标签</button>
    </div>
  </section>
</template>

<script lang="ts">
  export default {
    name: 'Tags.vue'
  };
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
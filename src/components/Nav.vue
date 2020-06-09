<template>
  <nav>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label"></Icon>
      <span>标签</span>
    </router-link>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money"></Icon>
      <span>记账</span>
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"></Icon>
      <span>统计</span>
    </router-link>
  </nav>
</template>

<script lang="ts">

  export default {
    name: 'Nav.vue'
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  nav {
    display: flex;
    justify-content: space-between;
    box-shadow: 0 0 3px rgba(0, 0, 0, .3);
    padding: 7px 0;
    font-size: 12px;
    > .item {
      flex-grow: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      &.selected{
        color: $color-highlight;
      }
      .icon {
        width: 24px;
        height: 24px;
      }
    }
  }

</style>
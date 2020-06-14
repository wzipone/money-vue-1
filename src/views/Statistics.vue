<template>
  <Layout>
    <Tabs class-prefix="recordType" :data-source="recordTypeList" :value.sync="recordType"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tabs from '@/components/Tabs.vue';
  import {Component} from 'vue-property-decorator';
  import recordTypeList from '@/constants/recordTypeList';
  import intervalList from '@/constants/intervalList';


  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    recordTypeList = recordTypeList;
    recordType = '-';

    intervalList = intervalList;
    interval = 'day';
  }
</script>

<style lang="scss" scoped>
  ::v-deep .recordType-tabs {
    .recordType-tabs-item {
      background: #fff;

      &.selected {
        background-color: #c4c4c4;
        box-shadow: none;
      }
    }
  }

  ::v-deep .interval-tabs {
    background: #fff;

    .interval-tabs-item {
      line-height: 48px;

      &.selected {
        background-color: #c4c4c4;
        box-shadow: none;
      }
    }
  }
</style>
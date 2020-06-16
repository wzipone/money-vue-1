<template>
  <Layout>
    <Tabs class-prefix="recordType" :data-source="recordTypeList" :value.sync="recordType"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" height="48px"/>
    <div>
      <ol class="records-wrapper">
        <li v-for="(group,index) in result" :key="index">
          <h3 class="title">{{group.title}}</h3>
          <ol>
            <li class="record" v-for="(item,index) in group.items" :key="index">
              <span class="tags">{{item.selectedTags.join(',') || '无'}}</span>
              <span class="notes">{{item.notes}}</span>
              <span class="amount">￥{{item.amount}}</span>
            </li>
          </ol>
        </li>
      </ol>
    </div>
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

    created() {
      this.$store.commit('fetchRecords');
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get result() {
      const {recordList} = this;
      type HashTableValue = {
        title: string;
        items: RecordItem[];
      }
      const hashTable: { [key: string]: HashTableValue } = {};
      recordList.forEach(record => {
        const [date, time] = record.createAt.split('T');
        hashTable[date] = hashTable[date] || {title: date, items: []};
        hashTable[date].items.push(record);
      });

      return hashTable;
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  ::v-deep {
    .recordType-tabs {
      .recordType-tabs-item {
        background: #fff;

        &.selected {
          background-color: #c4c4c4;
          box-shadow: none;
        }
      }
    }

    .interval-tabs {

      .interval-tabs-item {
        line-height: 48px;

        &.selected {
        }
      }
    }

  }

  .records-wrapper {

    /*background-color: #fff;*/
    .record {
      background-color: #fff;
      .notes {
        @extend %oneLine;
        margin-right: auto;
        margin-left: 16px;
        color: #999;
      }
    }

    .record, .title {
      padding: 0 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 40px;
    }
  }

</style>
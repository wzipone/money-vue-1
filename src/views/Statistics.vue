<template>
  <Layout>
    <Tabs class-prefix="recordType" :data-source="recordTypeList" :value.sync="recordType"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" height="48px"/>
    <div>
      <div class="message" v-if="recordList === []">当然没有任何记录，快来记一笔吧</div>
      <ol class="records-wrapper">
        <li v-for="([title,group],index) in result" :key="index">
          <div class="title">
            <h3>{{beautyDate(title)}}</h3>
            <h3>￥{{addUpAmount(group)}}</h3>
          </div>
          <ol>
            <li class="record" v-for="(item,index) in group" :key="index">
              <span class="tags">{{beautyTag(item.selectedTags) || '无'}}</span>
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
  import dayjs from 'dayjs';
  import storeHelper from '@/store/storeHelper.ts';

  const oneDay = 86400 * 1000; //一天等于86400秒，86400*1000毫秒
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
      this.$store.commit('fetchTags');
    }

    get tagList() {
      return this.$store.state.tagList;
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    addUpAmount(records: RecordItem[]) {
      // let total = 0;
      // records.forEach(record => {
      //   total += record.amount;
      // });
      return records.reduce((total: number, {amount}) => {
        return total + amount;
      }, 0);
    }

    get result() {
      // 或者先把recordList日期排序，然后在进行桶归类
      // 但是不能在原数组上修改（最好）
      // 先桶归类，然后再按日期排序
      const {recordList} = this;
      const hashTable: { [key: string]: RecordItem[] } = {};
      recordList.forEach(record => {
        if (this.recordType === record.type) {
          const [date] = record.createAt.split('T');
          hashTable[date] = hashTable[date] || [];
          hashTable[date].push(record);
        }

      });
      //大于0 就要互换位置，小于或等于0不变
      return Object.entries(hashTable).sort(([a], [b]) => {
        return dayjs(b).valueOf() - dayjs(a).valueOf();
      });
    }

    beautyTag(idList: string[]) {
      const nameList: string[] = [];

      idList.forEach(id => {
        const name = storeHelper.findTag(this.tagList, id)?.name || '无';
        nameList.push(name);
      });
      return nameList.join(',');
    }

    beautyDate(date: string) {
      // const now = new Date();
      // const day = dayjs(date);
      // if (day.isSame(now, 'day')) {
      //   return '今天';
      // } else if (day.isSame(now.valueOf() - oneDay, 'day')) {
      //   return '昨天';
      // } else if (day.isSame(now.valueOf() - oneDay * 2, 'day')) {
      //   return '前天';
      // } else {
      //   return day.format('YYYY年MM月DD日')
      // }

      const now = dayjs();
      const day = dayjs(date);

      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月DD日');
      } else {
        return day.format('YYYY年M月D日');
      }
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

  .message{
    text-align: center;
    padding: 24px;
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
<template>

  <Layout class-prefix="layout">
    {{record}}
    <Tags @update:selected="onUpdateSelected"/>
    <div class="notes">
      <InputItem :value.sync="record.notes" placeholder="请输入备注" label="备注"/>
    </div>
    <Tabs :value.sync="record.type" :data-source="recordTypeList" class-prefix="recordType"/>
    <NumberPad :value.sync="record.amount" @submit="save"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tags from '@/components/Money/Tags.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import InputItem from '@/components/InputItem.vue';
  import {mapMutations, mapState} from 'vuex';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({
    components: {Tabs, InputItem, NumberPad, Tags},
    computed: {
      ...mapState(['recordList'])
    },
    methods: {
      ...mapMutations(['fetchRecords', 'createRecord'])
    }
  })
  export default class Money extends Vue {
    [x: string]: any;

    recordTypeList = recordTypeList;
    record: Omit<RecordItem, 'createAt'> = {
      selectedTags: [],
      notes: '',
      type: '-',
      amount: 0
    };

    created() {
      this.fetchRecords();
    }

    onUpdateSelected(selectedTags: string[]) {
      this.record.selectedTags = selectedTags;
    }

    save() {
      this.createRecord(this.record);
    }

    // @Watch('recordList') //这里可以watch到
    // onRecordListChange() {
    //   this.saveRecords();
    // }


  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column;
  }

  .notes {
    padding: 10px 0;
  }
</style>
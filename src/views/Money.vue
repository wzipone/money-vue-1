<template>

  <Layout class-prefix="layout">
    <Tags :data-source.sync="tags" @update:selected="onUpdateSelected"/>
    <Notes :value="record.notes" @update:value="onUpdateNotes"/>
    <Types :value.sync="record.type"/>
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import Tags from '@/components/Money/Tags.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Types from '@/components/Money/Types.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';

  type Record = {
    selectedTags: string[];
    notes: string;
    type: '-' | '+';
    amount: number;
  }

  @Component({
    components: {NumberPad, Types, Notes, Tags}
  })
  export default class Money extends Vue {
    tags = ['衣', '食', '住', '行'];
    record: Record = {
      selectedTags: [],
      notes: '',
      type: '-',
      amount: 0
    };
    recordList: Record[] = [];

    onUpdateSelected(selectedTags: string[]) {
      this.record.selectedTags = selectedTags;
    }

    onUpdateNotes(notes: string) {
      this.record.notes = notes;
    }

    saveRecord() {
      const newRecord = JSON.parse(JSON.stringify(this.record));
      this.recordList.push(newRecord);
    }

    @Watch('recordList')
    onRecordListChange() {
      window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
    }

  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
  }
</style>
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
  import {recordListModel} from '@/models/recordListModel';
  import {tagListModel} from '@/models/tagListModel';

  const tagList = tagListModel.fetch();

  @Component({
    components: {NumberPad, Types, Notes, Tags}
  })
  export default class Money extends Vue {
    tags = ['衣', '食', '住', '行'];
    record: RecordItem = {
      selectedTags: [],
      notes: '',
      type: '-',
      amount: 0
    };
    recordList: RecordItem[] = recordListModel.fetch();


    onUpdateSelected(selectedTags: string[]) {
      this.record.selectedTags = selectedTags;
    }

    onUpdateNotes(notes: string) {
      this.record.notes = notes;
    }

    saveRecord() {
      const newRecord = recordListModel.clone(this.record);
      this.recordList.push(newRecord);
    }

    @Watch('recordList') //这里可以watch到
    onRecordListChange() {
      recordListModel.save(this.recordList);
    }

  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column;
  }
</style>
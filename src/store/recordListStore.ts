import clone from '@/lib/clone';

const recordListStore = {
  localRecordsKey: 'recordList',
  recordList: [] as RecordItem[],
  createRecord(record: RecordItem) {
    const newRecord = clone(record);
    this.recordList.push(newRecord);
    this.saveRecords();
  },
  fetchRecords() {
    this.recordList = JSON.parse(window.localStorage.getItem(this.localRecordsKey) || '[]') as RecordItem[];
    return this.recordList;
  },
  saveRecords() {
    window.localStorage.setItem(this.localRecordsKey, JSON.stringify(this.recordList));
  }
};

recordListStore.fetchRecords();

export default recordListStore;
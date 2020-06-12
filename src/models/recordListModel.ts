import clone from '@/lib/clone';

const localItemName = 'recordList';

const recordListModel = {
  data: [] as RecordItem[],
  create(record: RecordItem) {
    const newRecord = clone(record);
    this.data.push(newRecord);
  },
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localItemName) || '[]') as RecordItem[];
    return this.data
  },
  save(data: RecordItem[]) {
    window.localStorage.setItem(localItemName, JSON.stringify(data));
  }
};

export {recordListModel};
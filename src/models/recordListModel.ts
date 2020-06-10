const localItemName = 'recordList';

const recordListModel = {
  clone(data: any) {
    return JSON.parse(JSON.stringify(data));
  },
  fetch() {
    return JSON.parse(window.localStorage.getItem(localItemName) || '[]') as RecordItem[];
  },
  save(data: RecordItem[]) {
    window.localStorage.setItem(localItemName, JSON.stringify(data));
  }
};

export {recordListModel};
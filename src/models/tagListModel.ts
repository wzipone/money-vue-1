const localItemName = 'tagList';
type TagListModel = {
  data: string[];
  fetch: () => string[];
  save: () => void;
  create: (name: string) => 'success' | 'duplicated';
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localItemName) || '[]') as string[];
    return this.data;
  },
  save() {
    window.localStorage.setItem(localItemName, JSON.stringify(this.data));
  },
  create(name) {
    if (this.data.indexOf(name) >= 0) return 'duplicated';
    this.data.push(name);
    this.save();
    return 'success';
  }
};

export {tagListModel};
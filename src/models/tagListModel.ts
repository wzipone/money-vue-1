const localItemName = 'tagList';


type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  save: () => void;
  create: (name: string) => 'success' | 'duplicated';
  isNameDuplicate: (name: string) => boolean;
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localItemName) || '[]');
    return this.data;
  },
  save() {
    window.localStorage.setItem(localItemName, JSON.stringify(this.data));
  },
  create(name) {
    const names = this.data.map(tag => tag.name);
    if (names.indexOf(name) >= 0) return 'duplicated';
    this.data.push({id: name, name: name});
    this.save();
    return 'success';
  },
  isNameDuplicate(name) {
    const names = this.data.map(tag => tag.name);
    return names.indexOf(name) >= 0;
  }
};

export {tagListModel};
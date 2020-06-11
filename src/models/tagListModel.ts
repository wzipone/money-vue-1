const localItemName = 'tagList';


type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  save: () => void;
  create: (name: string) => 'success' | 'duplicated';
  isNameDuplicate: (name: string) => boolean;
  update: (tagId: string, name: string) => 'success' | 'duplicated' | 'not_found';
  find: (id: string) => Tag | undefined;
  remove: (id: string) => Tag | undefined;
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
  },
  update(tagId, name) {
    if (this.isNameDuplicate(name)) return 'duplicated';
    const tag = this.find(tagId);
    if (tag) {
      tag.name = name;
      this.save();
      return 'success';
    } else {
      return 'not_found';
    }
  },
  find(id) {
    return this.data.filter(tag => tag.id === id)[0];
  },
  remove(id) {
    const tag = this.find(id);
    if (tag) {
      const index = this.data.indexOf(tag);
      this.data.splice(index, 1);
      this.save()
    }
    return tag;
  }
};

export {tagListModel};
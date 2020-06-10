const localItemName = 'tagList';


type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  save: () => void;
  create: (name: string) => 'success' | 'duplicated';
  isNameDuplicate: (name: string) => boolean;
  updateTag: (tagId: string, name: string) => void;
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
  updateTag(tagId, name) {
    this.data.map(tag => {
      if (tag.id === tagId) {
        tag.name = name;
      }
      return tag;
    });
    this.save()
  }
};

export {tagListModel};
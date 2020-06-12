import createId from '@/lib/createId';

const localItemName = 'tagList';


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
    if (this.isNameDuplicate(name)) return 'duplicated';
    const id = createId().toString();
    this.data.push({id, name: name});
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
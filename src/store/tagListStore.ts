import createId from '@/lib/createId';

const tagListStore = {
  localTagsKey: 'tagList',
  tagList: [] as Tag[],
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem(this.localTagsKey) || '[]');
    return this.tagList;
  },
  saveTags() {
    window.localStorage.setItem(this.localTagsKey, JSON.stringify(this.tagList));
  },
  createTag(name: string) {
    if (this.isTagDuplicate(name)) {
      return 'duplicated';
    } else {
      const id = createId().toString();
      this.tagList.push({id, name: name});
      this.saveTags();
      alert('创建成功');
      return 'success';
    }
  },
  isTagDuplicate(name: string) {
    console.log(this.tagList);
    if (this.tagList.length === 0) return false;
    const names = this.tagList.map(tag => tag.name);
    if (names.indexOf(name) >= 0) {
      alert('标签名重复');
      return true;
    } else {
      return false;
    }
  },
  updateTag(tagId: string, name: string) {
    if (this.isTagDuplicate(name)) return 'duplicated';
    const tag = this.findTag(tagId);
    if (tag) {
      tag.name = name;
      this.saveTags();
      return 'success';
    } else {
      return 'not_found';
    }
  },
  findTag(id: string) {
    return this.tagList.filter(tag => tag.id === id)[0];
  },
  removeTag(id: string) {
    const tag = this.findTag(id);
    if (tag) {
      const index = this.tagList.indexOf(tag);
      this.tagList.splice(index, 1);
      alert('删除成功');
      this.saveTags();
    }
    return tag;
  }
};
tagListStore.fetchTags();

export default tagListStore;
const storeHelper = {
  isTagDuplicate(tagList: Tag[], name: string) {
    if (tagList.length === 0) return false;
    const names = tagList.map(tag => tag.name);
    if (names.indexOf(name) >= 0) {
      alert('标签名重复');
      return true;
    } else {
      return false;
    }
  },
  findTag(tagList: Tag[], id: string) {
    return tagList.filter(tag => tag.id === id)[0];
  }
};

export default storeHelper;
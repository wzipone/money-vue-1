import recordListStore from '@/store/recordListStore';
import tagListStore from '@/store/tagListStore';

const store = {
  ...recordListStore,
  ...tagListStore
};

export default store;
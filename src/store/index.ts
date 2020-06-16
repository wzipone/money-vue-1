import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import storeHelper from '@/store/storeHelper';
import router from '@/router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[]
  } as RootState,
  mutations: {
    createRecord(state, record) {
      record.createAt = new Date().toISOString();
      state.recordList.push(clone(record));
      store.commit('saveRecords');
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    }
    ,
    saveRecords(state) {
      console.log(1);
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    }
    ,
    //tagList
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    }
    ,
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    }
    ,
    createTag(state, name) {
      if (!storeHelper.isTagDuplicate(state.tagList, name)) {
        const id = createId().toString();
        state.tagList.push({id, name});
        store.commit('saveTags');
        alert('创建成功');
      }
    }
    ,
    updateTag(state, obj:
      {
        id: string;
        name: string;
      }
    ) {
      const {id, name} = obj;
      if (storeHelper.isTagDuplicate(state.tagList, id)) return;
      const tag = storeHelper.findTag(state.tagList, id);
      if (tag) {
        tag.name = name;
        store.commit('saveTags');
      }
    }
    ,
    removeTag(state, id:
      string
    ) {
      const tag = storeHelper.findTag(state.tagList, id);
      if (tag) {
        const index = state.tagList.indexOf(tag);
        state.tagList.splice(index, 1);
        alert('删除成功');
        store.commit('saveTags');
        router.replace('/labels');
      } else {
        alert('删除失败');
      }
    }
  },
  actions: {},
  modules: {}
});


export default store;
import Vue from 'vue';
import Component from 'vue-class-component';
import {mapMutations} from 'vuex';

@Component({
  methods: mapMutations({createTag: 'createTag'})
})
export class TagHelper extends Vue {
  createTag!: (name: string) => void;

  onCreateTag() {
    const tagName = prompt('请输入新标签名');
    if (tagName === null) return;
    if (tagName === '') {
      alert('标签名不能为空');
      return;
    }
    this.createTag(tagName);
  }
}
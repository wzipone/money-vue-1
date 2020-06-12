import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $storeIndex: any;
  }
}

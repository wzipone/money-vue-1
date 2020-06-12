type RecordItem = {
  selectedTags: string[];
  notes: string;
  type: '-' | '+';
  amount: number;
}
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  localStorageItem: string;
  data: Tag[];
  fetch: () => Tag[];
  save: () => void;
  create: (name: string) => 'success' | 'duplicated';
  isNameDuplicate: (name: string) => boolean;
  update: (tagId: string, name: string) => 'success' | 'duplicated' | 'not_found';
  find: (id: string) => Tag | undefined;
  remove: (id: string) => Tag | undefined;
}

interface Window {
  tagList: Tag[];
}
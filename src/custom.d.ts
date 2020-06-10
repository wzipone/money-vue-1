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
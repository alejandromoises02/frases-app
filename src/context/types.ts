export type TPhrase = {
  id: string;
  text: string;
};

export type TPhrasesContext = {
  phrases: TPhrase[];
  filteredPhrases: TPhrase[];
  addPhrase: (text: string) => void;
  removePhrase: (id: string) => void;
  filterText: string;
  setFilterText: (text: string) => void;
};

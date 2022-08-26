export type SearchTermType = string | null;
export type ListenerType = (text: SearchTermType) => void;
type SearchContextType = {
  searchTerm: SearchTermType;
  listeners: Array<ListenerType>;
};

// To store current consumers of search context
const SearchContext: SearchContextType = {
  searchTerm: null,
  listeners: [],
};

// Return a removeListener cb onsub
export const onSubcribe = (listener: ListenerType) => {
  SearchContext.listeners.push(listener);
  return () => {
    const _index = SearchContext.listeners.findIndex(_l => _l === listener);
    SearchContext.listeners.splice(_index, 1);
  };
};

// Update searchTerm and do broadcasting
export const setSearchTerm = (text: SearchTermType) => {
  SearchContext.searchTerm = text;
  SearchContext.listeners.forEach(_l => _l(text));
};

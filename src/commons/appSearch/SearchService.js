const SearchContext = {
  searchTerm: null,
  listeners: [],
};

// Return a removeListener cb onsub
const onSubcribe = listener => {
  SearchContext.subcribers.push(listener);
  return () => {
    const remainListeners = SearchContext.subcribers.filter(
      _l => _l !== listener,
    );
    SearchContext.listeners = remainListeners;
  };
};

// Update searchTerm and do broadcasting
const setSearchTerm = text => {
  SearchContext.searchTerm = text;
  SearchContext.listeners.forEach(_l => _l(text));
};

export const SearchService = {
  onSubcribe,
  setSearchTerm,
};

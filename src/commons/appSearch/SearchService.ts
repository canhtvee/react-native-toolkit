/**
 * Search event will be broadcast to all listeners every time emitted
 * include type of event and search text
 */
type SearchEventType = {
  type?: 'onChangeText' | 'onSearch';
  searchTerm?: string | null;
};

/**
 * Search event listener consumer search event
 */
type SearchEventListenerType = (event: SearchEventType) => void;

// To store current consumers of search context
const listeners: Array<SearchEventListenerType> = [];

/**
 * To subcribe to search event and return a remove listener callback
 */
export const onSubcribe = (listener: SearchEventListenerType) => {
  listeners.push(listener);
  return () => {
    const _index = listeners.findIndex(_l => _l === listener);
    listeners.splice(_index, 1);
  };
};

/**
 * Broadcasting search event to all listeners
 */
export const onChange = (event: SearchEventType) => {
  listeners.forEach(_l => _l(event));
};

export const SearchService = {
  onSubcribe,
  onChange,
};

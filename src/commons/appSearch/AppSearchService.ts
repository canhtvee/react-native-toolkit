type SearchEventNameType = 'onChangeSearchTerm' | 'onRequestSearch';

type SearchEventDataType = {
  searchTerm?: string;
};

type SearchEventType = {
  eventName: SearchEventNameType;
  data: SearchEventDataType;
};

type SearchEventListenerType = (event: SearchEventType) => void;

const searchContext = {
  listeners: new Array<SearchEventListenerType>(0),
};

export const AppSearchService = {
  addListener: (cb: SearchEventListenerType) => {
    searchContext.listeners.push(cb);
    const subscription = {
      removeListener: () => {
        const _listenters = searchContext.listeners.filter(_l => _l !== cb);
        searchContext.listeners = _listenters;
      },
    };
    return subscription;
  },

  onChange: (event: SearchEventType) => {
    searchContext.listeners.forEach(_l => _l(event));
  },

  removeAllListeners: () => (searchContext.listeners = []),
};

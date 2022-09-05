type EventListenerType<E> = (event: E) => void;
type EventContextType<E> = {
  listeners: Array<EventListenerType<E>>;
  lastEvent?: E;
};

type OptionType = {
  saveLastEvent?: boolean;
};

export function createEventService<E>(option?: OptionType) {
  const context: EventContextType<E> = {
    listeners: new Array<EventListenerType<E>>(0),
    lastEvent: undefined,
  };

  const addListener = (cb: (event: E) => void) => {
    context.listeners.push(cb);
    const subscription = {
      removeListener: () => {
        const _listenters = context.listeners.filter(_l => _l !== cb);
        context.listeners = _listenters;
      },
    };
    return subscription;
  };

  const onChange = (event: E) => {
    option?.saveLastEvent && (context.lastEvent = {...event});
    context.listeners.forEach(_l => _l(event));
  };

  const getContext = () => context;

  const resetContext = () => {
    context.lastEvent = undefined;
    context.listeners = [];
  };

  return {
    getContext,
    resetContext,
    addListener,
    onChange,
  };
}

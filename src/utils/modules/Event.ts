type EventType = {
  eventName: string;
  data: object;
};

type ListenerType<E> = (event: E) => void;

type ContextType<E extends EventType> = {
  listeners: Array<ListenerType<E>>;
  current: E['data'];
};

/**
 * createEventService function is reusable, it only depends on the eventType
 */
export function createEventService<E extends EventType>() {
  const context: ContextType<E> = {
    current: {},
    listeners: [],
  };

  const getContext = () => context;
  const resetContext = () => {
    context.current = {};
    context.listeners = [];
  };

  const addListener = (cb: ListenerType<E>) => {
    context.listeners.push(cb);
    const subscription = {
      removeListener: () => {
        const _listenters = context.listeners.filter(_l => _l !== cb);
        context.listeners = _listenters;
      },
      getContext,
      resetContext,
    };
    return subscription;
  };

  const onChange = (emittingEvent: ((current: E['data']) => E) | E) => {
    let event: E;

    if (typeof emittingEvent === 'function') {
      event = emittingEvent(context.current);
    } else {
      event = emittingEvent;
    }

    context.current = {...context.current, ...event.data};
    context.listeners.forEach(_l => _l(event));
  };

  const onCheck = (cb: (current: E['data']) => void) => cb(context.current);

  return {
    addListener,
    onCheck,
    onChange,
    getContext,
    resetContext,
  };
}

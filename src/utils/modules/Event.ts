type EventType = {
  eventName: string;
  data: object;
};

type ListenerType = (data: object) => void;

/**
 * createEventService function is reusable, it only depends on the eventType
 */
export function createEventService<E extends EventType>(
  initialData: E['data'],
) {
  let current: E['data'] = {...initialData};
  let listeners: Record<string, Array<ListenerType>> = {};

  const getContext = () => ({
    current,
    listeners,
  });
  const resetContext = () => {
    current = {...initialData};
    listeners = {};
  };

  const subcribe = (eventName: E['eventName'], cb: ListenerType) => {
    if (!listeners[eventName]) {
      listeners[eventName] = [];
    }

    listeners[eventName].push(cb);
    const subscription = {
      unsub: () => {
        const _listenters = listeners[eventName].filter(_l => _l !== cb);
        listeners[eventName] = _listenters;
      },
    };
    return subscription;
  };

  const emit = (emittingEvent: ((current: E['data']) => E) | E) => {
    let event: E;

    if (typeof emittingEvent === 'function') {
      event = emittingEvent(current);
    } else {
      event = emittingEvent;
    }

    const {data = {}, eventName} = event;
    current = {...current, ...data};
    listeners[eventName].forEach(_l => _l(event));
  };

  return {
    subcribe,
    emit,
    getContext,
    resetContext,
  };
}

type EventType = {
  eventName: string;
  data?: object;
};

type ListenerType<E extends EventType> = (event: E) => void;

/**
 * createEventService function is reusable, it only depends on the eventType
 */
export function createEventService<E extends EventType>(
  initialData: E['data'],
) {
  let current: E['data'] = {...initialData};
  let listeners: Record<string, Array<ListenerType<E>>> = {};

  const get = () => ({...current});
  const reset = () => {
    current = {...initialData};
    listeners = {};
  };

  const subcribe = (eventName: E['eventName'], listener: ListenerType<E>) => {
    if (!listeners[eventName]) {
      listeners[eventName] = [];
    }

    listeners[eventName].push(listener);
    const subscription = {
      unsub: () => {
        const _listenters = listeners[eventName].filter(_l => _l !== listener);
        listeners[eventName] = _listenters;
      },
    };
    return subscription;
  };

  const emit = (emittingEvent: ((current: E['data']) => E) | E) => {
    let event: E;

    if (typeof emittingEvent === 'function') {
      event = emittingEvent({...current});
    } else {
      event = emittingEvent;
    }

    if (event?.data) {
      current = {...current, ...event.data};
    }

    if (!listeners[event.eventName]) {
      return;
    }

    listeners[event.eventName].forEach(_l => _l(event));
  };

  return {
    subcribe,
    emit,
    get,
    reset,
  };
}

// type NotiEventDataType = {
//   badge?: number;
//   lastReadIds?: Array<number>;
// };

// type NotiEventType = {
//   eventName: 'newNotiOnForeground' | 'updateBadge' | 'readNotiSuccess';
//   data: NotiEventDataType;
// };

// const NotiService = createEventService<NotiEventType>({
//   badge: undefined,
//   lastReadIds: [],
// });

// const subscription = NotiService.subcribe('updateBadge', ({data}) =>
//   console.log(data.badge),
// );
// subscription.unsub();

// NotiService.emit(({badge}) => {
//   return {eventName: 'updateBadge', data: {badge: badge ? badge + 1 : 1}};
// });

// const {badge, lastReadIds} = NotiService.get();

import { RefObject, useEffect, useRef } from 'react';

/**
 * Hook to watch outside clicking
 *
 * @param ref reference of element
 * @param listener listener function
 */
export default function useOutsideClickWatcher(ref: RefObject<HTMLElement>, listener: EventListener) {
  const listenerRef = useRef(listener);

  useEffect(() => {
    listenerRef.current = listener;
  }, [listener]);

  useEffect(() => {
    // eslint-disable-next-line jsdoc/require-jsdoc
    const handleClick: EventListener = (event) => {
      if (ref?.current && !ref.current.contains(event.target as Node)) {
        listenerRef.current(event);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref]);
}

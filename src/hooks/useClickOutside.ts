import { RefObject, useEffect } from "react";

/**
 * Hook: 외부 영역 클릭 감지 후 콜백 실행
 */
export function useClickOutside<T extends HTMLElement | null>(
    ref: RefObject<T>,
    handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
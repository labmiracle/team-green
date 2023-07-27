import { useEffect } from 'react';

export const useAnimation = (
  ref: React.RefObject<HTMLElement>,
  animationClass: string,
  startAnimationEventType: string,
  endAnimationEventType: string
) => {
  useEffect(() => {
    const handleAnimationStart = () => {
      if (ref.current) {
        ref.current.classList.add(animationClass);
      }
    };

    const handleAnimationEnd = () => {
      if (ref.current) {
        ref.current.classList.remove(animationClass);
      }
    };

    const elementRef = ref.current;
    if (elementRef) {
      elementRef.addEventListener(
        startAnimationEventType,
        handleAnimationStart
      );
      elementRef.addEventListener(endAnimationEventType, handleAnimationEnd);
    }

    return () => {
      if (elementRef) {
        elementRef.removeEventListener(
          startAnimationEventType,
          handleAnimationStart
        );
        elementRef.removeEventListener(
          endAnimationEventType,
          handleAnimationEnd
        );
      }
   };
},[]);
};
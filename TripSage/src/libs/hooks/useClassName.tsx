import { RefObject } from 'react';

interface Props {
  ref: RefObject<HTMLElement>;
  className: string;
}

export const useClassName = () => {
  const addClassName = ({ ref, className }: Props) => {
    if (ref.current) {
      ref.current.classList.add(className);
    }
  };

  const removeClassName = ({ ref, className }: Props) => {
    if (ref.current) {
      ref.current.classList.remove(className);
    }
  };

  return {
    addClassName,
    removeClassName
  };
};
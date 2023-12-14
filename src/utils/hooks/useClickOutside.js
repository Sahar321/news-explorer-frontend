/*eslint-disable*/
import { useEffect } from 'react';

const useClickOutside = (ref, isEnabled, onClickOutSide) => {
  const handleClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {

      onClickOutSide();
    }
  };
  useEffect(() => {
    if (!isEnabled) return;
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isEnabled]);
};

export default useClickOutside;

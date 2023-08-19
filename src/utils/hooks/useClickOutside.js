/*eslint-disable*/
import { useEffect } from 'react';

const useClickOutside = (ref, onClickOutSide) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      onClickOutSide();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};

export default useClickOutside;

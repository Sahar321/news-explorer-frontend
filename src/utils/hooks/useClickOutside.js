import { useEffect } from 'react';

const useClickOutside = (ref, onClickOutside) => {
  if (!ref || !ref.current) {
    throw new Error('Invalid argument passed to useClickOutside hook');
  }

  const handleClickOutside = (event) => {
    if (!ref.current.contains(event.target)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
};

export default useClickOutside;

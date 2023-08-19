import { useEffect, useCallback } from 'react';

function useCloseOnEscape(isOpen, onClose) {
  const handleEscClose = useCallback((evt) => {
    if (evt.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleEscClose);
    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpen, handleEscClose]);
}

export default useCloseOnEscape;

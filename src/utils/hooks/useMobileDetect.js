import { useState, useEffect } from 'react';

const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function detectDevice() {
      const userAgentPattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = userAgentPattern.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    }

    detectDevice();
  }, []);

  return isMobile;
};
export default useMobileDetect;

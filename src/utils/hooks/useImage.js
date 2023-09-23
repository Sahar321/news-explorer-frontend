/*eslint-disable */
import { useEffect, useState } from 'react';
import pulseLoading from '../../images/loading/pulse-multiple.svg';
export default function useImage(
  imageSource,
  imageErrorPlaceholder,
  showLoadingPlaceholder = true
) {
  const [imageResult, setImageResult] = useState(
    showLoadingPlaceholder && pulseLoading
  );
  const handleImageError = () => {
    setImageResult(imageErrorPlaceholder);
  };

  const handleImageLoad = () => {
    setImageResult(imageSource);
  };

  useEffect(() => {
    const image = new Image();
    image.src = imageSource;
    image.addEventListener('load', handleImageLoad);
    image.addEventListener('error', handleImageError);

    return () => {
      image.removeEventListener('load', handleImageLoad);
      image.removeEventListener('error', handleImageError);
    };
  }, [imageSource]); // Empty dependency array, so this effect runs once when the component mounts

  return imageResult;
}

// Now, you can use 'avatarLoadStatus' in your component to track the loading status.

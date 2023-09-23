/*eslint-disable */
import { useEffect, useState,useCallback  } from 'react';
import pulseLoading from '../../images/loading/pulse-multiple.svg';
/**
 * Custom hook to load and display an image in a React component.
 * Handles loading and error states, and returns the image source or a loading placeholder.
 *
 * @param {string} imageSource - The URL of the image to be loaded.
 * @param {string} imageErrorPlaceholder - The URL of the placeholder image to be displayed in case of an error.
 * @param {boolean} showLoadingPlaceholder - Determines whether to show a loading placeholder while the image is being loaded. Defaults to `true`.
 * @returns {string} - The URL of the loaded image or the placeholder image.
 */
export default function useImage(
  imageSource,
  imageErrorPlaceholder,
  showLoadingPlaceholder = true
) {
  const [imageResult, setImageResult] = useState(
    showLoadingPlaceholder ? pulseLoading : null
  );

  const handleImageError = useCallback(() => {
    setImageResult(imageErrorPlaceholder);
  }, [imageErrorPlaceholder]);

  const handleImageLoad = useCallback(() => {
    setImageResult(imageSource);
  }, [imageSource]);

  useEffect(() => {
    const image = new Image();
    image.src = imageSource;
    image.addEventListener('load', handleImageLoad);
    image.addEventListener('error', handleImageError);

    return () => {
      image.removeEventListener('load', handleImageLoad);
      image.removeEventListener('error', handleImageError);
    };
  }, [imageSource]);

  return imageResult;
}

// Now, you can use 'avatarLoadStatus' in your component to track the loading status.

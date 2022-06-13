import { useState, useEffect } from 'react';

const getWindowSize = () => {
  return {
    width : document.documentElement.clientWidth,
    height : document.documentElement.clientHeight
  }
}

export default function useWindowSize () {
  const [windowSize, setWindowSize] = useState(getWindowSize())
  useEffect(() => {
    const handleResize = () => setWindowSize(getWindowSize())
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  })
  return windowSize
}
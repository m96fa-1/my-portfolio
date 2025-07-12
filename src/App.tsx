import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import MouseCursor from './components/MouseCursor';
import Header from './components/Header';
import Main from './components/Main';

/**
 * min-n = n: media (width >= m)
 * max-n = n: media (width < m)
 * 
 *  sm: 40rem ->  640px
 *  md: 48rem ->  768px
 *  lg: 64rem -> 1024px
 *  xl: 80rem -> 1280px
 * 2xl: 96rem -> 1536px
 */

export default function App() {
  const [screenWidth, setScreenWidth] = React.useState({
    '2xl': window.innerWidth >= 1536,
    'xl': window.innerWidth >= 1280,
    'lg': window.innerWidth >= 1024,
    'md': window.innerWidth >= 768,
    'sm': window.innerWidth >= 640,
    'max-sm': window.innerWidth < 640
  });

  React.useEffect(() => {
    const handleWindowResize = () => {
      const windowWidth = window.innerWidth;
      setScreenWidth({
        '2xl': windowWidth >= 1536,
        'xl': windowWidth >= 1280,
        'lg': windowWidth >= 1024,
        'md': windowWidth >= 768,
        'sm': windowWidth >= 640,
        'max-sm': windowWidth < 640
      });
    };
    
    window.addEventListener('resize', handleWindowResize);
    return () => window.addEventListener('resize', handleWindowResize);
  }, []);
  
  return (
    <>
      {screenWidth['md'] && <MouseCursor />}
      <Header screenWidth={screenWidth} />
      <Main screenWidth={screenWidth} />
      <Analytics />
    </>
  );
}
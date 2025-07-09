import React from 'react';
import MouseCursor from './components/MouseCursor';
import Header from './components/Header';
import Main from './components/Main';

/**
 * min-n = n: @media (width >= m)
 * max-n = n: @media (width < m)
 * 
 *  sm: 40rem ->  640px
 *  md: 48rem ->  768px
 *  lg: 64rem -> 1024px
 *  xl: 80rem -> 1280px
 * 2xl: 96rem -> 1536px
 */

export default function App() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleWindowResize = () => setIsMobile(window.innerWidth < 768);
    
    window.addEventListener('resize', handleWindowResize);
    return () => window.addEventListener('resize', handleWindowResize);
  }, []);
  
  return (
    <>
      {!isMobile && <MouseCursor />}
      <Header isMobile={isMobile} />
      <Main />
    </>
  );
}
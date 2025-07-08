import React from 'react';
import MouseCursor from './components/MouseCursor';
import Header from './components/Header';
import Main from './components/Main';

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
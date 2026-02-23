import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top if there's no pending section scroll (nav links set this)
    const pendingScroll = sessionStorage.getItem('scrollTo');
    if (!pendingScroll) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;
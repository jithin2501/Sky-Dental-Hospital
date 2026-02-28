import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const prev = prevPathRef.current;

    if (pathname !== '/') {
      // Going to any sub page — always scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (pathname === '/') {
      // Coming back to home via browser back button
      // Only set target if Header hasn't already queued one
      const hasHeaderTarget = sessionStorage.getItem('scrollTo');
      if (!hasHeaderTarget) {
        if (prev.startsWith('/services/'))  sessionStorage.setItem('scrollTo', 'services');
        else if (prev.startsWith('/about')) sessionStorage.setItem('scrollTo', 'about');
        else if (prev.startsWith('/team/'))  sessionStorage.setItem('scrollTo', 'team');
        else if (prev.startsWith('/facility')) sessionStorage.setItem('scrollTo', 'facilities');
      }
      // Header.jsx useEffect picks up scrollTo and scrolls to the right section
    }

    prevPathRef.current = pathname;
  }, [pathname]);

  return null;
}

export default ScrollToTop;
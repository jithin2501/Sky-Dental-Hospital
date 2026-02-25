import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathRef = useRef(sessionStorage.getItem('prevPath') || '');

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const prev = prevPathRef.current;

    if (pathname !== '/') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } 
    else if (pathname === '/') {
      let targetId = null;

      if (prev.startsWith('/about')) targetId = 'about';
      else if (prev.startsWith('/team')) targetId = 'team';
      else if (prev.startsWith('/services')) targetId = 'services';
      else if (prev.startsWith('/facility')) targetId = 'facilities';
      else if (prev.startsWith('/contact')) targetId = 'services';

      if (targetId) {
        const tryScroll = (retries = 30) => {
          const element = document.getElementById(targetId);
          if (element) {
            // FIX: Changed from 2000 to 90 to match your navbar height
            const headerOffset = 90; 
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'instant'
            });
          } else if (retries > 0) {
            setTimeout(() => tryScroll(retries - 1), 50);
          }
        };
        tryScroll();
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }

    prevPathRef.current = pathname;
    sessionStorage.setItem('prevPath', pathname);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathRef = useRef(sessionStorage.getItem('prevPath') || '');

  useEffect(() => {
    const prev = prevPathRef.current;

    if (pathname.startsWith('/team')) {
      window.scrollTo({ top: 0, behavior: 'instant' });

    } else if (pathname.startsWith('/services')) {
      window.scrollTo({ top: 0, behavior: 'instant' });

    } else if (pathname.startsWith('/facility')) {
      window.scrollTo({ top: 0, behavior: 'instant' });

    } else if (pathname === '/') {
      let targetId = null;

      if (prev.startsWith('/team')) targetId = 'team';
      else if (prev.startsWith('/services')) targetId = 'services';
      else if (prev.startsWith('/facility')) targetId = 'facilities';

      if (targetId) {
        // Retry until element is in the DOM, then jump instantly
        const tryScroll = (retries = 20) => {
          const element = document.getElementById(targetId);
          if (element) {
            const offset = 80;
            const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'instant' });
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
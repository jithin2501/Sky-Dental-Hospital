import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathRef = useRef(sessionStorage.getItem('prevPath') || '');

  useEffect(() => {
    const prev = prevPathRef.current;
    const pendingScroll = sessionStorage.getItem('scrollTo');

    if (pathname.startsWith('/team')) {
      // Always start at the top when opening a doctor profile
      window.scrollTo({ top: 0, behavior: 'instant' });

    } else if (pathname.startsWith('/services')) {
      // Always start at the top when opening a service detail page
      window.scrollTo({ top: 0, behavior: 'instant' });

    } else if (pathname.startsWith('/facility')) {
      // Always start at the top when opening a facility detail page
      window.scrollTo({ top: 0, behavior: 'instant' });

    } else if (pathname === '/' && prev.startsWith('/team')) {
      // Coming back from a doctor profile → jump to Team section
      sessionStorage.setItem('scrollTo', 'team');

    } else if (pathname === '/' && prev.startsWith('/services')) {
      // Coming back from a service detail page → jump to Services section
      sessionStorage.setItem('scrollTo', 'services');

    } else if (pathname === '/' && prev.startsWith('/facility')) {
      // Coming back from a facility detail page → jump to Facilities section
      sessionStorage.setItem('scrollTo', 'facilities');

    } else if (!pendingScroll) {
      // Any other navigation → scroll to top normally
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Check for pending scroll after navigation
    if (pathname === '/' && pendingScroll) {
      setTimeout(() => {
        const element = document.getElementById(pendingScroll);
        if (element) {
          const offset = 80; // Adjust for header height if needed
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }
        sessionStorage.removeItem('scrollTo');
      }, 100);
    }

    // Update ref and sessionStorage with current path for next navigation
    prevPathRef.current = pathname;
    sessionStorage.setItem('prevPath', pathname);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
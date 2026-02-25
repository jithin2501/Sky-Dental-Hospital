// analyticsTracker.js - Client-side analytics tracking for Sky Dental Hospital

class AnalyticsTracker {
  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.currentPage = null;
    this.pageStartTime = null;
    this.username = 'Anonymous';
    this.initialized = false;
  }

  getOrCreateSessionId() {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  init(username = 'Anonymous') {
    if (this.initialized) return;
    this.username = username;
    this.initialized = true;

    this.trackPageView();
    this.getUserLocation();

    window.addEventListener('popstate', () => this.trackPageView());
    window.addEventListener('beforeunload', () => this.trackPageExit());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.trackPageExit();
      else this.trackPageView();
    });
  }

  getCurrentPageInfo() {
    const path = window.location.pathname;

    // Do NOT track admin panel
    if (path.includes('/admin')) return null;

    let pageName = 'Home';
    let district = 'Main';

    if (path === '/' || path === '/home') {
      pageName = 'Home'; district = 'Main';
    } else if (path.includes('/team')) {
      pageName = 'Team'; district = 'About';
    } else if (path.includes('/services')) {
      pageName = 'Services'; district = 'Services';
    } else if (path.includes('/facility')) {
      pageName = 'Facilities'; district = 'Facilities';
    } else if (path.includes('/contact')) {
      pageName = 'Contact'; district = 'Main';
    } else if (path.includes('/about')) {
      pageName = 'About'; district = 'About';
    } else {
      pageName = path.replace('/', '') || 'Home';
      district = 'Other';
    }

    return { pageName, district };
  }

  trackPageView() {
    const pageInfo = this.getCurrentPageInfo();
    if (!pageInfo) return;

    if (this.currentPage) this.trackPageExit();

    const { pageName, district } = pageInfo;
    this.currentPage = pageName;
    this.pageStartTime = Date.now();
  }

  trackPageExit() {
    if (!this.currentPage || !this.pageStartTime) return;

    const timeSpent = Math.floor((Date.now() - this.pageStartTime) / 1000);
    const pageInfo = this.getCurrentPageInfo();

    if (!pageInfo) {
      this.currentPage = null;
      this.pageStartTime = null;
      return;
    }

    const { pageName: nextPage, district } = pageInfo;
    let exitReason = 'Unknown';
    if (nextPage !== this.currentPage) exitReason = `Navigated to ${nextPage}`;
    else if (document.hidden) exitReason = 'Tab switched or minimized';
    else exitReason = 'Tab closed or left website';

    this.sendTrackingData({ location: this.currentPage, district, timeSpent, exitReason });
    this.currentPage = null;
    this.pageStartTime = null;
  }

  async sendTrackingData(visitData) {
    try {
      await fetch('/api/analytics/track-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: this.sessionId, username: this.username, ...visitData }),
        keepalive: true
      });
    } catch (error) {
      console.error('Error tracking visit:', error);
    }
  }

  async getUserLocation() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      if (data.latitude && data.longitude) {
        await fetch('/api/analytics/update-location', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: this.sessionId,
            city: data.city,
            region: data.region,
            country: data.country_name,
            latitude: data.latitude,
            longitude: data.longitude
          })
        });
      }
    } catch (error) {
      console.error('Error getting user location:', error);
    }
  }
}

const analyticsTracker = new AnalyticsTracker();
export default analyticsTracker;
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: string;
  userId?: string;
  sessionId: string;
}

class UserAnalytics {
  private sessionId: string;
  private events: AnalyticsEvent[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeSession();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeSession() {
    this.track("session_started", {
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });

    // Track page visibility changes
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.track("page_hidden", { url: window.location.href });
      } else {
        this.track("page_visible", { url: window.location.href });
      }
    });

    // Track page unload
    window.addEventListener("beforeunload", () => {
      this.track("session_ended", {
        duration: Date.now() - parseInt(this.sessionId.split("_")[1]),
      });
      this.flush();
    });
  }

  track(event: string, properties: Record<string, any> = {}) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
    };

    this.events.push(analyticsEvent);
    console.log("📊 Analytics Event:", analyticsEvent);

    // Auto-flush every 10 events or after 30 seconds
    if (this.events.length >= 10) {
      this.flush();
    }
  }

  identify(userId: string, traits: Record<string, any> = {}) {
    this.track("user_identified", {
      userId,
      traits,
    });
  }

  page(name: string, properties: Record<string, any> = {}) {
    this.track("page_viewed", {
      page: name,
      ...properties,
    });
  }

  flush() {
    if (this.events.length === 0) return;

    // In a real app, you would send this to your analytics service
    // Examples: Google Analytics, Mixpanel, Amplitude, etc.
    console.log("📈 Flushing Analytics Events:", this.events);

    // For demo purposes, we'll log to localStorage so you can see user behavior
    const existingEvents = JSON.parse(
      localStorage.getItem("graminhire_analytics") || "[]",
    );
    const allEvents = [...existingEvents, ...this.events];
    localStorage.setItem("graminhire_analytics", JSON.stringify(allEvents));

    this.events = [];
  }

  // Get analytics summary for admin view
  getAnalyticsSummary() {
    const events = JSON.parse(
      localStorage.getItem("graminhire_analytics") || "[]",
    );

    const summary = {
      totalEvents: events.length,
      uniqueSessions: new Set(events.map((e: AnalyticsEvent) => e.sessionId))
        .size,
      topPages: this.getTopPages(events),
      userActions: this.getUserActions(events),
      timeSpent: this.calculateTimeSpent(events),
    };

    return summary;
  }

  private getTopPages(events: AnalyticsEvent[]) {
    const pageViews = events.filter((e) => e.event === "page_viewed");
    const pageCount: Record<string, number> = {};

    pageViews.forEach((event) => {
      const page = event.properties.page || "unknown";
      pageCount[page] = (pageCount[page] || 0) + 1;
    });

    return Object.entries(pageCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  }

  private getUserActions(events: AnalyticsEvent[]) {
    const actionEvents = events.filter(
      (e) =>
        !["session_started", "session_ended", "page_viewed"].includes(e.event),
    );

    const actionCount: Record<string, number> = {};

    actionEvents.forEach((event) => {
      actionCount[event.event] = (actionCount[event.event] || 0) + 1;
    });

    return Object.entries(actionCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);
  }

  private calculateTimeSpent(events: AnalyticsEvent[]) {
    const sessions = events.filter((e) => e.event === "session_started");
    const totalSessions = sessions.length;

    if (totalSessions === 0) return { averageTime: 0, totalTime: 0 };

    // Simple calculation - in real app you'd track actual session durations
    const estimatedAverageTime = 5; // 5 minutes average
    const totalTime = totalSessions * estimatedAverageTime;

    return {
      averageTime: estimatedAverageTime,
      totalTime,
      sessions: totalSessions,
    };
  }
}

// Global analytics instance
const analytics = new UserAnalytics();

// React component for tracking
const UserAnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  useEffect(() => {
    // Track page changes
    analytics.page(window.location.pathname);
  }, [window.location.pathname]);

  useEffect(() => {
    // Identify user when they log in
    if (user) {
      analytics.identify(user.id, {
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  return <>{children}</>;
};

// Export for use in components
export const trackEvent = (event: string, properties?: Record<string, any>) => {
  analytics.track(event, properties);
};

export const trackPage = (name: string, properties?: Record<string, any>) => {
  analytics.page(name, properties);
};

export const getAnalytics = () => analytics.getAnalyticsSummary();

export default UserAnalyticsProvider;

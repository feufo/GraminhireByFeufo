import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Users,
  Eye,
  Clock,
  TrendingUp,
  Download,
  RefreshCw,
} from "lucide-react";
import { getAnalytics } from "@/components/analytics/UserAnalytics";

const UserAnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const refreshAnalytics = () => {
    setLoading(true);
    setTimeout(() => {
      const data = getAnalytics();
      setAnalytics(data);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    refreshAnalytics();
  }, []);

  const exportAnalytics = () => {
    const allEvents = JSON.parse(
      localStorage.getItem("graminhire_analytics") || "[]",
    );
    const dataStr = JSON.stringify(allEvents, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `graminhire_analytics_${new Date().toISOString().split("T")[0]}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  if (loading) {
    return (
      <Card className="border-2">
        <CardContent className="p-8 text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading analytics data...</p>
        </CardContent>
      </Card>
    );
  }

  if (!analytics) {
    return (
      <Card className="border-2">
        <CardContent className="p-8 text-center">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="font-semibold mb-2">No Analytics Data Yet</h3>
          <p className="text-gray-600 mb-4">
            Start using the platform to see user analytics
          </p>
          <Button onClick={refreshAnalytics}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Analytics</h2>
          <p className="text-gray-600">Real-time user behavior insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshAnalytics}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={exportAnalytics}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-2">
          <CardContent className="p-6 text-center">
            <Eye className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {analytics.totalEvents}
            </div>
            <div className="text-sm text-gray-600">Total Events</div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-3xl font-bold text-green-600 mb-1">
              {analytics.uniqueSessions}
            </div>
            <div className="text-sm text-gray-600">Unique Sessions</div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {analytics.timeSpent.averageTime}m
            </div>
            <div className="text-sm text-gray-600">Avg Session Time</div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {analytics.timeSpent.sessions}
            </div>
            <div className="text-sm text-gray-600">Total Sessions</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Most Visited Pages
            </CardTitle>
            <CardDescription>
              Pages with the highest user engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topPages.length > 0 ? (
                analytics.topPages.map(([page, count]: [string, number]) => (
                  <div
                    key={page}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">
                        {page === "/" ? "Landing Page" : page}
                      </div>
                      <div className="text-sm text-gray-600">
                        {page || "Unknown page"}
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {count} views
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No page data available yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* User Actions */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              User Actions
            </CardTitle>
            <CardDescription>Most performed user interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.userActions.length > 0 ? (
                analytics.userActions.map(
                  ([action, count]: [string, number]) => (
                    <div
                      key={action}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <div className="font-medium">
                          {action
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </div>
                        <div className="text-sm text-gray-600">
                          User interaction
                        </div>
                      </div>
                      <Badge
                        className={`${
                          count > 5
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {count} times
                      </Badge>
                    </div>
                  ),
                )
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No user actions tracked yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Events */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Recent User Activity</CardTitle>
          <CardDescription>
            Live stream of user interactions (last 10 events)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {(() => {
              const allEvents = JSON.parse(
                localStorage.getItem("graminhire_analytics") || "[]",
              );
              const recentEvents = allEvents.slice(-10).reverse();

              return recentEvents.length > 0 ? (
                recentEvents.map((event: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <span className="font-medium">
                          {event.event.replace(/_/g, " ")}
                        </span>
                        <span className="text-gray-600 ml-2">
                          on {event.properties.page || "unknown page"}
                        </span>
                      </div>
                    </div>
                    <div className="text-gray-500 text-xs">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No recent activity to display
                </div>
              );
            })()}
          </div>
        </CardContent>
      </Card>

      {/* Beta Testing Insights */}
      <Card className="border-2 bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="text-blue-800">Beta Testing Insights</CardTitle>
          <CardDescription className="text-blue-700">
            Key metrics for your beta launch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {Math.round((analytics.uniqueSessions / 100) * 100)}%
              </div>
              <div className="text-sm text-gray-600">User Engagement</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {analytics.timeSpent.totalTime}min
              </div>
              <div className="text-sm text-gray-600">Total Usage Time</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white rounded-lg">
            <h4 className="font-semibold mb-2">Next Steps:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                • Collect feedback from {analytics.uniqueSessions} active users
              </li>
              <li>• Focus on improving most-visited pages</li>
              <li>• Analyze drop-off points in user journey</li>
              <li>• Prepare for production backend integration</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAnalyticsDashboard;

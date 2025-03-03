import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import AnalyticsOverview from "./dashboard/AnalyticsOverview";
import CampaignsList from "./dashboard/CampaignsList";
import QuickActions from "./dashboard/QuickActions";

const Home = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock data for analytics
  const analyticsData = {
    stats: {
      profilesScraped: 1248,
      emailsSent: 843,
      responseRate: 24.6,
      activeCampaigns: 3,
    },
    changes: {
      profilesScraped: { value: 12.5, trend: "up" },
      emailsSent: { value: 8.2, trend: "up" },
      responseRate: { value: 2.1, trend: "up" },
      activeCampaigns: { value: 0, trend: "neutral" },
    },
  };

  // Handler functions for quick actions
  const handleNewSearch = () => {
    navigate("/search");
  };

  const handleCreateTemplate = () => {
    navigate("/templates");
  };

  const handleScheduleCampaign = () => {
    navigate("/campaigns");
  };

  // Handler functions for campaign actions
  const handleEditCampaign = (id: string) => {
    navigate(`/campaigns?id=${id}`);
  };

  const handleViewAnalytics = (id: string) => {
    navigate(`/campaigns?id=${id}&tab=analytics`);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? "w-16" : "w-64"} transition-all duration-300 ease-in-out`}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500">
                Welcome to your LinkedIn Resume Scraper dashboard
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Analytics Overview */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Analytics Overview</h2>
            <AnalyticsOverview
              stats={analyticsData.stats}
              changes={analyticsData.changes}
            />
          </div>

          {/* Quick Actions */}
          <QuickActions
            onNewSearch={handleNewSearch}
            onCreateTemplate={handleCreateTemplate}
            onScheduleCampaign={handleScheduleCampaign}
          />

          {/* Campaigns List */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <CampaignsList
              onEditCampaign={handleEditCampaign}
              onViewAnalytics={handleViewAnalytics}
            />
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 border-b last:border-0"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${activityTypeStyles[activity.type]}`}
                  >
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.message}</p>
                    <p className="text-sm text-gray-500">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock data for recent activities
const recentActivities = [
  {
    type: "search",
    message: 'New search for "React Developers in San Francisco" completed',
    timestamp: "2 hours ago",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    ),
  },
  {
    type: "email",
    message: 'Campaign "Senior Developer Outreach" sent 15 new emails',
    timestamp: "4 hours ago",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    ),
  },
  {
    type: "response",
    message: 'John Doe responded to your "Initial Connection" email',
    timestamp: "1 day ago",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
  },
  {
    type: "template",
    message: 'New email template "Follow-up Reminder" created',
    timestamp: "2 days ago",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
  },
];

// Styles for activity types
const activityTypeStyles = {
  search: "bg-blue-100 text-blue-600",
  email: "bg-indigo-100 text-indigo-600",
  response: "bg-green-100 text-green-600",
  template: "bg-purple-100 text-purple-600",
};

export default Home;

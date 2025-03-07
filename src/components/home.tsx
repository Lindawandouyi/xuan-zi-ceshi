import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnalyticsOverview from "./dashboard/AnalyticsOverview";
import CampaignsList from "./dashboard/CampaignsList";
import QuickActions from "./dashboard/QuickActions";

interface HomeProps {
  sidebarCollapsed?: boolean;
}

const Home = ({ sidebarCollapsed = false }: HomeProps) => {
  const navigate = useNavigate();

  // Mock data for analytics
  const analyticsData = {
    stats: {
      profilesScraped: 1248,
      emailsSent: 843,
      responseRate: 24.6,
      activeCampaigns: 3,
    },
    changes: {
      profilesScraped: { value: 12.5, trend: "up" as const },
      emailsSent: { value: 8.2, trend: "up" as const },
      responseRate: { value: 2.1, trend: "up" as const },
      activeCampaigns: { value: 0, trend: "neutral" as const },
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
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">我的仪表盘</h1>
          <p className="text-gray-500">
            欢迎使用领英简历抓取工具
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            最后更新: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">数据概览</h2>
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
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { ChevronLeft, BarChart2, Users, Mail, Clock } from "lucide-react";
import CampaignScheduler from "../components/campaigns/CampaignScheduler";
import CampaignDetails from "../components/campaigns/CampaignDetails";

interface Campaign {
  id: string;
  name: string;
  status: "draft" | "scheduled" | "active" | "completed" | "paused";
  startDate: string;
  targetAudience: string;
  totalRecipients: number;
  sentEmails: number;
  openRate: number;
  responseRate: number;
}

const CampaignsPage = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );
  const [showScheduler, setShowScheduler] = useState<boolean>(false);

  // Mock campaigns data
  const campaigns: Campaign[] = [
    {
      id: "1",
      name: "高级开发者外联",
      status: "active",
      startDate: "2023-10-15",
      targetAudience: "5年以上经验的软件工程师",
      totalRecipients: 150,
      sentEmails: 89,
      openRate: 42,
      responseRate: 15,
    },
    {
      id: "2",
      name: "UX设计师招聘",
      status: "scheduled",
      startDate: "2023-10-25",
      targetAudience: "旧金山的UX/UI设计师",
      totalRecipients: 75,
      sentEmails: 0,
      openRate: 0,
      responseRate: 0,
    },
    {
      id: "3",
      name: "数据科学家搜索",
      status: "completed",
      startDate: "2023-09-20",
      targetAudience: "有机器学习经验的数据科学家",
      totalRecipients: 120,
      sentEmails: 120,
      openRate: 68,
      responseRate: 22,
    },
  ];

  const handleCreateCampaign = () => {
    setShowScheduler(true);
    setSelectedCampaign(null);
  };

  const handleBackToOverview = () => {
    setShowScheduler(false);
    setSelectedCampaign(null);
    setActiveTab("overview");
  };

  const handleViewCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowScheduler(false);
  };

  if (showScheduler) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToOverview}
            className="mr-4"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            返回
          </Button>
          <h1 className="text-2xl font-bold">安排新活动</h1>
        </div>
        <CampaignScheduler onCancel={handleBackToOverview} />
      </div>
    );
  }

  if (selectedCampaign) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToOverview}
            className="mr-4"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            返回
          </Button>
          <h1 className="text-2xl font-bold">{selectedCampaign.name}</h1>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              活动详情
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              分析
            </TabsTrigger>
            <TabsTrigger value="recipients" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              收件人
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              时间表
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <CampaignDetails campaign={selectedCampaign} />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold mb-4">活动分析</h2>
              <p className="text-gray-500">
                此处将显示活动的详细分析数据。
              </p>
            </div>
          </TabsContent>

          <TabsContent value="recipients">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold mb-4">收件人列表</h2>
              <p className="text-gray-500">
                此处将显示活动的收件人列表。
              </p>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold mb-4">活动时间表</h2>
              <p className="text-gray-500">
                此处将显示活动的发送时间表。
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">活动</h1>
          <p className="text-gray-500">
            管理您的外联活动和自动化邮件序列
          </p>
        </div>
        <Button onClick={handleCreateCampaign}>创建新活动</Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="active">活跃</TabsTrigger>
          <TabsTrigger value="scheduled">已计划</TabsTrigger>
          <TabsTrigger value="completed">已完成</TabsTrigger>
          <TabsTrigger value="drafts">草稿</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">活跃活动</h3>
              <p className="text-3xl font-bold">
                {campaigns.filter((c) => c.status === "active").length}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">已发送邮件</h3>
              <p className="text-3xl font-bold">
                {campaigns.reduce((sum, c) => sum + c.sentEmails, 0)}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">平均打开率</h3>
              <p className="text-3xl font-bold">
                {Math.round(
                  campaigns.reduce(
                    (sum, c) => sum + (c.sentEmails > 0 ? c.openRate : 0),
                    0,
                  ) / campaigns.filter((c) => c.sentEmails > 0).length,
                )}
                %
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">平均回复率</h3>
              <p className="text-3xl font-bold">
                {Math.round(
                  campaigns.reduce(
                    (sum, c) => sum + (c.sentEmails > 0 ? c.responseRate : 0),
                    0,
                  ) / campaigns.filter((c) => c.sentEmails > 0).length,
                )}
                %
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">最近活动</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="p-4 border-b">
                    <h3 className="font-semibold text-lg mb-1">
                      {campaign.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      开始于: {campaign.startDate}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">状态</p>
                        <p className="font-medium">
                          {campaign.status === "active"
                            ? "活跃"
                            : campaign.status === "scheduled"
                            ? "已计划"
                            : campaign.status === "completed"
                            ? "已完成"
                            : campaign.status === "paused"
                            ? "已暂停"
                            : "草稿"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">收件人</p>
                        <p className="font-medium">{campaign.totalRecipients}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">打开率</p>
                        <p className="font-medium">{campaign.openRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">回复率</p>
                        <p className="font-medium">{campaign.responseRate}%</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleViewCampaign(campaign)}
                      className="w-full"
                    >
                      查看详情
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">活跃活动</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaigns
                .filter((c) => c.status === "active")
                .map((campaign) => (
                  <div
                    key={campaign.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-lg mb-1">
                        {campaign.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        开始于: {campaign.startDate}
                      </div>
                    </div>
                    <div className="p-4">
                      <Button
                        onClick={() => handleViewCampaign(campaign)}
                        className="w-full"
                      >
                        查看详情
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">已计划活动</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaigns
                .filter((c) => c.status === "scheduled")
                .map((campaign) => (
                  <div
                    key={campaign.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-lg mb-1">
                        {campaign.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        开始于: {campaign.startDate}
                      </div>
                    </div>
                    <div className="p-4">
                      <Button
                        onClick={() => handleViewCampaign(campaign)}
                        className="w-full"
                      >
                        查看详情
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">已完成活动</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaigns
                .filter((c) => c.status === "completed")
                .map((campaign) => (
                  <div
                    key={campaign.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-lg mb-1">
                        {campaign.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        开始于: {campaign.startDate}
                      </div>
                    </div>
                    <div className="p-4">
                      <Button
                        onClick={() => handleViewCampaign(campaign)}
                        className="w-full"
                      >
                        查看详情
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="drafts">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">草稿活动</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaigns
                .filter((c) => c.status === "draft")
                .map((campaign) => (
                  <div
                    key={campaign.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-lg mb-1">
                        {campaign.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        创建于: {campaign.startDate}
                      </div>
                    </div>
                    <div className="p-4">
                      <Button
                        onClick={() => handleViewCampaign(campaign)}
                        className="w-full"
                      >
                        编辑草稿
                      </Button>
                    </div>
                  </div>
                ))}
              {campaigns.filter((c) => c.status === "draft").length === 0 && (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500">没有草稿活动</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignsPage;

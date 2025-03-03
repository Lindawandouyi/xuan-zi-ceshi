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
      name: "Senior Developer Outreach",
      status: "active",
      startDate: "2023-10-15",
      targetAudience: "Software Engineers with 5+ years experience",
      totalRecipients: 150,
      sentEmails: 89,
      openRate: 42,
      responseRate: 15,
    },
    {
      id: "2",
      name: "UX Designer Recruitment",
      status: "scheduled",
      startDate: "2023-10-25",
      targetAudience: "UX/UI Designers in San Francisco",
      totalRecipients: 75,
      sentEmails: 0,
      openRate: 0,
      responseRate: 0,
    },
    {
      id: "3",
      name: "Product Manager Follow-up",
      status: "completed",
      startDate: "2023-09-10",
      targetAudience: "Product Managers in Tech Industry",
      totalRecipients: 120,
      sentEmails: 120,
      openRate: 68,
      responseRate: 22,
    },
    {
      id: "4",
      name: "Data Science Talent Search",
      status: "paused",
      startDate: "2023-10-05",
      targetAudience: "Data Scientists and ML Engineers",
      totalRecipients: 200,
      sentEmails: 45,
      openRate: 38,
      responseRate: 8,
    },
  ];

  const handleCreateCampaign = () => {
    setShowScheduler(true);
  };

  const handleScheduleSubmit = (data: any) => {
    console.log("Campaign scheduled:", data);
    setShowScheduler(false);
    // In a real app, would create the campaign and refresh the list
  };

  const handleCampaignSelect = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (showScheduler) {
    return (
      <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setShowScheduler(false)}
            className="mb-4"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Campaigns
          </Button>
          <h1 className="text-2xl font-bold">Create New Campaign</h1>
        </div>
        <CampaignScheduler onSchedule={handleScheduleSubmit} />
      </div>
    );
  }

  if (selectedCampaign) {
    return (
      <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setSelectedCampaign(null)}
            className="mb-4"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Campaigns
          </Button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{selectedCampaign.name}</h1>
              <div className="flex items-center mt-1">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedCampaign.status)}`}
                >
                  {selectedCampaign.status.charAt(0).toUpperCase() +
                    selectedCampaign.status.slice(1)}
                </span>
                <span className="text-sm text-gray-500 ml-3">
                  Started: {selectedCampaign.startDate}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {selectedCampaign.status === "active" && (
                <Button variant="outline">Pause Campaign</Button>
              )}
              {selectedCampaign.status === "paused" && (
                <Button variant="outline">Resume Campaign</Button>
              )}
              <Button variant="destructive">Delete Campaign</Button>
            </div>
          </div>
        </div>

        <CampaignDetails />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Email Campaigns</h1>
        <Button onClick={handleCreateCampaign}>Create Campaign</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700">
                  Total Campaigns
                </h3>
                <BarChart2 className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-3xl font-bold mt-2">{campaigns.length}</p>
              <p className="text-sm text-gray-500 mt-1">Across all statuses</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700">
                  Active Campaigns
                </h3>
                <Mail className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold mt-2">
                {campaigns.filter((c) => c.status === "active").length}
              </p>
              <p className="text-sm text-gray-500 mt-1">Currently sending</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700">
                  Total Recipients
                </h3>
                <Users className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-3xl font-bold mt-2">
                {campaigns.reduce(
                  (sum, campaign) => sum + campaign.totalRecipients,
                  0,
                )}
              </p>
              <p className="text-sm text-gray-500 mt-1">Across all campaigns</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700">
                  Avg. Response Rate
                </h3>
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <p className="text-3xl font-bold mt-2">
                {Math.round(
                  campaigns.reduce(
                    (sum, campaign) => sum + campaign.responseRate,
                    0,
                  ) / campaigns.length,
                )}
                %
              </p>
              <p className="text-sm text-gray-500 mt-1">Overall performance</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Recent Campaigns</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Target Audience
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Open Rate
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Response Rate
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <tr
                      key={campaign.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleCampaignSelect(campaign)}
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {campaign.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Started: {campaign.startDate}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(campaign.status)}`}
                        >
                          {campaign.status.charAt(0).toUpperCase() +
                            campaign.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {campaign.targetAudience}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{
                                width: `${Math.round((campaign.sentEmails / campaign.totalRecipients) * 100)}%`,
                              }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">
                            {campaign.sentEmails}/{campaign.totalRecipients}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {campaign.openRate}%
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {campaign.responseRate}%
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCampaignSelect(campaign);
                          }}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Active Campaigns</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Target Audience
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Open Rate
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Response Rate
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns
                    .filter((c) => c.status === "active")
                    .map((campaign) => (
                      <tr
                        key={campaign.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleCampaignSelect(campaign)}
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {campaign.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Started: {campaign.startDate}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {campaign.targetAudience}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{
                                  width: `${Math.round((campaign.sentEmails / campaign.totalRecipients) * 100)}%`,
                                }}
                              ></div>
                            </div>
                            <span className="ml-2 text-xs text-gray-500">
                              {campaign.sentEmails}/{campaign.totalRecipients}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {campaign.openRate}%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {campaign.responseRate}%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle pause action
                            }}
                          >
                            Pause
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCampaignSelect(campaign);
                            }}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Scheduled Campaigns</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Target Audience
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recipients
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns
                    .filter((c) => c.status === "scheduled")
                    .map((campaign) => (
                      <tr
                        key={campaign.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleCampaignSelect(campaign)}
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {campaign.name}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {campaign.startDate}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {campaign.targetAudience}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {campaign.totalRecipients}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle edit action
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCampaignSelect(campaign);
                            }}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Completed Campaigns</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Target Audience
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recipients
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Open Rate
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Response Rate
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns
                    .filter((c) => c.status === "completed")
                    .map((campaign) => (
                      <tr
                        key={campaign.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleCampaignSelect(campaign)}
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {campaign.name}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {campaign.startDate}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {campaign.targetAudience}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {campaign.totalRecipients}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {campaign.openRate}%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {campaign.responseRate}%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle duplicate action
                            }}
                          >
                            Duplicate
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCampaignSelect(campaign);
                            }}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignsPage;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowUp, ArrowDown, Users, Mail, BarChart, Clock } from "lucide-react";

interface AnalyticCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
  description?: string;
  className?: string;
}

const AnalyticCard = ({
  title,
  value,
  icon,
  change,
  description,
  className = "",
}: AnalyticCardProps) => {
  return (
    <Card className={`bg-white ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted/20 p-1.5 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs flex items-center mt-1">
            {change.trend === "up" ? (
              <ArrowUp className="h-3 w-3 text-emerald-500 mr-1" />
            ) : change.trend === "down" ? (
              <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
            ) : null}
            <span
              className={`${change.trend === "up" ? "text-emerald-500" : change.trend === "down" ? "text-red-500" : "text-gray-500"}`}
            >
              {change.value}%
            </span>
            <span className="text-muted-foreground ml-1">
              {description || "from last month"}
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

interface AnalyticsOverviewProps {
  stats?: {
    profilesScraped: number;
    emailsSent: number;
    responseRate: number;
    activeCampaigns: number;
  };
  changes?: {
    profilesScraped: { value: number; trend: "up" | "down" | "neutral" };
    emailsSent: { value: number; trend: "up" | "down" | "neutral" };
    responseRate: { value: number; trend: "up" | "down" | "neutral" };
    activeCampaigns: { value: number; trend: "up" | "down" | "neutral" };
  };
}

const AnalyticsOverview = ({
  stats = {
    profilesScraped: 1248,
    emailsSent: 843,
    responseRate: 24.6,
    activeCampaigns: 3,
  },
  changes = {
    profilesScraped: { value: 12.5, trend: "up" },
    emailsSent: { value: 8.2, trend: "up" },
    responseRate: { value: 2.1, trend: "up" },
    activeCampaigns: { value: 0, trend: "neutral" },
  },
}: AnalyticsOverviewProps) => {
  return (
    <div className="w-full bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticCard
          title="Profiles Scraped"
          value={stats.profilesScraped.toLocaleString()}
          icon={<Users className="h-5 w-5 text-blue-600" />}
          change={changes.profilesScraped}
        />
        <AnalyticCard
          title="Emails Sent"
          value={stats.emailsSent.toLocaleString()}
          icon={<Mail className="h-5 w-5 text-indigo-600" />}
          change={changes.emailsSent}
        />
        <AnalyticCard
          title="Response Rate"
          value={`${stats.responseRate}%`}
          icon={<BarChart className="h-5 w-5 text-emerald-600" />}
          change={changes.responseRate}
          description="from previous campaigns"
        />
        <AnalyticCard
          title="Active Campaigns"
          value={stats.activeCampaigns}
          icon={<Clock className="h-5 w-5 text-amber-600" />}
          change={changes.activeCampaigns}
          description="currently running"
        />
      </div>
    </div>
  );
};

export default AnalyticsOverview;

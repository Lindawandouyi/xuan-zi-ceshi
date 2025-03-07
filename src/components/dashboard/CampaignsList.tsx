import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowUpDown,
  MoreHorizontal,
  Play,
  Pause,
  Edit,
  Trash,
  Copy,
  BarChart,
  Mail,
  Clock,
  Calendar,
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed" | "scheduled";
  progress: number;
  sentEmails: number;
  totalEmails: number;
  responseRate: number;
  startDate: string;
  template: string;
  lastActivity: string;
}

interface CampaignsListProps {
  campaigns?: Campaign[];
  onEditCampaign?: (id: string) => void;
  onDeleteCampaign?: (id: string) => void;
  onDuplicateCampaign?: (id: string) => void;
  onPauseCampaign?: (id: string) => void;
  onResumeCampaign?: (id: string) => void;
  onViewAnalytics?: (id: string) => void;
}

const CampaignsList = ({
  campaigns = defaultCampaigns,
  onEditCampaign = () => {},
  onDeleteCampaign = () => {},
  onDuplicateCampaign = () => {},
  onPauseCampaign = () => {},
  onResumeCampaign = () => {},
  onViewAnalytics = () => {},
}: CampaignsListProps) => {
  const [sortColumn, setSortColumn] = useState<keyof Campaign>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof Campaign) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedCampaigns = [...campaigns].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const getStatusBadgeVariant = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "success";
      case "paused":
        return "warning";
      case "completed":
        return "secondary";
      case "scheduled":
        return "info";
      default:
        return "default";
    }
  };

  const getStatusText = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "活跃";
      case "paused":
        return "已暂停";
      case "completed":
        return "已完成";
      case "scheduled":
        return "已计划";
      default:
        return status;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">活动列表</h2>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          查看所有活动
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">最近活动</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    活动名称
                    {sortColumn === "name" && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    状态
                    {sortColumn === "status" && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("progress")}
                >
                  <div className="flex items-center justify-end">
                    进度
                    {sortColumn === "progress" && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("responseRate")}
                >
                  <div className="flex items-center justify-end">
                    回复率
                    {sortColumn === "responseRate" && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div className="font-medium">{campaign.name}</div>
                    <div className="text-xs text-gray-500 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {campaign.lastActivity}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(campaign.status)}>
                      {getStatusText(campaign.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="font-medium">
                      {campaign.progress}% ({campaign.sentEmails}/
                      {campaign.totalEmails})
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{ width: `${campaign.progress}%` }}
                      ></div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {campaign.responseRate}%
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewAnalytics(campaign.id)}
                      >
                        <BarChart className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditCampaign(campaign.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {campaign.status === "active" ? (
                            <DropdownMenuItem
                              onClick={() => onPauseCampaign(campaign.id)}
                            >
                              <Pause className="h-4 w-4 mr-2" />
                              暂停活动
                            </DropdownMenuItem>
                          ) : campaign.status === "paused" ? (
                            <DropdownMenuItem
                              onClick={() => onResumeCampaign(campaign.id)}
                            >
                              <Play className="h-4 w-4 mr-2" />
                              恢复活动
                            </DropdownMenuItem>
                          ) : null}
                          <DropdownMenuItem
                            onClick={() => onDuplicateCampaign(campaign.id)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            复制活动
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDeleteCampaign(campaign.id)}
                            className="text-red-600"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            删除活动
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const defaultCampaigns: Campaign[] = [
  {
    id: "1",
    name: "高级开发者外联",
    status: "active",
    progress: 65,
    sentEmails: 89,
    totalEmails: 137,
    responseRate: 24.6,
    startDate: "2023-10-15",
    template: "初次联系",
    lastActivity: "2小时前",
  },
  {
    id: "2",
    name: "UX设计师招聘",
    status: "scheduled",
    progress: 0,
    sentEmails: 0,
    totalEmails: 75,
    responseRate: 0,
    startDate: "2023-10-25",
    template: "设计师外联",
    lastActivity: "1天前",
  },
  {
    id: "3",
    name: "产品经理招聘",
    status: "paused",
    progress: 42,
    sentEmails: 32,
    totalEmails: 76,
    responseRate: 18.7,
    startDate: "2023-10-10",
    template: "产品团队扩张",
    lastActivity: "5小时前",
  },
  {
    id: "4",
    name: "数据科学家外联",
    status: "completed",
    progress: 100,
    sentEmails: 112,
    totalEmails: 112,
    responseRate: 31.2,
    startDate: "2023-09-28",
    template: "数据团队招聘",
    lastActivity: "3天前",
  },
];

export default CampaignsList;

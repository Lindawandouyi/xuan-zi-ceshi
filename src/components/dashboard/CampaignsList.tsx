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
  const [sortColumn, setSortColumn] = useState<keyof Campaign>("startDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

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

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const getStatusBadgeVariant = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "default";
      case "paused":
        return "secondary";
      case "completed":
        return "outline";
      case "scheduled":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex justify-between items-center">
          <span>Active Campaigns</span>
          <Button size="sm">
            <Mail className="mr-2 h-4 w-4" /> New Campaign
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Campaign Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Progress</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("responseRate")}
                >
                  <div className="flex items-center">
                    Response Rate
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("startDate")}
                >
                  <div className="flex items-center">
                    Start Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("lastActivity")}
                >
                  <div className="flex items-center">
                    Last Activity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCampaigns.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Mail className="h-10 w-10 mb-2 opacity-20" />
                      <p>No campaigns found</p>
                      <Button variant="outline" className="mt-4">
                        Create your first campaign
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                sortedCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {campaign.template}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(campaign.status)}>
                        {campaign.status.charAt(0).toUpperCase() +
                          campaign.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${campaign.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {campaign.sentEmails}/{campaign.totalEmails}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span
                          className={`font-medium ${campaign.responseRate >= 15 ? "text-green-600" : campaign.responseRate >= 5 ? "text-amber-600" : "text-red-600"}`}
                        >
                          {campaign.responseRate}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{campaign.startDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{campaign.lastActivity}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        {campaign.status === "active" ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onPauseCampaign(campaign.id)}
                            className="h-8 w-8"
                          >
                            <Pause className="h-4 w-4" />
                          </Button>
                        ) : campaign.status === "paused" ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onResumeCampaign(campaign.id)}
                            className="h-8 w-8"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        ) : null}

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onViewAnalytics(campaign.id)}
                          className="h-8 w-8"
                        >
                          <BarChart className="h-4 w-4" />
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => onEditCampaign(campaign.id)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDuplicateCampaign(campaign.id)}
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDeleteCampaign(campaign.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

const defaultCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Senior Developer Outreach",
    status: "active",
    progress: 65,
    sentEmails: 65,
    totalEmails: 100,
    responseRate: 18,
    startDate: "2023-10-15",
    template: "Initial Connection",
    lastActivity: "2 hours ago",
  },
  {
    id: "2",
    name: "Product Manager Recruitment",
    status: "paused",
    progress: 30,
    sentEmails: 30,
    totalEmails: 100,
    responseRate: 12,
    startDate: "2023-10-10",
    template: "Follow-up Message",
    lastActivity: "1 day ago",
  },
  {
    id: "3",
    name: "UX Designer Campaign",
    status: "completed",
    progress: 100,
    sentEmails: 75,
    totalEmails: 75,
    responseRate: 22,
    startDate: "2023-09-28",
    template: "Interview Invitation",
    lastActivity: "5 days ago",
  },
  {
    id: "4",
    name: "DevOps Engineer Search",
    status: "scheduled",
    progress: 0,
    sentEmails: 0,
    totalEmails: 50,
    responseRate: 0,
    startDate: "2023-10-25",
    template: "Initial Connection",
    lastActivity: "Just now",
  },
  {
    id: "5",
    name: "Marketing Specialist Outreach",
    status: "active",
    progress: 42,
    sentEmails: 21,
    totalEmails: 50,
    responseRate: 9,
    startDate: "2023-10-12",
    template: "Follow-up Message",
    lastActivity: "3 hours ago",
  },
];

export default CampaignsList;

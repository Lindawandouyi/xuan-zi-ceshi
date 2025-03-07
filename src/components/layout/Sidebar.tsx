import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Search,
  Mail,
  Send,
  Settings,
  LogOut,
  HelpCircle,
  Bell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

const Sidebar = ({
  collapsed = false,
  onToggle = () => {},
  userName = "Alex Johnson",
  userEmail = "alex@example.com",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
}: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    { path: "/", label: "仪表盘", icon: <LayoutDashboard size={20} /> },
    { path: "/search", label: "搜索", icon: <Search size={20} /> },
    { path: "/templates", label: "模板", icon: <Mail size={20} /> },
    { path: "/campaigns", label: "活动", icon: <Send size={20} /> },
    { path: "/settings", label: "设置", icon: <Settings size={20} /> },
  ];

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="h-full flex flex-col bg-white border-r shadow-sm">
      {/* Toggle button */}
      <div className="absolute right-[-12px] top-12 z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 rounded-full border bg-white shadow-md"
          onClick={onToggle}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </Button>
      </div>

      {/* Logo and brand */}
      <div className="p-4 flex items-center justify-center border-b">
        {collapsed ? (
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">领</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">领</span>
            </div>
            <span className="font-bold text-lg">领英抓取工具</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {navigationItems.map((item) => (
            <Link to={item.path} key={item.path}>
              <div
                className={`flex items-center ${collapsed ? "justify-center" : "justify-start"} px-3 py-2.5 rounded-md transition-colors ${isActive(item.path) ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-100"}`}
              >
                {collapsed ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>{item.icon}</div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <>
                    <span className="mr-3">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </>
                )}
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Notifications and help */}
      <div className="px-2 py-2 border-t border-b">
        <div className="flex items-center justify-around">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-primary"
                >
                  <Bell size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>通知</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-primary"
                >
                  <HelpCircle size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>帮助与支持</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* User profile */}
      <div className="p-4 border-t">
        {collapsed ? (
          <div className="flex justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>
                      {userName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{userName}</p>
                  <p className="text-xs opacity-70">{userEmail}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>
                {userName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="font-medium truncate">{userName}</p>
              <p className="text-xs text-gray-500 truncate">{userEmail}</p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-destructive"
                  >
                    <LogOut size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>退出登录</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

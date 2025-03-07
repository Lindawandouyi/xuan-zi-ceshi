import React from "react";
import { Button } from "../ui/button";
import { Search, Plus, FileText } from "lucide-react";

interface QuickActionsProps {
  onNewSearch?: () => void;
  onCreateTemplate?: () => void;
  onScheduleCampaign?: () => void;
}

const QuickActions = ({
  onNewSearch = () => {},
  onCreateTemplate = () => {},
  onScheduleCampaign = () => {},
}: QuickActionsProps) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">快捷操作</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={onNewSearch}
            className="flex items-center gap-2"
            variant="outline"
          >
            <Search className="h-4 w-4" />
            新建搜索
          </Button>
          <Button
            onClick={onCreateTemplate}
            className="flex items-center gap-2"
            variant="outline"
          >
            <FileText className="h-4 w-4" />
            创建模板
          </Button>
          <Button
            onClick={onScheduleCampaign}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            安排活动
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;

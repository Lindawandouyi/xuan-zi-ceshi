import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreVertical, Edit, Trash, Copy } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  isDefault?: boolean;
}

interface TemplatesListProps {
  templates?: Template[];
  onSelectTemplate?: (templateId: string) => void;
  onCreateTemplate?: () => void;
  onEditTemplate?: (templateId: string) => void;
  onDeleteTemplate?: (templateId: string) => void;
  onDuplicateTemplate?: (templateId: string) => void;
  selectedTemplateId?: string;
}

const TemplatesList = ({
  templates = [
    {
      id: "1",
      name: "Initial Connection",
      description: "Template for first outreach",
      lastModified: "2023-10-15",
      isDefault: true,
    },
    {
      id: "2",
      name: "Follow-up Message",
      description: "For candidates who didn't respond",
      lastModified: "2023-10-10",
    },
    {
      id: "3",
      name: "Interview Invitation",
      description: "Invite selected candidates to interview",
      lastModified: "2023-09-28",
    },
    {
      id: "4",
      name: "Thank You Note",
      description: "Post-interview thank you",
      lastModified: "2023-09-15",
    },
  ],
  onSelectTemplate = () => {},
  onCreateTemplate = () => {},
  onEditTemplate = () => {},
  onDeleteTemplate = () => {},
  onDuplicateTemplate = () => {},
  selectedTemplateId = "1",
}: TemplatesListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full h-full bg-background border-r flex flex-col">
      <div className="p-4 border-b">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Email Templates</CardTitle>
        </CardHeader>
        <div className="flex items-center gap-2 mt-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button onClick={onCreateTemplate} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-2">
        {filteredTemplates.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <p className="text-muted-foreground mb-2">No templates found</p>
            <Button variant="outline" onClick={onCreateTemplate}>
              <Plus className="h-4 w-4 mr-2" /> Create Template
            </Button>
          </div>
        ) : (
          filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className={`mb-2 cursor-pointer hover:bg-accent/50 transition-colors ${selectedTemplateId === template.id ? "bg-accent" : ""}`}
              onClick={() => onSelectTemplate(template.id)}
            >
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium flex items-center">
                      {template.name}
                      {template.isDefault && (
                        <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {template.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Modified: {template.lastModified}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditTemplate(template.id);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onDuplicateTemplate(template.id);
                        }}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteTemplate(template.id);
                        }}
                        disabled={template.isDefault}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TemplatesList;

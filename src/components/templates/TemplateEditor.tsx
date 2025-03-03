import React, { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Variable,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TemplateEditorProps {
  template?: {
    id: string;
    name: string;
    subject: string;
    content: string;
  };
  onSave?: (template: {
    name: string;
    subject: string;
    content: string;
  }) => void;
}

const TemplateEditor = ({
  template = {
    id: "1",
    name: "New Template",
    subject: "Introduction and Connection Request",
    content:
      "Hi {name},\n\nI came across your profile and was impressed by your experience at {company}. I would love to connect and discuss potential opportunities.\n\nBest regards,\nYour Name",
  },
  onSave = () => {},
}: TemplateEditorProps) => {
  const [currentTemplate, setCurrentTemplate] = useState(template);
  const [activeTab, setActiveTab] = useState("edit");

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentTemplate({
      ...currentTemplate,
      content: e.target.value,
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTemplate({
      ...currentTemplate,
      name: e.target.value,
    });
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTemplate({
      ...currentTemplate,
      subject: e.target.value,
    });
  };

  const insertVariable = (variable: string) => {
    const textArea = document.querySelector("textarea");
    if (textArea) {
      const start = textArea.selectionStart;
      const end = textArea.selectionEnd;
      const text = currentTemplate.content;
      const newText =
        text.substring(0, start) + `{${variable}}` + text.substring(end);

      setCurrentTemplate({
        ...currentTemplate,
        content: newText,
      });

      // Set focus back to textarea after state update
      setTimeout(() => {
        textArea.focus();
        textArea.selectionStart = start + variable.length + 2; // +2 for the braces
        textArea.selectionEnd = start + variable.length + 2;
      }, 0);
    }
  };

  const handleSave = () => {
    onSave({
      name: currentTemplate.name,
      subject: currentTemplate.subject,
      content: currentTemplate.content,
    });
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Email Template Editor</CardTitle>
            <CardDescription>
              Create and edit email templates with personalization variables
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setActiveTab("edit")}>
              Edit
            </Button>
            <Button variant="outline" onClick={() => setActiveTab("preview")}>
              Preview
            </Button>
            <Button onClick={handleSave}>Save Template</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="template-name"
                className="block text-sm font-medium mb-1"
              >
                Template Name
              </label>
              <Input
                id="template-name"
                value={currentTemplate.name}
                onChange={handleNameChange}
                placeholder="Enter template name"
              />
            </div>
            <div>
              <label
                htmlFor="template-subject"
                className="block text-sm font-medium mb-1"
              >
                Email Subject
              </label>
              <Input
                id="template-subject"
                value={currentTemplate.subject}
                onChange={handleSubjectChange}
                placeholder="Enter email subject"
              />
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="edit">Edit Content</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-4">
            <div className="flex items-center gap-1 mb-2 p-1 border rounded-md bg-gray-50">
              <TooltipProvider>
                {/* Text formatting buttons */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bold className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Bold</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Italic className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Italic</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Underline className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Underline</p>
                  </TooltipContent>
                </Tooltip>

                <div className="h-4 w-px bg-gray-300 mx-1" />

                {/* Alignment buttons */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Align Left</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Align Center</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <AlignRight className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Align Right</p>
                  </TooltipContent>
                </Tooltip>

                <div className="h-4 w-px bg-gray-300 mx-1" />

                {/* List buttons */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <List className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Bullet List</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Numbered List</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Link className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Insert Link</p>
                  </TooltipContent>
                </Tooltip>

                <div className="h-4 w-px bg-gray-300 mx-1" />

                {/* Variable insertion */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Variable className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Insert Variable</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Select onValueChange={(value) => insertVariable(value)}>
                <SelectTrigger className="w-[180px] h-8 ml-2">
                  <SelectValue placeholder="Insert Variable" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                  <SelectItem value="title">Job Title</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                  <SelectItem value="industry">Industry</SelectItem>
                  <SelectItem value="skills">Skills</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <textarea
              className="w-full h-64 p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={currentTemplate.content}
              onChange={handleContentChange}
              placeholder="Write your email template here..."
            />
            <p className="text-sm text-gray-500">
              Use {"{variable}"} syntax to insert personalized data. Available
              variables: {"{name}"}, {"{company}"}, {"{title}"}, {"{location}"},{" "}
              {"{industry}"}, {"{skills}"}
            </p>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <div className="border rounded-md p-6 bg-gray-50">
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">
                  From: Your Name &lt;your.email@example.com&gt;
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  To: John Doe &lt;john.doe@example.com&gt;
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  Subject: {currentTemplate.subject}
                </div>
              </div>
              <div className="border-t pt-4">
                {currentTemplate.content.split("\n").map((line, index) => {
                  // Replace variables with sample values
                  let processedLine = line
                    .replace(/\{name\}/g, "John Doe")
                    .replace(/\{company\}/g, "Acme Corporation")
                    .replace(/\{title\}/g, "Senior Developer")
                    .replace(/\{location\}/g, "San Francisco")
                    .replace(/\{industry\}/g, "Technology")
                    .replace(/\{skills\}/g, "React, TypeScript, Node.js");

                  return line ? (
                    <p key={index} className="mb-2">
                      {processedLine}
                    </p>
                  ) : (
                    <br key={index} />
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm text-gray-500">
          Last edited: {new Date().toLocaleDateString()}
        </div>
        <Button onClick={handleSave}>Save Template</Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateEditor;

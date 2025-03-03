import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Send, Eye, Copy, Download } from "lucide-react";

interface TemplatePreviewProps {
  template?: string;
  recipientName?: string;
  recipientCompany?: string;
  sampleData?: {
    name: string;
    company: string;
    position: string;
    skills: string[];
  };
}

const TemplatePreview = ({
  template = "<p>Hello {name},</p><p>I noticed your profile on LinkedIn and was impressed by your experience at {company}. Your skills in {skills} align well with what we're looking for.</p><p>Would you be interested in connecting to discuss potential opportunities?</p><p>Best regards,<br/>Your Name</p>",
  recipientName = "John Doe",
  recipientCompany = "Acme Inc.",
  sampleData = {
    name: "John Doe",
    company: "Acme Inc.",
    position: "Senior Developer",
    skills: ["React", "TypeScript", "Node.js"],
  },
}: TemplatePreviewProps) => {
  const [emailSubject, setEmailSubject] = useState(
    "Connecting regarding opportunities",
  );

  // Replace template variables with actual data
  const processTemplate = (template: string) => {
    return template
      .replace(/{name}/g, sampleData.name)
      .replace(/{company}/g, sampleData.company)
      .replace(/{position}/g, sampleData.position)
      .replace(/{skills}/g, sampleData.skills.join(", "));
  };

  const processedTemplate = processTemplate(template);

  return (
    <div className="w-full h-full bg-gray-50 p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Email Preview</span>
            <div className="flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy to clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download as HTML</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardTitle>
          <CardDescription>
            Preview how your email will appear to recipients with sample data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subject Line
            </label>
            <Input
              id="subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="border rounded-md p-4 bg-white">
            <div className="mb-4 pb-4 border-b">
              <div className="text-sm text-gray-500">
                To:{" "}
                <span className="text-gray-700">
                  {recipientName} &lt;
                  {recipientName.toLowerCase().replace(" ", ".")}@
                  {recipientCompany.toLowerCase().replace(" ", "")}.com&gt;
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Subject: <span className="text-gray-700">{emailSubject}</span>
              </div>
            </div>

            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: processedTemplate }}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview in Browser
          </Button>
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Send Test Email
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TemplatePreview;

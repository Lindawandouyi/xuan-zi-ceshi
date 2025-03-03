import React, { useState } from "react";
import TemplatesList from "../components/templates/TemplatesList";
import TemplateEditor from "../components/templates/TemplateEditor";
import TemplatePreview from "../components/templates/TemplatePreview";

interface Template {
  id: string;
  name: string;
  description: string;
  subject: string;
  content: string;
  lastModified: string;
  isDefault?: boolean;
}

const TemplatesPage = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "Initial Connection",
      description: "Template for first outreach",
      subject: "Connecting regarding opportunities",
      content:
        "Hi {name},\n\nI came across your profile on LinkedIn and was impressed by your experience at {company}. Your skills in {skills} align well with what we're looking for.\n\nWould you be interested in connecting to discuss potential opportunities?\n\nBest regards,\nYour Name",
      lastModified: "2023-10-15",
      isDefault: true,
    },
    {
      id: "2",
      name: "Follow-up Message",
      description: "For candidates who didn't respond",
      subject: "Following up on my previous message",
      content:
        "Hi {name},\n\nI wanted to follow up on my previous message about connecting. I'm still very interested in discussing how your experience at {company} and skills in {skills} could be a great fit for opportunities we have.\n\nPlease let me know if you'd be open to a conversation.\n\nBest regards,\nYour Name",
      lastModified: "2023-10-10",
    },
    {
      id: "3",
      name: "Interview Invitation",
      description: "Invite selected candidates to interview",
      subject: "Interview Invitation - Next Steps",
      content:
        "Hi {name},\n\nThank you for your interest in connecting. I'd like to invite you to an interview to discuss your experience at {company} and how your skills in {skills} align with our needs.\n\nWould you be available sometime next week for a 30-minute call?\n\nBest regards,\nYour Name",
      lastModified: "2023-09-28",
    },
    {
      id: "4",
      name: "Thank You Note",
      description: "Post-interview thank you",
      subject: "Thank you for your time",
      content:
        "Hi {name},\n\nThank you for taking the time to speak with me today. I really enjoyed learning more about your experience at {company} and your impressive skills in {skills}.\n\nI'll be in touch soon with next steps.\n\nBest regards,\nYour Name",
      lastModified: "2023-09-15",
    },
  ]);

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("1");
  const [activeView, setActiveView] = useState<"edit" | "preview">("edit");

  const selectedTemplate =
    templates.find((t) => t.id === selectedTemplateId) || templates[0];

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setActiveView("edit");
  };

  const handleCreateTemplate = () => {
    const newTemplate: Template = {
      id: `${Date.now()}`,
      name: "New Template",
      description: "Template description",
      subject: "Subject line",
      content: "Write your email content here...",
      lastModified: new Date().toISOString().split("T")[0],
    };

    setTemplates([...templates, newTemplate]);
    setSelectedTemplateId(newTemplate.id);
    setActiveView("edit");
  };

  const handleEditTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setActiveView("edit");
  };

  const handleDeleteTemplate = (templateId: string) => {
    const updatedTemplates = templates.filter((t) => t.id !== templateId);
    setTemplates(updatedTemplates);

    if (selectedTemplateId === templateId) {
      setSelectedTemplateId(updatedTemplates[0]?.id || "");
    }
  };

  const handleDuplicateTemplate = (templateId: string) => {
    const templateToDuplicate = templates.find((t) => t.id === templateId);
    if (templateToDuplicate) {
      const duplicatedTemplate: Template = {
        ...templateToDuplicate,
        id: `${Date.now()}`,
        name: `${templateToDuplicate.name} (Copy)`,
        isDefault: false,
        lastModified: new Date().toISOString().split("T")[0],
      };

      setTemplates([...templates, duplicatedTemplate]);
      setSelectedTemplateId(duplicatedTemplate.id);
      setActiveView("edit");
    }
  };

  const handleSaveTemplate = (updatedTemplate: {
    name: string;
    subject: string;
    content: string;
  }) => {
    const updatedTemplates = templates.map((t) => {
      if (t.id === selectedTemplateId) {
        return {
          ...t,
          ...updatedTemplate,
          lastModified: new Date().toISOString().split("T")[0],
        };
      }
      return t;
    });

    setTemplates(updatedTemplates);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-80 h-full">
        <TemplatesList
          templates={templates}
          selectedTemplateId={selectedTemplateId}
          onSelectTemplate={handleSelectTemplate}
          onCreateTemplate={handleCreateTemplate}
          onEditTemplate={handleEditTemplate}
          onDeleteTemplate={handleDeleteTemplate}
          onDuplicateTemplate={handleDuplicateTemplate}
        />
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-4 flex justify-end space-x-2">
          <button
            className={`px-4 py-2 rounded-md ${activeView === "edit" ? "bg-primary text-white" : "bg-gray-200"}`}
            onClick={() => setActiveView("edit")}
          >
            Edit Template
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeView === "preview" ? "bg-primary text-white" : "bg-gray-200"}`}
            onClick={() => setActiveView("preview")}
          >
            Preview Email
          </button>
        </div>

        {activeView === "edit" ? (
          <TemplateEditor
            template={{
              id: selectedTemplate.id,
              name: selectedTemplate.name,
              subject: selectedTemplate.subject,
              content: selectedTemplate.content,
            }}
            onSave={handleSaveTemplate}
          />
        ) : (
          <TemplatePreview
            template={selectedTemplate.content}
            recipientName="John Doe"
            recipientCompany="Acme Inc."
            sampleData={{
              name: "John Doe",
              company: "Acme Inc.",
              position: "Senior Developer",
              skills: ["React", "TypeScript", "Node.js"],
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TemplatesPage;

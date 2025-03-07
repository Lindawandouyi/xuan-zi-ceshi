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
      name: "初次联系",
      description: "首次外联模板",
      subject: "关于职业机会的联系",
      content:
        "您好 {name},\n\n我在LinkedIn上看到了您的个人资料，对您在{company}的经验印象深刻。您在{skills}方面的技能与我们正在寻找的非常匹配。\n\n您是否有兴趣进行交流，讨论潜在的机会？\n\n此致,\n您的姓名",
      lastModified: "2023-10-15",
      isDefault: true,
    },
    {
      id: "2",
      name: "跟进消息",
      description: "针对未回复候选人",
      subject: "关于我之前的消息的跟进",
      content:
        "您好 {name},\n\n我想跟进一下我之前关于建立联系的消息。我仍然非常有兴趣讨论您在{company}的经验以及您在{skills}方面的技能如何与我们的机会相匹配。\n\n请告诉我您是否愿意进行交谈。\n\n此致,\n您的姓名",
      lastModified: "2023-10-10",
    },
    {
      id: "3",
      name: "面试邀请",
      description: "邀请选定的候选人面试",
      subject: "面试邀请 - 下一步",
      content:
        "您好 {name},\n\n感谢您有兴趣与我们建立联系。我想邀请您参加面试，讨论您在{company}的经验以及您在{skills}方面的技能如何与我们的需求相匹配。\n\n您下周是否有时间进行30分钟的通话？\n\n此致,\n您的姓名",
      lastModified: "2023-09-28",
    },
    {
      id: "4",
      name: "感谢信",
      description: "面试后感谢",
      subject: "感谢您的时间",
      content:
        "您好 {name},\n\n感谢您今天抽出时间与我们交谈。我们非常欣赏您分享的关于您在{company}的经验以及您在{skills}方面的专业知识的见解。\n\n我们的团队将审核所有候选人，并在未来几天内与您联系。\n\n此致,\n您的姓名",
      lastModified: "2023-09-22",
    },
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    templates[0],
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleSelectTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setIsEditing(false);
    }
  };

  const handleCreateTemplate = () => {
    const newTemplate: Template = {
      id: `${templates.length + 1}`,
      name: "新模板",
      description: "描述您的模板",
      subject: "邮件主题",
      content: "在此处输入您的邮件内容...",
      lastModified: new Date().toISOString().split("T")[0],
    };
    setTemplates([...templates, newTemplate]);
    setSelectedTemplate(newTemplate);
    setIsEditing(true);
  };

  const handleUpdateTemplate = (updatedTemplate: Template) => {
    setTemplates(
      templates.map((t) =>
        t.id === updatedTemplate.id ? updatedTemplate : t,
      ),
    );
    setSelectedTemplate(updatedTemplate);
    setIsEditing(false);
  };

  const handleDeleteTemplate = (templateId: string) => {
    const updatedTemplates = templates.filter((t) => t.id !== templateId);
    setTemplates(updatedTemplates);
    setSelectedTemplate(updatedTemplates.length > 0 ? updatedTemplates[0] : null);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">电子邮件模板</h1>
          <p className="text-gray-500">
            创建和管理您的外联电子邮件模板
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TemplatesList
            templates={templates}
            selectedTemplateId={selectedTemplate?.id}
            onSelectTemplate={handleSelectTemplate}
            onCreateTemplate={handleCreateTemplate}
            onDeleteTemplate={handleDeleteTemplate}
          />
        </div>
        <div className="lg:col-span-2">
          {selectedTemplate ? (
            isEditing ? (
              <TemplateEditor
                template={selectedTemplate}
                onSave={handleUpdateTemplate}
                onCancel={handleCancelEdit}
              />
            ) : (
              <TemplatePreview
                template={selectedTemplate}
                onEdit={handleEditClick}
              />
            )
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm border h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-4">
                  选择一个模板或创建一个新模板
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;

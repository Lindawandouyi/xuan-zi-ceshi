import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cog, Mail, Bell } from "lucide-react";
import AccountSettings from "@/components/settings/AccountSettings";
import EmailSettings from "@/components/settings/EmailSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";

const SettingsPage = () => {
  return (
    <div className="container mx-auto py-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">设置</h1>
          <p className="text-muted-foreground mt-2">
            配置您的账户、电子邮件和通知首选项。
          </p>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Cog className="h-4 w-4" />
              账户
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              电子邮件
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              通知
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <AccountSettings
              onSave={(data) => {
                console.log("账户设置已保存:", data);
                // 在实际应用中，这将保存到后端
              }}
            />
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <EmailSettings
              onSave={(data) => {
                console.log("电子邮件设置已保存:", data);
                // 在实际应用中，这将保存到后端
              }}
            />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <NotificationSettings
              onSettingChange={(id, type, value) => {
                console.log(
                  `通知设置已更改: ${id}, ${type}, ${value}`,
                );
                // 在实际应用中，这将保存到后端
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;

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
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure your account, email, and notification preferences for the
            LinkedIn Resume Scraper.
          </p>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Cog className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <AccountSettings
              onSave={(data) => {
                console.log("Account settings saved:", data);
                // In a real app, this would save to backend
              }}
            />
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <EmailSettings
              onSave={(data) => {
                console.log("Email settings saved:", data);
                // In a real app, this would save to backend
              }}
            />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <NotificationSettings
              onSettingChange={(id, type, value) => {
                console.log(
                  `Notification setting changed: ${id}, ${type}, ${value}`,
                );
                // In a real app, this would save to backend
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;

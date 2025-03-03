import React from "react";
import { Bell, Mail, MessageSquare, AlertCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  emailEnabled: boolean;
  inAppEnabled: boolean;
  icon: React.ReactNode;
}

interface NotificationSettingsProps {
  settings?: NotificationSetting[];
  onSettingChange?: (
    id: string,
    type: "email" | "inApp",
    value: boolean,
  ) => void;
}

const NotificationSettings = ({
  settings = [
    {
      id: "campaign-started",
      title: "Campaign Started",
      description:
        "Receive notifications when a campaign begins sending emails",
      emailEnabled: true,
      inAppEnabled: true,
      icon: <Mail className="h-5 w-5 text-blue-500" />,
    },
    {
      id: "campaign-completed",
      title: "Campaign Completed",
      description: "Get notified when all emails in a campaign have been sent",
      emailEnabled: true,
      inAppEnabled: true,
      icon: <Bell className="h-5 w-5 text-green-500" />,
    },
    {
      id: "response-received",
      title: "Response Received",
      description: "Be alerted when someone responds to your campaign emails",
      emailEnabled: true,
      inAppEnabled: true,
      icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
    },
    {
      id: "error-alerts",
      title: "Error Alerts",
      description:
        "Get notifications about errors or issues with your campaigns",
      emailEnabled: true,
      inAppEnabled: true,
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
    },
  ],
  onSettingChange = () => {},
}: NotificationSettingsProps) => {
  const handleToggle = (
    id: string,
    type: "email" | "inApp",
    value: boolean,
  ) => {
    onSettingChange(id, type, value);
  };

  return (
    <div className="w-full max-w-1200 mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Notification Settings
        </h2>
        <p className="text-gray-500 mt-1">
          Configure how and when you receive notifications about your campaigns
        </p>
      </div>

      <div className="grid gap-6">
        {settings.map((setting) => (
          <Card key={setting.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                {setting.icon}
                <div>
                  <CardTitle>{setting.title}</CardTitle>
                  <CardDescription>{setting.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between border rounded-md p-3">
                  <div>
                    <h4 className="font-medium text-sm">Email Notifications</h4>
                    <p className="text-xs text-gray-500">
                      Receive updates via email
                    </p>
                  </div>
                  <Switch
                    checked={setting.emailEnabled}
                    onCheckedChange={(checked) =>
                      handleToggle(setting.id, "email", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between border rounded-md p-3">
                  <div>
                    <h4 className="font-medium text-sm">
                      In-App Notifications
                    </h4>
                    <p className="text-xs text-gray-500">
                      Receive updates in the dashboard
                    </p>
                  </div>
                  <Switch
                    checked={setting.inAppEnabled}
                    onCheckedChange={(checked) =>
                      handleToggle(setting.id, "inApp", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Notification Frequency</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-md p-4 flex items-center gap-3 cursor-pointer bg-blue-50 border-blue-200">
            <div className="h-4 w-4 rounded-full bg-blue-500"></div>
            <div>
              <h4 className="font-medium">Real-time</h4>
              <p className="text-sm text-gray-500">
                Receive notifications immediately
              </p>
            </div>
          </div>
          <div className="border rounded-md p-4 flex items-center gap-3 cursor-pointer">
            <div className="h-4 w-4 rounded-full border border-gray-300"></div>
            <div>
              <h4 className="font-medium">Daily Digest</h4>
              <p className="text-sm text-gray-500">
                Receive a summary once per day
              </p>
            </div>
          </div>
          <div className="border rounded-md p-4 flex items-center gap-3 cursor-pointer">
            <div className="h-4 w-4 rounded-full border border-gray-300"></div>
            <div>
              <h4 className="font-medium">Weekly Summary</h4>
              <p className="text-sm text-gray-500">
                Receive a summary once per week
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar, Clock, Mail, Users } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

interface CampaignSchedulerProps {
  onSchedule?: (data: CampaignScheduleData) => void;
  initialData?: CampaignScheduleData;
}

interface CampaignScheduleData {
  campaignName: string;
  startDate: string;
  sendTime: string;
  frequency: string;
  maxEmailsPerDay: number;
  followUpEnabled: boolean;
  followUpDays: number;
  targetAudience: string;
  scheduleType: string;
}

const defaultFormValues: CampaignScheduleData = {
  campaignName: "New Recruitment Campaign",
  startDate: new Date().toISOString().split("T")[0],
  sendTime: "09:00",
  frequency: "daily",
  maxEmailsPerDay: 50,
  followUpEnabled: true,
  followUpDays: 3,
  targetAudience: "all",
  scheduleType: "immediate",
};

const CampaignScheduler = ({
  onSchedule = () => {},
  initialData = defaultFormValues,
}: CampaignSchedulerProps) => {
  const [scheduleType, setScheduleType] = useState<string>(
    initialData.scheduleType,
  );
  const form = useForm<CampaignScheduleData>({
    defaultValues: initialData,
  });

  const handleSubmit = (data: CampaignScheduleData) => {
    onSchedule(data);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Schedule Campaign</CardTitle>
        <CardDescription>
          Configure when and how your email campaign will be sent to potential
          connections.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="campaignName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campaign Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter campaign name" {...field} />
                    </FormControl>
                    <FormDescription>
                      A descriptive name to identify this campaign
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">
                          All Scraped Profiles
                        </SelectItem>
                        <SelectItem value="filtered">
                          Filtered Selection
                        </SelectItem>
                        <SelectItem value="custom">Custom List</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>Who will receive this campaign</span>
                      </div>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Tabs
              value={scheduleType}
              onValueChange={setScheduleType}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
                <TabsTrigger value="immediate">Send Immediately</TabsTrigger>
                <TabsTrigger value="scheduled">Schedule for Later</TabsTrigger>
              </TabsList>

              <TabsContent value="immediate" className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-md">
                  <p className="text-sm">
                    Campaign will start sending as soon as you confirm.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="scheduled" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 opacity-70" />
                            <Input type="date" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sendTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Send Time</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 opacity-70" />
                            <Input type="time" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Emails will be sent at this time in your local
                          timezone
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Sending Parameters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sending Frequency</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekdays">
                            Weekdays Only
                          </SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="custom">
                            Custom Schedule
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        How often emails will be sent
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxEmailsPerDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Maximum Emails Per Day: {field.value}
                      </FormLabel>
                      <FormControl>
                        <Slider
                          defaultValue={[field.value]}
                          max={200}
                          step={10}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="py-4"
                        />
                      </FormControl>
                      <FormDescription>
                        <div className="flex items-center gap-1">
                          <Mail size={14} />
                          <span>Limit the number of emails sent daily</span>
                        </div>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Follow-up Settings</h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="followUpEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Enable Automatic Follow-ups
                        </FormLabel>
                        <FormDescription>
                          Send follow-up emails to connections who don't respond
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("followUpEnabled") && (
                  <FormField
                    control={form.control}
                    name="followUpDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Days Before Follow-up: {field.value}
                        </FormLabel>
                        <FormControl>
                          <Slider
                            defaultValue={[field.value]}
                            max={14}
                            step={1}
                            onValueChange={(vals) => field.onChange(vals[0])}
                            className="py-4"
                          />
                        </FormControl>
                        <FormDescription>
                          Number of days to wait before sending a follow-up
                          email
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>

            <CardFooter className="px-0 flex justify-end gap-2">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit">Schedule Campaign</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CampaignScheduler;

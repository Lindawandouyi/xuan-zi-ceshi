import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Bot, Save, Sparkles } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  botName: z.string().min(2, {
    message: "Bot name must be at least 2 characters.",
  }),
  initialGreeting: z.string().min(10, {
    message: "Initial greeting must be at least 10 characters.",
  }),
  followUpMessage: z.string().min(10, {
    message: "Follow-up message must be at least 10 characters.",
  }),
  responseDelay: z.string(),
  autoRespond: z.boolean().default(true),
  collectContactInfo: z.boolean().default(true),
  aiModel: z.string(),
  promptTemplate: z.string().min(20, {
    message: "Prompt template must be at least 20 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {
  botName: "Recruitment Assistant",
  initialGreeting:
    "Hello! I'm the recruitment assistant for [Company Name]. How can I help you with your job application today?",
  followUpMessage:
    "Thank you for your interest. Could you tell me more about your experience with [Skill]?",
  responseDelay: "immediate",
  autoRespond: true,
  collectContactInfo: true,
  aiModel: "gpt-4",
  promptTemplate:
    "You are a helpful recruitment assistant for [Company Name]. Your goal is to qualify candidates for [Position] roles. Ask about their experience with [Skills] and collect their contact information.",
};

interface BotSettingsProps {
  onSave?: (data: FormValues) => void;
  initialValues?: Partial<FormValues>;
}

const BotSettings = ({
  onSave = () => {},
  initialValues = defaultValues,
}: BotSettingsProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  function onSubmit(data: FormValues) {
    onSave(data);
  }

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Bot Configuration
        </CardTitle>
        <CardDescription>
          Configure how the AI bot communicates with potential candidates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="botName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bot Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Recruitment Assistant" {...field} />
                    </FormControl>
                    <FormDescription>
                      Name that will be displayed to candidates
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="responseDelay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Response Timing</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select response timing" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="delayed">
                          Slightly Delayed (more human-like)
                        </SelectItem>
                        <SelectItem value="scheduled">
                          Scheduled (business hours only)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Control when the bot responds to messages
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="initialGreeting"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Greeting</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Hello! I'm the recruitment assistant..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    First message sent when a conversation starts
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="followUpMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Follow-up Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Thank you for your interest..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Message sent if no response is received
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="autoRespond"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Auto-Respond</FormLabel>
                      <FormDescription>
                        Automatically respond to candidate messages
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

              <FormField
                control={form.control}
                name="collectContactInfo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Collect Contact Info
                      </FormLabel>
                      <FormDescription>
                        Bot will ask for email and phone number
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
            </div>

            <div className="space-y-4 border rounded-md p-4">
              <h3 className="text-md font-medium flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
                AI Model Configuration
              </h3>

              <FormField
                control={form.control}
                name="aiModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI Model</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select AI model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="gpt-3.5">
                          GPT-3.5 (Faster, Lower Cost)
                        </SelectItem>
                        <SelectItem value="gpt-4">
                          GPT-4 (More Capable)
                        </SelectItem>
                        <SelectItem value="claude">Claude</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select which AI model powers the bot
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="promptTemplate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI Prompt Template</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="You are a helpful recruitment assistant..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Instructions that guide the AI's behavior and responses
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="px-0 pt-4">
              <Button type="submit" className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Bot Settings
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BotSettings;

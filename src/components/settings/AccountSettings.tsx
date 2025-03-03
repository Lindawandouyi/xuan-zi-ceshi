import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Lock, User, Key, Globe, Shield } from "lucide-react";

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
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  apiKey: z.string().min(1, {
    message: "API Key is required.",
  }),
  apiSecret: z.string().min(1, {
    message: "API Secret is required.",
  }),
  useProxy: z.boolean().default(false),
  proxyUrl: z.string().optional(),
  rateLimitEnabled: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {
  username: "",
  password: "",
  apiKey: "",
  apiSecret: "",
  useProxy: false,
  proxyUrl: "",
  rateLimitEnabled: true,
};

const AccountSettings = ({ onSave = () => {} }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const useProxy = form.watch("useProxy");

  function onSubmit(data: FormValues) {
    // In a real app, this would save the settings to the backend
    console.log("Form submitted:", data);
    onSave(data);
  }

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <User className="h-5 w-5" />
          LinkedIn Account Settings
        </CardTitle>
        <CardDescription>
          Configure your LinkedIn account credentials and API settings for the
          resume scraper.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-9"
                            placeholder="username@example.com"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Your LinkedIn account email address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-9"
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Your LinkedIn account password.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn API Key</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Key className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-9"
                            placeholder="Enter your API key"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        API key from LinkedIn Developer Portal.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="apiSecret"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn API Secret</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Shield className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-9"
                            type="password"
                            placeholder="Enter your API secret"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        API secret from LinkedIn Developer Portal.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4 border rounded-md p-4">
                <h3 className="text-md font-medium">Advanced Settings</h3>

                <FormField
                  control={form.control}
                  name="useProxy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Use Proxy</FormLabel>
                        <FormDescription>
                          Route requests through a proxy server to avoid rate
                          limiting.
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

                {useProxy && (
                  <FormField
                    control={form.control}
                    name="proxyUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Proxy URL</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-9"
                              placeholder="http://proxy.example.com:8080"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          The URL of your proxy server including port if
                          required.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="rateLimitEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Enable Rate Limiting</FormLabel>
                        <FormDescription>
                          Automatically limit requests to avoid LinkedIn
                          restrictions.
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
            </div>

            <CardFooter className="px-0 pt-4">
              <Button type="submit" className="ml-auto">
                Save Settings
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AccountSettings;

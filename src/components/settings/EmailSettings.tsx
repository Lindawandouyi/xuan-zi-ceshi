import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Server, User, Key, Lock } from "lucide-react";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  smtpServer: z.string().min(1, { message: "SMTP server is required" }),
  smtpPort: z.string().min(1, { message: "SMTP port is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  fromEmail: z.string().email({ message: "Valid email is required" }),
  fromName: z.string().min(1, { message: "From name is required" }),
});

type FormValues = z.infer<typeof formSchema>;

interface EmailSettingsProps {
  onSave?: (values: FormValues) => void;
  initialValues?: Partial<FormValues>;
}

const EmailSettings = ({
  onSave = () => {},
  initialValues = {
    smtpServer: "",
    smtpPort: "587",
    username: "",
    password: "",
    fromEmail: "",
    fromName: "",
  },
}: EmailSettingsProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (values: FormValues) => {
    onSave(values);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Email Settings</CardTitle>
        <CardDescription>
          Configure your email account for sending campaign emails
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="smtpServer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SMTP Server</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Server className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          className="pl-10"
                          placeholder="smtp.example.com"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      The address of your email service provider's SMTP server
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="smtpPort"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SMTP Port</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="587" {...field} />
                    </FormControl>
                    <FormDescription>
                      Common ports are 25, 465 (SSL), or 587 (TLS)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          className="pl-10"
                          placeholder="your_username"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Usually your email address
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          className="pl-10"
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Your email password or app-specific password
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fromEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          className="pl-10"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      The email address that will appear in the From field
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fromName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          className="pl-10"
                          placeholder="Your Name or Company"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      The name that will appear alongside your email address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="px-0 pb-0">
              <Button type="submit" className="ml-auto">
                Save Email Settings
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EmailSettings;

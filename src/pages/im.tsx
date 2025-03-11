import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MessageSquare, Settings, Bot, Plus } from "lucide-react";
import ChatList from "@/components/im/ChatList";
import ChatWindow from "@/components/im/ChatWindow";
import BotSettings from "@/components/im/BotSettings";
import Sidebar from "@/components/layout/Sidebar";

interface Message {
  id: string;
  content: string;
  sender: "user" | "contact" | "bot";
  timestamp: string;
  status?: "sent" | "delivered" | "read";
}

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  isBot: boolean;
}

const ImPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("chats");
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null,
  );
  const [botEnabled, setBotEnabled] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "AI Assistant",
      lastMessage: "How can I help you today?",
      time: "Just now",
      unread: 0,
      online: true,
      isBot: true,
    },
    {
      id: "2",
      name: "John Doe",
      lastMessage: "Thanks for reaching out about the position",
      time: "10:30 AM",
      unread: 2,
      online: true,
      isBot: false,
    },
    {
      id: "3",
      name: "Sarah Williams",
      lastMessage: "I'm interested in learning more about the role",
      time: "Yesterday",
      unread: 0,
      online: false,
      isBot: false,
    },
    {
      id: "4",
      name: "Michael Chen",
      lastMessage: "When would be a good time to schedule a call?",
      time: "Yesterday",
      unread: 0,
      online: false,
      isBot: false,
    },
    {
      id: "5",
      name: "Recruitment Bot",
      lastMessage: "I've sent messages to 15 new candidates",
      time: "2 days ago",
      unread: 0,
      online: true,
      isBot: true,
    },
  ]);

  // Mock conversation data
  const [conversations, setConversations] = useState<Record<string, Message[]>>(
    {
      "1": [
        {
          id: "1",
          content: "Hello! I'm your AI assistant. How can I help you today?",
          sender: "bot",
          timestamp: "9:30 AM",
        },
        {
          id: "2",
          content:
            "I need help with setting up automated messages for candidates.",
          sender: "user",
          timestamp: "9:31 AM",
          status: "read",
        },
        {
          id: "3",
          content:
            "I'd be happy to help with that! You can configure automated messages in the Bot Settings tab. Would you like me to guide you through the process?",
          sender: "bot",
          timestamp: "9:31 AM",
        },
      ],
      "2": [
        {
          id: "1",
          content:
            "Hi John, I noticed your profile and was impressed by your experience. Would you be interested in a Senior Developer role at our company?",
          sender: "user",
          timestamp: "10:15 AM",
          status: "read",
        },
        {
          id: "2",
          content:
            "Thanks for reaching out about the position. I'd definitely be interested in learning more about it.",
          sender: "contact",
          timestamp: "10:30 AM",
        },
      ],
      "3": [
        {
          id: "1",
          content:
            "Hello Sarah, I'm reaching out about a UX Designer position that might be a good fit for your skills.",
          sender: "user",
          timestamp: "Yesterday",
          status: "read",
        },
        {
          id: "2",
          content:
            "I'm interested in learning more about the role. Could you share the job description?",
          sender: "contact",
          timestamp: "Yesterday",
        },
      ],
      "4": [
        {
          id: "1",
          content:
            "Hi Michael, we have an opening for a Data Scientist role that matches your profile. Would you like to discuss?",
          sender: "user",
          timestamp: "Yesterday",
          status: "read",
        },
        {
          id: "2",
          content:
            "That sounds interesting! When would be a good time to schedule a call?",
          sender: "contact",
          timestamp: "Yesterday",
        },
      ],
      "5": [
        {
          id: "1",
          content:
            "Status update: I've sent initial outreach messages to 15 new candidates based on your search criteria.",
          sender: "bot",
          timestamp: "2 days ago",
        },
        {
          id: "2",
          content: "Great! How many responses have we received so far?",
          sender: "user",
          timestamp: "2 days ago",
          status: "read",
        },
        {
          id: "3",
          content:
            "We've received 7 positive responses. 3 candidates have already scheduled interviews through the automated calendar link.",
          sender: "bot",
          timestamp: "2 days ago",
        },
      ],
    },
  );

  const handleSelectChat = (contactId: string) => {
    setSelectedContactId(contactId);
    if (activeTab !== "chats") {
      setActiveTab("chats");
    }
  };

  const handleSendMessage = (message: string) => {
    if (!selectedContactId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

    // Update conversations
    setConversations((prev) => {
      const updatedConversations = { ...prev };
      if (!updatedConversations[selectedContactId]) {
        updatedConversations[selectedContactId] = [];
      }
      updatedConversations[selectedContactId] = [
        ...updatedConversations[selectedContactId],
        newMessage,
      ];
      return updatedConversations;
    });

    // Update last message in contacts
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === selectedContactId
          ? {
              ...contact,
              lastMessage: message,
              time: "Just now",
            }
          : contact,
      ),
    );
  };

  const handleToggleBot = () => {
    setBotEnabled(!botEnabled);
  };

  const handleSaveBotSettings = (data: any) => {
    console.log("Bot settings saved:", data);
    // In a real app, this would save to backend
    setActiveTab("chats");
  };

  const selectedContact = contacts.find(
    (contact) => contact.id === selectedContactId,
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? "w-16" : "w-64"} transition-all duration-300 ease-in-out`}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b bg-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Messaging</h1>
            <div className="flex space-x-2">
              <Button
                variant={activeTab === "chats" ? "default" : "outline"}
                onClick={() => setActiveTab("chats")}
                className="flex items-center"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Conversations
              </Button>
              <Button
                variant={activeTab === "bot-settings" ? "default" : "outline"}
                onClick={() => setActiveTab("bot-settings")}
                className="flex items-center"
              >
                <Bot className="mr-2 h-4 w-4" />
                Bot Settings
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full"
          >
            <TabsContent value="chats" className="h-full">
              <div className="flex h-full">
                <div className="w-80 h-full border-r">
                  <ChatList
                    contacts={contacts}
                    onSelectChat={handleSelectChat}
                    selectedContactId={selectedContactId || undefined}
                    onNewChat={() => {
                      // Handle new chat creation
                    }}
                  />
                </div>
                <div className="flex-1">
                  {selectedContact ? (
                    <ChatWindow
                      contact={{
                        id: selectedContact.id,
                        name: selectedContact.name,
                        avatar: selectedContact.avatar,
                        online: selectedContact.online,
                        isBot: selectedContact.isBot,
                      }}
                      messages={conversations[selectedContact.id] || []}
                      onSendMessage={handleSendMessage}
                      onToggleBot={handleToggleBot}
                      botEnabled={botEnabled}
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                      <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">
                        Select a conversation
                      </h3>
                      <p className="text-gray-500 max-w-md mb-6">
                        Choose an existing conversation or start a new one
                      </p>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Conversation
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="bot-settings"
              className="p-6 h-full overflow-auto"
            >
              <BotSettings onSave={handleSaveBotSettings} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ImPage;

import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Bot,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  online: boolean;
  isBot: boolean;
  typing?: boolean;
}

interface ChatWindowProps {
  contact: Contact;
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  onToggleBot?: () => void;
  botEnabled?: boolean;
}

const ChatWindow = ({
  contact,
  messages: initialMessages = [],
  onSendMessage = () => {},
  onToggleBot = () => {},
  botEnabled = false,
}: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages, contact.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

    setMessages([...messages, newMsg]);
    onSendMessage(newMessage);
    setNewMessage("");

    // Simulate bot response if bot is enabled
    if (contact.isBot || botEnabled) {
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: getBotResponse(newMessage),
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  const getBotResponse = (message: string) => {
    const responses = [
      "Thanks for your message. I'll help you with that.",
      "I understand you're interested in this position. Could you tell me more about your experience?",
      "That's great to hear! When would be a good time to schedule a call?",
      "I've noted your availability. Our team will reach out to you soon.",
      "Do you have any specific questions about the role or company?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatDate = (timestamp: string) => {
    return timestamp;
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Chat header */}
      <div className="p-3 border-b bg-white flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={
                contact.avatar ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.id}`
              }
              alt={contact.name}
            />
            <AvatarFallback>
              {contact.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <div className="flex items-center">
              <h3 className="font-medium">{contact.name}</h3>
              {contact.isBot && (
                <Badge
                  variant="outline"
                  className="ml-2 text-xs bg-blue-50 text-blue-700 border-blue-200"
                >
                  Bot
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-500">
              {contact.online ? "Online" : "Offline"}
              {contact.typing && " • Typing..."}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onToggleBot}>
                <Bot className="mr-2 h-4 w-4" />
                {botEnabled ? "Disable Bot Assistant" : "Enable Bot Assistant"}
              </DropdownMenuItem>
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Clear Conversation</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.sender !== "user" && (
              <Avatar className="h-8 w-8 mr-2 mt-1">
                <AvatarImage
                  src={
                    contact.avatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.id}`
                  }
                  alt={contact.name}
                />
                <AvatarFallback>
                  {contact.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[70%] ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-white border"} rounded-lg p-3 shadow-sm`}
            >
              <p className="text-sm">{message.content}</p>
              <div
                className={`text-xs mt-1 ${message.sender === "user" ? "text-primary-foreground/70" : "text-gray-500"} flex items-center`}
              >
                {formatDate(message.timestamp)}
                {message.sender === "user" && message.status && (
                  <span className="ml-1">
                    {message.status === "sent" && "✓"}
                    {message.status === "delivered" && "✓✓"}
                    {message.status === "read" && "✓✓"}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-3 border-t bg-white">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
          />
          <Button variant="ghost" size="icon">
            <Smile className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ""}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        {botEnabled && !contact.isBot && (
          <div className="mt-2 text-xs text-center text-muted-foreground bg-blue-50 p-1 rounded">
            <Bot className="h-3 w-3 inline mr-1" /> Bot assistant is enabled and
            will respond automatically
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;

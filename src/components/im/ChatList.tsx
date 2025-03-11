import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, MoreVertical } from "lucide-react";

interface ChatContact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  isBot: boolean;
}

interface ChatListProps {
  contacts?: ChatContact[];
  onSelectChat: (contactId: string) => void;
  selectedContactId?: string;
  onNewChat?: () => void;
}

const ChatList = ({
  contacts = defaultContacts,
  onSelectChat,
  selectedContactId,
  onNewChat = () => {},
}: ChatListProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="h-full flex flex-col bg-white border-r">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold mb-4">Messages</h2>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button size="icon" onClick={onNewChat}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <p className="text-muted-foreground mb-2">No conversations found</p>
            <Button variant="outline" onClick={onNewChat}>
              <Plus className="h-4 w-4 mr-2" /> Start New Chat
            </Button>
          </div>
        ) : (
          <ul className="divide-y">
            {filteredContacts.map((contact) => (
              <li
                key={contact.id}
                className={`p-3 cursor-pointer hover:bg-gray-50 ${selectedContactId === contact.id ? "bg-primary/5" : ""}`}
                onClick={() => onSelectChat(contact.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar>
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
                    {contact.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm flex items-center">
                        {contact.name}
                        {contact.isBot && (
                          <Badge
                            variant="outline"
                            className="ml-2 text-xs bg-blue-50 text-blue-700 border-blue-200"
                          >
                            Bot
                          </Badge>
                        )}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {contact.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {contact.lastMessage}
                    </p>
                  </div>
                  {contact.unread > 0 && (
                    <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                      {contact.unread}
                    </Badge>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const defaultContacts: ChatContact[] = [
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
];

export default ChatList;

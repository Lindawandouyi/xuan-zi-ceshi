import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { ExternalLink, Star, UserPlus } from "lucide-react";

interface ProfileResult {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  experience: number; // years
  skills: string[];
  profileUrl: string;
  imageUrl?: string;
}

interface SearchResultsProps {
  results: ProfileResult[];
  isLoading: boolean;
}

const SearchResults = ({
  results = [],
  isLoading = false,
}: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              暂无搜索结果
            </h3>
            <p className="text-gray-500">
              请尝试调整搜索条件或使用不同的关键词
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((profile) => (
        <Card key={profile.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10">
                  {profile.imageUrl ? (
                    <AvatarImage src={profile.imageUrl} alt={profile.name} />
                  ) : (
                    <AvatarFallback>
                      {profile.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <CardTitle className="text-base font-semibold">
                    {profile.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500">{profile.title}</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <span className="font-medium mr-2">公司:</span>
                <span className="text-gray-600">{profile.company}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="font-medium mr-2">地点:</span>
                <span className="text-gray-600">{profile.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="font-medium mr-2">经验:</span>
                <span className="text-gray-600">{profile.experience} 年</span>
              </div>
              <div className="mt-3">
                <div className="flex flex-wrap gap-1">
                  {profile.skills.slice(0, 4).map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                  {profile.skills.length > 4 && (
                    <Badge variant="outline">+{profile.skills.length - 4}</Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <div className="px-6 py-3 bg-gray-50 flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => window.open(profile.profileUrl, "_blank")}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              查看资料
            </Button>
            <Button size="sm" className="text-xs">
              <UserPlus className="h-3 w-3 mr-1" />
              添加到活动
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SearchResults;

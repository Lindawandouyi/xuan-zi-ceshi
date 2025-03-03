import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Check, ExternalLink, Star, UserPlus } from "lucide-react";

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
  results?: ProfileResult[];
  onSelectProfile?: (profileId: string, selected: boolean) => void;
  selectedProfiles?: string[];
  isLoading?: boolean;
}

const SearchResults = ({
  results = mockProfiles,
  onSelectProfile = () => {},
  selectedProfiles = [],
  isLoading = false,
}: SearchResultsProps) => {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    const newSelectAllState = !selectAll;
    setSelectAll(newSelectAllState);

    // Update all profiles based on the new selectAll state
    results.forEach((profile) => {
      onSelectProfile(profile.id, newSelectAllState);
    });
  };

  const handleSelectProfile = (profileId: string) => {
    const isSelected = selectedProfiles.includes(profileId);
    onSelectProfile(profileId, !isSelected);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full bg-white p-6 rounded-lg flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-500">Searching for profiles...</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="w-full h-full bg-white p-6 rounded-lg flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <div className="text-gray-400 mb-4 text-6xl">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No profiles found</h3>
          <p className="text-gray-500 max-w-md">
            Try adjusting your search filters or try different keywords to find
            relevant profiles.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={selectAll}
            onCheckedChange={handleSelectAll}
          />
          <label
            htmlFor="select-all"
            className="text-sm font-medium cursor-pointer"
          >
            Select All ({results.length})
          </label>
        </div>
        <div className="text-sm text-gray-500">
          {selectedProfiles.length} profiles selected
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {results.map((profile) => (
          <Card key={profile.id} className="overflow-hidden border">
            <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`profile-${profile.id}`}
                  checked={selectedProfiles.includes(profile.id)}
                  onCheckedChange={() => handleSelectProfile(profile.id)}
                />
                <CardTitle className="text-base font-medium">
                  {profile.name}
                </CardTitle>
              </div>
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar>
                  <AvatarImage
                    src={
                      profile.imageUrl ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.id}`
                    }
                    alt={profile.name}
                  />
                  <AvatarFallback>
                    {profile.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{profile.title}</p>
                  <p className="text-xs text-gray-500">{profile.company}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-gray-500">
                  <span className="mr-2">📍</span> {profile.location}
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="mr-2">💼</span> {profile.experience} years
                  experience
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {profile.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {profile.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{profile.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex justify-between">
              <Button variant="outline" size="sm" className="w-full mr-2">
                <Star className="h-3 w-3 mr-1" /> Save
              </Button>
              <Button size="sm" className="w-full">
                <UserPlus className="h-3 w-3 mr-1" /> Connect
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Mock data for default state
const mockProfiles: ProfileResult[] = [
  {
    id: "1",
    name: "Alex Johnson",
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    experience: 8,
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "AWS"],
    profileUrl: "https://linkedin.com/in/alexjohnson",
  },
  {
    id: "2",
    name: "Sarah Williams",
    title: "Product Manager",
    company: "InnovateTech",
    location: "New York, NY",
    experience: 6,
    skills: ["Product Strategy", "Agile", "User Research", "Roadmapping"],
    profileUrl: "https://linkedin.com/in/sarahwilliams",
  },
  {
    id: "3",
    name: "Michael Chen",
    title: "Data Scientist",
    company: "DataInsights",
    location: "Seattle, WA",
    experience: 5,
    skills: [
      "Python",
      "Machine Learning",
      "SQL",
      "TensorFlow",
      "Data Visualization",
    ],
    profileUrl: "https://linkedin.com/in/michaelchen",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    title: "UX/UI Designer",
    company: "DesignWorks",
    location: "Austin, TX",
    experience: 4,
    skills: [
      "Figma",
      "User Research",
      "Wireframing",
      "Prototyping",
      "UI Design",
    ],
    profileUrl: "https://linkedin.com/in/emilyrodriguez",
  },
  {
    id: "5",
    name: "David Kim",
    title: "DevOps Engineer",
    company: "CloudSystems",
    location: "Chicago, IL",
    experience: 7,
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Terraform"],
    profileUrl: "https://linkedin.com/in/davidkim",
  },
  {
    id: "6",
    name: "Lisa Patel",
    title: "Marketing Director",
    company: "GrowthMarketing",
    location: "Boston, MA",
    experience: 9,
    skills: [
      "Digital Marketing",
      "SEO",
      "Content Strategy",
      "Analytics",
      "Campaign Management",
    ],
    profileUrl: "https://linkedin.com/in/lisapatel",
  },
];

export default SearchResults;

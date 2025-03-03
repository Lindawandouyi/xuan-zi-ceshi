import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Filter,
  Search as SearchIcon,
  RefreshCw,
  Download,
} from "lucide-react";

// Import components
import SearchResults from "../components/search/SearchResults";

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

interface SearchFiltersProps {
  onSearch: (filters: any) => void;
}

// Placeholder SearchFilters component since the actual one is not implemented
const SearchFilters = ({ onSearch = () => {} }: SearchFiltersProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({});
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Industry
        </label>
        <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
          <option value="">All Industries</option>
          <option value="technology">Technology</option>
          <option value="finance">Finance</option>
          <option value="healthcare">Healthcare</option>
          <option value="education">Education</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Skills
        </label>
        <input
          type="text"
          placeholder="e.g. React, Python, Marketing"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          placeholder="City, State, or Country"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Experience Level
        </label>
        <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
          <option value="">Any Experience</option>
          <option value="entry">Entry Level (0-2 years)</option>
          <option value="mid">Mid Level (3-5 years)</option>
          <option value="senior">Senior Level (6-10 years)</option>
          <option value="executive">Executive (10+ years)</option>
        </select>
      </div>

      <div className="md:col-span-2 lg:col-span-4 flex justify-end mt-4">
        <Button type="button" variant="outline" className="mr-2">
          Reset Filters
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          <SearchIcon className="h-4 w-4 mr-2" />
          Search Profiles
        </Button>
      </div>
    </div>
  );
};

interface ActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onScrapeProfiles: () => void;
}

// Placeholder ActionBar component since the actual one is not implemented
const ActionBar = ({
  selectedCount = 0,
  onClearSelection = () => {},
  onScrapeProfiles = () => {},
}: ActionBarProps) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-center justify-between">
      <div className="flex items-center">
        <span className="bg-blue-100 text-blue-800 font-medium px-2.5 py-0.5 rounded-full mr-2">
          {selectedCount}
        </span>
        <span className="text-gray-700">profiles selected</span>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={onClearSelection}>
          Clear Selection
        </Button>
        <Button size="sm" onClick={onScrapeProfiles}>
          Scrape Selected Profiles
        </Button>
      </div>
    </div>
  );
};

const SearchPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<ProfileResult[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(true);

  // Mock search function
  const handleSearch = (filters: any) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Mock data is already in the SearchResults component
      setSearchResults(mockProfiles);
      setIsLoading(false);
    }, 1500);
  };

  const handleSelectProfile = (profileId: string, selected: boolean) => {
    if (selected) {
      setSelectedProfiles((prev) => [...prev, profileId]);
    } else {
      setSelectedProfiles((prev) => prev.filter((id) => id !== profileId));
    }
  };

  const handleClearSelection = () => {
    setSelectedProfiles([]);
  };

  const handleScrapeProfiles = () => {
    // In a real app, this would trigger the scraping process
    alert(`Scraping ${selectedProfiles.length} profiles`);
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              LinkedIn Profile Search
            </h1>
            <p className="text-gray-500">
              Find and scrape profiles based on your criteria
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={toggleFilters}>
              <Filter className="h-4 w-4 mr-2" />
              {filtersVisible ? "Hide Filters" : "Show Filters"}
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button variant="outline" disabled={selectedProfiles.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export Selected
            </Button>
          </div>
        </div>

        {filtersVisible && (
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <SearchIcon className="h-5 w-5 mr-2" />
                Search Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SearchFilters onSearch={handleSearch} />
            </CardContent>
          </Card>
        )}

        {selectedProfiles.length > 0 && (
          <div className="mb-4">
            <ActionBar
              selectedCount={selectedProfiles.length}
              onClearSelection={handleClearSelection}
              onScrapeProfiles={handleScrapeProfiles}
            />
          </div>
        )}

        <SearchResults
          results={searchResults}
          onSelectProfile={handleSelectProfile}
          selectedProfiles={selectedProfiles}
          isLoading={isLoading}
        />
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

export default SearchPage;

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
          行业
        </label>
        <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
          <option value="">所有行业</option>
          <option value="technology">科技</option>
          <option value="finance">金融</option>
          <option value="healthcare">医疗</option>
          <option value="education">教育</option>
        </select>
      </div>
      {/* More filter fields would go here */}
      <div className="lg:col-span-4">
        <Button
          type="submit"
          onClick={handleSubmit}
          className="w-full md:w-auto"
        >
          应用筛选
        </Button>
      </div>
    </div>
  );
};

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<ProfileResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Mock function to simulate search
  const handleSearch = (filters: any) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock data
      const mockResults: ProfileResult[] = [
        {
          id: "1",
          name: "张三",
          title: "高级前端开发工程师",
          company: "科技有限公司",
          location: "北京",
          experience: 5,
          skills: ["React", "TypeScript", "Node.js"],
          profileUrl: "https://linkedin.com/in/profile1",
          imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=profile1",
        },
        {
          id: "2",
          name: "李四",
          title: "全栈开发工程师",
          company: "互联网科技",
          location: "上海",
          experience: 7,
          skills: ["JavaScript", "Python", "AWS"],
          profileUrl: "https://linkedin.com/in/profile2",
          imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=profile2",
        },
        {
          id: "3",
          name: "王五",
          title: "软件工程师",
          company: "科技有限公司",
          location: "深圳",
          experience: 3,
          skills: ["Java", "Spring Boot", "MySQL"],
          profileUrl: "https://linkedin.com/in/profile3",
          imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=profile3",
        },
      ];
      
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">搜索简历</h1>
          <p className="text-gray-500">
            搜索并筛选LinkedIn上的专业人士
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">搜索条件</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? "隐藏筛选" : "显示筛选"}
          </Button>
        </CardHeader>
        <CardContent>
          {showFilters && <SearchFilters onSearch={handleSearch} />}
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="搜索职位、技能或公司..."
                className="w-full rounded-md border-gray-300 pl-9 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <Button
              onClick={() => handleSearch({})}
              className="flex items-center gap-2"
            >
              <SearchIcon className="h-4 w-4" />
              搜索
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">搜索结果</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            刷新
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            导出
          </Button>
        </div>
      </div>

      <SearchResults results={searchResults} isLoading={isLoading} />
    </div>
  );
};

export default SearchPage;

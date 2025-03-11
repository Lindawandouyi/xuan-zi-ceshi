<<<<<<< HEAD
import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
=======
import { Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
>>>>>>> 77294604f6e4e15e664e99930c9adc2419632c7d
import Home from "./components/home";
import SearchPage from "./pages/search";
import TemplatesPage from "./pages/templates";
import CampaignsPage from "./pages/campaigns";
import SettingsPage from "./pages/settings";
import Sidebar from "./components/layout/Sidebar";

const ImPage = lazy(() => import("./pages/im"));

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
<<<<<<< HEAD
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/im" element={<ImPage />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
=======
    <Suspense fallback={<p>加载中...</p>}>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* 侧边栏 */}
        <div
          className={`${sidebarCollapsed ? "w-16" : "w-64"} transition-all duration-300 ease-in-out`}
        >
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* 主内容区域 */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home sidebarCollapsed={sidebarCollapsed} />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
>>>>>>> 77294604f6e4e15e664e99930c9adc2419632c7d
    </Suspense>
  );
}

export default App;

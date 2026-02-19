import React, { useState, useEffect } from "react";
import UsageChart from "./sideBar/ChartData.jsx";
import { useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import Myfiles from "./sideBar/Myfiles";
import Docs from "./sideBar/Docs";
import ApiKeys from "./sideBar/ApiKeys";
 
import Settings from "./sideBar/Settings";
import StorageCard from "./sideBar/Storage.jsx";

const Home = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const tabs = [
    { key: "home", label: "Dashboard", icon: "📊" },
    { key: "myfiles", label: "My Files", icon: "📁" },
    { key: "docs", label: "Docs", icon: "📖" },
    { key: "apikeys", label: "API Keys", icon: "🔑" },
    
    { key: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">

      {/* Mobile Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <div className={`fixed md:relative w-64 h-screen z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform`}>
        <div className="flex flex-col h-full bg-black/40 backdrop-blur-md border-r border-slate-700/50">
          
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-700/50 flex justify-between items-center">
          <img 
    src="https://img.icons8.com/?size=100&id=4iopi8K1fYnj&format=png&color=ffffff" 
    alt="CloudShare logo"
    className="w-9 h-9"
  />
            <h1 className="text-2xl font-bold">CloudShare</h1>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 rounded-lg hover:bg-white/10 transition">
              <X size={20} />
            </button>
          </div>

          {/* Tabs */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {tabs.map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => { setTab(key); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left
                  ${tab === key ? "bg-white/10 text-white shadow-glow" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
              >
                <span className="text-lg">{icon}</span> {label}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="px-4 py-4 border-t border-slate-700/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-4 bg-black/40 backdrop-blur-sm border-b border-slate-700/50">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-white/10 transition">
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-bold">CloudShare</h1>
          <div className="w-10" />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">

          {tab === "home" && (
            <>
              <h2 className="text-3xl sm:text-4xl font-bold">Welcome Back!</h2>
              <div className="bg-black/30 backdrop-blur-md p-4 rounded-lg ">
                <UsageChart />
              </div>
              <StorageCard />
              <Myfiles />
            </>
          )}

          {tab === "myfiles" && <Myfiles />}
          {tab === "docs" && <Docs />}
          {tab === "apikeys" && <ApiKeys />}
          
          {tab === "settings" && <Settings />}

        </div>
      </div>
    </div>
  );
};

export default Home;

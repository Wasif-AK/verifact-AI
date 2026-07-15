import React, { useState } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [dashboardTab, setDashboardTab] = useState<"analyze" | "trends" | "extension">("analyze");
  const [darkMode, setDarkMode] = useState<boolean>(true); // Default to a gorgeous slate dark theme for premium vibes

  const handleLaunchDemo = (tabName: "analyze" | "trends" | "extension") => {
    setDashboardTab(tabName);
    setTimeout(() => {
      document.getElementById("demo-tool")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <div className={`min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950 text-gray-900 dark:text-gray-100 ${darkMode ? "dark" : ""}`}>
      {/* Universal header navigation */}
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />

      {/* Main unified single page layout */}
      <div className="flex flex-col">
        {/* Marketing info & interactive intro */}
        <LandingPage onLaunchDemo={handleLaunchDemo} />
        
        {/* Centerpiece: Real-Time Interactive Tool Console */}
        <div id="demo-tool" className="scroll-mt-16 bg-white dark:bg-slate-900 border-y border-gray-200 dark:border-slate-800 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-violet bg-brand-lilac/30 dark:bg-brand-indigo/30 px-3 py-1 rounded-full">
                LIVE INTERACTIVE WORKSPACE
              </span>
              <p className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white font-sans">
                VeriFact AI Working Console
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-xs text-gray-500 dark:text-gray-400">
                Explore our live factual check engine, regional misinformation telemetry, and custom browser extension simulator.
              </p>
            </div>
            
            <Dashboard activeTab={dashboardTab} setActiveTab={setDashboardTab} />
          </div>
        </div>
      </div>
    </div>
  );
}


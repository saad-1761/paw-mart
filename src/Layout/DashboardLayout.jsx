import React, { useState } from "react";
import { Outlet } from "react-router";
import DashboardNavbar from "../Components/DashboardNavbar";
import DashboardSidebar from "../Components/DashboardSidebar";
import DynamicTitle from "../Components/DynamincTitle";
import { Scroll } from "lucide-react";
import ScrollToTop from "../Components/ScrollToTop";

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DynamicTitle />
      <ScrollToTop />
      <DashboardNavbar
        onOpenSidebar={() => setMobileSidebarOpen(true)}
        isSidebarCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((p) => !p)}
      />

      {/* Fixed navbar height spacing (adjust if your navbar height differs) */}
      <div className="pt-[72px]">
        <div className="flex min-h-[calc(100vh-72px)]">
          <DashboardSidebar
            collapsed={sidebarCollapsed}
            mobileOpen={mobileSidebarOpen}
            onCloseMobile={() => setMobileSidebarOpen(false)}
          />

          <main className="flex-1 px-4 md:px-6 py-6">
            <div className="max-w-6xl mx-auto">
              <Outlet />
            </div>

            <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Paw Mart — Dashboard
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

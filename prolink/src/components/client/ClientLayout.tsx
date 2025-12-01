import { useState } from "react";
import ClientHeader from "./ClientHeader";
import ClientSidebar from "./ClientSidebar";
import { Outlet } from "react-router";

const ClientLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <ClientSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <ClientHeader setIsSidebarOpen={setIsSidebarOpen} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientLayout
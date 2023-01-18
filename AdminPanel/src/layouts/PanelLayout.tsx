import React from "react";
import Sidebar from "@/components/global/Sidebar";

function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row items-start justify-start">
      <Sidebar />
      {children}
    </div>
  );
}

export default PanelLayout;

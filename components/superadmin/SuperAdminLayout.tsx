import { useState } from "react";
import { SuperAdminSidebar } from "./SuperAdminSidebar";
import { SaaSDashboard } from "./SaaSDashboard";
import { TenantManagement } from "./TenantManagement";
import { PlanManagement } from "./PlanManagement";
import { BillingManagement } from "./BillingManagement";
import { SeedConfiguration } from "./SeedConfiguration";
import { SystemLogs } from "./SystemLogs";

interface SuperAdminLayoutProps {
  onLogout: () => void;
}

export function SuperAdminLayout({ onLogout }: SuperAdminLayoutProps) {
  const [currentScreen, setCurrentScreen] = useState("dashboard");

  const renderContent = () => {
    switch (currentScreen) {
      case "dashboard":
        return <SaaSDashboard />;
      case "tenants":
        return <TenantManagement />;
      case "plans":
        return <PlanManagement />;
      case "billing":
        return <BillingManagement />;
      case "seeds":
        return <SeedConfiguration />;
      case "logs":
        return <SystemLogs />;
      default:
        return <SaaSDashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SuperAdminSidebar
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
        onLogout={onLogout}
      />
      <main className="flex-1 overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
}

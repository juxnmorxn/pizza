import { useState } from "react";
import { OwnerSidebar } from "./OwnerSidebar";
import { ExecutiveDashboard } from "./ExecutiveDashboard";
import { BranchMonitor } from "./BranchMonitor";
import { AuditModule } from "./AuditModule";
import { MasterInventory } from "./MasterInventory";
import { PersonnelManagement } from "./PersonnelManagement";
import { IntelligentReports } from "./IntelligentReports";
import { GlobalConfiguration } from "./GlobalConfiguration";

interface OwnerLayoutProps {
  onLogout: () => void;
}

export function OwnerLayout({ onLogout }: OwnerLayoutProps) {
  const [currentScreen, setCurrentScreen] = useState<string>("dashboard");

  const renderContent = () => {
    switch (currentScreen) {
      case "dashboard":
        return <ExecutiveDashboard />;
      case "branches":
        return <BranchMonitor />;
      case "audit":
        return <AuditModule />;
      case "inventory":
        return <MasterInventory />;
      case "personnel":
        return <PersonnelManagement />;
      case "reports":
        return <IntelligentReports />;
      case "config":
        return <GlobalConfiguration />;
      default:
        return <ExecutiveDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-shrink-0">
        <OwnerSidebar
          currentScreen={currentScreen}
          onScreenChange={setCurrentScreen}
          onLogout={onLogout}
        />
      </div>
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

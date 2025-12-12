import { useState } from "react";
import { POSSidebar } from "./POSSidebar";
import { ShiftStart } from "./ShiftStart";
import { SalesScreen } from "./SalesScreen";
import { InventoryScreen } from "./InventoryScreen";
import { CashMovements } from "./CashMovements";
import { Queries } from "./Queries";

interface POSLayoutProps {
  onLogout: () => void;
}

export function POSLayout({ onLogout }: POSLayoutProps) {
  const [currentScreen, setCurrentScreen] = useState<string>("shift-start");
  const [shiftStarted, setShiftStarted] = useState(false);

  const handleStartShift = () => {
    setShiftStarted(true);
    setCurrentScreen("sales");
  };

  const renderContent = () => {
    if (!shiftStarted && currentScreen === "shift-start") {
      return <ShiftStart onStartShift={handleStartShift} />;
    }

    switch (currentScreen) {
      case "sales":
        return <SalesScreen />;
      case "inventory":
        return <InventoryScreen />;
      case "cash":
        return <CashMovements onCloseShift={() => {
          setShiftStarted(false);
          setCurrentScreen("shift-start");
        }} />;
      case "queries":
        return <Queries />;
      default:
        return <SalesScreen />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-shrink-0">
        <POSSidebar
          currentScreen={currentScreen}
          onScreenChange={setCurrentScreen}
          onLogout={onLogout}
          shiftStarted={shiftStarted}
        />
      </div>
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

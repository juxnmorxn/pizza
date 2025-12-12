import { useState } from "react";
import { ScannerLinkScreen } from "./ScannerLinkScreen";
import { ProductPhotoCamera } from "./ProductPhotoCamera";
import { InventoryScannerMode } from "./InventoryScannerMode";
import { PriceChecker } from "./PriceChecker";
import { EvidenceCamera } from "./EvidenceCamera";
import { LocationFinder } from "./LocationFinder";

interface ScannerLayoutProps {
  onLogout: () => void;
}

export function ScannerLayout({ onLogout }: ScannerLayoutProps) {
  const [currentMode, setCurrentMode] = useState<string>("link");
  const [isLinked, setIsLinked] = useState(false);

  const handleLink = () => {
    setIsLinked(true);
    setCurrentMode("standby");
  };

  const renderContent = () => {
    switch (currentMode) {
      case "link":
        return (
          <ScannerLinkScreen
            onLink={handleLink}
            onModeChange={setCurrentMode}
            onLogout={onLogout}
          />
        );
      case "standby":
        return (
          <StandbyScreen
            onModeChange={setCurrentMode}
            onDisconnect={() => {
              setIsLinked(false);
              setCurrentMode("link");
            }}
          />
        );
      case "photo":
        return (
          <ProductPhotoCamera
            onBack={() => setCurrentMode("standby")}
          />
        );
      case "inventory":
        return (
          <InventoryScannerMode
            onBack={() => setCurrentMode(isLinked ? "standby" : "link")}
          />
        );
      case "price":
        return (
          <PriceChecker
            onBack={() => setCurrentMode(isLinked ? "standby" : "link")}
          />
        );
      case "evidence":
        return (
          <EvidenceCamera
            onBack={() => setCurrentMode(isLinked ? "standby" : "link")}
          />
        );
      case "location":
        return (
          <LocationFinder
            onBack={() => setCurrentMode(isLinked ? "standby" : "link")}
          />
        );
      default:
        return (
          <ScannerLinkScreen
            onLink={handleLink}
            onModeChange={setCurrentMode}
            onLogout={onLogout}
          />
        );
    }
  };

  return (
    <div className="h-screen bg-background overflow-hidden">
      {renderContent()}
    </div>
  );
}

// Standby Screen Component
interface StandbyScreenProps {
  onModeChange: (mode: string) => void;
  onDisconnect: () => void;
}

function StandbyScreen({ onModeChange, onDisconnect }: StandbyScreenProps) {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-emerald-600 to-green-700 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">Vinculado</span>
          </div>
          <button
            onClick={onDisconnect}
            className="text-xs px-3 py-1 bg-white/20 rounded-lg"
          >
            Desconectar
          </button>
        </div>
        <h1 className="text-xl">🎯 En Espera</h1>
        <p className="text-sm text-green-100">
          Caja 1 - Sucursal Norte
        </p>
      </div>

      {/* Tools Grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        <p className="text-sm text-muted-foreground mb-4">
          Herramientas disponibles:
        </p>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => onModeChange("inventory")}
            className="p-6 bg-white rounded-2xl shadow-lg active:scale-95 transition-transform border-2 border-transparent hover:border-emerald-500"
          >
            <div className="text-4xl mb-3">📊</div>
            <h3 className="mb-1">Escáner de Inventario</h3>
            <p className="text-sm text-muted-foreground">
              Auditoría rápida sin PC
            </p>
          </button>

          <button
            onClick={() => onModeChange("price")}
            className="p-6 bg-white rounded-2xl shadow-lg active:scale-95 transition-transform border-2 border-transparent hover:border-emerald-500"
          >
            <div className="text-4xl mb-3">🏷️</div>
            <h3 className="mb-1">Verificador de Precios</h3>
            <p className="text-sm text-muted-foreground">
              Consulta rápida para clientes
            </p>
          </button>

          <button
            onClick={() => onModeChange("evidence")}
            className="p-6 bg-white rounded-2xl shadow-lg active:scale-95 transition-transform border-2 border-transparent hover:border-emerald-500"
          >
            <div className="text-4xl mb-3">📸</div>
            <h3 className="mb-1">Cámara de Evidencias</h3>
            <p className="text-sm text-muted-foreground">
              Justificar gastos o daños
            </p>
          </button>

          <button
            onClick={() => onModeChange("location")}
            className="p-6 bg-white rounded-2xl shadow-lg active:scale-95 transition-transform border-2 border-transparent hover:border-emerald-500"
          >
            <div className="text-4xl mb-3">📍</div>
            <h3 className="mb-1">Buscador de Ubicación</h3>
            <p className="text-sm text-muted-foreground">
              Encuentra productos en bodega
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

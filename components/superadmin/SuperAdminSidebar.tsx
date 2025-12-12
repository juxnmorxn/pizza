import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Package,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Crown
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";

interface SuperAdminSidebarProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
  onLogout: () => void;
}

export function SuperAdminSidebar({
  currentScreen,
  onScreenChange,
  onLogout,
}: SuperAdminSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { id: "dashboard", label: "SaaS Overview", icon: LayoutDashboard },
    { id: "tenants", label: "Gestión de Tenants", icon: Users },
    { id: "plans", label: "Planes y Límites", icon: Package },
    { id: "billing", label: "Facturación SaaS", icon: CreditCard },
    { id: "seeds", label: "Catálogos Base", icon: Settings },
    { id: "logs", label: "Logs del Sistema", icon: FileText },
  ];

  return (
    <div
      className={`bg-gradient-to-b from-purple-900 to-indigo-900 text-white transition-all duration-300 flex flex-col ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-400 rounded-lg">
            <Crown className="w-6 h-6 text-purple-900" />
          </div>
          {isExpanded && (
            <div>
              <h2 className="text-lg">Super Admin</h2>
              <p className="text-xs text-purple-200">Control Maestro</p>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center"
        >
          {isExpanded ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          const button = (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-purple-600 shadow-lg"
                  : "hover:bg-white/10"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isExpanded && <span className="text-sm">{item.label}</span>}
            </button>
          );

          if (!isExpanded) {
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>{button}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            );
          }

          return button;
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-600/20 transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isExpanded && <span className="text-sm">Cerrar Sesión</span>}
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import {
  ShoppingCart,
  Package,
  DollarSign,
  Search,
  LogOut,
  X,
  CircleDollarSign
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface POSSidebarProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
  onLogout: () => void;
  shiftStarted: boolean;
}

export function POSSidebar({
  currentScreen,
  onScreenChange,
  onLogout,
  shiftStarted
}: POSSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    {
      id: "sales",
      label: "Punto de Venta",
      icon: ShoppingCart,
      disabled: !shiftStarted
    },
    {
      id: "inventory",
      label: "Inventario",
      icon: Package,
      disabled: false
    },
    {
      id: "cash",
      label: "Movimientos de Caja",
      icon: CircleDollarSign,
      disabled: !shiftStarted
    },
    {
      id: "queries",
      label: "Consultas",
      icon: Search,
      disabled: false
    }
  ];

  const handleItemClick = (itemId: string, disabled: boolean) => {
    if (disabled) return;
    setIsExpanded(true);
    onScreenChange(itemId);
  };

  return (
    <TooltipProvider delayDuration={300}>
      <aside
        className={`sidebar-expand h-full m-4 rounded-2xl gradient-sidebar shadow-xl transition-all duration-300 ${
          isExpanded ? "w-64" : "w-20"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            {isExpanded ? (
              <>
                <span className="text-sidebar-foreground">POS</span>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="w-full flex justify-center">
                <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-sidebar-primary-foreground" />
                </div>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;

              const buttonContent = (
                <button
                  onClick={() => handleItemClick(item.id, item.disabled)}
                  disabled={item.disabled}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                      : item.disabled
                      ? "text-sidebar-foreground/40 cursor-not-allowed"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "active-indicator" : ""}`} />
                  {isExpanded && (
                    <span className="text-sm whitespace-nowrap overflow-hidden">
                      {item.label}
                    </span>
                  )}
                  {isActive && !isExpanded && (
                    <div className="absolute left-0 w-1 h-8 bg-sidebar-primary rounded-r-full" />
                  )}
                </button>
              );

              if (!isExpanded && !item.disabled) {
                return (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
                    <TooltipContent side="right" className="bg-sidebar text-sidebar-foreground">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return <div key={item.id}>{buttonContent}</div>;
            })}
          </nav>

          {/* Logout Button */}
          <div className="pt-4 border-t border-sidebar-border">
            {isExpanded ? (
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">Cerrar Sesión</span>
              </button>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center px-3 py-3 rounded-xl text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-sidebar text-sidebar-foreground">
                  Cerrar Sesión
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}

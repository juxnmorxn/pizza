import { useState } from "react";
import { Search, ScanLine, DollarSign, Wifi, WifiOff } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";

interface SalesHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SalesHeader({ searchQuery, onSearchChange }: SalesHeaderProps) {
  const [showScanner, setShowScanner] = useState(false);
  const [showPriceCheck, setShowPriceCheck] = useState(false);
  const [isOnline] = useState(true);

  return (
    <>
      <div className="bg-card border-b px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por nombre, SKU o etiqueta..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Scanner Button */}
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowScanner(true)}
            className="gap-2"
          >
            <ScanLine className="w-5 h-5" />
            Escáner
          </Button>

          {/* Price Check Button */}
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowPriceCheck(true)}
            className="gap-2"
          >
            <DollarSign className="w-5 h-5" />
            Verificar Precio
          </Button>

          {/* Sync Status */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isOnline ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
            {isOnline ? (
              <>
                <Wifi className="w-4 h-4" />
                <span className="text-sm">En línea</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4" />
                <span className="text-sm">Modo Offline</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Scanner Modal */}
      <Dialog open={showScanner} onOpenChange={setShowScanner}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Escáner de Código de Barras</DialogTitle>
          </DialogHeader>
          <div className="py-8 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-emerald-600 to-green-700 mb-4">
              <ScanLine className="w-12 h-12 text-white" />
            </div>
            <p className="text-muted-foreground mb-4">
              Coloca el código de barras frente a la cámara
            </p>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Vista de cámara</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Price Check Modal */}
      <Dialog open={showPriceCheck} onOpenChange={setShowPriceCheck}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verificar Precio</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground mb-4">
              Escanea o busca un producto para verificar su precio sin agregarlo al carrito
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar producto..."
                className="pl-10"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

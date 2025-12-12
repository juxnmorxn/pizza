import { useState } from "react";
import { ArrowLeft, Scan, List, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

interface InventoryScannerModeProps {
  onBack: () => void;
}

interface ScannedItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  image?: string;
}

export function InventoryScannerMode({ onBack }: InventoryScannerModeProps) {
  const [auditName, setAuditName] = useState("Estante A");
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
  const [showList, setShowList] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [quantity, setQuantity] = useState("");
  const [scanning, setScanning] = useState(false);

  // Mock products for demo
  const mockProducts: any = {
    "123456": {
      id: "1",
      name: "Botas Cuadra Avestruz",
      sku: "BOT-001",
      image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=200"
    },
    "789012": {
      id: "2",
      name: "Sombrero Texana Premium",
      sku: "SOM-001",
      image: "https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=200"
    },
    "345678": {
      id: "3",
      name: "Cinturón Piel de Res",
      sku: "CIN-001",
      image: "https://images.unsplash.com/photo-1624222247344-550fb60583e2?w=200"
    }
  };

  const handleScan = () => {
    // Simulate scanning
    setScanning(true);
    setTimeout(() => {
      const codes = Object.keys(mockProducts);
      const randomCode = codes[Math.floor(Math.random() * codes.length)];
      const product = mockProducts[randomCode];
      setCurrentItem(product);
      setScanning(false);
    }, 800);
  };

  const handleAddItem = () => {
    if (!currentItem || !quantity) return;

    const newItem: ScannedItem = {
      id: currentItem.id,
      name: currentItem.name,
      sku: currentItem.sku,
      quantity: parseInt(quantity),
      image: currentItem.image
    };

    setScannedItems(prev => {
      const existing = prev.find(item => item.id === newItem.id);
      if (existing) {
        return prev.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });

    setCurrentItem(null);
    setQuantity("");
  };

  if (showList) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-600 to-green-700 text-white">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowList(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl">Productos Contados</h1>
            <div className="w-10 h-10" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-green-100">Auditoría: {auditName}</span>
            <Badge className="bg-white text-emerald-600">
              {scannedItems.length} items
            </Badge>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6">
          {scannedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <List className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No hay productos escaneados aún
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {scannedItems.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-xl shadow-md border-2 border-green-500"
                >
                  <div className="flex gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h4>{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        SKU: {item.sku}
                      </p>
                      <div className="mt-2">
                        <Badge className="bg-emerald-600">
                          Cantidad: {item.quantity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 border-t space-y-3">
          <Button
            onClick={() => setShowList(false)}
            className="w-full h-14 bg-gradient-to-r from-emerald-600 to-green-700"
          >
            Continuar Escaneando
          </Button>
          {scannedItems.length > 0 && (
            <Button
              onClick={() => {
                alert("Auditoría guardada correctamente");
                onBack();
              }}
              variant="outline"
              className="w-full h-14"
            >
              Finalizar Auditoría
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Header */}
      <div className="p-6 bg-gradient-to-b from-black/90 to-transparent absolute top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="p-2 bg-white/20 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-lg">📊 Escáner de Inventario</h1>
          <button
            onClick={() => setShowList(true)}
            className="p-2 bg-white/20 rounded-lg relative"
          >
            <List className="w-6 h-6 text-white" />
            {scannedItems.length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                {scannedItems.length}
              </div>
            )}
          </button>
        </div>

        <div className="text-center">
          <p className="text-white/80 text-sm">Auditoría: {auditName}</p>
        </div>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 flex items-center justify-center">
        {currentItem ? (
          // Show scanned product
          <div className="w-full max-w-md mx-6">
            <div className="bg-white rounded-3xl p-6 shadow-2xl">
              {/* Product Info */}
              <div className="flex items-center gap-4 mb-6">
                {currentItem.image && (
                  <img
                    src={currentItem.image}
                    alt={currentItem.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="mb-1">{currentItem.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    SKU: {currentItem.sku}
                  </p>
                </div>
                <Check className="w-8 h-8 text-green-600" />
              </div>

              {/* Quantity Input */}
              <div className="space-y-3">
                <label className="text-sm">Cantidad Contada:</label>
                <Input
                  type="number"
                  inputMode="numeric"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
                  className="h-20 text-3xl text-center"
                  autoFocus
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => {
                    setCurrentItem(null);
                    setQuantity("");
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleAddItem}
                  disabled={!quantity}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-green-700"
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Show scanner frame
          <div className="relative">
            <div className="w-72 h-72 border-4 border-white/30 rounded-3xl flex items-center justify-center">
              {scanning ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-1 bg-green-500 animate-pulse" />
                </div>
              ) : (
                <Scan className="w-24 h-24 text-white/50" />
              )}
            </div>

            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-green-500 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-green-500 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-green-500 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-green-500 rounded-br-3xl" />
          </div>
        )}
      </div>

      {/* Bottom Instructions */}
      {!currentItem && (
        <div className="p-6 bg-gradient-to-t from-black/90 to-transparent">
          <div className="text-center mb-6">
            <p className="text-white text-lg mb-2">
              Apunta al código de barras
            </p>
            <p className="text-white/70 text-sm">
              Escucharás un "beep" al detectar el código
            </p>
          </div>

          <Button
            onClick={handleScan}
            disabled={scanning}
            className="w-full h-16 bg-gradient-to-r from-emerald-600 to-green-700"
          >
            {scanning ? "Escaneando..." : "Simular Escaneo"}
          </Button>
        </div>
      )}
    </div>
  );
}

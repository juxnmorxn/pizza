import { useState } from "react";
import { ArrowLeft, Scan, DollarSign } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface PriceCheckerProps {
  onBack: () => void;
}

export function PriceChecker({ onBack }: PriceCheckerProps) {
  const [scanning, setScanning] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Mock products
  const mockProducts: any = {
    "123456": {
      id: "1",
      name: "Botas Cuadra Avestruz",
      sku: "BOT-001",
      price: 3499.99,
      image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400",
      variants: ["Talla 25", "Talla 26", "Talla 27", "Talla 28"]
    },
    "789012": {
      id: "2",
      name: "Sombrero Texana Premium",
      sku: "SOM-001",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=400",
      variants: ["Talla 56", "Talla 57", "Talla 58"]
    },
    "345678": {
      id: "3",
      name: "Cinturón Piel de Res",
      sku: "CIN-001",
      price: 599.99,
      image: "https://images.unsplash.com/photo-1624222247344-550fb60583e2?w=400",
      variants: ["30 cm", "32 cm", "34 cm", "36 cm", "38 cm"]
    }
  };

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      const codes = Object.keys(mockProducts);
      const randomCode = codes[Math.floor(Math.random() * codes.length)];
      const product = mockProducts[randomCode];
      setSelectedProduct(product);
      setScanning(false);
    }, 800);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="h-full flex flex-col bg-black relative">
      {/* Header */}
      <div className="p-6 bg-gradient-to-b from-black/90 to-transparent absolute top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 bg-white/20 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-lg">🏷️ Verificador de Precios</h1>
          <div className="w-10 h-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        {selectedProduct ? (
          // Product Price Modal
          <div
            onClick={handleClose}
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer active:scale-95 transition-transform"
          >
            {/* Product Image */}
            <div className="relative h-64 bg-gradient-to-br from-emerald-100 to-green-100">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="p-8 text-center">
              <Badge variant="outline" className="mb-4">
                {selectedProduct.sku}
              </Badge>

              <h2 className="mb-6">{selectedProduct.name}</h2>

              {/* Price - Large Display */}
              <div className="mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <span className="text-6xl text-green-600">
                    {selectedProduct.price.toLocaleString("es-MX", {
                      minimumFractionDigits: 2
                    })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Precio de venta</p>
              </div>

              {/* Variants Available */}
              {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                <div className="border-t pt-6">
                  <p className="text-sm text-muted-foreground mb-3">
                    Disponible en:
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {selectedProduct.variants.map((variant: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {variant}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Close Instruction */}
              <p className="text-xs text-muted-foreground mt-8">
                Toca en cualquier lugar para cerrar
              </p>
            </div>
          </div>
        ) : (
          // Scanner Frame
          <div className="text-center">
            <div className="relative mx-auto mb-8">
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

            <p className="text-white text-lg mb-2">
              Apunta al código de barras
            </p>
            <p className="text-white/70 text-sm mb-8">
              Se mostrará el precio en pantalla grande
            </p>

            <Button
              onClick={handleScan}
              disabled={scanning}
              className="w-64 h-16 bg-gradient-to-r from-emerald-600 to-green-700"
            >
              {scanning ? "Escaneando..." : "Simular Escaneo"}
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      {!selectedProduct && (
        <div className="p-6 bg-gradient-to-t from-black/90 to-transparent">
          <div className="text-center">
            <p className="text-white/50 text-sm">
              💡 Tip: Muestra la pantalla al cliente para que vea el precio
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

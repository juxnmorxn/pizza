import { useState } from "react";
import { Search, DollarSign, Package, MapPin } from "lucide-react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

export function Queries() {
  const [priceCheckQuery, setPriceCheckQuery] = useState("");
  const [stockQuery, setStockQuery] = useState("");

  // Mock data
  const mockProduct = {
    name: "Botas Cuadra Avestruz",
    sku: "BOT-002",
    price: 3499.99,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400",
    stockByBranch: [
      { branch: "Sucursal Norte", stock: 8 },
      { branch: "Sucursal Centro", stock: 2 },
      { branch: "Sucursal Sur", stock: 5 }
    ]
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50/50 via-green-50/50 to-teal-50/50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 text-white">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h1>Consultas y Verificación</h1>
              <p className="text-muted-foreground">
                Herramientas de búsqueda y verificación
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Price Checker */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-100 text-green-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3>Verificador de Precios</h3>
                <p className="text-sm text-muted-foreground">
                  Para mostrar al cliente
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Escanear o buscar producto..."
                  value={priceCheckQuery}
                  onChange={(e) => setPriceCheckQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {priceCheckQuery && (
                <div className="p-6 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl text-white text-center">
                  <div className="mb-4">
                    <img
                      src={mockProduct.image}
                      alt={mockProduct.name}
                      className="w-32 h-32 object-cover rounded-lg mx-auto mb-3"
                    />
                    <h2 className="mb-1">{mockProduct.name}</h2>
                    <p className="text-sm opacity-80">SKU: {mockProduct.sku}</p>
                  </div>
                  <div className="py-4 border-y border-white/20">
                    <p className="text-sm opacity-80 mb-2">Precio</p>
                    <p className="text-5xl">
                      ${mockProduct.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-4">
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      Disponible en tienda
                    </Badge>
                  </div>
                </div>
              )}

              {!priceCheckQuery && (
                <div className="text-center py-12 text-muted-foreground">
                  <DollarSign className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p>Busca un producto para ver su precio</p>
                </div>
              )}
            </div>
          </Card>

          {/* Stock Checker */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3>Consulta de Existencias</h3>
                <p className="text-sm text-muted-foreground">
                  Ver stock en todas las sucursales
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar producto..."
                  value={stockQuery}
                  onChange={(e) => setStockQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {stockQuery && (
                <div className="space-y-3">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={mockProduct.image}
                        alt={mockProduct.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm">{mockProduct.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {mockProduct.sku}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {mockProduct.stockByBranch.map((branch, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-card rounded-lg border"
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{branch.branch}</span>
                          </div>
                          <Badge
                            variant={
                              branch.stock > 5
                                ? "default"
                                : branch.stock > 0
                                ? "secondary"
                                : "destructive"
                            }
                            className={branch.stock > 5 ? "bg-green-600" : ""}
                          >
                            {branch.stock} {branch.stock === 1 ? "unidad" : "unidades"}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Total en red:
                        </span>
                        <span className="text-primary">
                          {mockProduct.stockByBranch.reduce(
                            (sum, b) => sum + b.stock,
                            0
                          )}{" "}
                          unidades
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!stockQuery && (
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p>Busca un producto para ver existencias</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 mt-6">
          <h3 className="mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-muted transition-colors cursor-pointer">
              <h4 className="text-sm mb-1">Productos Más Vendidos</h4>
              <p className="text-xs text-muted-foreground">
                Ver reporte de productos populares
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted transition-colors cursor-pointer">
              <h4 className="text-sm mb-1">Productos con Stock Bajo</h4>
              <p className="text-xs text-muted-foreground">
                Alertas de reabastecimiento
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted transition-colors cursor-pointer">
              <h4 className="text-sm mb-1">Historial de Ventas</h4>
              <p className="text-xs text-muted-foreground">
                Consultar ventas del día
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

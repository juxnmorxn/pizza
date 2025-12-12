import { useState } from "react";
import { Package, TrendingUp, ArrowRightLeft, Edit, Trash2, Plus } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export function MasterInventory() {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Mock products data with costs (only visible to owner)
  const products = [
    {
      id: 1,
      sku: "SOM-001",
      name: "Sombrero Texana Premium",
      cost: 650.0,
      price: 1299.99,
      margin: 99.98,
      totalStock: 48,
      stockByBranch: { north: 15, center: 18, south: 8, east: 7 }
    },
    {
      id: 2,
      sku: "BOT-002",
      name: "Botas Cuadra Avestruz",
      cost: 2100.0,
      price: 3499.99,
      margin: 66.66,
      totalStock: 23,
      stockByBranch: { north: 8, center: 6, south: 5, east: 4 }
    },
    {
      id: 3,
      sku: "CIN-003",
      name: "Cinturón Piel de Res",
      cost: 250.0,
      price: 599.99,
      margin: 139.99,
      totalStock: 87,
      stockByBranch: { north: 25, center: 32, south: 18, east: 12 }
    },
    {
      id: 4,
      sku: "SOM-004",
      name: "Sombrero Vaquero Clásico",
      cost: 450.0,
      price: 899.99,
      margin: 99.99,
      totalStock: 65,
      stockByBranch: { north: 20, center: 25, south: 12, east: 8 }
    },
    {
      id: 5,
      sku: "BOT-005",
      name: "Botas Vaqueras Clásicas",
      cost: 1300.0,
      price: 2199.99,
      margin: 69.23,
      totalStock: 34,
      stockByBranch: { north: 12, center: 10, south: 7, east: 5 }
    }
  ];

  const totalInventoryValue = products.reduce(
    (sum, p) => sum + p.cost * p.totalStock,
    0
  );
  const totalRetailValue = products.reduce(
    (sum, p) => sum + p.price * p.totalStock,
    0
  );
  const totalItems = products.reduce((sum, p) => sum + p.totalStock, 0);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50/50 via-green-50/50 to-teal-50/50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 text-white">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h1>Inventario Maestro</h1>
              <p className="text-muted-foreground">
                Gestión completa de productos y valuación
              </p>
            </div>
          </div>

          <Button className="bg-gradient-to-r from-emerald-600 to-green-700 gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Producto
          </Button>
        </div>

        {/* Valuation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inversión Total</p>
                <p className="text-2xl text-primary">
                  ${totalInventoryValue.toLocaleString()}
                </p>
              </div>
              <Package className="w-8 h-8 text-blue-600 opacity-50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Valor de compra del inventario
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valor de Venta</p>
                <p className="text-2xl text-green-600">
                  ${totalRetailValue.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 opacity-50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Si se vendiera todo el stock
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Utilidad Potencial</p>
                <p className="text-2xl text-emerald-600">
                  ${(totalRetailValue - totalInventoryValue).toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-600 opacity-50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Ganancia si se vende todo
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl text-primary">{totalItems}</p>
              </div>
              <Package className="w-8 h-8 text-purple-600 opacity-50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {products.length} productos únicos
            </p>
          </Card>
        </div>

        {/* Products Table */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>Catálogo Maestro</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Buscar producto..."
                className="w-64"
              />
            </div>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Costo</TableHead>
                  <TableHead className="text-right">Precio Venta</TableHead>
                  <TableHead className="text-right">Margen %</TableHead>
                  <TableHead className="text-right">Stock Total</TableHead>
                  <TableHead>Distribución</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Badge variant="outline">{product.sku}</Badge>
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell className="text-right text-orange-600">
                      ${product.cost.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right text-green-600">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-emerald-600">
                        {product.margin.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-lg">{product.totalStock}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">
                          N:{product.stockByBranch.north}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          C:{product.stockByBranch.center}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          S:{product.stockByBranch.south}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          E:{product.stockByBranch.east}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowTransferModal(true);
                          }}
                        >
                          <ArrowRightLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowAdjustmentModal(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="mb-1">Reporte de Valuación</h4>
              <p className="text-sm text-muted-foreground">
                Este módulo muestra información financiera crítica del inventario, incluyendo 
                costos de compra que NO son visibles para empleados de punto de venta. 
                Úsalo para tomar decisiones de compra y detectar productos con bajo margen.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Transfer Modal */}
      <Dialog open={showTransferModal} onOpenChange={setShowTransferModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Traspaso de Inventario</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Producto</p>
                <p>{selectedProduct.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  SKU: {selectedProduct.sku}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Origen</Label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Sucursal Norte ({selectedProduct.stockByBranch.north})</option>
                    <option>Sucursal Centro ({selectedProduct.stockByBranch.center})</option>
                    <option>Sucursal Sur ({selectedProduct.stockByBranch.south})</option>
                    <option>Sucursal Este ({selectedProduct.stockByBranch.east})</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Destino</Label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Sucursal Norte</option>
                    <option>Sucursal Centro</option>
                    <option>Sucursal Sur</option>
                    <option>Sucursal Este</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Cantidad a Transferir</Label>
                <Input type="number" min="1" placeholder="0" />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowTransferModal(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-green-700">
                  Realizar Traspaso
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Adjustment Modal */}
      <Dialog open={showAdjustmentModal} onOpenChange={setShowAdjustmentModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajuste de Inventario</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Producto</p>
                <p>{selectedProduct.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Stock actual: {selectedProduct.totalStock} unidades
                </p>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-900">
                  <strong>Advertencia:</strong> Los ajustes de inventario afectan las 
                  estadísticas de negocio. Úsalos solo para corregir errores o dar de baja 
                  mercancía.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Sucursal</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Sucursal Norte</option>
                  <option>Sucursal Centro</option>
                  <option>Sucursal Sur</option>
                  <option>Sucursal Este</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Tipo de Ajuste</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Suma (+)</option>
                  <option>Resta (-)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Cantidad</Label>
                <Input type="number" min="1" placeholder="0" />
              </div>

              <div className="space-y-2">
                <Label>Motivo (Obligatorio)</Label>
                <Textarea
                  placeholder="Ej: Merma por daño, robo detectado, regalo a cliente, error de conteo..."
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAdjustmentModal(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-green-700">
                  Aplicar Ajuste
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

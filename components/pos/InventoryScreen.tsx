import { useState } from "react";
import { Package, Plus, Camera, QrCode, Printer, Tag } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

export function InventoryScreen() {
  const [mode, setMode] = useState<"new" | "existing">("new");
  const [category, setCategory] = useState<string>("");
  const [printLabels, setPrintLabels] = useState(false);

  const categories = [
    { id: "sombreros", name: "Sombreros" },
    { id: "botas", name: "Botas" },
    { id: "accesorios", name: "Accesorios" },
    { id: "cinturones", name: "Cinturones" },
    { id: "hebillas", name: "Hebillas" }
  ];

  const sizes = ["25", "26", "27", "28", "29", "30", "31", "32"];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50/50 via-green-50/50 to-teal-50/50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 text-white">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h1>Gestión de Inventario</h1>
              <p className="text-muted-foreground">
                Alta de productos y entradas de mercancía
              </p>
            </div>
          </div>
        </div>

        {/* Mode Selector */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="mode-switch">Modo de Operación</Label>
              <p className="text-sm text-muted-foreground">
                {mode === "new"
                  ? "Crear un nuevo producto"
                  : "Agregar stock a producto existente"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={mode === "existing" ? "text-primary" : "text-muted-foreground"}>
                Agregar Stock
              </span>
              <Switch
                id="mode-switch"
                checked={mode === "new"}
                onCheckedChange={(checked) => setMode(checked ? "new" : "existing")}
              />
              <span className={mode === "new" ? "text-primary" : "text-muted-foreground"}>
                Producto Nuevo
              </span>
            </div>
          </div>
        </Card>

        {/* Product Form */}
        {mode === "new" ? (
          <Card className="p-6">
            <form className="space-y-6">
              {/* Category Selection */}
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Nombre del Producto</Label>
                  <Input
                    id="product-name"
                    placeholder="Ej: Sombrero Texana Premium"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU / Código</Label>
                  <div className="flex gap-2">
                    <Input id="sku" placeholder="SOM-001" />
                    <Button variant="outline" size="icon">
                      <QrCode className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cost">Costo de Compra</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Precio de Venta</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="pl-8"
                    />
                  </div>
                </div>
              </div>

              {/* Barcode */}
              <div className="space-y-2">
                <Label htmlFor="barcode">Código de Barras</Label>
                <div className="flex gap-2">
                  <Input
                    id="barcode"
                    placeholder="Escanear o ingresar manualmente"
                  />
                  <Button variant="outline" type="button">
                    Generar Automático
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Photos */}
              <div className="space-y-3">
                <Label>Fotografías del Producto</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-32 flex-col gap-2"
                  >
                    <Camera className="w-8 h-8" />
                    <span>Usar Cámara</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-32 flex-col gap-2"
                  >
                    <QrCode className="w-8 h-8" />
                    <span>Vincular Celular (QR)</span>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Toma fotos claras del producto desde diferentes ángulos
                </p>
              </div>

              <Separator />

              {/* Variants (if applicable) */}
              {(category === "botas" || category === "sombreros") && (
                <div className="space-y-3">
                  <Label>Gestión de Tallas</Label>
                  <div className="grid grid-cols-4 gap-3">
                    {sizes.map((size) => (
                      <div key={size} className="space-y-1">
                        <Label htmlFor={`size-${size}`} className="text-xs">
                          Talla {size}
                        </Label>
                        <Input
                          id={`size-${size}`}
                          type="number"
                          min="0"
                          placeholder="0"
                          className="text-center"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Simple Stock (if no variants) */}
              {category !== "botas" && category !== "sombreros" && category && (
                <div className="space-y-2">
                  <Label htmlFor="stock">Cantidad en Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    placeholder="0"
                  />
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Descripción / Notas</Label>
                <Textarea
                  id="description"
                  placeholder="Detalles adicionales del producto..."
                  rows={3}
                />
              </div>

              {/* Print Labels */}
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <Checkbox
                  id="print-labels"
                  checked={printLabels}
                  onCheckedChange={(checked) => setPrintLabels(checked as boolean)}
                />
                <Label htmlFor="print-labels" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Printer className="w-4 h-4" />
                  Imprimir etiquetas al guardar
                </Label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Guardar Producto
                </Button>
              </div>
            </form>
          </Card>
        ) : (
          <Card className="p-6">
            <div className="text-center py-12">
              <Tag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="mb-2">Agregar Stock a Producto Existente</h3>
              <p className="text-muted-foreground mb-6">
                Busca el producto y actualiza sus cantidades
              </p>
              <div className="max-w-md mx-auto">
                <Input placeholder="Buscar producto por nombre o SKU..." />
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

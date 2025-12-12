import { useState } from "react";
import { Plus, Edit2, Trash2, Package, Tag, Palette, Ruler, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface CatalogItem {
  id: string;
  value: string;
}

interface SeedCatalog {
  categories: CatalogItem[];
  materials: CatalogItem[];
  colors: CatalogItem[];
  sizes: CatalogItem[];
}

export function SeedConfiguration() {
  const [showNewItemDialog, setShowNewItemDialog] = useState(false);
  const [selectedCatalog, setSelectedCatalog] = useState<keyof SeedCatalog | null>(null);
  const [newItemValue, setNewItemValue] = useState("");

  // Mock seed catalogs
  const [catalogs, setCatalogs] = useState<SeedCatalog>({
    categories: [
      { id: "cat1", value: "Botas" },
      { id: "cat2", value: "Zapatos" },
      { id: "cat3", value: "Cinturones" },
      { id: "cat4", value: "Sombreros" },
      { id: "cat5", value: "Carteras" },
      { id: "cat6", value: "Accesorios" }
    ],
    materials: [
      { id: "mat1", value: "Piel Genuina" },
      { id: "mat2", value: "Piel Sintética" },
      { id: "mat3", value: "Ante" },
      { id: "mat4", value: "Piel de Avestruz" },
      { id: "mat5", value: "Piel de Cocodrilo" },
      { id: "mat6", value: "Lona" },
      { id: "mat7", value: "Tela" }
    ],
    colors: [
      { id: "col1", value: "Negro" },
      { id: "col2", value: "Café" },
      { id: "col3", value: "Blanco" },
      { id: "col4", value: "Beige" },
      { id: "col5", value: "Rojo" },
      { id: "col6", value: "Azul" },
      { id: "col7", value: "Verde" },
      { id: "col8", value: "Gris" }
    ],
    sizes: [
      { id: "size1", value: "22" },
      { id: "size2", value: "23" },
      { id: "size3", value: "24" },
      { id: "size4", value: "25" },
      { id: "size5", value: "26" },
      { id: "size6", value: "27" },
      { id: "size7", value: "28" },
      { id: "size8", value: "29" },
      { id: "size9", value: "30" }
    ]
  });

  const catalogConfigs = {
    categories: {
      title: "Categorías de Productos",
      icon: Tag,
      color: "from-blue-600 to-blue-700",
      description: "Tipos de productos (Botas, Cinturones, etc.)"
    },
    materials: {
      title: "Materiales",
      icon: Package,
      color: "from-green-600 to-green-700",
      description: "Tipos de material (Piel, Sintético, etc.)"
    },
    colors: {
      title: "Colores",
      icon: Palette,
      color: "from-purple-600 to-purple-700",
      description: "Colores disponibles"
    },
    sizes: {
      title: "Tallas",
      icon: Ruler,
      color: "from-orange-600 to-orange-700",
      description: "Tallas estándar"
    }
  };

  const handleAddItem = () => {
    if (!selectedCatalog || !newItemValue.trim()) return;

    const newItem: CatalogItem = {
      id: `${selectedCatalog}_${Date.now()}`,
      value: newItemValue
    };

    setCatalogs({
      ...catalogs,
      [selectedCatalog]: [...catalogs[selectedCatalog], newItem]
    });

    setNewItemValue("");
    setShowNewItemDialog(false);
    setSelectedCatalog(null);
  };

  const handleDeleteItem = (catalogType: keyof SeedCatalog, itemId: string) => {
    if (confirm("¿Eliminar este elemento del catálogo base?")) {
      setCatalogs({
        ...catalogs,
        [catalogType]: catalogs[catalogType].filter(item => item.id !== itemId)
      });
    }
  };

  const handleSaveAll = () => {
    alert("Catálogos base guardados. Se aplicarán a todos los nuevos clientes que crees.");
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-2">Configuración de Semillas</h1>
            <p className="text-muted-foreground">
              Catálogos maestros pre-cargados para nuevos clientes
            </p>
          </div>
          <Button
            onClick={handleSaveAll}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 gap-2"
          >
            <Save className="w-4 h-4" />
            Guardar Cambios
          </Button>
        </div>

        {/* Info Card */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Package className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="mb-2 text-blue-900">¿Para qué sirven las Semillas?</h4>
                <p className="text-sm text-blue-800 mb-3">
                  Cuando creas un nuevo cliente, puedes optar por cargar estos catálogos base 
                  para que no entregues el sistema vacío. Les ahorras tiempo de configuración inicial.
                </p>
                <p className="text-sm text-blue-800">
                  Cada cliente podrá después editar, agregar o eliminar estos valores según sus necesidades.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Catalogs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {(Object.keys(catalogConfigs) as Array<keyof SeedCatalog>).map((catalogType) => {
            const config = catalogConfigs[catalogType];
            const Icon = config.icon;
            const items = catalogs[catalogType];

            return (
              <Card key={catalogType}>
                <CardHeader className={`bg-gradient-to-r ${config.color} text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6" />
                      <div>
                        <CardTitle>{config.title}</CardTitle>
                        <p className="text-sm text-white/90 mt-1">
                          {config.description}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-white/20">
                      {items.length} items
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* Items List */}
                  <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/70 transition-colors"
                      >
                        <span>{item.value}</span>
                        <Button
                          onClick={() => handleDeleteItem(catalogType, item.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Add Button */}
                  <Dialog
                    open={showNewItemDialog && selectedCatalog === catalogType}
                    onOpenChange={(open) => {
                      setShowNewItemDialog(open);
                      if (!open) {
                        setSelectedCatalog(null);
                        setNewItemValue("");
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setSelectedCatalog(catalogType);
                          setShowNewItemDialog(true);
                        }}
                        variant="outline"
                        className="w-full gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Agregar {config.title.slice(0, -1)}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Agregar a {config.title}</DialogTitle>
                        <DialogDescription>
                          Nuevo elemento del catálogo base
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="itemValue">Valor</Label>
                          <Input
                            id="itemValue"
                            value={newItemValue}
                            onChange={(e) => setNewItemValue(e.target.value)}
                            placeholder={
                              catalogType === "categories" ? "Ej: Chamarras" :
                              catalogType === "materials" ? "Ej: Mezclilla" :
                              catalogType === "colors" ? "Ej: Morado" :
                              "Ej: 31"
                            }
                            onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
                          />
                        </div>

                        <div className="flex gap-3">
                          <Button
                            onClick={handleAddItem}
                            className={`flex-1 bg-gradient-to-r ${config.color}`}
                          >
                            Agregar
                          </Button>
                          <Button
                            onClick={() => {
                              setShowNewItemDialog(false);
                              setSelectedCatalog(null);
                              setNewItemValue("");
                            }}
                            variant="outline"
                            className="flex-1"
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Preview Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Vista Previa de Implementación</CardTitle>
            <p className="text-sm text-muted-foreground">
              Cómo se verán estos catálogos en el sistema del cliente
            </p>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
              <div className="mb-4">
                <h4 className="mb-2">Al dar de alta un producto, el cliente verá:</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 block text-xs text-muted-foreground">Categoría</Label>
                  <div className="p-2 bg-white border rounded-lg text-sm">
                    {catalogs.categories[0]?.value || "Botas"}
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block text-xs text-muted-foreground">Material</Label>
                  <div className="p-2 bg-white border rounded-lg text-sm">
                    {catalogs.materials[0]?.value || "Piel Genuina"}
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block text-xs text-muted-foreground">Color</Label>
                  <div className="p-2 bg-white border rounded-lg text-sm">
                    {catalogs.colors[0]?.value || "Negro"}
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block text-xs text-muted-foreground">Talla</Label>
                  <div className="p-2 bg-white border rounded-lg text-sm">
                    {catalogs.sizes[0]?.value || "25"}
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                ✓ El cliente podrá editar estos valores o agregar más según su inventario
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

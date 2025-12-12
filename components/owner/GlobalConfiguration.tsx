import { useState } from "react";
import { Settings, Tag, Percent, Building, Image as ImageIcon, Save } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";

export function GlobalConfiguration() {
  const [brands, setBrands] = useState(["Cuadra", "Laredo", "Resistol", "Stetson"]);
  const [colors, setColors] = useState(["Negro", "Café", "Beige", "Gris"]);
  const [sizes, setSizes] = useState(["25", "26", "27", "28", "29", "30"]);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50/50 via-green-50/50 to-teal-50/50">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 text-white">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h1>Configuración Global</h1>
              <p className="text-muted-foreground">
                Ajustes del sistema y catálogos maestros
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card className="p-6">
          <Tabs defaultValue="catalogs">
            <TabsList className="mb-6">
              <TabsTrigger value="catalogs" className="gap-2">
                <Tag className="w-4 h-4" />
                Catálogos
              </TabsTrigger>
              <TabsTrigger value="discounts" className="gap-2">
                <Percent className="w-4 h-4" />
                Descuentos
              </TabsTrigger>
              <TabsTrigger value="company" className="gap-2">
                <Building className="w-4 h-4" />
                Datos de Empresa
              </TabsTrigger>
            </TabsList>

            {/* Catalogs Tab */}
            <TabsContent value="catalogs" className="space-y-6">
              <div>
                <h3 className="mb-2">Gestión de Catálogos</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Administra las listas desplegables que aparecen en el sistema
                </p>
              </div>

              {/* Brands */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Marcas</Label>
                  <Button size="sm" variant="outline">
                    + Agregar Marca
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex flex-wrap gap-2">
                    {brands.map((brand, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-3 py-1 gap-2 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      >
                        {brand}
                        <button
                          onClick={() => setBrands(brands.filter((_, i) => i !== index))}
                          className="hover:text-destructive-foreground"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  {brands.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No hay marcas registradas
                    </p>
                  )}
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Colores</Label>
                  <Button size="sm" variant="outline">
                    + Agregar Color
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-3 py-1 gap-2 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      >
                        {color}
                        <button
                          onClick={() => setColors(colors.filter((_, i) => i !== index))}
                          className="hover:text-destructive-foreground"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Tallas</Label>
                  <Button size="sm" variant="outline">
                    + Agregar Talla
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-3 py-1 gap-2 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      >
                        {size}
                        <button
                          onClick={() => setSizes(sizes.filter((_, i) => i !== index))}
                          className="hover:text-destructive-foreground"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  💡 <strong>Tip:</strong> Mantén estos catálogos limpios eliminando 
                  opciones que ya no uses. Esto facilitará el trabajo de tus empleados 
                  al dar de alta productos.
                </p>
              </div>
            </TabsContent>

            {/* Discounts Tab */}
            <TabsContent value="discounts" className="space-y-6">
              <div>
                <h3 className="mb-2">Reglas de Descuento</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Configura promociones automáticas que se aplican en todo el sistema
                </p>
              </div>

              {/* Active Promotions */}
              <div className="space-y-3">
                <div className="p-4 border-2 border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-green-900">Promoción Activa: Fin de Año</h4>
                      <p className="text-sm text-green-700">
                        10% de descuento en toda la tienda
                      </p>
                    </div>
                    <Badge className="bg-green-600">Activa</Badge>
                  </div>
                  <div className="flex gap-2 text-xs text-green-700 mt-3">
                    <span>Válido: 01 Dic - 31 Dic 2025</span>
                    <span>•</span>
                    <span>Todas las categorías</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">
                      Editar
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive">
                      Desactivar
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-muted/50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-muted-foreground">Black Friday</h4>
                      <p className="text-sm text-muted-foreground">
                        20% de descuento en Botas
                      </p>
                    </div>
                    <Badge variant="secondary">Finalizada</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Válido: 24 Nov - 26 Nov 2025
                  </div>
                </div>
              </div>

              {/* Create New Promotion */}
              <div className="border-2 border-dashed rounded-lg p-6">
                <h4 className="mb-4">Crear Nueva Promoción</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nombre de la Promoción</Label>
                      <Input placeholder="Ej: Navidad 2025" />
                    </div>
                    <div className="space-y-2">
                      <Label>Descuento (%)</Label>
                      <Input type="number" min="0" max="100" placeholder="15" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Fecha Inicio</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Fecha Fin</Label>
                      <Input type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Aplicar a</Label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Toda la tienda</option>
                      <option>Solo Botas</option>
                      <option>Solo Sombreros</option>
                      <option>Solo Accesorios</option>
                    </select>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-700">
                    Crear Promoción
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Company Data Tab */}
            <TabsContent value="company" className="space-y-6">
              <div>
                <h3 className="mb-2">Datos de la Empresa</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Información que aparece en tickets y documentos
                </p>
              </div>

              <div className="space-y-6">
                {/* Company Logo */}
                <div className="space-y-3">
                  <Label>Logotipo para Ticket</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-3">
                      Arrastra tu logo aquí o haz clic para seleccionar
                    </p>
                    <Button variant="outline" size="sm">
                      Seleccionar Imagen
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Formato recomendado: PNG, 300x300px
                    </p>
                  </div>
                </div>

                {/* Company Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nombre de la Empresa</Label>
                    <Input placeholder="Mi Tienda Vaquera S.A. de C.V." />
                  </div>
                  <div className="space-y-2">
                    <Label>RFC</Label>
                    <Input placeholder="ABC123456XYZ" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Dirección Fiscal</Label>
                  <Input placeholder="Calle Principal #123, Colonia Centro" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Teléfono</Label>
                    <Input placeholder="(123) 456-7890" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="contacto@mitienda.com" />
                  </div>
                </div>

                {/* Ticket Footer Message */}
                <div className="space-y-2">
                  <Label>Mensaje al Pie del Ticket</Label>
                  <Textarea
                    placeholder="¡Gracias por su compra! Visítenos en nuestras 4 sucursales."
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Este mensaje aparecerá en todos los tickets impresos
                  </p>
                </div>

                {/* Tax Configuration */}
                <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                  <h4>Configuración Fiscal</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>IVA (%)</Label>
                      <Input type="number" defaultValue="16" step="0.1" />
                    </div>
                    <div className="space-y-2">
                      <Label>Régimen Fiscal</Label>
                      <select className="w-full p-2 border rounded-lg">
                        <option>Régimen General</option>
                        <option>Régimen Simplificado de Confianza</option>
                        <option>Actividad Empresarial</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="flex-1"
                  >
                    Cancelar Cambios
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-green-700 gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Guardar Configuración
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

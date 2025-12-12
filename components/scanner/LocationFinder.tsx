import { useState } from "react";
import { ArrowLeft, Search, MapPin, Package } from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

interface LocationFinderProps {
  onBack: () => void;
}

interface ProductLocation {
  id: string;
  name: string;
  sku: string;
  image: string;
  location: {
    warehouse: string;
    aisle: string;
    shelf: string;
  };
  stock: number;
  branch?: string;
}

export function LocationFinder({ onBack }: LocationFinderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductLocation[]>([]);
  const [searching, setSearching] = useState(false);

  // Mock product locations
  const mockProducts: ProductLocation[] = [
    {
      id: "1",
      name: "Botas Cuadra Avestruz",
      sku: "BOT-001",
      image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=300",
      location: {
        warehouse: "Bodega Principal",
        aisle: "Pasillo 3",
        shelf: "Repisa B"
      },
      stock: 5
    },
    {
      id: "2",
      name: "Botas Vaqueras Clásicas",
      sku: "BOT-002",
      image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=300",
      location: {
        warehouse: "Bodega Principal",
        aisle: "Pasillo 3",
        shelf: "Repisa C"
      },
      stock: 8
    },
    {
      id: "3",
      name: "Sombrero Texana Premium",
      sku: "SOM-001",
      image: "https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=300",
      location: {
        warehouse: "Bodega Principal",
        aisle: "Pasillo 1",
        shelf: "Repisa A"
      },
      stock: 12
    },
    {
      id: "4",
      name: "Cinturón Piel de Res",
      sku: "CIN-001",
      image: "https://images.unsplash.com/photo-1624222247344-550fb60583e2?w=300",
      location: {
        warehouse: "Bodega Principal",
        aisle: "Pasillo 2",
        shelf: "Repisa D"
      },
      stock: 18
    }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    setTimeout(() => {
      const results = mockProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setSearching(false);
    }, 500);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-emerald-600 to-green-700 text-white">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">📍 Buscador de Ubicación</h1>
          <div className="w-10 h-10" />
        </div>
        <p className="text-sm text-green-100">
          Encuentra productos en la bodega
        </p>
      </div>

      {/* Search Bar */}
      <div className="p-6 bg-white border-b">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Buscar por nombre o SKU..."
              className="h-14 pl-12 text-lg"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={searching || !searchQuery.trim()}
            className="px-6 h-14 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {searching ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Buscar"
            )}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-6">
        {searchResults.length === 0 && !searching && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="mb-2">Busca un producto</h3>
            <p className="text-muted-foreground max-w-sm">
              Ingresa el nombre o código del producto que necesitas encontrar 
              en la bodega
            </p>
          </div>
        )}

        {searching && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 border-4 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin mb-4" />
            <p className="text-muted-foreground">Buscando...</p>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="space-y-4">
            {searchResults.map((product) => (
              <Card key={product.id} className="p-6 hover:shadow-xl transition-shadow">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="mb-1">{product.name}</h4>
                        <Badge variant="outline">{product.sku}</Badge>
                      </div>
                      <Badge className="bg-emerald-600">
                        {product.stock} unidades
                      </Badge>
                    </div>

                    {/* Location Details */}
                    <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border-2 border-emerald-200">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm">Ubicación Física:</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                          <span className="text-sm">
                            <strong>Bodega:</strong> {product.location.warehouse}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                          <span className="text-sm">
                            <strong>Pasillo:</strong> {product.location.aisle}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                          <span className="text-sm">
                            <strong>Repisa:</strong> {product.location.shelf}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {searchResults.length === 0 && searchQuery && !searching && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Package className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="mb-2">No se encontraron resultados</h3>
            <p className="text-muted-foreground max-w-sm">
              No hay productos que coincidan con "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="p-6 border-t bg-white">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-900">
            💡 <strong>Tip:</strong> Si el sistema maneja ubicaciones físicas, 
            puedes encontrar rápidamente dónde está guardado cada producto sin 
            tener que buscarlo manualmente.
          </p>
        </div>
      </div>
    </div>
  );
}

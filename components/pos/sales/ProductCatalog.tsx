import { useState } from "react";
import { Package } from "lucide-react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Product } from "../SalesScreen";

interface ProductCatalogProps {
  searchQuery: string;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onAddToCart: (product: Product, variant?: string) => void;
}

// Mock data - replace with real data from database
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Sombrero Texana Premium",
    price: 1299.99,
    stock: 15,
    category: "sombreros",
    sku: "SOM-001",
    image: "https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=400"
  },
  {
    id: "2",
    name: "Botas Cuadra Avestruz",
    price: 3499.99,
    stock: 8,
    category: "botas",
    sku: "BOT-002",
    hasVariants: true,
    variants: [
      { size: "26", stock: 2 },
      { size: "27", stock: 0 },
      { size: "28", stock: 3 },
      { size: "29", stock: 2 },
      { size: "30", stock: 1 }
    ],
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400"
  },
  {
    id: "3",
    name: "Cinturón Piel de Res",
    price: 599.99,
    stock: 25,
    category: "accesorios",
    sku: "CIN-003",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=400"
  },
  {
    id: "4",
    name: "Sombrero Vaquero Clásico",
    price: 899.99,
    stock: 20,
    category: "sombreros",
    sku: "SOM-004",
    image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=400"
  },
  {
    id: "5",
    name: "Botas Vaqueras Clásicas",
    price: 2199.99,
    stock: 12,
    category: "botas",
    sku: "BOT-005",
    hasVariants: true,
    variants: [
      { size: "25", stock: 1 },
      { size: "26", stock: 3 },
      { size: "27", stock: 4 },
      { size: "28", stock: 2 },
      { size: "29", stock: 2 }
    ],
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400"
  },
  {
    id: "6",
    name: "Hebilla Grande Plata",
    price: 449.99,
    stock: 18,
    category: "accesorios",
    sku: "HEB-006",
    image: "https://images.unsplash.com/photo-1611937663820-862fbc99a093?w=400"
  }
];

const categories = [
  { id: "all", name: "Todos" },
  { id: "sombreros", name: "Sombreros" },
  { id: "botas", name: "Botas" },
  { id: "accesorios", name: "Accesorios" }
];

export function ProductCatalog({
  searchQuery,
  selectedCategory,
  onCategoryChange,
  onAddToCart
}: ProductCatalogProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showVariantModal, setShowVariantModal] = useState(false);

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (product: Product) => {
    if (product.hasVariants) {
      setSelectedProduct(product);
      setShowVariantModal(true);
    } else {
      onAddToCart(product);
    }
  };

  const handleVariantSelect = (size: string) => {
    if (selectedProduct) {
      onAddToCart(selectedProduct, `Talla ${size}`);
      setShowVariantModal(false);
    }
  };

  return (
    <div className="p-6">
      {/* Category Filters */}
      <div className="flex gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className={selectedCategory === category.id ? "bg-gradient-to-r from-emerald-600 to-green-700" : ""}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
            onClick={() => handleProductClick(product)}
          >
            {/* Product Image */}
            <div className="aspect-square bg-muted relative overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
              {/* Stock Badge */}
              <div className="absolute top-2 right-2">
                <Badge
                  variant={product.stock > 10 ? "default" : product.stock > 0 ? "secondary" : "destructive"}
                  className={product.stock > 10 ? "bg-green-600" : ""}
                >
                  Stock: {product.stock}
                </Badge>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                SKU: {product.sku}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-primary">
                  ${product.price.toFixed(2)}
                </p>
                {product.hasVariants && (
                  <Badge variant="outline">Tallas disponibles</Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="mb-2">No se encontraron productos</h3>
          <p className="text-muted-foreground">
            Intenta con otra búsqueda o categoría
          </p>
        </div>
      )}

      {/* Variant Selection Modal */}
      <Dialog open={showVariantModal} onOpenChange={setShowVariantModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seleccionar Talla</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="py-4">
              <div className="mb-6">
                <h3 className="mb-2">{selectedProduct.name}</h3>
                <p className="text-muted-foreground">
                  ${selectedProduct.price.toFixed(2)}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm">Selecciona una talla:</p>
                <div className="grid grid-cols-3 gap-2">
                  {selectedProduct.variants?.map((variant) => (
                    <Button
                      key={variant.size}
                      variant={variant.stock > 0 ? "outline" : "ghost"}
                      disabled={variant.stock === 0}
                      onClick={() => handleVariantSelect(variant.size)}
                      className="flex flex-col h-auto py-4"
                    >
                      <span className="text-lg">Talla {variant.size}</span>
                      <span className="text-xs text-muted-foreground">
                        {variant.stock > 0 ? `${variant.stock} disponibles` : "Agotado"}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useState } from "react";
import { ProductCatalog } from "./sales/ProductCatalog";
import { ShoppingCart } from "./sales/ShoppingCart";
import { SalesHeader } from "./sales/SalesHeader";
import { CheckoutModal } from "./sales/CheckoutModal";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
  sku?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
  sku?: string;
  hasVariants?: boolean;
  variants?: Array<{
    size: string;
    stock: number;
  }>;
}

export function SalesScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (product: Product, variant?: string) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id && item.variant === variant
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.variant === variant
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
          variant,
          sku: product.sku
        }
      ];
    });
  };

  const updateQuantity = (id: string, variant: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, variant);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.variant === variant
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (id: string, variant: string | undefined) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.variant === variant))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleCompleteSale = () => {
    // Here you would save the sale to database
    clearCart();
    setShowCheckout(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-emerald-50/50 via-green-50/50 to-teal-50/50">
      {/* Header */}
      <SalesHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Product Catalog */}
        <div className="flex-1 overflow-auto">
          <ProductCatalog
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onAddToCart={addToCart}
          />
        </div>

        {/* Shopping Cart */}
        <div className="w-96 border-l bg-card shadow-xl">
          <ShoppingCart
            items={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckout}
            onClearCart={clearCart}
          />
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          items={cartItems}
          onClose={() => setShowCheckout(false)}
          onComplete={handleCompleteSale}
        />
      )}
    </div>
  );
}

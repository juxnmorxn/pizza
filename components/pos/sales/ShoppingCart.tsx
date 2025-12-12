import { useState } from "react";
import { ShoppingCart as CartIcon, Trash2, User, Percent, Save, X, Plus, Minus } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { CartItem } from "../SalesScreen";
import { Separator } from "../../ui/separator";

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, variant: string | undefined, quantity: number) => void;
  onRemoveItem: (id: string, variant: string | undefined) => void;
  onCheckout: () => void;
  onClearCart: () => void;
}

export function ShoppingCart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onClearCart
}: ShoppingCartProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [saleType, setSaleType] = useState<string>("normal");
  const [discount, setDiscount] = useState<number>(0);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  const mockCustomers = [
    "Cliente General",
    "María García",
    "Juan Pérez",
    "Ana López"
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * (discount / 100);
  const taxRate = 0.16; // 16% IVA
  const taxAmount = (subtotal - discountAmount) * taxRate;
  const total = subtotal - discountAmount + taxAmount;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-emerald-600 to-green-700">
        <div className="flex items-center gap-2 text-white mb-2">
          <CartIcon className="w-5 h-5" />
          <h2>Carrito de Venta</h2>
        </div>
        <p className="text-sm text-white/80">
          {items.length} {items.length === 1 ? "producto" : "productos"}
        </p>
      </div>

      {/* Customer & Sale Type */}
      <div className="p-4 space-y-3 border-b bg-muted/30">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => setShowCustomerModal(true)}
        >
          <User className="w-4 h-4" />
          {selectedCustomer || "Asignar Cliente"}
        </Button>

        <Select value={saleType} onValueChange={setSaleType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Venta Normal</SelectItem>
            <SelectItem value="layaway">Apartado/Layaway</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <CartIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">El carrito está vacío</p>
            <p className="text-sm text-muted-foreground">
              Selecciona productos para comenzar
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={`${item.id}-${item.variant}`}
              className="p-3 border rounded-lg bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex gap-3">
                {/* Item Image */}
                <div className="w-16 h-16 bg-muted rounded flex-shrink-0 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <CartIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Item Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm truncate">{item.name}</h4>
                  {item.variant && (
                    <p className="text-xs text-muted-foreground">{item.variant}</p>
                  )}
                  <p className="text-sm text-primary mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => onRemoveItem(item.id, item.variant)}
                  className="flex-shrink-0 text-destructive hover:bg-destructive/10 p-2 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onUpdateQuantity(item.id, item.variant, item.quantity - 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onUpdateQuantity(item.id, item.variant, item.quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-sm">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Totals & Actions */}
      {items.length > 0 && (
        <div className="border-t bg-card">
          <div className="p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Descuento ({discount}%):</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">IVA (16%):</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span>Total:</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 space-y-2 border-t">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDiscountModal(true)}
                className="gap-2"
              >
                <Percent className="w-4 h-4" />
                Descuento
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                Guardar
              </Button>
            </div>
            <Button
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800"
              size="lg"
            >
              COBRAR
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearCart}
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              Limpiar Carrito
            </Button>
          </div>
        </div>
      )}

      {/* Discount Modal */}
      <Dialog open={showDiscountModal} onOpenChange={setShowDiscountModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aplicar Descuento Global</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="discount">Porcentaje de descuento</Label>
              <div className="relative">
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  %
                </span>
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Descuento:</span>
                <span>-${(subtotal * (discount / 100)).toFixed(2)}</span>
              </div>
            </div>
            <Button
              onClick={() => setShowDiscountModal(false)}
              className="w-full"
            >
              Aplicar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Customer Modal */}
      <Dialog open={showCustomerModal} onOpenChange={setShowCustomerModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seleccionar Cliente</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar cliente existente" />
              </SelectTrigger>
              <SelectContent>
                {mockCustomers.map((customer) => (
                  <SelectItem key={customer} value={customer}>
                    {customer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full">
              + Crear Nuevo Cliente
            </Button>
            <Button
              onClick={() => setShowCustomerModal(false)}
              className="w-full"
            >
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

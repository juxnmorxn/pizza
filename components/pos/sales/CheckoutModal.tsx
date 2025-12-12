import { useState } from "react";
import { CreditCard, Banknote, Smartphone, Calculator, Printer, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";
import { CartItem } from "../SalesScreen";
import { Separator } from "../../ui/separator";

interface CheckoutModalProps {
  items: CartItem[];
  onClose: () => void;
  onComplete: () => void;
}

type PaymentMethod = "cash" | "card" | "transfer";

export function CheckoutModal({ items, onClose, onComplete }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [cashReceived, setCashReceived] = useState<string>("");
  const [cardAmount, setCardAmount] = useState<string>("");
  const [sendPrint, setSendPrint] = useState(true);
  const [sendWhatsApp, setSendWhatsApp] = useState(false);
  const [useMixedPayment, setUseMixedPayment] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxAmount = subtotal * 0.16;
  const total = subtotal + taxAmount;

  const cashReceivedNum = parseFloat(cashReceived) || 0;
  const cardAmountNum = parseFloat(cardAmount) || 0;
  const change = useMixedPayment
    ? cashReceivedNum - (total - cardAmountNum)
    : cashReceivedNum - total;

  const canComplete = useMixedPayment
    ? cashReceivedNum + cardAmountNum >= total
    : paymentMethod === "cash"
    ? cashReceivedNum >= total
    : true;

  const handleComplete = () => {
    if (canComplete) {
      onComplete();
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Finalizar Venta</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label>Método de Pago</Label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={paymentMethod === "cash" ? "default" : "outline"}
                onClick={() => {
                  setPaymentMethod("cash");
                  setUseMixedPayment(false);
                }}
                className={`h-20 flex flex-col gap-2 ${
                  paymentMethod === "cash"
                    ? "bg-gradient-to-r from-emerald-600 to-green-700"
                    : ""
                }`}
              >
                <Banknote className="w-6 h-6" />
                <span>Efectivo</span>
              </Button>
              <Button
                variant={paymentMethod === "card" ? "default" : "outline"}
                onClick={() => {
                  setPaymentMethod("card");
                  setUseMixedPayment(false);
                }}
                className={`h-20 flex flex-col gap-2 ${
                  paymentMethod === "card"
                    ? "bg-gradient-to-r from-emerald-600 to-green-700"
                    : ""
                }`}
              >
                <CreditCard className="w-6 h-6" />
                <span>Tarjeta</span>
              </Button>
              <Button
                variant={paymentMethod === "transfer" ? "default" : "outline"}
                onClick={() => {
                  setPaymentMethod("transfer");
                  setUseMixedPayment(false);
                }}
                className={`h-20 flex flex-col gap-2 ${
                  paymentMethod === "transfer"
                    ? "bg-gradient-to-r from-emerald-600 to-green-700"
                    : ""
                }`}
              >
                <Smartphone className="w-6 h-6" />
                <span>Transferencia</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="mixed"
                checked={useMixedPayment}
                onCheckedChange={(checked) => setUseMixedPayment(checked as boolean)}
              />
              <Label htmlFor="mixed" className="cursor-pointer">
                Pago Mixto (Efectivo + Tarjeta)
              </Label>
            </div>
          </div>

          {/* Payment Calculation */}
          {(paymentMethod === "cash" || useMixedPayment) && (
            <div className="space-y-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 text-primary">
                <Calculator className="w-5 h-5" />
                <span>Calculadora de Cambio</span>
              </div>

              {useMixedPayment && (
                <div className="space-y-2">
                  <Label htmlFor="card-amount">Monto en Tarjeta</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="card-amount"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={cardAmount}
                      onChange={(e) => setCardAmount(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="cash-received">
                  {useMixedPayment ? "Efectivo Recibido" : "Efectivo Recibido"}
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="cash-received"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={cashReceived}
                    onChange={(e) => setCashReceived(e.target.value)}
                    className="pl-8 text-lg"
                    autoFocus
                  />
                </div>
              </div>

              {cashReceived && (
                <div className="p-4 bg-card rounded-lg border-2 border-primary">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Cambio a Devolver</p>
                    <p className="text-3xl text-primary">
                      ${change >= 0 ? change.toFixed(2) : "0.00"}
                    </p>
                    {change < 0 && (
                      <p className="text-sm text-destructive mt-2">
                        Falta: ${Math.abs(change).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Summary */}
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <h3 className="mb-3">Resumen de Venta</h3>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">IVA (16%):</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span>Total a Cobrar:</span>
              <span className="text-primary text-xl">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Print & Send Options */}
          <div className="space-y-3">
            <Label>Opciones de Ticket</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Checkbox
                  id="print"
                  checked={sendPrint}
                  onCheckedChange={(checked) => setSendPrint(checked as boolean)}
                />
                <Label htmlFor="print" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Printer className="w-4 h-4" />
                  Imprimir Ticket
                </Label>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Checkbox
                  id="whatsapp"
                  checked={sendWhatsApp}
                  onCheckedChange={(checked) => setSendWhatsApp(checked as boolean)}
                />
                <Label htmlFor="whatsapp" className="flex items-center gap-2 cursor-pointer flex-1">
                  <MessageSquare className="w-4 h-4" />
                  Enviar por WhatsApp
                </Label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleComplete}
              disabled={!canComplete}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800"
            >
              Finalizar Venta
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

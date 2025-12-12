import { useState } from "react";
import { DollarSign, TrendingDown, Camera, Calculator, Printer } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface CashMovementsProps {
  onCloseShift: () => void;
}

export function CashMovements({ onCloseShift }: CashMovementsProps) {
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [showCloseShift, setShowCloseShift] = useState(false);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50/50 via-green-50/50 to-teal-50/50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 text-white">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h1>Movimientos de Caja</h1>
              <p className="text-muted-foreground">
                Gestión de efectivo y cierre de turno
              </p>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cash Withdrawal */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setShowWithdrawal(true)}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2">Retiro / Gasto</h3>
                <p className="text-sm text-muted-foreground">
                  Registrar salidas de efectivo no relacionadas con ventas
                </p>
              </div>
            </div>
          </Card>

          {/* Close Shift */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setShowCloseShift(true)}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Calculator className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2">Corte de Caja</h3>
                <p className="text-sm text-muted-foreground">
                  Realizar cierre ciego de turno y conteo de efectivo
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Current Shift Info */}
        <Card className="p-6 mt-6">
          <h3 className="mb-4">Información del Turno Actual</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Fondo Inicial</p>
              <p className="text-xl text-primary">$500.00</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Ventas (Efectivo)</p>
              <p className="text-xl text-green-600">$3,250.00</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Retiros</p>
              <p className="text-xl text-orange-600">$150.00</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Esperado en Caja</p>
              <p className="text-xl">$3,600.00</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Withdrawal Modal */}
      <Dialog open={showWithdrawal} onOpenChange={setShowWithdrawal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Retiro / Gasto</DialogTitle>
          </DialogHeader>
          <form className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Monto a Retirar</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Motivo del Retiro</Label>
              <Textarea
                id="reason"
                placeholder="Ej: Compra de comida, pago a proveedor..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Evidencia (Obligatorio)</Label>
              <Button
                type="button"
                variant="outline"
                className="w-full h-32 flex-col gap-2"
              >
                <Camera className="w-8 h-8" />
                <span>Tomar Foto del Ticket/Comprobante</span>
              </Button>
              <p className="text-sm text-muted-foreground">
                Es obligatorio adjuntar evidencia de todos los gastos
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowWithdrawal(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-emerald-600 to-green-700"
              >
                Registrar Retiro
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Close Shift Modal */}
      <Dialog open={showCloseShift} onOpenChange={setShowCloseShift}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Corte de Caja Ciego</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Importante:</strong> Este es un corte ciego. Cuenta el dinero físico
                sin ver el monto que debería haber según el sistema.
              </p>
            </div>

            {/* Coin Count */}
            <div className="space-y-3">
              <h4>Conteo de Monedas</h4>
              <div className="grid grid-cols-2 gap-3">
                {["$1", "$2", "$5", "$10"].map((denomination) => (
                  <div key={denomination} className="space-y-1">
                    <Label htmlFor={`coin-${denomination}`}>
                      Monedas de {denomination}
                    </Label>
                    <Input
                      id={`coin-${denomination}`}
                      type="number"
                      min="0"
                      placeholder="Cantidad"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Bill Count */}
            <div className="space-y-3">
              <h4>Conteo de Billetes</h4>
              <div className="grid grid-cols-2 gap-3">
                {["$20", "$50", "$100", "$200", "$500"].map((denomination) => (
                  <div key={denomination} className="space-y-1">
                    <Label htmlFor={`bill-${denomination}`}>
                      Billetes de {denomination}
                    </Label>
                    <Input
                      id={`bill-${denomination}`}
                      type="number"
                      min="0"
                      placeholder="Cantidad"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Card Vouchers */}
            <div className="space-y-2">
              <Label htmlFor="vouchers">Monto en Vouchers (Terminal Bancaria)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="vouchers"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="pl-8"
                />
              </div>
            </div>

            {/* Total Summary */}
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <span>Total Contado:</span>
                <span className="text-2xl text-primary">$0.00</span>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notas / Observaciones</Label>
              <Textarea
                id="notes"
                placeholder="Observaciones sobre el cierre..."
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCloseShift(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowCloseShift(false);
                  onCloseShift();
                }}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-green-700 gap-2"
              >
                <Printer className="w-4 h-4" />
                Cerrar Turno e Imprimir
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

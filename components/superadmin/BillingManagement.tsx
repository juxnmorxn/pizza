import { useState } from "react";
import { DollarSign, Plus, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Payment {
  id: string;
  tenantId: string;
  tenantName: string;
  amount: number;
  period: string;
  status: "paid" | "pending" | "overdue";
  paidDate?: string;
  dueDate: string;
  method?: string;
}

export function BillingManagement() {
  const [showManualPaymentDialog, setShowManualPaymentDialog] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("transfer");

  // Mock payment history
  const payments: Payment[] = [
    {
      id: "P001",
      tenantId: "T001",
      tenantName: "Boutique La Elegante",
      amount: 1999,
      period: "Diciembre 2024",
      status: "paid",
      paidDate: "2024-12-01",
      dueDate: "2024-12-05",
      method: "Tarjeta"
    },
    {
      id: "P002",
      tenantId: "T002",
      tenantName: "Zapatería Premium",
      amount: 799,
      period: "Diciembre 2024",
      status: "paid",
      paidDate: "2024-12-03",
      dueDate: "2024-12-05",
      method: "Transferencia"
    },
    {
      id: "P003",
      tenantId: "T003",
      tenantName: "Moda Total",
      amount: 4999,
      period: "Noviembre 2024",
      status: "overdue",
      dueDate: "2024-11-28"
    },
    {
      id: "P004",
      tenantId: "T004",
      tenantName: "Estilo Urbano",
      amount: 1999,
      period: "Diciembre 2024",
      status: "pending",
      dueDate: "2024-12-15"
    }
  ];

  // Upcoming payments (next 5 days)
  const upcomingPayments = [
    { tenant: "Boutique Norte", amount: 1999, daysLeft: 2 },
    { tenant: "Zapatería Central", amount: 799, daysLeft: 3 },
    { tenant: "Moda Express", amount: 4999, daysLeft: 5 }
  ];

  const handleManualPayment = () => {
    if (!selectedTenant || !paymentAmount) {
      alert("Por favor completa todos los campos");
      return;
    }

    alert(`Pago registrado: $${paymentAmount} del cliente ${selectedTenant}. Servicio reactivado automáticamente.`);
    setShowManualPaymentDialog(false);
    setSelectedTenant("");
    setPaymentAmount("");
  };

  const getStatusBadge = (status: Payment["status"]) => {
    const styles = {
      paid: { bg: "bg-green-600", label: "Pagado", icon: CheckCircle },
      pending: { bg: "bg-yellow-600", label: "Pendiente", icon: Clock },
      overdue: { bg: "bg-red-600", label: "Vencido", icon: AlertCircle }
    };
    const config = styles[status];
    const Icon = config.icon;
    return (
      <Badge className={`${config.bg} gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const totalPaid = payments.filter(p => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments.filter(p => p.status === "overdue").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-2">Facturación del Software</h1>
            <p className="text-muted-foreground">
              Cuentas por cobrar de suscripciones
            </p>
          </div>
          <Dialog open={showManualPaymentDialog} onOpenChange={setShowManualPaymentDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 gap-2">
                <Plus className="w-4 h-4" />
                Registrar Pago Manual
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registro Manual de Pago</DialogTitle>
                <DialogDescription>
                  Para pagos en efectivo o transferencia directa
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="tenant">Cliente</Label>
                  <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar cliente..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="T001">Boutique La Elegante</SelectItem>
                      <SelectItem value="T002">Zapatería Premium</SelectItem>
                      <SelectItem value="T003">Moda Total</SelectItem>
                      <SelectItem value="T004">Estilo Urbano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Monto Pagado ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="1999.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="method">Método de Pago</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transfer">Transferencia Bancaria</SelectItem>
                      <SelectItem value="cash">Efectivo</SelectItem>
                      <SelectItem value="check">Cheque</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="period">Periodo</Label>
                  <Input
                    id="period"
                    placeholder="Ej: Diciembre 2024"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleManualPayment}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600"
                  >
                    Registrar Pago
                  </Button>
                  <Button
                    onClick={() => setShowManualPaymentDialog(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Pagos Recibidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-green-600 mb-2">
                ${totalPaid.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Este mes
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Pagos Pendientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-yellow-600 mb-2">
                ${totalPending.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Por cobrar
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Pagos Vencidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-red-600 mb-2">
                ${totalOverdue.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Requieren acción
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Payments */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Vencimientos Próximos (5 días)</CardTitle>
            <p className="text-sm text-muted-foreground">
              Clientes que deben pagar pronto - para enviar recordatorios
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingPayments.map((payment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
                >
                  <div>
                    <h4 className="mb-1">{payment.tenant}</h4>
                    <p className="text-sm text-muted-foreground">
                      Vence en {payment.daysLeft} días
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="mb-2">${payment.amount.toLocaleString()}</div>
                    <Button size="sm" variant="outline">
                      Enviar Recordatorio
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Historial de Pagos</CardTitle>
            <p className="text-sm text-muted-foreground">
              Registro completo de mensualidades
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Periodo</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Vencimiento</TableHead>
                  <TableHead>Fecha de Pago</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{payment.tenantName}</TableCell>
                    <TableCell>{payment.period}</TableCell>
                    <TableCell>${payment.amount.toLocaleString()}</TableCell>
                    <TableCell>{payment.dueDate}</TableCell>
                    <TableCell>
                      {payment.paidDate || <span className="text-muted-foreground">-</span>}
                    </TableCell>
                    <TableCell>
                      {payment.method || <span className="text-muted-foreground">-</span>}
                    </TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Info Box */}
        <Card className="mt-6 border-purple-200 bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <DollarSign className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <div>
                <h4 className="mb-1 text-purple-900">Reactivación Automática</h4>
                <p className="text-sm text-purple-800">
                  Al registrar un pago manual, el sistema reactiva automáticamente el servicio 
                  del cliente suspendido. No es necesario hacer un segundo paso.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

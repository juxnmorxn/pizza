import { useState } from "react";
import { Shield, AlertCircle, CheckCircle, AlertTriangle, Image, Eye, DollarSign } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function AuditModule() {
  const [selectedCut, setSelectedCut] = useState<any>(null);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);

  // Mock cash cuts data
  const cashCuts = [
    {
      id: 1,
      date: "2025-12-11",
      time: "22:30",
      branch: "Sucursal Norte",
      employee: "María García",
      expected: 5000.0,
      declared: 5000.0,
      difference: 0,
      status: "perfect"
    },
    {
      id: 2,
      date: "2025-12-11",
      time: "21:45",
      branch: "Sucursal Centro",
      employee: "Ana López",
      expected: 6500.0,
      declared: 6480.0,
      difference: -20.0,
      status: "minor"
    },
    {
      id: 3,
      date: "2025-12-11",
      time: "20:15",
      branch: "Sucursal Sur",
      employee: "Carlos Rodríguez",
      expected: 4200.0,
      declared: 4000.0,
      difference: -200.0,
      status: "critical"
    },
    {
      id: 4,
      date: "2025-12-10",
      time: "22:00",
      branch: "Sucursal Este",
      employee: "Laura Martínez",
      expected: 7800.0,
      declared: 7850.0,
      difference: 50.0,
      status: "minor"
    },
    {
      id: 5,
      date: "2025-12-10",
      time: "21:30",
      branch: "Sucursal Norte",
      employee: "Juan Pérez",
      expected: 5500.0,
      declared: 5500.0,
      difference: 0,
      status: "perfect"
    }
  ];

  // Mock expenses data
  const expenses = [
    {
      id: 1,
      date: "2025-12-11",
      time: "14:30",
      branch: "Sucursal Norte",
      employee: "María García",
      amount: 150.0,
      reason: "Compra de material de limpieza",
      hasEvidence: true,
      evidenceUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400"
    },
    {
      id: 2,
      date: "2025-12-11",
      time: "12:15",
      branch: "Sucursal Centro",
      employee: "Ana López",
      amount: 85.0,
      reason: "Pago a proveedor de agua",
      hasEvidence: true,
      evidenceUrl: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400"
    },
    {
      id: 3,
      date: "2025-12-11",
      time: "10:45",
      branch: "Sucursal Sur",
      employee: "Carlos Rodríguez",
      amount: 200.0,
      reason: "Compra urgente para la tienda",
      hasEvidence: false,
      evidenceUrl: null
    },
    {
      id: 4,
      date: "2025-12-10",
      time: "16:20",
      branch: "Sucursal Este",
      employee: "Laura Martínez",
      amount: 320.0,
      reason: "Reparación de equipo",
      hasEvidence: true,
      evidenceUrl: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "perfect":
        return (
          <Badge className="bg-green-600 gap-1">
            <CheckCircle className="w-3 h-3" />
            Perfecto
          </Badge>
        );
      case "minor":
        return (
          <Badge variant="secondary" className="gap-1">
            <AlertCircle className="w-3 h-3" />
            Diferencia Menor
          </Badge>
        );
      case "critical":
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertTriangle className="w-3 h-3" />
            Faltante Grave
          </Badge>
        );
      default:
        return null;
    }
  };

  const totalDiscrepancy = cashCuts.reduce((sum, cut) => sum + cut.difference, 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const expensesWithoutEvidence = expenses.filter(exp => !exp.hasEvidence).length;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50/50 via-green-50/50 to-teal-50/50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 text-white">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1>Auditoría y Cortes</h1>
              <p className="text-muted-foreground">
                Detección de inconsistencias y verificación de gastos
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cortes Perfectos</p>
                <p className="text-2xl text-green-600">
                  {cashCuts.filter(c => c.status === "perfect").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600 opacity-50" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Discrepancia Total</p>
                <p className={`text-2xl ${totalDiscrepancy < 0 ? "text-red-600" : "text-green-600"}`}>
                  ${Math.abs(totalDiscrepancy).toFixed(2)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-muted-foreground opacity-50" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Gastos Registrados</p>
                <p className="text-2xl text-primary">
                  ${totalExpenses.toFixed(2)}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-muted-foreground opacity-50" />
            </div>
          </Card>

          <Card className="p-4 bg-red-50 border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-900">Sin Evidencia</p>
                <p className="text-2xl text-red-600">{expensesWithoutEvidence}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="p-6">
          <Tabs defaultValue="cuts">
            <TabsList className="mb-6">
              <TabsTrigger value="cuts" className="gap-2">
                <Shield className="w-4 h-4" />
                Historial de Cortes
              </TabsTrigger>
              <TabsTrigger value="expenses" className="gap-2">
                <DollarSign className="w-4 h-4" />
                Gastos y Retiros
              </TabsTrigger>
            </TabsList>

            {/* Cash Cuts Tab */}
            <TabsContent value="cuts" className="space-y-4">
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha/Hora</TableHead>
                      <TableHead>Sucursal</TableHead>
                      <TableHead>Empleado</TableHead>
                      <TableHead className="text-right">Esperado</TableHead>
                      <TableHead className="text-right">Declarado</TableHead>
                      <TableHead className="text-right">Diferencia</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cashCuts.map((cut) => (
                      <TableRow key={cut.id}>
                        <TableCell>
                          <div>
                            <p className="text-sm">{cut.date}</p>
                            <p className="text-xs text-muted-foreground">{cut.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>{cut.branch}</TableCell>
                        <TableCell>{cut.employee}</TableCell>
                        <TableCell className="text-right">
                          ${cut.expected.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          ${cut.declared.toFixed(2)}
                        </TableCell>
                        <TableCell className={`text-right ${
                          cut.difference === 0
                            ? "text-green-600"
                            : cut.difference > -50
                            ? "text-orange-600"
                            : "text-red-600"
                        }`}>
                          {cut.difference >= 0 ? "+" : ""}
                          ${cut.difference.toFixed(2)}
                        </TableCell>
                        <TableCell>{getStatusBadge(cut.status)}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedCut(cut)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Expenses Tab */}
            <TabsContent value="expenses" className="space-y-4">
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha/Hora</TableHead>
                      <TableHead>Sucursal</TableHead>
                      <TableHead>Empleado</TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                      <TableHead>Motivo</TableHead>
                      <TableHead>Evidencia</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.map((expense) => (
                      <TableRow key={expense.id} className={!expense.hasEvidence ? "bg-red-50" : ""}>
                        <TableCell>
                          <div>
                            <p className="text-sm">{expense.date}</p>
                            <p className="text-xs text-muted-foreground">{expense.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>{expense.branch}</TableCell>
                        <TableCell>{expense.employee}</TableCell>
                        <TableCell className="text-right">
                          ${expense.amount.toFixed(2)}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {expense.reason}
                        </TableCell>
                        <TableCell>
                          {expense.hasEvidence ? (
                            <Badge variant="default" className="bg-green-600 gap-1">
                              <Image className="w-3 h-3" />
                              Adjunto
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              Sin foto
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedExpense(expense)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* Cut Detail Modal */}
      {selectedCut && (
        <Dialog open={!!selectedCut} onOpenChange={() => setSelectedCut(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalle del Corte de Caja</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Fecha</p>
                  <p>{selectedCut.date} {selectedCut.time}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sucursal</p>
                  <p>{selectedCut.branch}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Empleado</p>
                  <p>{selectedCut.employee}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estado</p>
                  {getStatusBadge(selectedCut.status)}
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monto Esperado (Sistema):</span>
                  <span>${selectedCut.expected.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Declarado por Cajero:</span>
                  <span>${selectedCut.declared.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t flex justify-between">
                  <span>Diferencia:</span>
                  <span className={`text-lg ${
                    selectedCut.difference === 0
                      ? "text-green-600"
                      : selectedCut.difference > -50
                      ? "text-orange-600"
                      : "text-red-600"
                  }`}>
                    {selectedCut.difference >= 0 ? "+" : ""}
                    ${selectedCut.difference.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Expense Detail Modal */}
      {selectedExpense && (
        <Dialog open={!!selectedExpense} onOpenChange={() => setSelectedExpense(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalle del Gasto</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Fecha</p>
                  <p>{selectedExpense.date} {selectedExpense.time}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sucursal</p>
                  <p>{selectedExpense.branch}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Empleado</p>
                  <p>{selectedExpense.employee}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monto</p>
                  <p className="text-lg text-primary">
                    ${selectedExpense.amount.toFixed(2)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Motivo</p>
                <p className="p-3 bg-muted rounded-lg">{selectedExpense.reason}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Evidencia</p>
                {selectedExpense.hasEvidence ? (
                  <div className="rounded-lg border overflow-hidden">
                    <img
                      src={selectedExpense.evidenceUrl}
                      alt="Comprobante"
                      className="w-full h-auto"
                    />
                  </div>
                ) : (
                  <div className="p-8 bg-red-50 border-2 border-red-200 rounded-lg text-center">
                    <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-3" />
                    <p className="text-red-900">
                      ⚠️ Este gasto NO tiene evidencia adjunta
                    </p>
                    <p className="text-sm text-red-700 mt-2">
                      Contacta al empleado para obtener el comprobante
                    </p>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

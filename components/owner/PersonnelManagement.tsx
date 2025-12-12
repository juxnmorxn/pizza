import { useState } from "react";
import { Users, UserPlus, Edit, Shield, DollarSign } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function PersonnelManagement() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  // Mock employees data
  const employees = [
    {
      id: 1,
      name: "María García",
      role: "Encargado",
      branch: "Sucursal Norte",
      status: "active",
      permissions: {
        discounts: true,
        viewOtherBranches: true,
        cancelSales: true
      },
      commission: 2.5,
      lastLogin: "Hace 2 horas"
    },
    {
      id: 2,
      name: "Juan Pérez",
      role: "Cajero",
      branch: "Sucursal Norte",
      status: "active",
      permissions: {
        discounts: false,
        viewOtherBranches: false,
        cancelSales: false
      },
      commission: 1.5,
      lastLogin: "Hace 5 horas"
    },
    {
      id: 3,
      name: "Ana López",
      role: "Encargado",
      branch: "Sucursal Centro",
      status: "active",
      permissions: {
        discounts: true,
        viewOtherBranches: true,
        cancelSales: true
      },
      commission: 2.5,
      lastLogin: "Hace 1 hora"
    },
    {
      id: 4,
      name: "Carlos Rodríguez",
      role: "Cajero",
      branch: "Sucursal Sur",
      status: "active",
      permissions: {
        discounts: false,
        viewOtherBranches: false,
        cancelSales: false
      },
      commission: 1.5,
      lastLogin: "Hace 3 horas"
    },
    {
      id: 5,
      name: "Laura Martínez",
      role: "Encargado",
      branch: "Sucursal Este",
      status: "active",
      permissions: {
        discounts: true,
        viewOtherBranches: true,
        cancelSales: true
      },
      commission: 2.5,
      lastLogin: "Hace 30 min"
    },
    {
      id: 6,
      name: "Pedro Santos",
      role: "Bodeguero",
      branch: "Bodega Principal",
      status: "inactive",
      permissions: {
        discounts: false,
        viewOtherBranches: true,
        cancelSales: false
      },
      commission: 0,
      lastLogin: "Hace 2 días"
    }
  ];

  const activeEmployees = employees.filter(e => e.status === "active").length;
  const totalCommission = employees.reduce((sum, e) => sum + e.commission, 0);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Encargado":
        return <Badge className="bg-emerald-600">Encargado</Badge>;
      case "Cajero":
        return <Badge variant="secondary">Cajero</Badge>;
      case "Bodeguero":
        return <Badge variant="outline">Bodeguero</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50/50 via-green-50/50 to-teal-50/50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 text-white">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1>Gestión de Personal</h1>
              <p className="text-muted-foreground">
                Control de acceso y permisos de usuarios
              </p>
            </div>
          </div>

          <Button className="bg-gradient-to-r from-emerald-600 to-green-700 gap-2">
            <UserPlus className="w-4 h-4" />
            Nuevo Usuario
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Empleados Activos</p>
                <p className="text-2xl text-primary">{activeEmployees}</p>
              </div>
              <Users className="w-8 h-8 text-green-600 opacity-50" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Usuarios</p>
                <p className="text-2xl text-primary">{employees.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600 opacity-50" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Encargados</p>
                <p className="text-2xl text-primary">
                  {employees.filter(e => e.role === "Encargado").length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-emerald-600 opacity-50" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Comisión Promedio</p>
                <p className="text-2xl text-primary">
                  {(totalCommission / employees.length).toFixed(1)}%
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600 opacity-50" />
            </div>
          </Card>
        </div>

        {/* Employees Table */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>Directorio de Empleados</h3>
            <Input
              placeholder="Buscar empleado..."
              className="w-64"
            />
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Sucursal</TableHead>
                  <TableHead>Permisos</TableHead>
                  <TableHead className="text-right">Comisión</TableHead>
                  <TableHead>Última Sesión</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{getRoleBadge(employee.role)}</TableCell>
                    <TableCell>{employee.branch}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {employee.permissions.discounts && (
                          <Badge variant="outline" className="text-xs">
                            Descuentos
                          </Badge>
                        )}
                        {employee.permissions.cancelSales && (
                          <Badge variant="outline" className="text-xs">
                            Cancelar
                          </Badge>
                        )}
                        {employee.permissions.viewOtherBranches && (
                          <Badge variant="outline" className="text-xs">
                            Multi-sucursal
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {employee.commission > 0 ? `${employee.commission}%` : "N/A"}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {employee.lastLogin}
                      </span>
                    </TableCell>
                    <TableCell>
                      {employee.status === "active" ? (
                        <Badge className="bg-green-600">Activo</Badge>
                      ) : (
                        <Badge variant="secondary">Inactivo</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setShowEditModal(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Edit Employee Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6 py-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre Completo</Label>
                  <Input defaultValue={selectedEmployee.name} />
                </div>
                <div className="space-y-2">
                  <Label>Sucursal Asignada</Label>
                  <Select defaultValue={selectedEmployee.branch}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sucursal Norte">Sucursal Norte</SelectItem>
                      <SelectItem value="Sucursal Centro">Sucursal Centro</SelectItem>
                      <SelectItem value="Sucursal Sur">Sucursal Sur</SelectItem>
                      <SelectItem value="Sucursal Este">Sucursal Este</SelectItem>
                      <SelectItem value="Bodega Principal">Bodega Principal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label>Asignar Rol</Label>
                <Select defaultValue={selectedEmployee.role}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Encargado">Encargado</SelectItem>
                    <SelectItem value="Cajero">Cajero</SelectItem>
                    <SelectItem value="Bodeguero">Bodeguero</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Permissions */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Permisos de Seguridad
                </Label>
                
                <div className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="perm-discounts"
                      defaultChecked={selectedEmployee.permissions.discounts}
                    />
                    <Label htmlFor="perm-discounts" className="cursor-pointer flex-1">
                      <div>
                        <p>¿Puede hacer descuentos?</p>
                        <p className="text-xs text-muted-foreground">
                          Permitir aplicar descuentos a ventas
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="perm-branches"
                      defaultChecked={selectedEmployee.permissions.viewOtherBranches}
                    />
                    <Label htmlFor="perm-branches" className="cursor-pointer flex-1">
                      <div>
                        <p>¿Puede ver existencias de otras tiendas?</p>
                        <p className="text-xs text-muted-foreground">
                          Ver inventario de todas las sucursales
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="perm-cancel"
                      defaultChecked={selectedEmployee.permissions.cancelSales}
                    />
                    <Label htmlFor="perm-cancel" className="cursor-pointer flex-1">
                      <div>
                        <p>¿Puede cancelar ventas?</p>
                        <p className="text-xs text-muted-foreground">
                          Anular transacciones ya registradas
                        </p>
                      </div>
                    </Label>
                  </div>
                </div>
              </div>

              {/* Commission */}
              <div className="space-y-2">
                <Label htmlFor="commission" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Comisión por Venta (%)
                </Label>
                <Input
                  id="commission"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  defaultValue={selectedEmployee.commission}
                />
                <p className="text-xs text-muted-foreground">
                  Porcentaje que gana el empleado por cada venta realizada
                </p>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label>Estado del Usuario</Label>
                <Select defaultValue={selectedEmployee.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-green-700">
                  Guardar Cambios
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

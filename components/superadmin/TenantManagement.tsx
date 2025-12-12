import { useState } from "react";
import { Plus, Search, Power, UserCog, Eye, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
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

interface Tenant {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  plan: "basic" | "pro" | "enterprise";
  status: "active" | "suspended" | "trial";
  nextPayment: string;
  branches: number;
}

export function TenantManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewTenantDialog, setShowNewTenantDialog] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  // Mock data
  const tenants: Tenant[] = [
    {
      id: "T001",
      businessName: "Boutique La Elegante",
      ownerName: "María González",
      email: "maria@elegante.com",
      phone: "555-0101",
      plan: "pro",
      status: "active",
      nextPayment: "2024-12-20",
      branches: 3
    },
    {
      id: "T002",
      businessName: "Zapatería Premium",
      ownerName: "Carlos Ramírez",
      email: "carlos@zapatos.com",
      phone: "555-0102",
      plan: "basic",
      status: "active",
      nextPayment: "2024-12-15",
      branches: 1
    },
    {
      id: "T003",
      businessName: "Moda Total",
      ownerName: "Ana Martínez",
      email: "ana@modatotal.com",
      phone: "555-0103",
      plan: "enterprise",
      status: "suspended",
      nextPayment: "2024-11-28",
      branches: 5
    },
    {
      id: "T004",
      businessName: "Estilo Urbano",
      ownerName: "Luis Torres",
      email: "luis@estilourbano.com",
      phone: "555-0104",
      plan: "pro",
      status: "trial",
      nextPayment: "2024-12-25",
      branches: 2
    }
  ];

  const filteredTenants = tenants.filter(tenant =>
    tenant.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: Tenant["status"]) => {
    const styles = {
      active: "bg-green-600",
      suspended: "bg-red-600",
      trial: "bg-yellow-600"
    };
    const labels = {
      active: "🟢 Activo",
      suspended: "🔴 Suspendido",
      trial: "🟡 Prueba"
    };
    return <Badge className={styles[status]}>{labels[status]}</Badge>;
  };

  const getPlanBadge = (plan: Tenant["plan"]) => {
    const styles = {
      basic: "bg-gray-600",
      pro: "bg-purple-600",
      enterprise: "bg-blue-600"
    };
    const labels = {
      basic: "Básico",
      pro: "Pro",
      enterprise: "Enterprise"
    };
    return <Badge className={styles[plan]}>{labels[plan]}</Badge>;
  };

  const handleSuspend = (tenant: Tenant) => {
    if (confirm(`¿Suspender servicio para ${tenant.businessName}?`)) {
      alert(`Servicio suspendido. Al intentar acceder verán pantalla de "Contactar Soporte".`);
    }
  };

  const handleImpersonate = (tenant: Tenant) => {
    if (confirm(`¿Entrar a la cuenta de ${tenant.businessName} como ${tenant.ownerName}?`)) {
      alert(`Función Impersonate: Entrando como dueño de ${tenant.businessName}...`);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-2">Fábrica de Clientes</h1>
            <p className="text-muted-foreground">
              Gestión de Tenants y Onboarding
            </p>
          </div>
          <Dialog open={showNewTenantDialog} onOpenChange={setShowNewTenantDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 gap-2">
                <Plus className="w-4 h-4" />
                Nuevo Tenant
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Alta de Nuevo Cliente</DialogTitle>
                <DialogDescription>
                  Crear cuenta maestra para un nuevo dueño
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Nombre de la Empresa</Label>
                    <Input id="businessName" placeholder="Ej: Boutique La Elegante" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Nombre del Dueño</Label>
                    <Input id="ownerName" placeholder="Ej: María González" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="correo@empresa.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" placeholder="555-1234" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plan">Plan Asignado</Label>
                  <Select defaultValue="basic">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Básico - 1 sucursal, 1 usuario</SelectItem>
                      <SelectItem value="pro">Pro - 5 sucursales, 10 usuarios</SelectItem>
                      <SelectItem value="enterprise">Enterprise - Ilimitado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Configuración Inicial</Label>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="loadCatalog" className="rounded" />
                    <Label htmlFor="loadCatalog" className="cursor-pointer">
                      Cargar catálogo predefinido de ropa y calzado
                    </Label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => {
                      alert("Cliente creado exitosamente. Credenciales enviadas por email.");
                      setShowNewTenantDialog(false);
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600"
                  >
                    Crear Cuenta
                  </Button>
                  <Button
                    onClick={() => setShowNewTenantDialog(false)}
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

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre de empresa, dueño o ID..."
                className="pl-12"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tenants Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Clientes ({filteredTenants.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Negocio</TableHead>
                  <TableHead>Dueño</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Sucursales</TableHead>
                  <TableHead>Próximo Pago</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell>{tenant.id}</TableCell>
                    <TableCell>{tenant.businessName}</TableCell>
                    <TableCell>{tenant.ownerName}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{tenant.email}</div>
                        <div className="text-muted-foreground">{tenant.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getPlanBadge(tenant.plan)}</TableCell>
                    <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                    <TableCell>{tenant.branches}</TableCell>
                    <TableCell>{tenant.nextPayment}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          onClick={() => handleImpersonate(tenant)}
                          variant="ghost"
                          size="sm"
                          className="gap-2"
                        >
                          <UserCog className="w-4 h-4" />
                          Impersonate
                        </Button>
                        {tenant.status === "active" ? (
                          <Button
                            onClick={() => handleSuspend(tenant)}
                            variant="ghost"
                            size="sm"
                            className="gap-2 text-red-600 hover:text-red-700"
                          >
                            <Power className="w-4 h-4" />
                            Suspender
                          </Button>
                        ) : (
                          <Button
                            onClick={() => alert(`Reactivando servicio para ${tenant.businessName}...`)}
                            variant="ghost"
                            size="sm"
                            className="gap-2 text-green-600 hover:text-green-700"
                          >
                            <Power className="w-4 h-4" />
                            Reactivar
                          </Button>
                        )}
                        <Button
                          onClick={() => setSelectedTenant(tenant)}
                          variant="ghost"
                          size="sm"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Warning Box */}
        <Card className="mt-6 border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
              <div>
                <h4 className="mb-1 text-orange-900">Kill Switch de Servicios</h4>
                <p className="text-sm text-orange-800">
                  Al suspender un tenant, su acceso a la plataforma se bloquea inmediatamente. 
                  Verán un mensaje solicitando contactar soporte para regularizar pagos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Shield, Search, Filter, Download, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface LogEntry {
  id: string;
  timestamp: string;
  tenantId: string;
  tenantName: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  ip: string;
  severity: "info" | "warning" | "critical";
}

export function SystemLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [tenantFilter, setTenantFilter] = useState<string>("all");

  // Mock log entries
  const logs: LogEntry[] = [
    {
      id: "L001",
      timestamp: "2024-12-12 15:30:45",
      tenantId: "T003",
      tenantName: "Moda Total",
      userId: "U005",
      userName: "Juan Pérez",
      action: "DELETE_BRANCH",
      details: "Eliminó la sucursal 'Sucursal Norte'",
      ip: "192.168.1.45",
      severity: "critical"
    },
    {
      id: "L002",
      timestamp: "2024-12-12 14:22:13",
      tenantId: "T001",
      tenantName: "Boutique La Elegante",
      userId: "U002",
      userName: "María González",
      action: "CREATE_USER",
      details: "Creó nuevo usuario 'Carlos Vendedor'",
      ip: "192.168.1.120",
      severity: "info"
    },
    {
      id: "L003",
      timestamp: "2024-12-12 13:15:30",
      tenantId: "T002",
      tenantName: "Zapatería Premium",
      userId: "U008",
      userName: "Ana Torres",
      action: "INVENTORY_ADJUSTMENT",
      details: "Ajustó inventario: -50 unidades sin motivo",
      ip: "192.168.1.88",
      severity: "warning"
    },
    {
      id: "L004",
      timestamp: "2024-12-12 12:45:20",
      tenantId: "T001",
      tenantName: "Boutique La Elegante",
      userId: "U002",
      userName: "María González",
      action: "UPDATE_PRICES",
      details: "Actualizó precios de 25 productos",
      ip: "192.168.1.120",
      severity: "info"
    },
    {
      id: "L005",
      timestamp: "2024-12-12 11:30:15",
      tenantId: "T004",
      tenantName: "Estilo Urbano",
      userId: "U012",
      userName: "Luis Ramírez",
      action: "FAILED_LOGIN",
      details: "Intentos de login fallidos: 5 veces",
      ip: "203.45.67.89",
      severity: "warning"
    },
    {
      id: "L006",
      timestamp: "2024-12-12 10:15:08",
      tenantId: "T003",
      tenantName: "Moda Total",
      userId: "U005",
      userName: "Juan Pérez",
      action: "DELETE_PRODUCT",
      details: "Eliminó producto 'Botas Premium' del catálogo",
      ip: "192.168.1.45",
      severity: "critical"
    }
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter;
    const matchesTenant = tenantFilter === "all" || log.tenantId === tenantFilter;

    return matchesSearch && matchesSeverity && matchesTenant;
  });

  const getSeverityBadge = (severity: LogEntry["severity"]) => {
    const styles = {
      info: { bg: "bg-blue-600", label: "Info", icon: Info },
      warning: { bg: "bg-yellow-600", label: "Advertencia", icon: AlertTriangle },
      critical: { bg: "bg-red-600", label: "Crítico", icon: AlertTriangle }
    };
    const config = styles[severity];
    const Icon = config.icon;
    return (
      <Badge className={`${config.bg} gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const getActionBadge = (action: string) => {
    const critical = ["DELETE_BRANCH", "DELETE_PRODUCT", "DELETE_USER"];
    const warning = ["INVENTORY_ADJUSTMENT", "FAILED_LOGIN", "UPDATE_PRICES"];
    
    if (critical.includes(action)) {
      return <Badge variant="destructive">{action}</Badge>;
    } else if (warning.includes(action)) {
      return <Badge className="bg-yellow-600">{action}</Badge>;
    } else {
      return <Badge variant="outline">{action}</Badge>;
    }
  };

  const handleExportLogs = () => {
    alert("Exportando logs a CSV...\nEsto generará un archivo con todos los registros filtrados.");
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-2 flex items-center gap-3">
              <Shield className="w-8 h-8 text-purple-600" />
              Logs del Sistema
            </h1>
            <p className="text-muted-foreground">
              Bitácora global de seguridad y auditoría
            </p>
          </div>
          <Button
            onClick={handleExportLogs}
            variant="outline"
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar Logs
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar en logs..."
                  className="pl-12"
                />
              </div>

              {/* Severity Filter */}
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por severidad..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las severidades</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Advertencias</SelectItem>
                  <SelectItem value="critical">Críticos</SelectItem>
                </SelectContent>
              </Select>

              {/* Tenant Filter */}
              <Select value={tenantFilter} onValueChange={setTenantFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por cliente..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los clientes</SelectItem>
                  <SelectItem value="T001">Boutique La Elegante</SelectItem>
                  <SelectItem value="T002">Zapatería Premium</SelectItem>
                  <SelectItem value="T003">Moda Total</SelectItem>
                  <SelectItem value="T004">Estilo Urbano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <Info className="w-4 h-4" />
                Registros Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-blue-600">
                {logs.filter(l => l.severity === "info").length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Advertencias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-yellow-600">
                {logs.filter(l => l.severity === "warning").length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Eventos Críticos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-red-600">
                {logs.filter(l => l.severity === "critical").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Bitácora de Eventos ({filteredLogs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Severidad</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Acción</TableHead>
                  <TableHead>Detalles</TableHead>
                  <TableHead>IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-xs text-muted-foreground">
                      {log.timestamp}
                    </TableCell>
                    <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{log.tenantName}</div>
                        <div className="text-xs text-muted-foreground">{log.tenantId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{log.userName}</div>
                        <div className="text-xs text-muted-foreground">{log.userId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getActionBadge(log.action)}</TableCell>
                    <TableCell className="max-w-md">
                      <div className="text-sm">{log.details}</div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {log.ip}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Use Case Example */}
        <Card className="mt-6 border-purple-200 bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="mb-2 text-purple-900">Defensa Legal y Auditoría</h4>
                <p className="text-sm text-purple-800 mb-3">
                  <strong>Caso de uso:</strong> Cliente dice "El sistema borró todos mis datos de la Sucursal Norte"
                </p>
                <p className="text-sm text-purple-800">
                  <strong>Solución:</strong> Buscas en los logs y encuentras que el usuario "Juan Pérez" 
                  eliminó la sucursal el 12/12/2024 a las 15:30 desde la IP 192.168.1.45. 
                  Puedes demostrar que fue una acción humana, no un error del sistema.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

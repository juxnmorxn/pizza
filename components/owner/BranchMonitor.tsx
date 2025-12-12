import { Store, Wifi, WifiOff, DollarSign, User, Clock } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

export function BranchMonitor() {
  // Mock branch data
  const branches = [
    {
      id: "north",
      name: "Sucursal Norte",
      status: "online",
      cashDrawer: 3600.0,
      lastActivity: "Hace 2 min: Venta de Cartera",
      activeStaff: ["María García", "Juan Pérez"],
      todaySales: 12450.0,
      transactions: 87
    },
    {
      id: "center",
      name: "Sucursal Centro",
      status: "online",
      cashDrawer: 4250.5,
      lastActivity: "Hace 1 min: Venta de Botas",
      activeStaff: ["Ana López"],
      todaySales: 18920.0,
      transactions: 132
    },
    {
      id: "south",
      name: "Sucursal Sur",
      status: "offline",
      cashDrawer: 2890.0,
      lastActivity: "Hace 18 min: Venta de Sombrero",
      activeStaff: ["Carlos Rodríguez"],
      todaySales: 9340.0,
      transactions: 65
    },
    {
      id: "east",
      name: "Sucursal Este",
      status: "online",
      cashDrawer: 5120.0,
      lastActivity: "Hace 30 seg: Venta de Cinturón",
      activeStaff: ["Laura Martínez", "Pedro Santos"],
      todaySales: 15780.0,
      transactions: 98
    }
  ];

  const totalSales = branches.reduce((sum, b) => sum + b.todaySales, 0);
  const totalTransactions = branches.reduce((sum, b) => sum + b.transactions, 0);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50/50 via-green-50/50 to-teal-50/50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 text-white">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h1>Monitor de Sucursales</h1>
              <p className="text-muted-foreground">
                Vista en vivo de todas las tiendas
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sucursales Activas</p>
                <p className="text-2xl text-primary">
                  {branches.filter(b => b.status === "online").length}/{branches.length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <Wifi className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ventas Totales Hoy</p>
                <p className="text-2xl text-primary">
                  ${totalSales.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-100">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Transacciones</p>
                <p className="text-2xl text-primary">{totalTransactions}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Store className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Personal Activo</p>
                <p className="text-2xl text-primary">
                  {branches.reduce((sum, b) => sum + b.activeStaff.length, 0)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <User className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Branch Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {branches.map((branch) => (
            <Card
              key={branch.id}
              className={`p-6 transition-all ${
                branch.status === "offline"
                  ? "border-2 border-orange-500 bg-orange-50/50"
                  : "hover:shadow-xl"
              }`}
            >
              {/* Branch Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${
                    branch.status === "online"
                      ? "bg-green-100"
                      : "bg-orange-100"
                  }`}>
                    <Store className={`w-6 h-6 ${
                      branch.status === "online"
                        ? "text-green-600"
                        : "text-orange-600"
                    }`} />
                  </div>
                  <div>
                    <h3>{branch.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {branch.status === "online" ? (
                        <>
                          <Wifi className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600">En línea</span>
                        </>
                      ) : (
                        <>
                          <WifiOff className="w-4 h-4 text-orange-600" />
                          <span className="text-sm text-orange-600">Sin conexión</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <Badge
                  variant={branch.status === "online" ? "default" : "secondary"}
                  className={branch.status === "online" ? "bg-green-600" : "bg-orange-500"}
                >
                  {branch.status === "online" ? "Operando" : "Offline"}
                </Badge>
              </div>

              {/* Cash Drawer */}
              <div className="p-4 bg-muted rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Caja Actual (Teórico)
                    </p>
                    <p className="text-xl text-primary">
                      ${branch.cashDrawer.toFixed(2)}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-muted-foreground opacity-50" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-card border rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Ventas Hoy</p>
                  <p className="text-green-600">
                    ${branch.todaySales.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-card border rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Transacciones</p>
                  <p className="text-blue-600">{branch.transactions}</p>
                </div>
              </div>

              {/* Last Activity */}
              <div className="flex items-start gap-2 p-3 bg-accent/50 rounded-lg mb-4">
                <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Última Actividad</p>
                  <p className="text-sm">{branch.lastActivity}</p>
                </div>
              </div>

              {/* Active Staff */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Personal Activo</p>
                <div className="flex flex-wrap gap-2">
                  {branch.activeStaff.map((staff, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <User className="w-3 h-3" />
                      {staff}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Panel */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <Store className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="mb-1">Monitoreo en Tiempo Real</h4>
              <p className="text-sm text-muted-foreground">
                Esta vista se actualiza automáticamente cada 30 segundos. Las sucursales sin 
                conexión continúan operando en modo offline y sincronizarán sus datos cuando 
                se restablezca la conexión a Internet.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

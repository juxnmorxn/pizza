import { DollarSign, Users, AlertTriangle, Building2, TrendingUp, Server, Database, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function SaaSDashboard() {
  // Mock data for MRR growth
  const mrrData = [
    { month: "Jun", mrr: 15000, nuevos: 3 },
    { month: "Jul", mrr: 18500, nuevos: 5 },
    { month: "Ago", mrr: 22000, nuevos: 4 },
    { month: "Sep", mrr: 28500, nuevos: 7 },
    { month: "Oct", mrr: 35000, nuevos: 6 },
    { month: "Nov", mrr: 42000, nuevos: 8 }
  ];

  const serverStats = [
    { name: "CPU", value: 45, status: "normal", icon: Zap, color: "text-green-600" },
    { name: "RAM", value: 62, status: "normal", icon: Server, color: "text-green-600" },
    { name: "DB", value: 78, status: "warning", icon: Database, color: "text-yellow-600" }
  ];

  const recentActivity = [
    { tenant: "Boutique La Elegante", action: "Pago recibido", amount: "$1,200", time: "Hace 2 horas" },
    { tenant: "Zapatería Premium", action: "Nueva sucursal creada", amount: null, time: "Hace 5 horas" },
    { tenant: "Moda Total", action: "Plan actualizado a Pro", amount: "$2,500", time: "Hace 1 día" },
    { tenant: "Estilo Urbano", action: "Pago recibido", amount: "$800", time: "Hace 1 día" }
  ];

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Dashboard Maestro SaaS</h1>
          <p className="text-muted-foreground">
            Monitor de salud de tu negocio de software
          </p>
        </div>

        {/* KPIs Globales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* MRR */}
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                MRR (Ingreso Mensual)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl mb-2">$42,000</div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-green-600">+20% vs mes anterior</span>
              </div>
            </CardContent>
          </Card>

          {/* Tenants Activos */}
          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Tenants Activos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl mb-2">23</div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600">8 nuevos este mes</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Tenants Morosos */}
          <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Tenants Morosos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-red-600 mb-2">3</div>
              <div className="text-sm text-muted-foreground">
                Requieren atención
              </div>
            </CardContent>
          </Card>

          {/* Total Sucursales */}
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Total Sucursales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl mb-2">67</div>
              <div className="text-sm text-muted-foreground">
                Puntos de venta operando
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* MRR Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Crecimiento de MRR</CardTitle>
              <p className="text-sm text-muted-foreground">
                Evolución de ingresos recurrentes
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mrrData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="mrr"
                    stroke="#9333ea"
                    strokeWidth={3}
                    name="MRR ($)"
                  />
                  <Line
                    type="monotone"
                    dataKey="nuevos"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Nuevos Clientes"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle>Estado del Sistema</CardTitle>
              <p className="text-sm text-muted-foreground">
                Monitoreo de infraestructura
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {serverStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-5 h-5 ${stat.color}`} />
                          <span>{stat.name}</span>
                        </div>
                        <span className={stat.color}>{stat.value}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            stat.status === "normal" ? "bg-green-600" : "bg-yellow-600"
                          }`}
                          style={{ width: `${stat.value}%` }}
                        />
                      </div>
                    </div>
                  );
                })}

                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                    <span className="text-sm">Sistema Operativo</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Latencia promedio: 45ms • Uptime: 99.8%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <p className="text-sm text-muted-foreground">
              Últimas acciones en la plataforma
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                >
                  <div>
                    <h4 className="mb-1">{activity.tenant}</h4>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}
                    </p>
                  </div>
                  <div className="text-right">
                    {activity.amount && (
                      <div className="mb-1">{activity.amount}</div>
                    )}
                    <div className="text-sm text-muted-foreground">
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

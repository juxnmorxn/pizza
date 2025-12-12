import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Receipt,
  AlertTriangle,
  Store,
  Calendar,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function ExecutiveDashboard() {
  const [dateRange, setDateRange] = useState("today");
  const [branch, setBranch] = useState("all");

  const branches = [
    { id: "all", name: "Todas las Sucursales" },
    { id: "north", name: "Sucursal Norte" },
    { id: "center", name: "Sucursal Centro" },
    { id: "south", name: "Sucursal Sur" },
    { id: "east", name: "Sucursal Este" }
  ];

  // Mock KPI data
  const kpis = [
    {
      label: "Venta Bruta",
      value: "$48,250.00",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      label: "Utilidad Neta",
      value: "$18,340.00",
      change: "+8.2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
    {
      label: "Ticket Promedio",
      value: "$1,245.50",
      change: "-3.1%",
      trend: "down",
      icon: Receipt,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      label: "Transacciones",
      value: "387",
      change: "+15.8%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  // Mock trend data
  const trendData = [
    { hour: "9:00", hoy: 1200, ayer: 980 },
    { hour: "10:00", hoy: 2400, ayer: 2100 },
    { hour: "11:00", hoy: 3600, ayer: 3200 },
    { hour: "12:00", hoy: 5200, ayer: 4800 },
    { hour: "13:00", hoy: 7100, ayer: 6500 },
    { hour: "14:00", hoy: 9800, ayer: 8900 },
    { hour: "15:00", hoy: 12400, ayer: 11200 },
    { hour: "16:00", hoy: 15800, ayer: 14100 },
    { hour: "17:00", hoy: 18900, ayer: 17300 },
    { hour: "18:00", hoy: 22400, ayer: 20500 }
  ];

  // Mock alerts
  const alerts = [
    {
      id: 1,
      type: "critical",
      title: "Faltante de caja en Sucursal Norte",
      description: "Diferencia de -$200.00 en corte de turno",
      time: "Hace 15 min",
      icon: AlertTriangle
    },
    {
      id: 2,
      type: "warning",
      title: "Intento de cancelación de venta grande",
      description: "Venta de $5,200 - Sucursal Sur",
      time: "Hace 32 min",
      icon: ShoppingCart
    },
    {
      id: 3,
      type: "info",
      title: "Stock crítico de Bota Avestruz",
      description: "Solo quedan 3 unidades en total",
      time: "Hace 1 hora",
      icon: Store
    }
  ];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50/50 via-green-50/50 to-teal-50/50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Filters */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2">Dashboard Ejecutivo</h1>
            <p className="text-muted-foreground">
              Termómetro del negocio en tiempo real
            </p>
          </div>

          <div className="flex gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-48">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoy</SelectItem>
                <SelectItem value="yesterday">Ayer</SelectItem>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mes</SelectItem>
                <SelectItem value="custom">Rango Personalizado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger className="w-56">
                <Store className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {branches.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.label} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${kpi.bgColor}`}>
                    <Icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    kpi.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    {kpi.trend === "up" ? (
                      <ArrowUp className="w-4 h-4" />
                    ) : (
                      <ArrowDown className="w-4 h-4" />
                    )}
                    {kpi.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {kpi.label}
                  </p>
                  <p className="text-2xl text-primary">
                    {kpi.value}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Trend Chart */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="mb-1">Tendencia de Ventas</h3>
            <p className="text-sm text-muted-foreground">
              Comparación hora por hora: Hoy vs. Ayer
            </p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="hoy"
                stroke="#22c55e"
                strokeWidth={2}
                name="Hoy"
              />
              <Line
                type="monotone"
                dataKey="ayer"
                stroke="#94a3b8"
                strokeWidth={2}
                name="Ayer"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Alerts Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="mb-1">Centro de Notificaciones</h3>
              <p className="text-sm text-muted-foreground">
                Alertas de seguridad y eventos importantes
              </p>
            </div>
            <Button variant="outline" size="sm">
              Ver Todas
            </Button>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.type === "critical"
                      ? "border-red-600 bg-red-50"
                      : alert.type === "warning"
                      ? "border-orange-500 bg-orange-50"
                      : "border-blue-500 bg-blue-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      alert.type === "critical"
                        ? "bg-red-100"
                        : alert.type === "warning"
                        ? "bg-orange-100"
                        : "bg-blue-100"
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        alert.type === "critical"
                          ? "text-red-600"
                          : alert.type === "warning"
                          ? "text-orange-600"
                          : "text-blue-600"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-sm">{alert.title}</h4>
                        <Badge
                          variant={
                            alert.type === "critical"
                              ? "destructive"
                              : alert.type === "warning"
                              ? "secondary"
                              : "default"
                          }
                        >
                          {alert.type === "critical"
                            ? "Crítico"
                            : alert.type === "warning"
                            ? "Advertencia"
                            : "Info"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {alert.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {alert.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

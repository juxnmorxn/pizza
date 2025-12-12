import { useState } from "react";
import { BarChart3, TrendingUp, TrendingDown, Package, CreditCard, Calendar } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

export function IntelligentReports() {
  const [dateRange, setDateRange] = useState("month");

  // Mock data for best sellers
  const bestSellers = [
    {
      rank: 1,
      product: "Botas Cuadra Avestruz",
      category: "Botas",
      unitsSold: 87,
      revenue: 304499.13,
      profit: 121799.13
    },
    {
      rank: 2,
      product: "Sombrero Texana Premium",
      category: "Sombreros",
      unitsSold: 156,
      revenue: 202798.44,
      profit: 101398.44
    },
    {
      rank: 3,
      product: "Cinturón Piel de Res",
      category: "Accesorios",
      unitsSold: 243,
      revenue: 145797.57,
      profit: 84997.57
    },
    {
      rank: 4,
      product: "Botas Vaqueras Clásicas",
      category: "Botas",
      unitsSold: 65,
      revenue: 142999.35,
      profit: 58499.35
    },
    {
      rank: 5,
      product: "Sombrero Vaquero Clásico",
      category: "Sombreros",
      unitsSold: 98,
      revenue: 88199.02,
      profit: 44099.02
    }
  ];

  // Mock data for dead stock
  const deadStock = [
    {
      product: "Hebilla Plata Antigua",
      daysStagnant: 127,
      stock: 34,
      investedValue: 8500.0,
      lastSale: "14 Sep 2024"
    },
    {
      product: "Sombrero Ala Ancha XL",
      daysStagnant: 98,
      stock: 12,
      investedValue: 7800.0,
      lastSale: "12 Oct 2024"
    },
    {
      product: "Botas Exóticas Cocodrilo",
      daysStagnant: 86,
      stock: 5,
      investedValue: 12500.0,
      lastSale: "26 Oct 2024"
    },
    {
      product: "Cinturón Decorado Premium",
      daysStagnant: 73,
      stock: 18,
      investedValue: 5400.0,
      lastSale: "08 Nov 2024"
    }
  ];

  // Mock category data
  const categoryData = [
    { name: "Botas", value: 42, revenue: 485000, color: "#22c55e" },
    { name: "Sombreros", value: 28, revenue: 320000, color: "#3b82f6" },
    { name: "Accesorios", value: 18, revenue: 205000, color: "#f59e0b" },
    { name: "Cinturones", value: 8, revenue: 92000, color: "#ef4444" },
    { name: "Otros", value: 4, revenue: 45000, color: "#8b5cf6" }
  ];

  // Mock payment methods data
  const paymentData = [
    { method: "Efectivo", amount: 458200, percentage: 42 },
    { method: "Tarjeta Débito", amount: 382500, percentage: 35 },
    { method: "Tarjeta Crédito", amount: 197800, percentage: 18 },
    { method: "Transferencia", amount: 54500, percentage: 5 }
  ];

  const totalRevenue = categoryData.reduce((sum, cat) => sum + cat.revenue, 0);
  const totalDeadStockValue = deadStock.reduce((sum, item) => sum + item.investedValue, 0);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50/50 via-green-50/50 to-teal-50/50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 text-white">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h1>Reportes Inteligentes</h1>
              <p className="text-muted-foreground">
                Business Intelligence y análisis de datos
              </p>
            </div>
          </div>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mes</SelectItem>
              <SelectItem value="quarter">Este Trimestre</SelectItem>
              <SelectItem value="year">Este Año</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Top Product</p>
                <p className="text-lg text-primary truncate">
                  {bestSellers[0].product}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 opacity-50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {bestSellers[0].unitsSold} unidades vendidas
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ventas por Categoría</p>
                <p className="text-2xl text-primary">{categoryData.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600 opacity-50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              ${totalRevenue.toLocaleString()} total
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Stock Muerto</p>
                <p className="text-2xl text-orange-600">{deadStock.length}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-orange-600 opacity-50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              ${totalDeadStockValue.toLocaleString()} invertidos
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pago Preferido</p>
                <p className="text-lg text-primary">{paymentData[0].method}</p>
              </div>
              <CreditCard className="w-8 h-8 text-purple-600 opacity-50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {paymentData[0].percentage}% del total
            </p>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card className="p-6">
          <Tabs defaultValue="bestsellers">
            <TabsList className="mb-6">
              <TabsTrigger value="bestsellers" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                Top Productos
              </TabsTrigger>
              <TabsTrigger value="deadstock" className="gap-2">
                <TrendingDown className="w-4 h-4" />
                Stock Muerto
              </TabsTrigger>
              <TabsTrigger value="categories" className="gap-2">
                <Package className="w-4 h-4" />
                Por Categoría
              </TabsTrigger>
              <TabsTrigger value="payments" className="gap-2">
                <CreditCard className="w-4 h-4" />
                Métodos de Pago
              </TabsTrigger>
            </TabsList>

            {/* Best Sellers Tab */}
            <TabsContent value="bestsellers" className="space-y-4">
              <div>
                <h3 className="mb-2">Productos Más Vendidos</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ranking de productos por cantidad vendida y ingresos generados
                </p>
              </div>

              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Rank</TableHead>
                      <TableHead>Producto</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead className="text-right">Unidades</TableHead>
                      <TableHead className="text-right">Ingresos</TableHead>
                      <TableHead className="text-right">Utilidad</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bestSellers.map((item) => (
                      <TableRow key={item.rank}>
                        <TableCell>
                          <div className="flex items-center justify-center">
                            {item.rank === 1 && <span className="text-2xl">🥇</span>}
                            {item.rank === 2 && <span className="text-2xl">🥈</span>}
                            {item.rank === 3 && <span className="text-2xl">🥉</span>}
                            {item.rank > 3 && (
                              <Badge variant="outline">{item.rank}</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{item.product}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.category}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-blue-600">{item.unitsSold}</span>
                        </TableCell>
                        <TableCell className="text-right text-green-600">
                          ${item.revenue.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right text-emerald-600">
                          ${item.profit.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Dead Stock Tab */}
            <TabsContent value="deadstock" className="space-y-4">
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="mb-1 text-orange-900">⚠️ Productos sin movimiento</h4>
                <p className="text-sm text-orange-800">
                  Estos productos no se han vendido en los últimos 90+ días. 
                  Considera aplicar descuentos o promociones para recuperar la inversión.
                </p>
              </div>

              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead className="text-right">Días Estancado</TableHead>
                      <TableHead className="text-right">Stock</TableHead>
                      <TableHead className="text-right">Valor Invertido</TableHead>
                      <TableHead>Última Venta</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deadStock.map((item, index) => (
                      <TableRow key={index} className="bg-orange-50/50">
                        <TableCell>{item.product}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="destructive">{item.daysStagnant} días</Badge>
                        </TableCell>
                        <TableCell className="text-right">{item.stock}</TableCell>
                        <TableCell className="text-right text-orange-600">
                          ${item.investedValue.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {item.lastSale}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span>Total Invertido en Stock Muerto:</span>
                  <span className="text-2xl text-orange-600">
                    ${totalDeadStockValue.toLocaleString()}
                  </span>
                </div>
              </div>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories" className="space-y-4">
              <div>
                <h3 className="mb-2">Ventas por Categoría</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Distribución de ingresos por categoría de producto
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name} ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Bar dataKey="revenue" fill="#22c55e" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Details */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
                {categoryData.map((cat, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: cat.color }}
                      />
                      <h4 className="text-sm">{cat.name}</h4>
                    </div>
                    <p className="text-2xl text-primary mb-1">
                      {cat.value}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ${cat.revenue.toLocaleString()}
                    </p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Payment Methods Tab */}
            <TabsContent value="payments" className="space-y-4">
              <div>
                <h3 className="mb-2">Análisis de Métodos de Pago</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Distribución de ventas por forma de pago - Vital para planeación fiscal
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {paymentData.map((payment, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <h4>{payment.method}</h4>
                    </div>
                    <p className="text-2xl text-primary mb-1">
                      ${payment.amount.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-600 to-green-700"
                          style={{ width: `${payment.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {payment.percentage}%
                      </span>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="mb-1 text-blue-900">💡 Insight Fiscal</h4>
                <p className="text-sm text-blue-800">
                  El {paymentData[0].percentage}% de tus ventas son en efectivo. 
                  Asegúrate de declarar correctamente estos ingresos para evitar 
                  problemas con el SAT. Las ventas con tarjeta quedan automáticamente 
                  registradas.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

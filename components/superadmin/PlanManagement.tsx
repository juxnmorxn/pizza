import { useState } from "react";
import { Plus, Edit2, Package, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface Feature {
  id: string;
  name: string;
  description: string;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  maxBranches: number;
  maxUsers: number;
  features: {
    [key: string]: boolean;
  };
}

export function PlanManagement() {
  const [showNewPlanDialog, setShowNewPlanDialog] = useState(false);

  // Available features
  const availableFeatures: Feature[] = [
    { id: "billing", name: "Facturación Electrónica", description: "Generación de facturas CFDI" },
    { id: "ownerApp", name: "App de Dueño", description: "Dashboard ejecutivo móvil" },
    { id: "api", name: "API Externa", description: "Integración con sistemas externos" },
    { id: "multiCurrency", name: "Multi-Moneda", description: "Soporte para múltiples divisas" },
    { id: "analytics", name: "Analytics Avanzado", description: "Reportes de BI" },
    { id: "whiteLabel", name: "White Label", description: "Personalización de marca" }
  ];

  // Mock plans
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "basic",
      name: "Emprendedor",
      price: 799,
      maxBranches: 1,
      maxUsers: 1,
      features: {
        billing: false,
        ownerApp: false,
        api: false,
        multiCurrency: false,
        analytics: false,
        whiteLabel: false
      }
    },
    {
      id: "pro",
      name: "Empresario",
      price: 1999,
      maxBranches: 5,
      maxUsers: 10,
      features: {
        billing: true,
        ownerApp: true,
        api: false,
        multiCurrency: true,
        analytics: true,
        whiteLabel: false
      }
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 4999,
      maxBranches: 999,
      maxUsers: 999,
      features: {
        billing: true,
        ownerApp: true,
        api: true,
        multiCurrency: true,
        analytics: true,
        whiteLabel: true
      }
    }
  ]);

  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const handleToggleFeature = (planId: string, featureId: string) => {
    setPlans(plans.map(plan => {
      if (plan.id === planId) {
        return {
          ...plan,
          features: {
            ...plan.features,
            [featureId]: !plan.features[featureId]
          }
        };
      }
      return plan;
    }));
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-2">Gestor de Planes y Límites</h1>
            <p className="text-muted-foreground">
              Define qué vendes y qué incluye cada plan
            </p>
          </div>
          <Dialog open={showNewPlanDialog} onOpenChange={setShowNewPlanDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 gap-2">
                <Plus className="w-4 h-4" />
                Crear Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Plan</DialogTitle>
                <DialogDescription>
                  Define características y límites del plan
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="planName">Nombre del Plan</Label>
                    <Input id="planName" placeholder="Ej: Pro Plus" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio Mensual ($)</Label>
                    <Input id="price" type="number" placeholder="2999" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxBranches">Límite de Sucursales</Label>
                    <Input id="maxBranches" type="number" placeholder="10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxUsers">Límite de Usuarios</Label>
                    <Input id="maxUsers" type="number" placeholder="20" />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => {
                      alert("Plan creado exitosamente");
                      setShowNewPlanDialog(false);
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600"
                  >
                    Crear Plan
                  </Button>
                  <Button
                    onClick={() => setShowNewPlanDialog(false)}
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

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <Card key={plan.id} className="border-2 border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle>{plan.name}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    onClick={() => setEditingPlan(plan)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-3xl">${plan.price.toLocaleString()}</div>
                <div className="text-sm text-purple-100">por mes</div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Limits */}
                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Sucursales</span>
                      <Badge>{plan.maxBranches === 999 ? "Ilimitado" : plan.maxBranches}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Usuarios</span>
                      <Badge>{plan.maxUsers === 999 ? "Ilimitado" : plan.maxUsers}</Badge>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="mb-3 text-sm">Funcionalidades:</h4>
                    <div className="space-y-2">
                      {availableFeatures.map((feature) => (
                        <div
                          key={feature.id}
                          className="flex items-center justify-between p-2 bg-muted/50 rounded"
                        >
                          <div className="flex items-center gap-2">
                            {plan.features[feature.id] ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <X className="w-4 h-4 text-muted-foreground" />
                            )}
                            <span className="text-sm">{feature.name}</span>
                          </div>
                          <Switch
                            checked={plan.features[feature.id]}
                            onCheckedChange={() => handleToggleFeature(plan.id, feature.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Detail Table */}
        <Card>
          <CardHeader>
            <CardTitle>Control de Features (Interruptores)</CardTitle>
            <p className="text-sm text-muted-foreground">
              Gestiona qué funcionalidades incluye cada plan
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="p-4 border rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="mb-1">{feature.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Incluido en:</span>
                    <div className="flex gap-2">
                      {plans.map((plan) => (
                        plan.features[feature.id] && (
                          <Badge key={plan.id} variant="outline">
                            {plan.name}
                          </Badge>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <Card className="mt-6 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Package className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="mb-1 text-blue-900">Sistema de Límites Dinámicos</h4>
                <p className="text-sm text-blue-800">
                  Los límites se aplican automáticamente. Si un cliente en plan "Básico" intenta 
                  crear una segunda sucursal, el sistema le bloqueará la acción y le sugerirá 
                  actualizar a un plan superior.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

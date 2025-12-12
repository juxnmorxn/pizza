import { Store, UserCog, ScanLine, Crown } from "lucide-react";
import { Card } from "./ui/card";

interface LoginProps {
  onLogin: (role: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const roles = [
    {
      id: "superadmin",
      name: "Super Admin",
      icon: Crown,
      description: "Control maestro del SaaS",
      gradient: "from-purple-600 to-indigo-700"
    },
    {
      id: "dueno",
      name: "Dueño",
      icon: Store,
      description: "Acceso total al sistema",
      gradient: "from-emerald-600 to-green-700"
    },
    {
      id: "encargado",
      name: "Encargado",
      icon: UserCog,
      description: "Punto de venta e inventario",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      id: "escaner",
      name: "Escáner",
      icon: ScanLine,
      description: "Verificación de precios",
      gradient: "from-teal-500 to-green-600"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-700 mb-6 shadow-lg">
            <Store className="w-10 h-10 text-white" />
          </div>
          <h1 className="mb-2">Sistema de Punto de Venta</h1>
          <p className="text-muted-foreground">
            Selecciona tu rol para continuar
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.id}
                className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 hover:border-primary"
                onClick={() => onLogin(role.id)}
              >
                <div className="p-8 text-center">
                  {/* Icon with Gradient Background */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${role.gradient} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Role Name */}
                  <h3 className="mb-2">{role.name}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm">
                    {role.description}
                  </p>

                  {/* Hover Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 to-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Sistema POS v1.0 - Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  );
}
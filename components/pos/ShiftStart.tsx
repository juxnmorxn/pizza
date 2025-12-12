import { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { DollarSign, User, MapPin, Calendar } from "lucide-react";

interface ShiftStartProps {
  onStartShift: () => void;
}

export function ShiftStart({ onStartShift }: ShiftStartProps) {
  const [openingCash, setOpeningCash] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedBranch] = useState<string>("Sucursal Norte");

  const users = ["María García", "Juan Pérez", "Ana López", "Carlos Rodríguez"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (openingCash && selectedUser) {
      onStartShift();
    }
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <Card className="w-full max-w-2xl p-8 shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-700 mb-4 shadow-lg">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-2">Apertura de Caja</h1>
          <p className="text-muted-foreground">
            Inicia tu turno de trabajo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Info */}
          <div className="flex items-center gap-3 p-4 bg-accent rounded-xl">
            <Calendar className="w-5 h-5 text-accent-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Fecha</p>
              <p className="text-accent-foreground capitalize">
                {getCurrentDate()}
              </p>
            </div>
          </div>

          {/* Branch Info */}
          <div className="flex items-center gap-3 p-4 bg-accent rounded-xl">
            <MapPin className="w-5 h-5 text-accent-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Conectado a</p>
              <p className="text-accent-foreground">{selectedBranch}</p>
            </div>
          </div>

          {/* User Selection */}
          <div className="space-y-2">
            <Label htmlFor="user" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Seleccionar Usuario
            </Label>
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger id="user">
                <SelectValue placeholder="¿Quién está iniciando sesión?" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user} value={user}>
                    {user}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Opening Cash */}
          <div className="space-y-2">
            <Label htmlFor="opening-cash" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Fondo de Caja Inicial
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="opening-cash"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={openingCash}
                onChange={(e) => setOpeningCash(e.target.value)}
                className="pl-8"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Ingresa la cantidad de dinero con la que inicias (efectivo en caja)
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800"
            size="lg"
            disabled={!openingCash || !selectedUser}
          >
            Abrir Caja e Iniciar Turno
          </Button>
        </form>

        {/* Info Message */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Importante:</strong> Asegúrate de contar correctamente el efectivo inicial.
            Este monto será utilizado para el corte de caja al final del turno.
          </p>
        </div>
      </Card>
    </div>
  );
}

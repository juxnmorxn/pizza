import { useState } from "react";
import { QrCode, User, ArrowLeft, Camera, CreditCard, Package, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface ScannerLinkScreenProps {
  onLink: () => void;
  onModeChange: (mode: string) => void;
  onLogout: () => void;
}

export function ScannerLinkScreen({
  onLink,
  onModeChange,
  onLogout
}: ScannerLinkScreenProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);

  if (showQRScanner) {
    return (
      <div className="h-full flex flex-col bg-black">
        {/* Mock QR Scanner */}
        <div className="relative flex-1 flex items-center justify-center">
          {/* Scanner Frame */}
          <div className="relative w-64 h-64 border-4 border-white rounded-3xl">
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-green-500 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-green-500 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-green-500 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-green-500 rounded-br-3xl" />
            
            {/* Scanning line animation */}
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-pulse" />
          </div>

          {/* Instructions */}
          <div className="absolute bottom-32 left-0 right-0 text-center px-6">
            <p className="text-white text-lg mb-2">
              Escanea el código QR de la PC
            </p>
            <p className="text-white/70 text-sm">
              El código aparece en la pantalla de alta de productos
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 space-y-3">
          <Button
            onClick={onLink}
            className="w-full h-16 bg-gradient-to-r from-emerald-600 to-green-700 text-lg"
          >
            Simular Vinculación
          </Button>
          <Button
            onClick={() => setShowQRScanner(false)}
            variant="outline"
            className="w-full h-14"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Cancelar
          </Button>
        </div>
      </div>
    );
  }

  if (showLogin) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-600 to-green-700 text-white">
          <button
            onClick={() => setShowLogin(false)}
            className="mb-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl mb-2">Iniciar Sesión</h1>
          <p className="text-sm text-green-100">
            Acceso independiente a herramientas
          </p>
        </div>

        {/* Login Form */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-lg">Usuario</Label>
              <Input
                id="username"
                placeholder="Tu nombre de usuario"
                className="h-14 text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-14 text-lg"
              />
            </div>

            <Button
              onClick={onLink}
              className="w-full h-16 bg-gradient-to-r from-emerald-600 to-green-700 text-lg"
            >
              <User className="w-5 h-5 mr-2" />
              Iniciar Sesión
            </Button>
          </div>

          {/* Quick Access Tools */}
          <div className="mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              O accede directamente a:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onModeChange("inventory")}
                className="p-4 bg-white rounded-xl shadow active:scale-95 transition-transform"
              >
                <Package className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                <p className="text-xs">Inventario</p>
              </button>
              <button
                onClick={() => onModeChange("price")}
                className="p-4 bg-white rounded-xl shadow active:scale-95 transition-transform"
              >
                <CreditCard className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                <p className="text-xs">Precios</p>
              </button>
              <button
                onClick={() => onModeChange("evidence")}
                className="p-4 bg-white rounded-xl shadow active:scale-95 transition-transform"
              >
                <Camera className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                <p className="text-xs">Evidencias</p>
              </button>
              <button
                onClick={() => onModeChange("location")}
                className="p-4 bg-white rounded-xl shadow active:scale-95 transition-transform"
              >
                <MapPin className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                <p className="text-xs">Ubicación</p>
              </button>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="p-6 border-t">
          <Button
            onClick={onLogout}
            variant="ghost"
            className="w-full"
          >
            Volver al Login Principal
          </Button>
        </div>
      </div>
    );
  }

  // Main Link Screen
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-emerald-600 to-green-700 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-white/20 rounded-2xl">
            <QrCode className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl">App Escáner</h1>
            <p className="text-sm text-green-100">Herramienta móvil</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        {/* Main QR Button */}
        <button
          onClick={() => setShowQRScanner(true)}
          className="w-full max-w-md aspect-square bg-white rounded-3xl shadow-2xl mb-8 flex flex-col items-center justify-center active:scale-95 transition-transform border-4 border-emerald-500"
        >
          <div className="text-8xl mb-4">📷</div>
          <h2 className="text-2xl mb-2">Escanear QR</h2>
          <p className="text-muted-foreground">
            Vincularse con PC de caja
          </p>
        </button>

        {/* Alternative Login */}
        <button
          onClick={() => setShowLogin(true)}
          className="text-muted-foreground underline"
        >
          Iniciar sesión con usuario y contraseña
        </button>
      </div>

      {/* Footer Info */}
      <div className="p-6 bg-muted/50">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Modo satélite - Sin conexión</span>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4">
        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Login Principal
        </Button>
      </div>
    </div>
  );
}

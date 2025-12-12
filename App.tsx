import { useState } from "react";
import { Login } from "./components/Login";
import { POSLayout } from "./components/pos/POSLayout";
import { OwnerLayout } from "./components/owner/OwnerLayout";
import { ScannerLayout } from "./components/scanner/ScannerLayout";
import { SuperAdminLayout } from "./components/superadmin/SuperAdminLayout";

export default function App() {
  const [userRole, setUserRole] = useState<string | null>(null);

  const handleLogin = (role: string) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  if (!userRole) {
    return <Login onLogin={handleLogin} />;
  }

  if (userRole === "superadmin") {
    return <SuperAdminLayout onLogout={handleLogout} />;
  }

  if (userRole === "encargado") {
    return <POSLayout onLogout={handleLogout} />;
  }

  if (userRole === "dueno") {
    return <OwnerLayout onLogout={handleLogout} />;
  }

  if (userRole === "escaner") {
    return <ScannerLayout onLogout={handleLogout} />;
  }

  // Placeholder for other roles
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-center">
        <h1 className="mb-4">Área en Desarrollo</h1>
        <p className="text-muted-foreground mb-6">
          La sección de {userRole} está en construcción.
        </p>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg"
        >
          Volver al Login
        </button>
      </div>
    </div>
  );
}
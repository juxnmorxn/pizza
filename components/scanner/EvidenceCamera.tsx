import { useState } from "react";
import { ArrowLeft, Camera, FileText, AlertTriangle, Package, Upload, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

interface EvidenceCameraProps {
  onBack: () => void;
}

type EvidenceType = "expense" | "damaged" | "delivery" | null;

export function EvidenceCamera({ onBack }: EvidenceCameraProps) {
  const [selectedType, setSelectedType] = useState<EvidenceType>(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [note, setNote] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const evidenceTypes = [
    {
      id: "expense" as EvidenceType,
      icon: FileText,
      title: "Ticket de Gasto",
      description: "Comprobar salida de efectivo",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "damaged" as EvidenceType,
      icon: AlertTriangle,
      title: "Mercancía Dañada",
      description: "Justificar una merma",
      color: "from-orange-500 to-red-500"
    },
    {
      id: "delivery" as EvidenceType,
      icon: Package,
      title: "Recepción de Paquete",
      description: "Probar estado de llegada",
      color: "from-green-500 to-emerald-600"
    }
  ];

  const handleTakePhoto = () => {
    setPhotoTaken(true);
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
      setTimeout(() => {
        onBack();
      }, 2000);
    }, 1500);
  };

  const getTypeInfo = () => {
    return evidenceTypes.find(t => t.id === selectedType);
  };

  if (uploaded) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center p-8">
          <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl mb-2">¡Reporte Enviado!</h2>
          <p className="text-muted-foreground">
            La evidencia se ha guardado correctamente
          </p>
        </div>
      </div>
    );
  }

  if (photoTaken && selectedType) {
    const typeInfo = getTypeInfo();
    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-600 to-green-700 text-white">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setPhotoTaken(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl">Completar Reporte</h1>
            <div className="w-10 h-10" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Photo Preview */}
          <div className="mb-6">
            <Label className="mb-2 block">Foto Capturada</Label>
            <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-16 h-16 text-gray-400" />
              </div>
              <div className="absolute top-3 right-3">
                <div className="px-3 py-1 bg-green-600 text-white text-xs rounded-full flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Capturada
                </div>
              </div>
            </div>
          </div>

          {/* Evidence Type Badge */}
          <div className={`p-4 bg-gradient-to-r ${typeInfo?.color} text-white rounded-xl mb-6`}>
            <div className="flex items-center gap-3">
              {typeInfo?.icon && <typeInfo.icon className="w-6 h-6" />}
              <div>
                <h4>{typeInfo?.title}</h4>
                <p className="text-sm text-white/90">{typeInfo?.description}</p>
              </div>
            </div>
          </div>

          {/* Note Field */}
          <div className="space-y-2">
            <Label htmlFor="note">Nota / Descripción</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={
                selectedType === "expense"
                  ? "Ej: Se compraron productos de limpieza"
                  : selectedType === "damaged"
                  ? "Ej: Llegó rota la hebilla durante el envío"
                  : "Ej: Paquete llegó en buen estado, sin daños"
              }
              rows={5}
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground">
              Describe el motivo o contexto de esta evidencia
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t space-y-3">
          <Button
            onClick={handleUpload}
            disabled={!note.trim() || uploading}
            className="w-full h-16 bg-gradient-to-r from-emerald-600 to-green-700 gap-2"
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Subir Reporte
              </>
            )}
          </Button>
          <Button
            onClick={() => setPhotoTaken(false)}
            variant="outline"
            className="w-full h-14"
            disabled={uploading}
          >
            Tomar Otra Foto
          </Button>
        </div>
      </div>
    );
  }

  if (selectedType) {
    const typeInfo = getTypeInfo();
    return (
      <div className="h-full flex flex-col bg-black">
        {/* Camera Header */}
        <div className="p-6 bg-gradient-to-b from-black/90 to-transparent absolute top-0 left-0 right-0 z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedType(null)}
              className="p-2 bg-white/20 rounded-lg"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div className={`px-4 py-2 bg-gradient-to-r ${typeInfo?.color} rounded-full`}>
              <span className="text-white text-sm">{typeInfo?.title}</span>
            </div>
            <div className="w-10 h-10" />
          </div>
        </div>

        {/* Camera View */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="text-white/50 text-center">
            <Camera className="w-24 h-24 mx-auto mb-4" />
            <p className="text-lg">Vista de Cámara</p>
          </div>
        </div>

        {/* Capture Button */}
        <div className="p-6 bg-gradient-to-t from-black/90 to-transparent">
          <div className="text-center mb-6">
            <p className="text-white text-lg mb-2">
              Toma una foto clara del documento
            </p>
            <p className="text-white/70 text-sm">
              Asegúrate de que se vea legible
            </p>
          </div>

          <Button
            onClick={handleTakePhoto}
            className="w-full h-16 bg-white text-black hover:bg-white/90"
          >
            <Camera className="w-5 h-5 mr-2" />
            Tomar Foto
          </Button>
        </div>
      </div>
    );
  }

  // Type Selection Screen
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-emerald-600 to-green-700 text-white">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">📸 Cámara de Evidencias</h1>
          <div className="w-10 h-10" />
        </div>
        <p className="text-sm text-green-100">
          Selecciona el tipo de evidencia a registrar
        </p>
      </div>

      {/* Type Selection */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {evidenceTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className="w-full p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 border-2 border-transparent hover:border-emerald-500"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${type.color}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="mb-1">{type.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {type.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-900">
            <strong>📋 Importante:</strong> Toda evidencia fotográfica queda 
            registrada con fecha, hora y usuario. Asegúrate de capturar 
            imágenes claras y legibles.
          </p>
        </div>
      </div>
    </div>
  );
}

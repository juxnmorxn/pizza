import { useState } from "react";
import { Camera, Flashlight, FlashlightOff, RefreshCw, X, Check } from "lucide-react";
import { Button } from "../ui/button";

interface ProductPhotoCameraProps {
  onBack: () => void;
}

export function ProductPhotoCamera({ onBack }: ProductPhotoCameraProps) {
  const [flashOn, setFlashOn] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<"front" | "back">("back");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleTakePhoto = () => {
    // Simulate photo capture with flash effect
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 1500);
  };

  const toggleCamera = () => {
    setCameraFacing(prev => prev === "back" ? "front" : "back");
  };

  return (
    <div className="h-full flex flex-col bg-black relative">
      {/* Camera Viewfinder (Mock) */}
      <div className="flex-1 relative overflow-hidden">
        {/* Mock Camera Feed */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-white/50 text-center">
            <Camera className="w-24 h-24 mx-auto mb-4" />
            <p className="text-lg">Vista de Cámara</p>
            <p className="text-sm">Cámara {cameraFacing === "back" ? "Trasera" : "Frontal"}</p>
          </div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border border-white/10" />
          ))}
        </div>

        {/* Flash Effect */}
        {showSuccess && (
          <div className="absolute inset-0 bg-white animate-pulse" />
        )}

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="flex items-center gap-2 px-4 py-2 bg-black/50 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white text-sm">Alta de Producto</span>
            </div>

            <div className="w-12 h-12" /> {/* Spacer for alignment */}
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-green-600 rounded-full p-8">
              <Check className="w-16 h-16 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="p-6 bg-gradient-to-t from-black to-transparent">
        {/* Instructions */}
        <div className="mb-6 text-center">
          <p className="text-white text-lg mb-2">
            📦 Captura las fotos del producto
          </p>
          <p className="text-white/70 text-sm">
            Toma varias fotos desde diferentes ángulos
          </p>
        </div>

        {/* Main Actions */}
        <div className="flex items-center justify-center gap-8 mb-4">
          {/* Flash Toggle */}
          <button
            onClick={() => setFlashOn(!flashOn)}
            className="flex flex-col items-center gap-2"
          >
            <div className={`p-4 rounded-full transition-all ${
              flashOn
                ? "bg-yellow-500 shadow-lg shadow-yellow-500/50"
                : "bg-white/20"
            }`}>
              {flashOn ? (
                <Flashlight className="w-6 h-6 text-white" />
              ) : (
                <FlashlightOff className="w-6 h-6 text-white" />
              )}
            </div>
            <span className="text-white text-xs">Linterna</span>
          </button>

          {/* Capture Button */}
          <button
            onClick={handleTakePhoto}
            className="relative active:scale-95 transition-transform"
          >
            <div className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-green-500">
              <Camera className="w-10 h-10 text-green-600" />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-white text-sm">FOTO</span>
            </div>
          </button>

          {/* Flip Camera */}
          <button
            onClick={toggleCamera}
            className="flex flex-col items-center gap-2"
          >
            <div className="p-4 rounded-full bg-white/20">
              <RefreshCw className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xs">Girar</span>
          </button>
        </div>

        {/* Photo Counter */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
            <span className="text-white text-sm">Fotos capturadas:</span>
            <span className="px-2 py-1 bg-green-500 rounded-full text-white text-sm">
              3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
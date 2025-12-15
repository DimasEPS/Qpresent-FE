import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useScanQR } from "@/hooks/useAttendance";
import { getUserLocation, generateFingerprint } from "@/lib/device";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Camera, QrCode, CheckCircle, MapPin, AlertCircle } from "lucide-react";

const ScanQR = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session");

  const { mutate: scanQR, isPending } = useScanQR();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState("checking"); // checking, granted, denied
  const [locationStatus, setLocationStatus] = useState("checking");
  const scannerRef = useRef(null);
  const hasScannedRef = useRef(false);

  // Check permissions on mount
  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    // Check camera permission
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setPermissionStatus("granted");
    } catch (err) {
      console.error("Camera permission error:", err);
      setPermissionStatus("denied");
      setError(
        "Camera access denied. Please allow camera access in your browser settings."
      );
    }

    // Check location permission - with better error handling
    try {
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by your browser");
      }

      // Request permission first
      const result = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => {
            console.error("Geolocation error:", error);
            // Still resolve even if error - we'll use fallback location
            if (error.code === 1) {
              reject(new Error("Location permission denied"));
            } else if (error.code === 2) {
              // Position unavailable - use fallback (common on localhost)
              resolve({ coords: { latitude: 0, longitude: 0, accuracy: 0 } });
            } else {
              reject(new Error("Location timeout"));
            }
          },
          {
            enableHighAccuracy: false, // Less strict for testing
            timeout: 10000,
            maximumAge: 60000, // Cache for 1 minute
          }
        );
      });

      setLocationStatus("granted");
    } catch (err) {
      console.error("Location permission error:", err);
      // For development, allow to proceed with warning
      if (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
      ) {
        setLocationStatus("granted"); // Allow on localhost
        console.warn(
          "Location unavailable on localhost - proceeding with default coordinates"
        );
      } else {
        setLocationStatus("denied");
        setError(
          "Location access required. Please enable location services and allow access."
        );
      }
    }
  };

  const requestPermissions = async () => {
    setPermissionStatus("checking");
    setLocationStatus("checking");
    setError("");
    await checkPermissions();
  };

  const handleAttendance = useCallback(
    async (qrData) => {
      if (hasScannedRef.current) return; // Prevent double scan
      hasScannedRef.current = true;

      setError("");

      try {
        // Parse QR data
        const qrPayload = JSON.parse(qrData);

        // Get user location
        const location = await getUserLocation();

        // Get device fingerprint
        const fingerprint = generateFingerprint();

        // Submit attendance
        scanQR(
          {
            session_id: qrPayload.session_id || sessionId,
            qr_code_value: qrPayload.token || qrPayload.qr_code_value,
            device_fingerprint: fingerprint,
            gps_lat: location.latitude,
            gps_lng: location.longitude,
            ip_address: null, // Will be detected by backend
          },
          {
            onSuccess: () => {
              setSuccess(true);
              setTimeout(() => {
                navigate("/student/dashboard");
              }, 2000);
            },
            onError: (err) => {
              hasScannedRef.current = false;
              setError(err.message || "Failed to record attendance");
            },
          }
        );
      } catch (err) {
        hasScannedRef.current = false;
        setError("Invalid QR code format: " + err.message);
      }
    },
    [scanQR, sessionId, navigate]
  );

  useEffect(() => {
    if (permissionStatus !== "granted" || locationStatus !== "granted") {
      return;
    }

    const initScanner = () => {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          rememberLastUsedCamera: true,
        },
        false
      );

      const onScanSuccess = (decodedText) => {
        if (!hasScannedRef.current) {
          scanner.clear();
          handleAttendance(decodedText);
        }
      };

      const onScanError = () => {
        // Ignore scan errors (happens frequently during scanning)
      };

      scanner.render(onScanSuccess, onScanError);
      scannerRef.current = scanner;
    };

    initScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, [handleAttendance, permissionStatus, locationStatus]);
  const permissionsGranted =
    permissionStatus === "granted" && locationStatus === "granted";

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Scan Kode QR
        </h1>
        <p className="text-gray-600">
          Pindai kode QR kehadiran untuk menandai kehadiran Anda
        </p>
      </div>

      <Card className="shadow-xl border-0">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <QrCode className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-xl text-center">
            Pemindai QR Kehadiran
          </CardTitle>
          <CardDescription className="text-center">
            Posisikan kode QR di dalam bingkai
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Development Note */}
          {(window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1") && (
            <Alert className="border-blue-200 bg-blue-50">
              <AlertDescription className="text-blue-800 text-xs">
                <strong>Mode Pengembangan:</strong> Layanan lokasi mungkin tidak
                berfungsi di localhost. Koordinat default akan digunakan untuk
                pengujian.
              </AlertDescription>
            </Alert>
          )}

          {/* Permission Alerts */}
          {!permissionsGranted && (
            <Alert className="border-orange-200 bg-orange-50">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Izin Diperlukan:</strong>
                <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                  {permissionStatus !== "granted" && (
                    <li>Akses kamera - untuk memindai kode QR</li>
                  )}
                  {locationStatus !== "granted" && (
                    <li>Akses lokasi - untuk memverifikasi lokasi kehadiran</li>
                  )}
                </ul>
                {window.location.hostname === "localhost" && (
                  <p className="mt-2 text-xs italic">
                    💡 Tips: Lokasi mungkin tidak berfungsi di localhost. Kamera
                    diperlukan untuk melanjutkan.
                  </p>
                )}
                <Button
                  onClick={requestPermissions}
                  className="mt-3 w-full bg-orange-600 hover:bg-orange-700"
                  disabled={permissionStatus === "checking"}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  {permissionStatus === "checking"
                    ? "Memeriksa..."
                    : "Berikan Izin"}
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                ✓ Kehadiran berhasil dicatat! Mengalihkan...
              </AlertDescription>
            </Alert>
          )}

          {isPending && (
            <Alert className="border-blue-200 bg-blue-50">
              <AlertDescription className="text-blue-800">
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                  <span>Mencatat kehadiran Anda...</span>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* QR Scanner */}
          {permissionsGranted && !success && !isPending && (
            <>
              <Alert className="border-blue-200 bg-blue-50">
                <MapPin className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Siap memindai!</strong> Lokasi Anda akan diverifikasi
                  secara otomatis.
                </AlertDescription>
              </Alert>

              <div
                id="qr-reader"
                className="w-full rounded-lg overflow-hidden border-2 border-gray-200"
              ></div>

              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  📱 Posisikan kode QR di dalam bingkai
                </p>
                <p className="text-xs text-gray-600">
                  Pemindai akan secara otomatis mendeteksi dan memproses kode
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScanQR;

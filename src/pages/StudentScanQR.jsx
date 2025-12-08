import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentLayout from "@/layouts/StudentLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, QrCode, AlertTriangle } from "lucide-react";

function StudentScanQR() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  const handleBack = () => {
    stopCamera();
    navigate("/student");
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsScanning(false);
  };

  const handleStartScanning = async () => {
    setError(null);
    try {
      console.log("🎥 [DEBUG] Starting camera access...");

      // Set isScanning first so video element gets rendered
      setIsScanning(true);

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 720 },
          height: { ideal: 720 },
        },
      });

      console.log("✅ [DEBUG] Camera stream obtained:", mediaStream);
      console.log("📹 [DEBUG] Video tracks:", mediaStream.getVideoTracks());
      console.log(
        "🎬 [DEBUG] Track settings:",
        mediaStream.getVideoTracks()[0]?.getSettings()
      );

      setStream(mediaStream);

      // Wait for next render cycle to ensure video element exists
      setTimeout(() => {
        if (videoRef.current) {
          console.log("📺 [DEBUG] Video element found:", videoRef.current);
          videoRef.current.srcObject = mediaStream;
          console.log("🔗 [DEBUG] srcObject set to stream");

          videoRef.current.onloadedmetadata = () => {
            console.log("📊 [DEBUG] Video metadata loaded");
            console.log("📐 [DEBUG] Video dimensions:", {
              videoWidth: videoRef.current.videoWidth,
              videoHeight: videoRef.current.videoHeight,
              clientWidth: videoRef.current.clientWidth,
              clientHeight: videoRef.current.clientHeight,
            });

            videoRef.current
              .play()
              .then(() => console.log("▶️  [DEBUG] Video playing successfully"))
              .catch((err) => console.error("❌ [DEBUG] Play failed:", err));
          };
        } else {
          console.error(
            "❌ [DEBUG] videoRef.current is still null after timeout!"
          );
        }
      }, 100);

      console.log(
        "✅ [DEBUG] Stream saved to state, waiting for video element..."
      );
    } catch (err) {
      console.error("❌ [DEBUG] Error accessing camera:", err);
      console.error("❌ [DEBUG] Error name:", err.name);
      console.error("❌ [DEBUG] Error message:", err.message);
      setError(
        "Unable to access camera. Please ensure camera permissions are granted."
      );
      setIsScanning(false);
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <StudentLayout title="Mark Attendance" activeMenu="dashboard">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <Button
          onClick={handleBack}
          variant="outline"
          className="mb-6 rounded-full border-[1.5px] border-[#E5E7EB] bg-white px-6 py-2.5 text-sm font-medium text-[#374151] shadow-sm hover:bg-[#F9FAFB] hover:border-[#D1D5DB]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={2} />
          Back to Dashboard
        </Button>

        {/* Header Info */}
        <div className="mb-6">
          <p className="text-base text-[#6B7280] md:text-lg">
            Scan QR code to mark your attendance
          </p>
        </div>

        {/* Scanner Area */}
        <div className="mb-6 rounded-3xl bg-white p-4 shadow-sm md:p-8">
          <div className="flex flex-col items-center">
            {/* QR Scanner Frame */}
            <div className="relative mb-4 w-full md:mb-6">
              <div
                className="relative w-full overflow-hidden rounded-[32px] bg-[#1E2936] shadow-lg"
                style={{ aspectRatio: "1/1" }}
              >
                {!isScanning ? (
                  // Camera Placeholder
                  <div className="flex h-full w-full flex-col items-center justify-center p-6 md:p-8">
                    <div className="flex flex-col items-center justify-center rounded-3xl border-[3px] border-dashed border-[#4B5563] p-12 md:p-16">
                      <Camera
                        className="h-16 w-16 text-[#6B7280] md:h-24 md:w-24"
                        strokeWidth={1.5}
                      />
                      <p className="mt-3 text-center text-base font-medium text-[#9CA3AF] md:mt-4 md:text-lg">
                        Camera Preview
                      </p>
                    </div>
                    {error && (
                      <p className="mt-4 px-4 text-center text-sm text-red-400">
                        {error}
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Camera Video Feed - Base layer */}
                    <video
                      ref={videoRef}
                      className="h-full w-full object-cover"
                      autoPlay
                      playsInline
                      muted
                    />

                    {/* Scanner Frame Overlay - On top of video */}
                    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-6 md:p-12">
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/30" />

                      {/* Scanner frame */}
                      <div className="relative z-20 h-[65%] w-[65%] rounded-[28px] border-[3px] border-white/90 shadow-lg md:h-[70%] md:w-[70%] md:border-4">
                        {/* Corner indicators */}
                        <div className="absolute -left-1 -top-1 h-14 w-14 rounded-tl-[24px] border-l-[6px] border-t-[6px] border-[#5C7CFF] md:-left-1.5 md:-top-1.5 md:h-20 md:w-20 md:rounded-tl-[32px] md:border-l-8 md:border-t-8" />
                        <div className="absolute -right-1 -top-1 h-14 w-14 rounded-tr-[24px] border-r-[6px] border-t-[6px] border-[#5C7CFF] md:-right-1.5 md:-top-1.5 md:h-20 md:w-20 md:rounded-tr-[32px] md:border-r-8 md:border-t-8" />
                        <div className="absolute -bottom-1 -left-1 h-14 w-14 rounded-bl-[24px] border-b-[6px] border-l-[6px] border-[#5C7CFF] md:-bottom-1.5 md:-left-1.5 md:h-20 md:w-20 md:rounded-bl-[32px] md:border-b-8 md:border-l-8" />
                        <div className="absolute -bottom-1 -right-1 h-14 w-14 rounded-br-[24px] border-b-[6px] border-r-[6px] border-[#5C7CFF] md:-bottom-1.5 md:-right-1.5 md:h-20 md:w-20 md:rounded-br-[32px] md:border-b-8 md:border-r-8" />
                      </div>

                      {/* Instruction */}
                      <div className="absolute inset-x-0 bottom-4 z-30 text-center md:bottom-6">
                        <div className="inline-block rounded-full bg-[#4361EE] px-4 py-2 shadow-lg md:px-6 md:py-3">
                          <p className="text-xs font-semibold text-white md:text-sm">
                            Align QR code within the frame
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex w-full flex-col gap-3">
              {!isScanning ? (
                <Button
                  onClick={handleStartScanning}
                  className="w-full rounded-full bg-linear-to-r from-[#4361EE] to-[#5C7CFF] px-6 py-6 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl md:py-7 md:text-lg"
                >
                  <QrCode
                    className="mr-2.5 h-5 w-5 md:h-6 md:w-6"
                    strokeWidth={2}
                  />
                  Start Scanning
                </Button>
              ) : (
                <Button
                  onClick={stopCamera}
                  variant="outline"
                  className="w-full rounded-full border-2 border-[#EF4444] bg-white px-6 py-6 text-base font-semibold text-[#EF4444] shadow-sm transition-all hover:bg-[#FEF2F2] md:py-7 md:text-lg"
                >
                  <Camera
                    className="mr-2.5 h-5 w-5 md:h-6 md:w-6"
                    strokeWidth={2}
                  />
                  Stop Camera
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="rounded-3xl bg-[#EFF6FF] p-6 shadow-sm md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3B5CFF]/10">
              <AlertTriangle
                className="h-5 w-5 text-[#3B5CFF]"
                strokeWidth={2}
              />
            </div>
            <div className="flex-1">
              <h3 className="mb-3 text-lg font-bold text-[#1F2937] md:text-xl">
                Important Notes
              </h3>
              <ul className="space-y-2.5 text-sm text-[#4B5563] md:text-base">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B5CFF]" />
                  <span>Make sure you are within the class location</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B5CFF]" />
                  <span>Enable GPS/Location services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B5CFF]" />
                  <span>Do not use fake GPS applications</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B5CFF]" />
                  <span>Scan the QR code displayed by your lecturer</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

export default StudentScanQR;

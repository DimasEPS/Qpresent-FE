import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSessionQR } from "@/hooks/useSession";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Users, Clock } from "lucide-react";

const SessionDetail = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { data: qrData, isLoading } = useSessionQR(sessionId);
  const [timeLeft, setTimeLeft] = useState(null);

  const session = qrData?.data?.session;
  const qrCode = qrData?.data?.qr_code;
  const qrImage = qrData?.data?.qr_image;

  useEffect(() => {
    if (!session?.expires_at) return;

    const interval = setInterval(() => {
      const now = new Date();
      const expiresAt = new Date(session.expires_at);
      const diff = expiresAt - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [session?.expires_at]);

  const handleDownloadQR = () => {
    if (!qrImage) return;
    const link = document.createElement("a");
    link.href = qrImage;
    link.download = `qr-${session?.title || "session"}.png`;
    link.click();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <Button variant="ghost" onClick={() => navigate("/lecturer/sessions")}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </Button>

      {/* Session Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">{session?.title}</CardTitle>
              <CardDescription>
                {session?.class?.name} ({session?.class?.code})
              </CardDescription>
            </div>
            <Badge variant={session?.is_active ? "default" : "secondary"}>
              {session?.is_active ? "Aktif" : "Selesai"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Waktu Mulai</p>
              <p className="font-medium">
                {new Date(session?.scheduled_at).toLocaleString("id-ID")}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Durasi</p>
              <p className="font-medium">{session?.duration_minutes} menit</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code */}
      {session?.is_active && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>QR Code Absensi</CardTitle>
                <CardDescription>
                  QR code ini otomatis refresh setiap{" "}
                  {session?.qr_refresh_interval} detik
                </CardDescription>
              </div>
              <Button size="sm" variant="outline" onClick={handleDownloadQR}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {qrImage ? (
              <>
                <img
                  src={qrImage}
                  alt="QR Code"
                  className="w-80 h-80 border-4 border-indigo-200 rounded-lg shadow-lg"
                />
                <div className="mt-4 text-center">
                  <div className="flex items-center gap-2 text-lg font-mono bg-gray-100 px-4 py-2 rounded">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <span className="font-bold text-indigo-600">
                      {timeLeft || "Loading..."}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    QR akan diperbarui secara otomatis
                  </p>
                </div>
              </>
            ) : (
              <p className="text-gray-500 py-8">QR Code tidak tersedia</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              <Users className="w-4 h-4 inline mr-2" />
              Hadir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {session?.attendance_count || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Mahasiswa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {session?.class?.members_count || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Persentase
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-indigo-600">
              {session?.class?.members_count
                ? Math.round(
                    ((session?.attendance_count || 0) /
                      session.class.members_count) *
                      100
                  )
                : 0}
              %
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SessionDetail;

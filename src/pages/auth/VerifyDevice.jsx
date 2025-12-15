import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/auth.service";
import { generateFingerprint } from "@/lib/device";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Smartphone } from "lucide-react";

const VerifyDevice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyDeviceOTP } = useAuth();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const emailFromState = location.state?.email;
    if (!emailFromState) {
      navigate("/login");
      return;
    }
    setEmail(emailFromState);
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await verifyDeviceOTP(email, otp);

      // Redirect based on role (email pattern)
      if (email.startsWith("admin@")) {
        navigate("/admin/dashboard");
      } else if (email.includes(".lecturer@") || email.includes("lecturer.")) {
        navigate("/lecturer/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      setError(err.message || "Verification failed. Please check your OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");
    setResending(true);

    try {
      const fingerprint = generateFingerprint();
      await authService.resendDeviceOtp(email, fingerprint);
      setSuccess("OTP baru telah dikirim ke email Anda!");
    } catch (err) {
      setError(err.message || "Gagal mengirim ulang OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-orange-600 flex items-center justify-center">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            Verifikasi Perangkat Baru
          </CardTitle>
          <CardDescription className="text-center">
            Untuk keamanan, kami telah mengirim kode verifikasi ke{" "}
            <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {success && (
              <Alert variant="success">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Alert variant="warning">
              <AlertDescription>
                Ini adalah perangkat baru. Silakan verifikasi dengan memasukkan
                OTP yang dikirim ke email Anda.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="otp">Kode Verifikasi</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Masukkan kode 6 digit"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="text-center text-2xl tracking-widest"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700"
              disabled={loading || otp.length !== 6}
            >
              {loading ? "Memverifikasi..." : "Verifikasi Perangkat"}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Tidak menerima kode?{" "}
              <button
                type="button"
                className="text-blue-600 hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleResend}
                disabled={resending}
              >
                {resending ? "Mengirim..." : "Kirim Ulang"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyDevice;

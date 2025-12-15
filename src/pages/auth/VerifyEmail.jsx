import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/auth.service";
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
import { Mail, CheckCircle } from "lucide-react";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyEmail } = useAuth();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const emailFromState = location.state?.email;
    if (!emailFromState) {
      navigate("/register");
      return;
    }
    setEmail(emailFromState);
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await verifyEmail(email, otp);
      // After email verification, redirect to login
      navigate("/login", {
        state: {
          message: "Email verified successfully! Please login to continue.",
        },
      });
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
      await authService.resendEmailOtp(email);
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
            <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center">
              <Mail className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            Verifikasi Email Anda
          </CardTitle>
          <CardDescription className="text-center">
            Kami telah mengirim kode verifikasi ke <strong>{email}</strong>
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
              {loading ? "Memverifikasi..." : "Verifikasi Email"}
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

export default VerifyEmail;

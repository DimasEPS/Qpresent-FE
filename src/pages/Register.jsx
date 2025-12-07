import React, { useEffect, useRef, useState } from "react";
import LoginLogo from "@/components/LoginLogo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, LockIcon, User, Phone, IdCard, X } from "lucide-react";
import { Button } from "@/components/ui/button";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nim: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [otpError, setOtpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const otpInputsRef = useRef([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (formData.password !== formData.confirmPassword) {
      setFormError("Password dan konfirmasi tidak sama.");
      return;
    }

    // Simulate submit + send OTP
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowOtpModal(true);
      setOtpValues(Array(6).fill(""));
      setOtpError("");
    }, 500);
  };

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otpValues];
    updatedOtp[index] = value;
    setOtpValues(updatedOtp);
    setOtpError("");

    if (value && index < otpValues.length - 1) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < otpValues.length - 1) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const nextOtp = Array(6)
      .fill("")
      .map((_, idx) => pasted[idx] || "");
    setOtpValues(nextOtp);

    const focusIndex = Math.min(pasted.length, 5);
    otpInputsRef.current[focusIndex]?.focus();
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setOtpError("");

    const code = otpValues.join("");
    if (code.length !== 6) {
      setOtpError("Masukkan 6 digit kode yang dikirim ke email Anda.");
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setShowOtpModal(false);
      setShowSuccessModal(true);
    }, 700);
  };

  useEffect(() => {
    if (showOtpModal) {
      const timer = setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [showOtpModal]);

  return (
    <>
      <LoginLogo className="mt-8" />

      {/* form section */}
      <Card className="w-[340px] rounded-3xl shadow-lg border-none bg-white px-2 mb-8">
        <CardContent className="flex flex-col py-2">
          <CardHeader>
            <CardTitle className="text-center text-[14px] font-medium text-[#1F2937]">
              Daftar Akun Baru
            </CardTitle>
          </CardHeader>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="px-2 flex flex-col gap-4">
              {/* Nama Lengkap */}
              <div className="grid gap-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-normal text-[#364153]"
                >
                  Nama Lengkap
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                  <input
                    className="border border-[#E5E7EB] bg-[#F3F3F5] p-4 pl-12 rounded-[12px] text-sm w-full"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nama Lengkap Anda"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-normal text-[#364153]"
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                  <input
                    className="border border-[#E5E7EB] bg-[#F3F3F5] p-4 pl-12 rounded-[12px] text-sm w-full"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="*@unila.ac.id"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* NIM */}
              <div className="grid gap-2">
                <Label
                  htmlFor="nim"
                  className="text-sm font-normal text-[#364153]"
                >
                  NIM
                </Label>
                <div className="relative">
                  <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                  <input
                    className="border border-[#E5E7EB] bg-[#F3F3F5] p-4 pl-12 rounded-[12px] text-sm w-full"
                    id="nim"
                    name="nim"
                    type="text"
                    placeholder="Nomor Induk Mahasiswa"
                    value={formData.nim}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Nomor Telepon */}
              <div className="grid gap-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-normal text-[#364153]"
                >
                  Nomor Telepon
                </Label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                  <input
                    className="border border-[#E5E7EB] bg-[#F3F3F5] p-4 pl-12 rounded-[12px] text-sm w-full"
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-normal text-[#364153]"
                >
                  Password
                </Label>
                <div className="relative">
                  <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                  <input
                    className="border border-[#E5E7EB] bg-[#F3F3F5] p-4 pl-12 rounded-[12px] text-sm w-full"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Minimal 8 karakter"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Konfirmasi Password */}
              <div className="grid gap-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-normal text-[#364153]"
                >
                  Konfirmasi Password
                </Label>
                <div className="relative">
                  <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                  <input
                    className="border border-[#E5E7EB] bg-[#F3F3F5] p-4 pl-12 rounded-[12px] text-sm w-full"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Ulangi password Anda"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* button */}
            {formError && (
              <p className="mt-3 text-center text-sm text-rose-600">{formError}</p>
            )}
            <div className="mt-6 flex gap-4 justify-center">
              <Button
                type="button"
                onClick={() => (window.location.href = "/login")}
                variant="outline"
                className="border-[#D1D5DC] w-28 h-14 rounded-md text-[14px] hover:bg-gray-400 transition-all duration-300 ease-out"
              >
                Kembali
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="relative overflow-hidden w-28 h-14 rounded-md disabled:opacity-70"
              >
                {/* linear bg transition */}
                <div className="absolute inset-0 bg-linear-to-b from-[#1E40FF] to-[#4A6FFF]"></div>
                <div className="absolute inset-0 bg-linear-to-b from-[#152caf] to-[#273982] opacity-0 hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                <div className="relative z-10 leading-snug text-[14px]">
                  {isSubmitting ? "Memproses..." : "Daftar"}
                </div>
              </Button>
            </div>
          </form>

          <Button
            onClick={() => (window.location.href = "/login")}
            className="mt-2 text-primary-blue"
            variant="link"
          >
            Sudah punya akun? Login
          </Button>
        </CardContent>
      </Card>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6">
          <div
            className="relative mx-auto w-full max-w-[420px] min-w-[280px] flex-shrink-0 rounded-3xl bg-white p-6 shadow-[0_20px_70px_-25px_rgba(0,0,0,0.35)]"
            style={{ width: "min(420px, calc(100vw - 32px))" }}
          >
            <button
              type="button"
              onClick={() => setShowOtpModal(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-[#6B7280] transition hover:bg-gray-100"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[#0F172A]">Masukkan Kode OTP</h3>
              <p className="text-sm text-[#4B5563]">
                Kami telah mengirim 6 digit kode ke{" "}
                <span className="font-semibold text-[#1E3A8A]">
                  {formData.email || "email Anda"}
                </span>
              </p>
            </div>

            <form className="mt-6 space-y-6" onSubmit={handleVerifyOtp}>
              <div
                onPaste={handleOtpPaste}
                className="flex flex-wrap items-center justify-center gap-2.5"
              >
                {otpValues.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputsRef.current[index] = el)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    className="h-12 w-12 rounded-2xl border border-[#E5E7EB] bg-[#F5F6FA] text-center text-lg font-semibold text-[#111827] shadow-inner focus:border-[#1E40FF] focus:outline-none focus:ring-2 focus:ring-[#93C5FD]"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    aria-label={`Digit OTP ${index + 1}`}
                  />
                ))}
              </div>
              {otpError && <p className="text-sm text-rose-600">{otpError}</p>}

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  disabled={isVerifying}
                  className="relative overflow-hidden w-full rounded-xl py-4 text-base font-semibold disabled:opacity-70"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-[#1E40FF] to-[#4A6FFF]" />
                  <div className="absolute inset-0 bg-linear-to-r from-[#1b2876] to-[#2c376b] opacity-0 transition-opacity duration-300 ease-out hover:opacity-100" />
                  <span className="relative z-10">
                    {isVerifying ? "Memverifikasi..." : "Verifikasi"}
                  </span>
                </Button>
                <p className="text-center text-xs text-[#6B7280]">
                  Tidak menerima kode? Periksa folder spam atau coba kirim ulang setelah 60 detik.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6">
          <div
            className="relative mx-auto w-full max-w-[420px] min-w-[280px] flex-shrink-0 rounded-3xl bg-white p-6 shadow-[0_20px_70px_-25px_rgba(0,0,0,0.35)]"
            style={{ width: "min(420px, calc(100vw - 32px))" }}
          >
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-[#6B7280] transition hover:bg-gray-100"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-3 text-center">
              <h3 className="text-xl font-semibold text-[#0F172A]">Registrasi Berhasil</h3>
              <p className="text-sm leading-relaxed text-[#4B5563]">
                Lakukan aktivasi akun melalui email yang anda daftarkan untuk mulai menggunakan
                Qpresent.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button
                onClick={() => {
                  setShowSuccessModal(false);
                  window.location.href = "/login";
                }}
                className="relative overflow-hidden w-full rounded-xl py-3 font-semibold"
              >
                <div className="absolute inset-0 bg-linear-to-r from-[#1E40FF] to-[#4A6FFF]" />
                <div className="absolute inset-0 bg-linear-to-r from-[#1b2876] to-[#2c376b] opacity-0 transition-opacity duration-300 ease-out hover:opacity-100" />
                <span className="relative z-10">Lanjut ke Login</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSuccessModal(false)}
                className="w-full rounded-xl border-[#E5E7EB] py-3 text-[#111827]"
              >
                Tetap di Halaman Ini
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;

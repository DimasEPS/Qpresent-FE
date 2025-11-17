import React, { useState } from "react";
import LoginLogo from "@/components/LoginLogo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, LockIcon, User, Phone, IdCard } from "lucide-react";
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Form submitted:", formData);
  };

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
                className="relative overflow-hidden w-28 h-14 rounded-md"
              >
                {/* linear bg transition */}
                <div className="absolute inset-0 bg-linear-to-b from-[#1E40FF] to-[#4A6FFF]"></div>
                <div className="absolute inset-0 bg-linear-to-b from-[#152caf] to-[#273982] opacity-0 hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                <div className="relative z-10 leading-snug text-[14px]">
                  Daftar
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
    </>
  );
}

export default Register;

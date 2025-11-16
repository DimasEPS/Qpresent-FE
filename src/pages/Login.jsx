import React from "react";
import LoginLogo from "@/components/LoginLogo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function Login() {
  return (
    <>
      <LoginLogo />

      {/* form section */}
      <Card className="w-[340px] rounded-3xl shadow-lg border-none bg-white p-2">
        <CardContent className="flex flex-col">
          {/* Form */}
          <form>
            <div className="px-2 py-6 flex flex-col gap-6">
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
                    type="email"
                    placeholder="*@students.unila.ac.id"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2 ">
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
                    type="password"
                    placeholder="Password Anda"
                    required
                  />
                </div>
              </div>
            </div>
          </form>

          {/* button */}
          <div className=" flex gap-4 justify-center">
            <Button
              onClick={() => (window.location.href = "/role-selection")}
              variant="outline"
              className="border-[#D1D5DC] w-28 h-14 rounded-md text-[14px] hover:bg-gray-400 transition-all duration-300 ease-out"
            >
              Kembali
            </Button>
            <Button className="relative overflow-hidden w-28 h-14 rounded-md">
              {/* linear bg transition */}
              <div className="absolute inset-0 bg-linear-to-b from-[#1E40FF] to-[#4A6FFF]"></div>
              <div className="absolute inset-0 bg-linear-to-b from-[#152caf] to-[#273982] opacity-0 hover:opacity-100 transition-opacity duration-300 ease-out"></div>
              <div className="relative z-10  leading-snug text-[14px]">
                Login
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default Login;

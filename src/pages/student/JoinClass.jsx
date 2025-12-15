import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJoinClass } from "@/hooks/useClass";
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
import { ArrowLeft, Plus } from "lucide-react";

const JoinClass = () => {
  const navigate = useNavigate();
  const { mutate: joinClass, isPending } = useJoinClass();
  const [classCode, setClassCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!classCode.trim()) {
      setError("Silakan masukkan kode kelas");
      return;
    }

    joinClass(classCode, {
      onSuccess: () => {
        setSuccess(true);
        setTimeout(() => {
          navigate("/student/dashboard");
        }, 1500);
      },
      onError: (err) => {
        setError(err.message || "Failed to join class. Please check the code.");
      },
    });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 sm:py-8">
      <Card className="shadow-xl border-0">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <Plus className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl text-center font-bold">
            Gabung Kelas
          </CardTitle>
          <CardDescription className="text-center text-base">
            Masukkan kode kelas yang diberikan oleh dosen Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert variant="success">
                <AlertDescription>
                  Berhasil bergabung dengan kelas! Mengalihkan...
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="classCode" className="text-base font-semibold">
                Kode Kelas
              </Label>
              <Input
                id="classCode"
                type="text"
                placeholder="ABC123"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                className="text-center text-xl sm:text-2xl tracking-wider uppercase font-bold h-14 border-2 focus:border-blue-600"
                maxLength={8}
                required
              />
              <p className="text-sm text-gray-600 text-center">
                Kode kelas biasanya 6-8 karakter
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 sm:h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all text-base sm:text-lg font-semibold"
              disabled={isPending || success}
            >
              {isPending
                ? "Bergabung..."
                : success
                ? "✓ Berhasil!"
                : "Gabung Kelas"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinClass;

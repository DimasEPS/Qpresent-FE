import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCreateSession } from "@/hooks/useSession";
import { useMyClasses } from "@/hooks/useClass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Loader2 } from "lucide-react";

const CreateSession = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedClass = searchParams.get("class");

  const createSession = useCreateSession();
  const { data: classesData } = useMyClasses();
  const classes =
    classesData?.data?.classes?.filter(
      (c) => c.user_role === "admin" || c.is_admin
    ) || [];

  const [formData, setFormData] = useState({
    class_id: preselectedClass || "",
    title: "",
    start_time: "",
    duration: 120, // default 2 jam
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.class_id || !formData.title || !formData.start_time) {
      setError("Semua field harus diisi");
      return;
    }

    try {
      // Calculate end_time from start_time + duration
      const startDate = new Date(formData.start_time);
      const endDate = new Date(startDate.getTime() + formData.duration * 60000);

      const response = await createSession.mutateAsync({
        class_id: formData.class_id,
        title: formData.title,
        start_time: formData.start_time,
        end_time: endDate.toISOString().slice(0, 16),
        radius: 100, // default radius 100m
      });

      const sessionId = response.data?.session?.id_session;
      navigate(`/lecturer/sessions/${sessionId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal membuat sesi");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <Button
        variant="ghost"
        onClick={() => navigate("/lecturer/sessions")}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Buat Sesi Baru</CardTitle>
          <CardDescription>
            Isi informasi sesi pertemuan yang akan dibuat
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="class_id">
                Kelas <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.class_id}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, class_id: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kelas" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id_class} value={cls.id_class}>
                      {cls.name} ({cls.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">
                Judul Sesi <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Contoh: Pertemuan 1 - Pengenalan"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="start_time">
                Waktu Mulai <span className="text-red-500">*</span>
              </Label>
              <Input
                id="start_time"
                name="start_time"
                type="datetime-local"
                value={formData.start_time}
                onChange={handleChange}
                required
              />
              <p className="text-sm text-gray-500">
                Pilih tanggal dan waktu mulai sesi
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">
                Durasi (menit) <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.duration.toString()}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    duration: parseInt(value),
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">60 menit (1 jam)</SelectItem>
                  <SelectItem value="90">90 menit (1.5 jam)</SelectItem>
                  <SelectItem value="120">120 menit (2 jam)</SelectItem>
                  <SelectItem value="150">150 menit (2.5 jam)</SelectItem>
                  <SelectItem value="180">180 menit (3 jam)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">
                Sesi akan berakhir otomatis setelah durasi ini
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/lecturer/sessions")}
                className="flex-1"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={createSession.isPending}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600"
              >
                {createSession.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Membuat...
                  </>
                ) : (
                  "Buat Sesi"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateSession;

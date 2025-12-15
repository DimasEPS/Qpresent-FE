import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateClass } from "@/hooks/useClass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Loader2 } from "lucide-react";

const CreateClass = () => {
  const navigate = useNavigate();
  const createClass = useCreateClass();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Nama kelas harus diisi");
      return;
    }

    try {
      await createClass.mutateAsync(formData);
      navigate("/lecturer/classes");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal membuat kelas");
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
        onClick={() => navigate("/lecturer/classes")}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Buat Kelas Baru</CardTitle>
          <CardDescription>
            Isi informasi kelas yang akan dibuat
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
              <Label htmlFor="name">
                Nama Kelas <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Contoh: Pemrograman Web A"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Deskripsi singkat tentang kelas ini (opsional)"
                rows={4}
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/lecturer/classes")}
                className="flex-1"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={createClass.isPending}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                {createClass.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Membuat...
                  </>
                ) : (
                  "Buat Kelas"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateClass;

import React, { useState } from "react";
import { useProfile, useUpdateProfile } from "@/hooks/useAuth";
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
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
} from "lucide-react";

const Profile = () => {
  const { data: profileData, isLoading } = useProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const user = profileData?.data;
  const profile = user?.profile;

  const [formData, setFormData] = useState({
    full_name: "",
    nik: "",
    jenis_kelamin: "",
    tanggal_lahir: "",
    nomor_hp: "",
    alamat: "",
  });

  React.useEffect(() => {
    if (user) {
      setFormData({
        full_name: user?.user?.full_name || "",
        nik: profile?.nik || "",
        jenis_kelamin: profile?.jenis_kelamin || "",
        tanggal_lahir: profile?.tanggal_lahir || "",
        nomor_hp: profile?.nomor_hp || "",
        alamat: profile?.alamat || "",
      });
    }
  }, [user, profile]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    updateProfile(formData, {
      onSuccess: () => {
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
        setTimeout(() => setSuccess(""), 3000);
      },
      onError: (err) => {
        setError(err.message || "Failed to update profile");
      },
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      full_name: user?.user?.full_name || "",
      nik: profile?.nik || "",
      jenis_kelamin: profile?.jenis_kelamin || "",
      tanggal_lahir: profile?.tanggal_lahir || "",
      nomor_hp: profile?.nomor_hp || "",
      alamat: profile?.alamat || "",
    });
    setError("");
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  const profileComplete = user?.profile_completed || false;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Profil Saya
        </h1>
        <p className="text-gray-600">
          Kelola informasi pribadi dan pengaturan akun Anda
        </p>
      </div>

      {!profileComplete && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertDescription className="text-orange-800">
            <strong>Lengkapi profil Anda!</strong> Silakan isi semua informasi
            yang diperlukan untuk pengalaman terbaik.
          </AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">
            {success}
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Profile Card */}
      <Card className="shadow-xl border-0">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl sm:text-2xl">
                Informasi Pribadi
              </CardTitle>
              <CardDescription>
                Lihat dan ubah detail pribadi Anda
              </CardDescription>
            </div>
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Ubah
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Info - Read Only */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                Informasi Akun
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <p className="mt-1 text-gray-900 font-medium">
                    {user?.user?.email || "-"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Akun Dibuat
                  </Label>
                  <p className="mt-1 text-gray-900">
                    {user?.user?.created_at
                      ? new Date(user.user.created_at).toLocaleDateString(
                          "id-ID"
                        )
                      : "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Detail Pribadi
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="full_name">Nama Lengkap *</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="nik">NIK (Nomor Induk Kependudukan)</Label>
                  <Input
                    id="nik"
                    name="nik"
                    type="text"
                    value={formData.nik}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                    maxLength={16}
                    placeholder="3201234567890001"
                  />
                </div>

                <div>
                  <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                  <select
                    id="jenis_kelamin"
                    name="jenis_kelamin"
                    value={formData.jenis_kelamin}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                      !isEditing ? "bg-gray-50" : ""
                    }`}
                  >
                    <option value="">Pilih jenis kelamin</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="tanggal_lahir">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Tanggal Lahir
                  </Label>
                  <Input
                    id="tanggal_lahir"
                    name="tanggal_lahir"
                    type="date"
                    value={formData.tanggal_lahir}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>

                <div>
                  <Label htmlFor="nomor_hp">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Nomor Telepon
                  </Label>
                  <Input
                    id="nomor_hp"
                    name="nomor_hp"
                    type="tel"
                    value={formData.nomor_hp}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                    placeholder="081234567890"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="alamat">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Alamat
                  </Label>
                  <Input
                    id="alamat"
                    name="alamat"
                    type="text"
                    value={formData.alamat}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isPending ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isPending}
                  className="h-12"
                >
                  <X className="h-4 w-4 mr-2" />
                  Batal
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

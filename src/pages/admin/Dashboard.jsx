import React from "react";
import { useNavigate } from "react-router-dom";
import { useMyClasses } from "@/hooks/useClass";
import { useProfile } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Users,
  BookOpen,
  Shield,
  Activity,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data: profileData, isLoading: profileLoading } = useProfile();
  const { data, isLoading, error } = useMyClasses();

  const user = profileData?.data;
  const classes = data?.data?.classes || [];

  return (
    <div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Welcome Section */}
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Selamat datang, Administrator! 🛡️
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Kelola sistem dan pantau aktivitas platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Pengguna
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <p className="text-3xl font-bold text-gray-900">--</p>
                <Users className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Mahasiswa, Dosen, Admin
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Kelas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <p className="text-3xl font-bold text-gray-900">
                  {classes.length}
                </p>
                <BookOpen className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Kelas aktif di sistem
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Sesi Hari Ini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <p className="text-3xl font-bold text-gray-900">0</p>
                <Activity className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Sesi kehadiran aktif</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tingkat Kehadiran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <p className="text-3xl font-bold text-gray-900">--%</p>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Rata-rata global</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-red-200 bg-red-50/50 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-600 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-lg">Kelola Pengguna</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Tambah, edit, atau hapus pengguna sistem
              </CardDescription>
              <Button
                className="w-full mt-4 bg-red-600 hover:bg-red-700"
                onClick={() => navigate("/admin/users")}
              >
                Kelola Pengguna
              </Button>
            </CardContent>
          </Card>

          <Card className="border-pink-200 bg-pink-50/50 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-pink-600 rounded-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-lg">Kelola Kelas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitor dan kelola semua kelas di sistem
              </CardDescription>
              <Button
                className="w-full mt-4 bg-pink-600 hover:bg-pink-700"
                onClick={() => navigate("/admin/classes")}
              >
                Lihat Kelas
              </Button>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50/50 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-600 rounded-lg">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-lg">Laporan Sistem</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Analisis aktivitas dan performa sistem
              </CardDescription>
              <Button
                className="w-full mt-4 bg-orange-600 hover:bg-orange-700"
                onClick={() => navigate("/admin/reports")}
              >
                Buka Laporan
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* System Alerts */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Notifikasi Sistem
          </h2>
          <div className="space-y-3">
            <Alert className="border-blue-200 bg-blue-50">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-900">
                <strong>Sistem Berjalan Normal:</strong> Semua layanan berfungsi
                dengan baik.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Aktivitas Terbaru
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin/reports")}
            >
              Lihat Semua
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-gray-500">
                <Activity className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>Belum ada aktivitas terbaru</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Classes Overview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Semua Kelas</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin/classes")}
            >
              Lihat Semua
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                Gagal memuat data kelas. Silakan coba lagi.
              </AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : classes.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-500">Belum ada kelas di sistem</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classes.slice(0, 6).map((classItem) => (
                <Card
                  key={classItem.id_class}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() =>
                    navigate(`/admin/classes/${classItem.id_class}`)
                  }
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">
                          {classItem.name}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Kode: {classItem.code}
                        </CardDescription>
                      </div>
                      <div
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          classItem.is_admin
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {classItem.user_role || "member"}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{classItem.members_count || 0} anggota</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

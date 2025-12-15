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
  BookOpen,
  Plus,
  Users,
  Calendar,
  BarChart3,
  TrendingUp,
} from "lucide-react";

const LecturerDashboard = () => {
  const navigate = useNavigate();
  const { data: profileData, isLoading: profileLoading } = useProfile();
  const { data, isLoading, error } = useMyClasses();

  const user = profileData?.data;
  const classes = data?.data?.classes || [];

  // Filter classes where user is admin (dosen/lecturer)
  const myClasses = classes.filter(
    (cls) => cls.user_role === "admin" || cls.is_admin
  );

  return (
    <div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Welcome Section */}
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Selamat datang, Dr.{" "}
            {(user?.user?.full_name || user?.full_name)?.split(" ")[0] ||
              "Dosen"}
            ! 👋
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Kelola kelas dan pantau kehadiran mahasiswa Anda
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Kelas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <p className="text-3xl font-bold text-gray-900">
                  {myClasses.length}
                </p>
                <BookOpen className="w-5 h-5 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Mahasiswa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <p className="text-3xl font-bold text-gray-900">
                  {myClasses.reduce(
                    (sum, cls) => sum + (cls.members_count || 0),
                    0
                  )}
                </p>
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Sesi Aktif
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <p className="text-3xl font-bold text-gray-900">0</p>
                <Calendar className="w-5 h-5 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Rata-rata Kehadiran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <p className="text-3xl font-bold text-gray-900">--%</p>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-indigo-200 bg-indigo-50/50 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-600 rounded-lg">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-lg">Buat Kelas Baru</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Tambahkan kelas baru untuk semester ini
              </CardDescription>
              <Button
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700"
                onClick={() => navigate("/lecturer/classes/create")}
              >
                Buat Kelas
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/50 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-lg">Buat Sesi Absensi</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Mulai sesi kehadiran dengan QR code
              </CardDescription>
              <Button
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
                onClick={() => navigate("/lecturer/sessions/create")}
              >
                Buat Sesi
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/50 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-lg">Lihat Laporan</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Analisis kehadiran dan statistik kelas
              </CardDescription>
              <Button
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate("/lecturer/reports")}
              >
                Buka Laporan
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* My Classes Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Kelas Saya</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/lecturer/classes")}
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
          ) : myClasses.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">Anda belum memiliki kelas</p>
                <Button
                  onClick={() => navigate("/lecturer/classes/create")}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Kelas Pertama
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myClasses.slice(0, 6).map((classItem) => (
                <Card
                  key={classItem.id_class}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() =>
                    navigate(`/lecturer/classes/${classItem.id_class}`)
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
                      <div className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
                        Dosen
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{classItem.members_count || 0} mahasiswa</span>
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

export default LecturerDashboard;

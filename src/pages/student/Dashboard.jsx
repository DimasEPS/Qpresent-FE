import React from "react";
import { useNavigate } from "react-router-dom";
import { useMyClasses } from "@/hooks/useClass";
import { useProfile } from "@/hooks/useAuth";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookOpen, Plus, LogOut, User, Users } from "lucide-react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data: profileData, isLoading: profileLoading } = useProfile();
  const { data, isLoading, error } = useMyClasses();

  const user = profileData?.data;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const classes = data?.data?.classes || [];

  return (
    <div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Welcome Section */}
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Selamat datang kembali,{" "}
            {(user?.user?.full_name || user?.full_name)?.split(" ")[0] ||
              "Mahasiswa"}
            ! 👋
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Kelola kelas dan kehadiran Anda di sini
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Button
            onClick={() => navigate("/student/join-class")}
            className="h-auto py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span className="font-medium">Gabung Kelas</span>
          </Button>
          <Button
            onClick={() => navigate("/student/scan-qr")}
            variant="outline"
            className="h-auto py-4 sm:py-5 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg transition-all"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Scan QR untuk Presensi
          </Button>
        </div>

        {/* Classes Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            Kelas Saya
          </h2>

          {isLoading && (
            <div className="text-center py-12 sm:py-16">
              <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Memuat kelas...</p>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                <strong>Gagal memuat kelas:</strong> {error.message}
              </AlertDescription>
            </Alert>
          )}

          {!isLoading && !error && classes.length === 0 && (
            <Card className="border-2 border-dashed border-gray-300 bg-white shadow-sm">
              <CardContent className="text-center py-12 sm:py-16 px-4">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Belum ada kelas
                </h3>
                <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-md mx-auto">
                  Gabung kelas pertama Anda untuk memulai pencatatan kehadiran
                </p>
                <Button
                  onClick={() => navigate("/student/join-class")}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Gabung Kelas
                </Button>
              </CardContent>
            </Card>
          )}

          {!isLoading && !error && classes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {classes.map((classItem) => (
                <Card
                  key={classItem.id_class}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() =>
                    navigate(`/student/class/${classItem.id_class}`)
                  }
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{classItem.name}</CardTitle>
                    <CardDescription>
                      {classItem.description || "Tidak ada deskripsi"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{classItem.member_count || 0} anggota</span>
                      </div>
                      <div className="text-blue-600 font-medium">
                        Lihat Detail →
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

export default StudentDashboard;

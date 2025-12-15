import React from "react";
import { useMyClasses } from "@/hooks/useClass";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const Reports = () => {
  const { data, isLoading } = useMyClasses();

  const classes =
    data?.data?.classes?.filter((c) => c.user_role === "admin" || c.is_admin) ||
    [];

  // Calculate overall stats
  const totalClasses = classes.length;
  const totalSessions = classes.reduce(
    (sum, cls) => sum + (cls.sessions?.length || 0),
    0
  );
  const activeSessions = classes.reduce(
    (sum, cls) => sum + (cls.sessions?.filter((s) => s.is_active).length || 0),
    0
  );
  const totalMembers = classes.reduce(
    (sum, cls) => sum + (cls.members_count || 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Laporan & Analisis
        </h1>
        <p className="text-gray-600 mt-1">
          Ringkasan statistik kehadiran dan kelas Anda
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Total Kelas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-indigo-600">{totalClasses}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              <Calendar className="w-4 h-4 inline mr-2" />
              Total Sesi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{totalSessions}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              <CheckCircle2 className="w-4 h-4 inline mr-2" />
              Sesi Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {activeSessions}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              <Users className="w-4 h-4 inline mr-2" />
              Total Mahasiswa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">{totalMembers}</p>
          </CardContent>
        </Card>
      </div>

      {/* Per Class Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Laporan Per Kelas</CardTitle>
          <CardDescription>
            Statistik kehadiran untuk setiap kelas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center text-gray-500 py-8">Memuat data...</p>
          ) : classes.length === 0 ? (
            <Alert>
              <AlertDescription>Belum ada kelas tersedia</AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {classes.map((cls) => {
                const sessionsCount = cls.sessions?.length || 0;
                const activeCount =
                  cls.sessions?.filter((s) => s.is_active).length || 0;
                const completedCount = sessionsCount - activeCount;

                return (
                  <Card key={cls.id_class}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{cls.name}</h3>
                          <p className="text-sm text-gray-500">
                            Kode: <span className="font-mono">{cls.code}</span>
                          </p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700">
                          {cls.members_count || 0} mahasiswa
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">
                            {sessionsCount}
                          </p>
                          <p className="text-sm text-gray-600">Total Sesi</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">
                            {activeCount}
                          </p>
                          <p className="text-sm text-gray-600">Aktif</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-600">
                            {completedCount}
                          </p>
                          <p className="text-sm text-gray-600">Selesai</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Coming Soon */}
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Fitur Analisis Lanjutan
            </h3>
            <p className="text-sm text-gray-500">
              Grafik kehadiran, tren, dan insight akan segera tersedia
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;

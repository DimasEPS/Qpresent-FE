import React from "react";
import { useNavigate } from "react-router-dom";
import { useMyClasses } from "@/hooks/useClass";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookOpen, Users, Shield, Settings } from "lucide-react";

const AdminClasses = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useMyClasses();

  const classes = data?.data?.classes || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Kelola Kelas
          </h1>
          <p className="text-gray-600 mt-1">
            Pantau dan kelola semua kelas di sistem
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/admin/settings")}>
          <Settings className="w-4 h-4 mr-2" />
          Pengaturan
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Kelas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{classes.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Anggota
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">
              {classes.reduce((sum, cls) => sum + (cls.members_count || 0), 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Kelas Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{classes.length}</p>
          </CardContent>
        </Card>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            Gagal memuat data kelas. Silakan coba lagi.
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : classes.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <BookOpen className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Belum Ada Kelas
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              Belum ada kelas yang terdaftar di sistem.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((classItem) => (
            <Card
              key={classItem.id_class}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/admin/classes/${classItem.id_class}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">
                      {classItem.name}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Kode: <span className="font-mono">{classItem.code}</span>
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
                {classItem.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {classItem.description}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{classItem.members_count || 0} anggota</span>
                  </div>
                  {classItem.is_admin && (
                    <div className="flex items-center text-red-600">
                      <Shield className="w-4 h-4 mr-1" />
                      <span>Admin</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminClasses;

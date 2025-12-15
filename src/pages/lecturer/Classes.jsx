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
import { BookOpen, Plus, Users, Calendar } from "lucide-react";

const LecturerClasses = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useMyClasses();

  const classes = data?.data?.classes || [];
  const myClasses = classes.filter(
    (cls) => cls.user_role === "admin" || cls.is_admin
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Kelas Saya
          </h1>
          <p className="text-gray-600 mt-1">
            Kelola dan pantau semua kelas yang Anda ajar
          </p>
        </div>
        <Button
          onClick={() => navigate("/lecturer/classes/create")}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Buat Kelas
        </Button>
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
      ) : myClasses.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <BookOpen className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Belum Ada Kelas
            </h3>
            <p className="text-gray-500 mb-6 text-center max-w-md">
              Anda belum membuat kelas. Mulai dengan membuat kelas pertama Anda.
            </p>
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
          {myClasses.map((classItem) => (
            <Card
              key={classItem.id_class}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() =>
                navigate(`/lecturer/classes/${classItem.id_class}`)
              }
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
                  <div className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
                    Dosen
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
                    <span>{classItem.members_count || 0} mahasiswa</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>
                      {new Date(classItem.created_at).toLocaleDateString(
                        "id-ID",
                        { month: "short", year: "numeric" }
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LecturerClasses;

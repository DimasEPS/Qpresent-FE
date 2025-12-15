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
import { Calendar, Plus, Clock } from "lucide-react";

const Sessions = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useMyClasses();

  const classes =
    data?.data?.classes?.filter((c) => c.user_role === "admin" || c.is_admin) ||
    [];

  // Aggregate all sessions from all classes
  const allSessions = classes.flatMap((cls) =>
    (cls.sessions || []).map((session) => ({
      ...session,
      class: cls,
    }))
  );

  // Sort by scheduled_at descending
  const sortedSessions = allSessions.sort(
    (a, b) => new Date(b.scheduled_at) - new Date(a.scheduled_at)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Kelola Sesi
          </h1>
          <p className="text-gray-600 mt-1">
            Buat dan kelola sesi pertemuan kelas Anda
          </p>
        </div>
        <Button
          onClick={() => navigate("/lecturer/sessions/create")}
          className="bg-gradient-to-r from-indigo-600 to-purple-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Buat Sesi
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Sesi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{allSessions.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Sesi Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {allSessions.filter((s) => s.is_active).length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Sesi Selesai
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-600">
              {allSessions.filter((s) => !s.is_active).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : sortedSessions.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Calendar className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Belum Ada Sesi
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              Buat sesi pertemuan pertama Anda untuk memulai absensi
            </p>
            <Button
              onClick={() => navigate("/lecturer/sessions/create")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Buat Sesi Pertama
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedSessions.map((session) => (
            <Card
              key={session.id_session}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() =>
                navigate(`/lecturer/sessions/${session.id_session}`)
              }
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{session.title}</h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          session.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {session.is_active ? "Aktif" : "Selesai"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {session.class?.name} ({session.class?.code})
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(session.scheduled_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {new Date(session.scheduled_at).toLocaleTimeString(
                            "id-ID",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-indigo-600">
                      {session.attendance_count || 0}
                    </p>
                    <p className="text-sm text-gray-500">hadir</p>
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

export default Sessions;

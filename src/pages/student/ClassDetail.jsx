import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useClassDetail, useClassSessions } from "@/hooks/useClass";
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
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Users,
} from "lucide-react";

const ClassDetail = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const {
    data: classData,
    isLoading: loadingClass,
    error: classError,
  } = useClassDetail(classId);
  const {
    data: sessionsData,
    isLoading: loadingSessions,
    error: sessionsError,
  } = useClassSessions(classId);

  const classDetail = classData?.data;
  const sessions = sessionsData?.data?.sessions || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSessionStatus = (session) => {
    const now = new Date();
    const start = new Date(session.scheduled_start_time);
    const end = new Date(session.scheduled_end_time);

    if (now < start)
      return { text: "Upcoming", color: "bg-blue-100 text-blue-700" };
    if (now > end) return { text: "Ended", color: "bg-gray-100 text-gray-700" };
    return { text: "Active", color: "bg-green-100 text-green-700" };
  };

  if (loadingClass) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading class details...</p>
        </div>
      </div>
    );
  }

  if (classError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load class: {classError.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/student/dashboard")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Class Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {classDetail?.class_name}
            </CardTitle>
            <CardDescription>
              {classDetail?.description || "No description available"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="h-4 w-4" />
                <span>{classDetail?.member_count || 0} members</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Code: {classDetail?.class_code}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sessions List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Attendance Sessions
          </h2>

          {loadingSessions && (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading sessions...</p>
            </div>
          )}

          {sessionsError && (
            <Alert variant="destructive">
              <AlertDescription>
                Failed to load sessions: {sessionsError.message}
              </AlertDescription>
            </Alert>
          )}

          {!loadingSessions && !sessionsError && sessions.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No sessions yet
                </h3>
                <p className="text-gray-600">
                  Your instructor hasn't created any attendance sessions
                </p>
              </CardContent>
            </Card>
          )}

          {!loadingSessions && !sessionsError && sessions.length > 0 && (
            <div className="space-y-3">
              {sessions.map((session) => {
                const status = getSessionStatus(session);
                return (
                  <Card
                    key={session.id_session}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">
                              {session.session_name || "Attendance Session"}
                            </h3>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${status.color}`}
                            >
                              {status.text}
                            </span>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {formatDate(session.scheduled_start_time)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>
                                {formatTime(session.scheduled_start_time)} -{" "}
                                {formatTime(session.scheduled_end_time)}
                              </span>
                            </div>
                            {session.location_name && (
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{session.location_name}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {status.text === "Active" && (
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() =>
                              navigate(
                                `/student/scan-qr?session=${session.id_session}`
                              )
                            }
                          >
                            <QrCode className="h-4 w-4 mr-1" />
                            Scan
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassDetail;

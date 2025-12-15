import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useClassDetail,
  useClassMembers,
  useRegenerateCode,
  useDeleteClass,
  useRemoveMember,
} from "@/hooks/useClass";
import { useClassSessions } from "@/hooks/useClass";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Users,
  Calendar,
  Copy,
  RefreshCw,
  Trash2,
  UserX,
  Clock,
  CheckCircle2,
} from "lucide-react";

const ClassDetail = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const { data: classData, isLoading: classLoading } = useClassDetail(classId);
  const { data: membersData, isLoading: membersLoading } =
    useClassMembers(classId);
  const { data: sessionsData, isLoading: sessionsLoading } =
    useClassSessions(classId);
  const regenerateCode = useRegenerateCode();
  const deleteClass = useDeleteClass();
  const removeMember = useRemoveMember();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const classInfo = classData?.data?.class;
  const members = membersData?.data?.members || [];
  const sessions = sessionsData?.data?.sessions || [];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(classInfo?.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRegenerateCode = async () => {
    try {
      await regenerateCode.mutateAsync(classId);
    } catch (err) {
      console.error("Failed to regenerate code:", err);
    }
  };

  const handleDeleteClass = async () => {
    try {
      await deleteClass.mutateAsync(classId);
      navigate("/lecturer/classes");
    } catch (err) {
      console.error("Failed to delete class:", err);
    }
  };

  const handleRemoveMember = async () => {
    if (!memberToRemove) return;
    try {
      await removeMember.mutateAsync({
        classId,
        memberId: memberToRemove.id_class_member,
      });
      setMemberToRemove(null);
    } catch (err) {
      console.error("Failed to remove member:", err);
    }
  };

  if (classLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate("/lecturer/classes")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Hapus Kelas
        </Button>
      </div>

      {/* Class Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">{classInfo?.name}</CardTitle>
              <CardDescription>{classInfo?.description}</CardDescription>
            </div>
            <Badge className="bg-indigo-100 text-indigo-700">Admin</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label className="text-sm text-gray-600">Kode Kelas</Label>
              <div className="flex items-center gap-2 mt-1">
                <code className="text-2xl font-mono font-bold text-indigo-600">
                  {classInfo?.code}
                </code>
                <Button size="sm" variant="ghost" onClick={handleCopyCode}>
                  {copiedCode ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex items-end">
              <Button
                size="sm"
                variant="outline"
                onClick={handleRegenerateCode}
                disabled={regenerateCode.isPending}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate Ulang
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              <Users className="w-4 h-4 inline mr-2" />
              Total Anggota
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{members.length}</p>
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
            <p className="text-3xl font-bold">{sessions.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              <Clock className="w-4 h-4 inline mr-2" />
              Sesi Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {sessions.filter((s) => s.is_active).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Anggota</CardTitle>
          <CardDescription>
            {members.length} anggota terdaftar dalam kelas ini
          </CardDescription>
        </CardHeader>
        <CardContent>
          {membersLoading ? (
            <p className="text-center text-gray-500 py-8">Memuat data...</p>
          ) : members.length === 0 ? (
            <Alert>
              <AlertDescription>
                Belum ada anggota di kelas ini
              </AlertDescription>
            </Alert>
          ) : (
            <div className="divide-y">
              {members.map((member) => (
                <div
                  key={member.id_class_member}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="font-medium">{member.user?.full_name}</p>
                    <p className="text-sm text-gray-500">
                      {member.user?.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        member.role === "admin" ? "default" : "secondary"
                      }
                    >
                      {member.role}
                    </Badge>
                    {member.role !== "admin" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setMemberToRemove(member)}
                      >
                        <UserX className="w-4 h-4 text-red-600" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sessions List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Sesi Pertemuan</CardTitle>
              <CardDescription>
                {sessions.length} sesi telah dibuat
              </CardDescription>
            </div>
            <Button
              onClick={() =>
                navigate(`/lecturer/sessions/create?class=${classId}`)
              }
            >
              <Calendar className="w-4 h-4 mr-2" />
              Buat Sesi
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {sessionsLoading ? (
            <p className="text-center text-gray-500 py-8">Memuat data...</p>
          ) : sessions.length === 0 ? (
            <Alert>
              <AlertDescription>Belum ada sesi di kelas ini</AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <Card
                  key={session.id_session}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() =>
                    navigate(`/lecturer/sessions/${session.id_session}`)
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{session.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(session.scheduled_at).toLocaleString(
                            "id-ID"
                          )}
                        </p>
                      </div>
                      <Badge
                        variant={session.is_active ? "default" : "secondary"}
                      >
                        {session.is_active ? "Aktif" : "Selesai"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Class Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Kelas?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Semua data sesi dan anggota
              akan terhapus.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteClass}>
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove Member Dialog */}
      <AlertDialog
        open={!!memberToRemove}
        onOpenChange={() => setMemberToRemove(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Anggota?</AlertDialogTitle>
            <AlertDialogDescription>
              Yakin ingin menghapus {memberToRemove?.user?.full_name} dari kelas
              ini?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveMember}>
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ClassDetail;

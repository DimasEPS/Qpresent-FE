import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon, Shield, Bell } from "lucide-react";

const Settings = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Pengaturan Sistem
        </h1>
        <p className="text-gray-600 mt-1">
          Kelola konfigurasi sistem (Coming Soon)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              <Shield className="w-5 h-5 inline mr-2" />
              Keamanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Pengaturan keamanan dan privasi
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              <Bell className="w-5 h-5 inline mr-2" />
              Notifikasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Konfigurasi email dan notifikasi
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              <SettingsIcon className="w-5 h-5 inline mr-2" />
              Umum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Pengaturan aplikasi umum</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <SettingsIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Feature Coming Soon
            </h3>
            <p className="text-gray-500">
              Fitur pengaturan sistem akan segera tersedia
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;

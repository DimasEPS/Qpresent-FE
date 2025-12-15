import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, AlertTriangle } from "lucide-react";

const Reports = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Laporan Sistem
        </h1>
        <p className="text-gray-600 mt-1">
          Analisis dan laporan kehadiran (Coming Soon)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Total Laporan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">-</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Rata-rata Kehadiran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">-%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              <AlertTriangle className="w-4 h-4 inline mr-2" />
              Anomali Terdeteksi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">-</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Feature Coming Soon
            </h3>
            <p className="text-gray-500">
              Fitur laporan dan analisis akan segera tersedia
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;

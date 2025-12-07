import React from "react";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#F9FAFB] to-[#F3F4F6] flex flex-col items-center justify-start bg-background px-6 gap-8 py-8">
      <AppRoutes />
    </div>
  );
}

export default App;

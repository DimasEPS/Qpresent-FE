import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Routes akan ditambahkan sesuai UI baru */}
      <Route path="/" element={<div>Welcome to Qpresent</div>} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

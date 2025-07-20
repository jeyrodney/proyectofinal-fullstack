// src/routes/AppRouter.tsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home';
import Login from '../pages/auth/Login';
import NuevoUsuario from '../pages/auth/NuevoUsuario';
import MenuUsuario from '../pages/usuario/MenuUsuario';
import CrearEmpresa from '../pages/usuario/AgregarEmpresa';
import AgregarExportacion from '../pages/usuario/AgregarExportacion';
import ReporteExportaciones from '../pages/reportes/ReporteExportaciones';
import MenuAdmin from '../pages/admin/MenuAdmin';
import NuevoAdmin from '../pages/admin/NuevoAdmin';
import ModificarArancel from '../pages/admin/ModificarArancel';
import ActualizarTasaCambio from '../pages/admin/ActualizarTasaCambio';
// puedes agregar otros como MenuUsuario, MenuAdmin cuando estén listos

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<NuevoUsuario />} />
      <Route path="/menu-usuario" element={<MenuUsuario />} />
      <Route path="/crear-empresa" element={<CrearEmpresa />} />
      <Route path="/agregar-exportacion" element={<AgregarExportacion />} />
      <Route path="/reporte-exportaciones" element={<ReporteExportaciones />} />
      <Route path='/menu-admin' element={<MenuAdmin />} />
      <Route path='/nuevo-admin' element={<NuevoAdmin />} />
      <Route path="/modificar-arancel" element={<ModificarArancel />} />
      <Route path="/actualizar-tasa-cambio" element={<ActualizarTasaCambio />} />
      {/* <Route path="/dashboard/user" element={<MenuUsuario />} />
      <Route path="/dashboard/admin" element={<MenuAdmin />} /> */}
    </Routes>
  );
}

export default AppRouter;

import { Routes, Route } from 'react-router-dom';
//import Home from '../pages/Home';
import NuevoUsuario from '../pages/RegistroUsuario';
//import DetalleCampista from '../pages/DetalleCampista';
export default function AppRouter() {
    return (
        <Routes>
            <Route path="/registro" element={<NuevoUsuario />} />
        </Routes>
    );
}
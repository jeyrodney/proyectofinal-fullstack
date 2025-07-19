import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Usuario } from '../interfaces/Usuario';
import { registrarUsuario } from '../api/usuarioApi';

export default function NuevoUsuario() {
    const [formData, setFormData] = useState<Usuario>({
        tipo_documento: '',
        num_documento:'',
        nombre: '',
        correo: '',
        celular: '',
        password: ''
    });
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registrarUsuario(formData);
            navigate('/');
        } catch (err) {
            alert(' Error al guardar el campista');
            console.error(err);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2> Nuevo Usuario</h2>
            <input
                name="tipo_documento"
                placeholder="Tipo Documento"
                value={formData.tipo_documento}
                onChange={handleChange}
                required
            />
            <input
                name="num_documento"
                placeholder="Documento"
                value={formData.num_documento}
                onChange={handleChange}
                required
            />
            <input
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
            />
            <input
                name="correo"
                placeholder="Correo"
                value={formData.correo}
                onChange={handleChange}
                required
            />
            <input
                name="celular"
                placeholder="Celular"
                value={formData.celular}
                onChange={handleChange}
                required
            />       
            <input
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />     
            
            <button type="submit">Guardar</button>
        </form>
    );
}

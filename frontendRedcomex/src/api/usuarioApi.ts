import type { Usuario } from '../interfaces/Usuario';
const API_URL = `${import.meta.env.VITE_API_BASE_URL}`;
/*export async function obtenerCampistas(): Promise<Usuario[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener los campistas');
    return await res.json();
}*/
/*export async function obtenerCampistaPorId(id: number): Promise<Campista> {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error('Campista no encontrado');
    return await res.json();
}*/
export async function registrarUsuario(usuario: Usuario): Promise<Usuario> {
    const nuevoUsuario = {
        tipo_documento: usuario.tipo_documento.trim(),
        num_documento: usuario.num_documento.trim(),
        nombre: usuario.nombre.trim(),
        correo: usuario.correo.trim(),
        celular: usuario.celular.trim(),
        password: usuario.password.trim()

    };
    const res = await fetch(`${API_URL}/login`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario)
});
if (!res.ok) throw new Error('Error al crear Usuario ');
return await res.json();
}

/*export async function eliminarCampista(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!res.ok) throw new Error('Error al eliminar campista');
}*/
package seguridad;

import dao.UsuarioDAO;
import modelo.Usuario;

public class RegistroUsuario {
    public int registro(Usuario usuario){
        UsuarioDAO registrarUsuario = new UsuarioDAO();
        int resultado = registrarUsuario.registroUsuario(usuario);

        if (resultado > 0){
            System.out.println("Registro exitoso: " + usuario.getNombre());
        } else if (resultado == -1) {
            System.out.println("Correo duplicado: " + usuario.getCorreo());
        } else {
            System.out.println("Error al registrar: " + usuario.getNombre());
        }
        return resultado;
    }
}
package app;

import dao.UsuarioDAO;
import modelo.Usuario;

public class RegistroUsuario {
    public boolean registro(Usuario usuario){
        UsuarioDAO registrarUsuario = new UsuarioDAO();
        boolean regExitoso = false;
        int filasAfectadas = registrarUsuario.registroUsuario(usuario);

        if (filasAfectadas > 0){
            System.out.println("Su registro ha sido exitoso de " + usuario.getNombre());
            regExitoso = true;
        }else{
            System.out.println("No se pudo registrar a " + usuario.getNombre());
            regExitoso = false;
        }
        return regExitoso;
    }
}

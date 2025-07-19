package app;

import dao.UsuarioDAO;
import modelo.Usuario;


public class Login {
    public Usuario login(String correo, String password){

        UsuarioDAO buscarLogin = new UsuarioDAO();
        Usuario usuario = buscarLogin.buscarLogin(correo, password);

        if(usuario != null){ //si encontró el usuario (no es null el objeto usuario)
            System.out.println("\n***** Bienvenido " + usuario.getNombre() + " *****");
            System.out.println("Rol: " + usuario.getRol() +
                    "\nCorreo: " + usuario.getCorreo() +
                    "\nCédula: " + usuario.getNumDocumento() +
                    "\nCelular: " + usuario.getCelular());

        } else { //si no encontró el usuario, que vuelva a reiniciar el metodo main
            return null;
        }


        return usuario;
    }
}

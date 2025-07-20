package dao;
import modelo.Usuario;
import util.ConectorBaseDatos;
import java.sql.Connection;
import java.sql.PreparedStatement; // Usa PreparedStatement para mayor seguridad y rendimiento
import java.sql.ResultSet;
import java.sql.SQLException;
import org.mindrot.jbcrypt.BCrypt; //para encriptar passwords y también para validarlos durante el login
public class UsuarioDAO {

    // Metodo para insertar un nuevo campista.
    public int registroUsuario(Usuario u) {
        String sql = "INSERT INTO usuario (tipo_documento, documento, nombre, correo, celular, password_user, fk_rol) VALUES (?, ?, ?, ?, ?, ?, ?)";
        String hashedPass = BCrypt.hashpw(u.getPasswordUser(), BCrypt.gensalt(12));
        int filasAfectadas = 0;
        try (Connection conn = ConectorBaseDatos.getConnection();

             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, u.getTipoDocumento());
            stmt.setString(2, u.getNumDocumento());
            stmt.setString(3, u.getNombre());
            stmt.setString(4, u.getCorreo());
            stmt.setString(5, u.getCelular());
            stmt.setString(6, hashedPass);
            stmt.setInt(7, u.getRol());

            filasAfectadas = stmt.executeUpdate();
        } catch (SQLException e) {
            if (e.getMessage().contains("Duplicate entry")) {
                return -1; // Código especial para indicar que ya existe el correo
            } else {
                e.printStackTrace();
                return 0; // Otro error de SQL
            }
        }
        return filasAfectadas;

    }

    public Usuario buscarLogin(String correo, String clave) {
        PreparedStatement pstmt = null; // PreparedStatement para preparar el query
        ResultSet rs = null; // ResultSet para almacenar la respuesta del query
        Usuario usuario = null; //inicializo usuario en null por si el query no devuelve nada, en casod e que si, se inicializa con el resultado del query
        String sql = "SELECT usuario_id, tipo_documento, documento, nombre, correo, celular, password_user, fk_rol FROM usuario WHERE correo = ?";
        try (Connection conn = ConectorBaseDatos.getConnection();

             PreparedStatement stmt = conn.prepareStatement(sql)) {
            if (conn == null) {
                System.out.println("No se pudo establecer la conexión a la base de datos. Saliendo...");
                System.exit(0);
            } else {
                //System.out.println("Se logra conexión con la base de datos desde dao.UsuarioDAO."); //esta linea debe ir a los logs

                pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, correo);
                rs = pstmt.executeQuery();
                if (rs.next()) { // valida si el query encontró algún usuario con ese correo
                    String passAlmacenado = rs.getString("password_user");
                    boolean resultadoPass = BCrypt.checkpw(clave, passAlmacenado); //se realiza comparación del hash almacenado como password contra el password ingresado en el login

                    if (resultadoPass) { //si el password es correcto
                        //se inicializa usuario con el resultado ok del query
                        usuario = new Usuario(rs.getInt("usuario_id"), rs.getString("tipo_documento"), rs.getString("documento"),
                                rs.getString("nombre"), rs.getString("correo"), rs.getString("celular"), rs.getString("password_user"), rs.getInt("fk_rol"));

                    } else {
                        System.err.println("Password erroneo");
                    }
                } else {
                    System.err.println("Correo erroneo: " + correo);
                }
            }
            ConectorBaseDatos.closeResources(conn, pstmt, rs);
        } catch (SQLException e) {
            System.err.println("Error en la operación de base de datos en metodo buscarLogin:");
            e.printStackTrace();
            System.exit(0); //en caso de que haya un error en el query, salirse del programa, esto sería un error fatal.

        }
        return usuario;
    }

/***
    public int registroUsuario(Usuario usuario){
        PreparedStatement pstmt = null; // PreparedStatement para preparar el query
        String hashedPass = BCrypt.hashpw(usuario.getPasswordUser(), BCrypt.gensalt(12));
        String sql = "INSERT INTO usuario (tipo_documento, documento, nombre, correo, celular, password_user, fk_rol) VALUES (?, ?, ?, ?, ?, ?, ?)";
        int filasAfectadas = 0;
        try(Connection conn = ConectorBaseDatos.getConnection();

            PreparedStatement stmt = conn.prepareStatement(sql)) {
            if(conn == null){
                System.out.println("No se pudo establecer la conexión a la base de datos. Saliendo...");
                System.exit(0);
            } else {
                //System.out.println("Se logra conexión con la base de datos desde dao.UsuarioDAO."); //esta linea debe ir a los logs
                pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, usuario.getTipoDocumento());
                pstmt.setString(2, usuario.getNumDocumento());
                pstmt.setString(3, usuario.getNombre());
                pstmt.setString(4, usuario.getCorreo());
                pstmt.setString(5, usuario.getCelular());
                pstmt.setString(6, hashedPass);
                pstmt.setInt(7, usuario.getRol());


                filasAfectadas = pstmt.executeUpdate();

            }
            ConectorBaseDatos.closeResources(conn, pstmt, null);
        } catch (SQLException e) {
            System.err.println("Error al registrar el usuario " + e.getMessage());
            e.printStackTrace();
            System.out.println("Saliendo del programa desde dao.UsuarioDAO.registroUsuario");
            System.exit(0); //en caso de que haya un error en el query, salirse del programa, esto sería un error fatal.
        }
        return filasAfectadas;
    }
 ***/
}

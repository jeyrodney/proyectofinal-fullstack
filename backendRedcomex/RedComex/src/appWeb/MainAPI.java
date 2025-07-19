package appWeb;

import static spark.Spark.*;

import com.google.gson.Gson;
import dao.UsuarioDAO;
import modelo.Usuario;

import java.util.HashMap;
import java.util.Map;

public class MainAPI {
    public static void main(String[] args) {
        port(4567); // Levanta el servidor en http://localhost:4567

        // Configurar CORS para permitir llamadas desde React (localhost:3000)
        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }
            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }
            return "OK";
        });

        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.type("application/json");
        });

        Gson gson = new Gson();

        // Endpoint: POST /login
        post("/login", (request, response) -> {
            Map<String, String> body = gson.fromJson(request.body(), Map.class);
            String correo = body.get("usuario");
            String clave = body.get("contrasena");

            UsuarioDAO buscarLogin = new UsuarioDAO();
            Usuario usuario = buscarLogin.buscarLogin(correo, clave);

            if (usuario != null) {
                Map<String, Object> res = new HashMap<>();
                res.put("mensaje", "Login exitoso");
                res.put("usuario", usuario.getNombre());
                res.put("tipoUsuario", usuario.getRol());
                return gson.toJson(res);
            } else {
                response.status(401);
                return gson.toJson(Map.of("error", "Credenciales inválidas"));
            }
        });

        // Endpoint adicional opcional
        get("/", (req, res) -> gson.toJson(Map.of("status", "API corriendo")));
    }
}

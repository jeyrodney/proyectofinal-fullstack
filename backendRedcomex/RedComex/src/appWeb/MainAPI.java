package appWeb;

import static spark.Spark.*;

import com.google.gson.Gson;
import dao.*;
import modelo.*;
import seguridad.RegistroUsuario;
import util.ConectorBaseDatos;
import reportes.ProductoPorPaisDTO;
import reportes.VolumenPorMesDTO;

import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

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

        // Endpoint: POST /login-----------------------------------------------------
        post("/login", (request, response) -> {
            Map<String, String> body = gson.fromJson(request.body(), Map.class);
            String correo = body.get("correo");
            String clave = body.get("clave");

            UsuarioDAO buscarLogin = new UsuarioDAO();
            Usuario usuario = buscarLogin.buscarLogin(correo, clave);

            if (usuario != null) {
                Map<String, Object> res = new HashMap<>();
                res.put("mensaje", "Login exitoso");
                res.put("usuario", usuario.getNombre());
                res.put("correo", usuario.getCorreo());
                res.put("rol", usuario.getRol());
                res.put("usuario_id", usuario.getUsuarioId()); // <-- Aquí se agrega
                return gson.toJson(res);
            } else {
                response.status(401);
                return gson.toJson(Map.of("error", "Credenciales inválidas"));
            }
        });

        // Ruta para registro de nuevo usuario convencional-------------------------
        post("/registro", (request, response) -> {
            Usuario usuario = gson.fromJson(request.body(), Usuario.class);

            // Fuerza que el rol siempre sea "Usuario" (ID = 2)
            usuario.setRol(2);

            System.out.println("El contenido de usuario es: \n" + usuario.getTipoDocumento() + "\n" + usuario.getNumDocumento() + "\n" + usuario.getCorreo() + "\n" + usuario.getNombre() + "\n" + usuario.getPasswordUser());
            RegistroUsuario registroUsuario = new RegistroUsuario();
            int resultado = registroUsuario.registro(usuario);

            if (resultado > 0) {
                response.status(201);
                return gson.toJson(Map.of("mensaje", "Usuario registrado exitosamente"));
            } else if (resultado == -1) {
                response.status(409);
                return gson.toJson(Map.of("error", "El correo ya está registrado"));
            } else {
                response.status(500);
                return gson.toJson(Map.of("error", "Error al registrar el usuario"));
            }
        });

        // Ruta para registro de nuevo admin----------------------------------------
        post("/nuevo-admin", (request, response) -> {
            Usuario usuario = gson.fromJson(request.body(), Usuario.class);

            // Fuerza que el rol siempre sea "Administrador" (ID = 1)
            usuario.setRol(1);

            System.out.println("El contenido de Administrador es: \n" + usuario.getTipoDocumento() + "\n" + usuario.getNumDocumento() + "\n" + usuario.getCorreo() + "\n" + usuario.getNombre());
            RegistroUsuario registroUsuario = new RegistroUsuario();
            int resultado = registroUsuario.registro(usuario);

            if (resultado > 0) {
                response.status(201);
                return gson.toJson(Map.of("mensaje", "Usuario registrado exitosamente"));
            } else if (resultado == -1) {
                response.status(409);
                return gson.toJson(Map.of("error", "El correo ya está registrado"));
            } else {
                response.status(500);
                return gson.toJson(Map.of("error", "Error al registrar el usuario"));
            }
        });

        // Endpoint para obtener países--------------------------------------
        get("/paises", (req, res) -> {
            List<Pais> paises = new PaisDAO().obtenerPaises();
            return gson.toJson(paises);
        });

        // Endpoint para obtener productos-----------------------------------
        get("/productos", (req, res) -> {
            List<Producto> productos = new ProductoDAO().obtenerProductos();
            return gson.toJson(productos);
        });

        // Endpoint para modificar o crear arancel---------------------------
        put("/modificar-arancel", (req, res) -> {
            Arancel arancel = gson.fromJson(req.body(), Arancel.class);
            ArancelDAO dao = new ArancelDAO();

            System.out.println("En el endpoint estos son los datos: \n" + arancel.getIdPais() + "\n" + arancel.getTasaArancel() + "\n" + arancel.getIdPais() + "\n" + arancel.getIdProducto());

            boolean actualizado = dao.modificarOInsertarArancel(arancel);

            Map<String, Object> respuesta = new HashMap<>();
            if (actualizado) {
                respuesta.put("mensaje", "Arancel actualizado correctamente");
                res.status(200);
            } else {
                respuesta.put("error", "No se pudo modificar el arancel");
                res.status(500);
            }
            return gson.toJson(respuesta);
        });

        post("/empresa", (req, res) -> {
            Empresa empresa = gson.fromJson(req.body(), Empresa.class);
            EmpresaDAO dao = new EmpresaDAO();

            boolean creada = dao.registrarEmpresa(empresa);

            Map<String, Object> respuesta = new HashMap<>();
            if (creada) {
                respuesta.put("mensaje", "Empresa registrada correctamente");
                res.status(201);
            } else {
                respuesta.put("error", "No se pudo registrar la empresa");
                res.status(500);
            }
            return gson.toJson(respuesta);
        });

        post("/exportacion", (req, res) -> {
            Exportacion exportacion = gson.fromJson(req.body(), Exportacion.class);
            ExportacionDAO dao = new ExportacionDAO();

            boolean registrado = dao.registrarExportacion(exportacion);
            System.out.println("Id pais en endpoint exportacion: " + exportacion.getFkPais());
            Map<String, Object> respuesta = new HashMap<>();
            if (registrado) {
                respuesta.put("mensaje", "Exportación registrada exitosamente");
                res.status(200);
            } else {
                respuesta.put("error", "No se pudo registrar la exportación");
                res.status(500);
            }
            return gson.toJson(respuesta);
        });

        // Endpoint para obtener empresas de un usuario según su correo
        get("/empresas-usuario/:correo", (req, res) -> {
            String correo = req.params(":correo");
            EmpresaDAO empresaDAO = new EmpresaDAO();
            List<Empresa> empresas = empresaDAO.obtenerEmpresasPorCorreo(correo);
            return gson.toJson(empresas);
        });

        // Endpoint actualizar-tasa-cambio
        put("/actualizar-tasa-cambio", (req, res) -> {
            System.out.println("Entró al endpoint actualizar-tasa.cambio");
            Pais pais = gson.fromJson(req.body(), Pais.class);
            PaisDAO dao = new PaisDAO();
            boolean actualizado = dao.actualizarTasaCambio(pais.getIdPais(), pais.getTasaCambio());

            Map<String, Object> respuesta = new HashMap<>();
            if (actualizado) {
                respuesta.put("mensaje", "Tasa de cambio actualizada correctamente");
                res.status(200);
            } else {
                respuesta.put("error", "No se pudo actualizar la tasa de cambio");
                res.status(500);
            }
            return gson.toJson(respuesta);
        });

        get("/pais/:id", (req, res) -> {
            int id = Integer.parseInt(req.params(":id"));
            PaisDAO dao = new PaisDAO();
            Pais pais = dao.obtenerPaisPorId(id);

            if (pais != null) {
                res.type("application/json");
                return gson.toJson(pais);
            } else {
                res.status(404);
                return gson.toJson(Map.of("error", "País no encontrado"));
            }
        });

        // Endpoint para traer el volumen de exportaciones por pais para el mapa:
        get("/volumen-exportaciones", (req, res) -> {
            res.type("application/json");
            try (Connection conn = ConectorBaseDatos.getConnection()) {
                List<VolumenExportacionPorPais> datos = ExportacionDAO.obtenerVolumenPorPais(conn);
                return new Gson().toJson(datos);
            }
        });

        // Endpoint para traer la grafica de reporte top productos por pais
        get("/top-productos-por-pais", (req, res) -> {
            res.type("application/json");
            List<ProductoPorPaisDTO> topProductos = ReporteHomeDAO.obtenerTopProductosPorPais();
            return new Gson().toJson(topProductos);
        });

        get("/volumen-por-mes", (req, res) -> {
            res.type("application/json");
            List<VolumenPorMesDTO> datosMensuales = ReporteHomeDAO.obtenerVolumenPorMes();
            return new Gson().toJson(datosMensuales);
        });

        // Endpoint adicional opcional
        get("/", (req, res) -> gson.toJson(Map.of("status", "API corriendo")));
    }
}

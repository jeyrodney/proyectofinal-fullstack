package dao;

import modelo.Empresa;
import modelo.TopEmpresa;
import util.ConectorBaseDatos;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class EmpresaDAO {

    public boolean registrarEmpresa(Empresa empresa) {
        String sql = "INSERT INTO empresa (nit, nombre, descripcion, fk_usuario) VALUES (?, ?, ?, ?)";

        try (Connection conn = ConectorBaseDatos.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, empresa.getNit());
            stmt.setString(2, empresa.getNombre());
            stmt.setString(3, empresa.getDescripcion());
            stmt.setInt(4, empresa.getFk_usuario());

            int filas = stmt.executeUpdate();
            return filas > 0;

        } catch (SQLException e) {
            System.err.println("Error al registrar empresa: " + e.getMessage());
            return false;
        }
    }

    public List<Empresa> obtenerEmpresasPorCorreo(String correo) {
        List<Empresa> lista = new ArrayList<>();
        String sql = "SELECT e.id_empresa, e.nombre " +
                "FROM empresa e " +
                "JOIN usuario u ON e.fk_usuario = u.usuario_id " +
                "WHERE u.correo = ?";

        try (Connection conn = ConectorBaseDatos.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, correo);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Empresa emp = new Empresa(rs.getInt("id_empresa"), rs.getString("nombre"));
                lista.add(emp);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return lista;
    }

    public List<TopEmpresa> obtenerTopEmpresasUltimoMes(Connection connection) throws SQLException {
        String query = "SELECT e.nombre AS empresa_nombre, SUM(exp.cantidad) AS total_exportaciones " +
                "FROM exportacion exp " +
                "JOIN empresa e ON exp.fk_empresa = e.id_empresa " +
                "WHERE MONTH(exp.fecha_exp) = MONTH(CURRENT_DATE()) " +
                "AND YEAR(exp.fecha_exp) = YEAR(CURRENT_DATE()) " +
                "GROUP BY e.id_empresa " +
                "ORDER BY total_exportaciones DESC " +
                "LIMIT 5;";

        try (Statement stmt = connection.createStatement(); ResultSet rs = stmt.executeQuery(query)) {
            List<TopEmpresa> topEmpresas = new ArrayList<>();
            while (rs.next()) {
                TopEmpresa topEmpresa = new TopEmpresa(rs.getString("empresa_nombre"), rs.getDouble("total_exportaciones"));
                topEmpresas.add(topEmpresa);
            }
            return topEmpresas;
        }
    }


    // Metodo para obtener todas las empresas
    public List<Empresa> obtenerTodasLasEmpresas() throws SQLException {
        List<Empresa> empresas = new ArrayList<>();
        String query = "SELECT e.id_empresa, e.nombre, e.nit, u.nombre AS usuario_nombre, e.fk_usuario FROM empresa e " +
                "JOIN usuario u ON e.fk_usuario = u.usuario_id";

        try (Connection conn = ConectorBaseDatos.getConnection();
             PreparedStatement stmt = conn.prepareStatement(query);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Empresa empresa = new Empresa();
                empresa.setIdEmpresa(rs.getInt("id_empresa"));
                empresa.setNombre(rs.getString("nombre"));
                empresa.setNit(rs.getString("nit"));
                empresa.setFkUsuario(rs.getInt("fk_usuario"));
                empresa.setUsuarioNombre(rs.getString("usuario_nombre"));
                empresas.add(empresa);
            }
        }
        return empresas;
    }

    // Metodo para obtener la cantidad de empresas registradas
    public int obtenerCantidadEmpresas() throws SQLException {
        String query = "SELECT COUNT(*) FROM empresa";
        try (Connection conn = ConectorBaseDatos.getConnection();
             PreparedStatement stmt = conn.prepareStatement(query);
             ResultSet rs = stmt.executeQuery()) {
            if (rs.next()) {
                return rs.getInt(1);
            }
            return 0;
        }
    }

}
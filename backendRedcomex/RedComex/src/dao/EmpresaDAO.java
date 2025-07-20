package dao;

import modelo.Empresa;
import util.ConectorBaseDatos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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

}
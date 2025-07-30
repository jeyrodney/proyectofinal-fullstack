package dao;

import modelo.Pais;
import modelo.TopPais;
import util.ConectorBaseDatos;

import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PaisDAO {

    public List<Pais> obtenerPaises() {
        List<Pais> paises = new ArrayList<>();
        String sql = "SELECT id_pais, nombre FROM pais";

        try (Connection conn = ConectorBaseDatos.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Pais pais = new Pais(rs.getInt("id_pais"), rs.getString("nombre"));
                paises.add(pais);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return paises;
    }

    public Pais obtenerPaisPorId(int id) {
        String sql = "SELECT * FROM pais WHERE id_pais = ?";
        try (Connection conn = ConectorBaseDatos.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return new Pais(
                        rs.getInt("id_pais"),
                        rs.getString("nombre"),
                        rs.getBigDecimal("tasa_cambio")
                );
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


    public boolean actualizarTasaCambio(int idPais, BigDecimal nuevaTasa) {
        String sql = "UPDATE pais SET tasa_cambio = ? WHERE id_pais = ?";
        System.out.println("ingresó a dao pais actualizarTasaCambio: " + idPais + " y " + nuevaTasa);
        try (Connection conn = ConectorBaseDatos.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setBigDecimal(1, nuevaTasa);
            stmt.setInt(2, idPais);
            int filas = stmt.executeUpdate();
            return filas > 0;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<TopPais> obtenerTopPaisesUltimoMes(Connection connection) throws SQLException {
        String query = "SELECT p.nombre AS pais_nombre, SUM(exp.cantidad) AS total_exportaciones " +
                "FROM exportacion exp " +
                "JOIN pais p ON exp.fk_pais = p.id_pais " +
                "WHERE MONTH(exp.fecha_exp) = MONTH(CURRENT_DATE()) " +
                "AND YEAR(exp.fecha_exp) = YEAR(CURRENT_DATE()) " +
                "GROUP BY p.id_pais " +
                "ORDER BY total_exportaciones DESC " +
                "LIMIT 5;";

        try (Statement stmt = connection.createStatement(); ResultSet rs = stmt.executeQuery(query)) {
            List<TopPais> topPaises = new ArrayList<>();
            while (rs.next()) {
                TopPais topPais = new TopPais(rs.getString("pais_nombre"), rs.getDouble("total_exportaciones"));
                topPaises.add(topPais);
            }
            return topPaises;
        }
    }


}

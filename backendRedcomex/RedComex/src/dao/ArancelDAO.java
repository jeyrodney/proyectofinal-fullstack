package dao;

import modelo.Arancel;
import modelo.TopArancel;
import util.ConectorBaseDatos;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;


public class ArancelDAO {

    public boolean modificarOInsertarArancel(Arancel arancel) {
        String sqlSelect = "SELECT id_arancel FROM arancel WHERE fk_pais = ? AND fk_producto = ?";
        String sqlUpdate = "UPDATE arancel SET tasa_arancel = ? WHERE id_arancel = ?";
        String sqlInsert = "INSERT INTO arancel (fk_pais, fk_producto, tasa_arancel) VALUES (?, ?, ?)";

        try (Connection conn = ConectorBaseDatos.getConnection();
             PreparedStatement stmtSelect = conn.prepareStatement(sqlSelect)) {

            stmtSelect.setInt(1, arancel.getIdPais());
            stmtSelect.setInt(2, arancel.getIdProducto());
            ResultSet rs = stmtSelect.executeQuery();

            if (rs.next()) {
                int idArancel = rs.getInt("id_arancel");
                try (PreparedStatement stmtUpdate = conn.prepareStatement(sqlUpdate)) {
                    stmtUpdate.setBigDecimal(1, arancel.getTasaArancel());
                    stmtUpdate.setInt(2, idArancel);
                    stmtUpdate.executeUpdate();
                }
            } else {
                try (PreparedStatement stmtInsert = conn.prepareStatement(sqlInsert)) {
                    stmtInsert.setInt(1, arancel.getIdPais());
                    stmtInsert.setInt(2, arancel.getIdProducto());
                    stmtInsert.setBigDecimal(3, arancel.getTasaArancel());
                    stmtInsert.executeUpdate();
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }



    public List<TopArancel> obtenerTopAranceles(Connection connection) throws SQLException {
        String query = "SELECT pr.nombre AS producto_nombre, pa.nombre AS pais_nombre, a.tasa_arancel " +
                "FROM arancel a " +
                "JOIN producto pr ON a.fk_producto = pr.id_producto " +
                "JOIN pais pa ON a.fk_pais = pa.id_pais " +
                "ORDER BY a.tasa_arancel DESC " +
                "LIMIT 5;";

        try (Statement stmt = connection.createStatement(); ResultSet rs = stmt.executeQuery(query)) {
            List<TopArancel> topAranceles = new ArrayList<>();
            while (rs.next()) {
                TopArancel topArancel = new TopArancel(rs.getString("producto_nombre"), rs.getString("pais_nombre"), rs.getDouble("tasa_arancel"));
                topAranceles.add(topArancel);
            }
            return topAranceles;
        }
    }


}

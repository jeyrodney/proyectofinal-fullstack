package dao;

import modelo.Arancel;
import util.ConectorBaseDatos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;


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
}

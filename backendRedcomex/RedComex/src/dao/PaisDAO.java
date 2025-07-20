package dao;

import modelo.Pais;
import util.ConectorBaseDatos;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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


}

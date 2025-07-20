package dao;

import modelo.Pais;
import util.ConectorBaseDatos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
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
}

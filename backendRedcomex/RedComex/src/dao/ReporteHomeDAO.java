package dao;

import reportes.ProductoPorPaisDTO;
import reportes.VolumenPorMesDTO;
import util.ConectorBaseDatos;

import java.sql.*;
import java.util.*;

public class ReporteHomeDAO {

    public static List<ProductoPorPaisDTO> obtenerTopProductosPorPais() throws SQLException {
        String sql = """
            SELECT p.nombre AS pais, pr.nombre AS producto, SUM(e.cantidad) AS volumen
            FROM exportacion e
            JOIN pais p ON e.fk_pais = p.id_pais
            JOIN producto pr ON e.fk_producto = pr.id_producto
            GROUP BY p.nombre, pr.nombre
            HAVING volumen > 0
        """;

        Map<String, PriorityQueue<ProductoPorPaisDTO>> topPorPais = new HashMap<>();

        try (Connection conn = ConectorBaseDatos.getConnection(); PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                String pais = rs.getString("pais");
                String producto = rs.getString("producto");
                int volumen = rs.getInt("volumen");

                topPorPais
                        .computeIfAbsent(pais, k -> new PriorityQueue<>(Comparator.comparingInt(ProductoPorPaisDTO::getVolumen)))
                        .add(new ProductoPorPaisDTO(pais, producto, volumen));

                if (topPorPais.get(pais).size() > 1) {  // Cambia a 1 si quieres solo el top 1 por país
                    topPorPais.get(pais).poll(); // Mantener solo el producto con mayor volumen
                }
            }
        }

        List<ProductoPorPaisDTO> resultado = new ArrayList<>();
        for (PriorityQueue<ProductoPorPaisDTO> queue : topPorPais.values()) {
            resultado.addAll(queue);
        }

        return resultado.stream()
                .sorted((a, b) -> Integer.compare(b.getVolumen(), a.getVolumen()))
                .limit(5)
                .toList();
    }

    public static List<VolumenPorMesDTO> obtenerVolumenPorMes() throws SQLException {
        String sql = """
            SELECT DATE_FORMAT(fecha_exp, '%Y-%m') AS mes, SUM(cantidad) AS volumen
            FROM exportacion
            GROUP BY mes
            ORDER BY mes
        """;

        List<VolumenPorMesDTO> lista = new ArrayList<>();

        try (Connection conn = ConectorBaseDatos.getConnection(); PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                String mes = rs.getString("mes");
                int volumen = rs.getInt("volumen");
                lista.add(new VolumenPorMesDTO(mes, volumen));
            }
        }

        return lista;
    }
}
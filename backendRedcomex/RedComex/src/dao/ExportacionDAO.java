package dao;

import modelo.Exportacion;
import util.ConectorBaseDatos;

import java.math.BigDecimal;
import java.sql.*;

import java.time.ZoneId;

public class ExportacionDAO {

    public boolean registrarExportacion(Exportacion exp) {
        String sqlInsert = "INSERT INTO exportacion (cantidad, fecha_exp, valor_unitario, tasa_cambio, total, total_moneda_destino, tasa_arancel, estado_exportacion, fk_empresa, fk_producto, fk_pais) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = ConectorBaseDatos.getConnection()) {
            // 1. Obtener tasa de cambio y tasa de arancel
            BigDecimal tasaCambio = obtenerTasaCambio(exp.getFkPais(), conn);
            BigDecimal tasaArancel = obtenerTasaArancel(exp.getFkPais(), exp.getFkProducto(), conn);

            // 2. Calcular totales
            BigDecimal cantidad = new BigDecimal(exp.getCantidad());
            BigDecimal total = exp.getValorUnitario().multiply(cantidad);
            BigDecimal totalDestino = total.multiply(tasaCambio);
            BigDecimal costoArancel = total.multiply(tasaArancel).divide(new BigDecimal("100"));

            // 3. Ejecutar inserción
            try (PreparedStatement stmt = conn.prepareStatement(sqlInsert)) {
                stmt.setInt(1, exp.getCantidad());
                stmt.setDate(2, java.sql.Date.valueOf(exp.getFechaExp())); // esto funciona si exp.getFechaExp() es "YYYY-MM-DD"
                stmt.setBigDecimal(3, exp.getValorUnitario());
                stmt.setBigDecimal(4, tasaCambio);
                stmt.setBigDecimal(5, total);
                stmt.setBigDecimal(6, totalDestino);
                stmt.setBigDecimal(7, costoArancel);
                stmt.setString(8, exp.getEstadoExportacion());
                stmt.setInt(9, exp.getFkEmpresa());
                stmt.setInt(10, exp.getFkProducto());
                stmt.setInt(11, exp.getFkPais());

                int filas = stmt.executeUpdate();
                return filas > 0;
            }

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private BigDecimal obtenerTasaCambio(int idPais, Connection conn) throws SQLException {
        System.out.println("En obtenerTasaCambio llega ID: " + idPais);
        String sql = "SELECT tasa_cambio FROM pais WHERE id_pais = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idPais);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getBigDecimal("tasa_cambio");
            }
        }
        throw new SQLException("No se encontró tasa de cambio para el país");
    }

    private BigDecimal obtenerTasaArancel(int idPais, int idProducto, Connection conn) throws SQLException {
        String sql = "SELECT tasa_arancel FROM arancel WHERE fk_pais = ? AND fk_producto = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idPais);
            stmt.setInt(2, idProducto);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getBigDecimal("tasa_arancel");
            }
        }
        throw new SQLException("No se encontró arancel para el país y producto");
    }

}

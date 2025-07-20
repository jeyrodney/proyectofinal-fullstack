package dao;

import modelo.Exportacion;
import util.ConectorBaseDatos;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;

public class ExportacionDAO {

    public boolean registrarExportacion(Exportacion exportacion) {
        String sql = "INSERT INTO exportacion (cantidad, fecha_exp, valor_unitario, tasa_cambio, total, total_moneda_destino, costo_arancel, estado_exportacion, fk_empresa, fk_producto, fk_pais) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = ConectorBaseDatos.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            // Cálculos automáticos:
            BigDecimal total = exportacion.getValorUnitario().multiply(BigDecimal.valueOf(exportacion.getCantidad()));
            BigDecimal totalDestino = total.multiply(exportacion.getTasaCambio());
            BigDecimal costoArancel = total.multiply(new BigDecimal("0.01")); // ejemplo: 1% de arancel

            stmt.setInt(1, exportacion.getCantidad());
            stmt.setDate(2, exportacion.getFechaExp());
            stmt.setBigDecimal(3, exportacion.getValorUnitario());
            stmt.setBigDecimal(4, exportacion.getTasaCambio());
            stmt.setBigDecimal(5, total);
            stmt.setBigDecimal(6, totalDestino);
            stmt.setBigDecimal(7, costoArancel);
            stmt.setString(8, exportacion.getEstadoExportacion());
            stmt.setInt(9, exportacion.getFkEmpresa());
            stmt.setInt(10, exportacion.getFkProducto());
            stmt.setInt(11, exportacion.getFkPais());

            int filas = stmt.executeUpdate();
            return filas > 0;

        } catch (Exception e) {
            System.err.println("Error al registrar exportación: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
}

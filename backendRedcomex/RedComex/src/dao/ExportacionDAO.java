package dao;

import modelo.Exportacion;
import modelo.ExportacionRep;
import modelo.VolumenExportacionPorPais;
import util.ConectorBaseDatos;

import java.math.BigDecimal;
import java.sql.*;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

public class ExportacionDAO {

    public boolean registrarExportacion(Exportacion exp) {
        String sqlInsert = "INSERT INTO exportacion (cantidad, fecha_exp, valor_unitario, tasa_cambio, total, total_moneda_destino, arancel_cobrado, estado_exportacion, fk_empresa, fk_producto, fk_pais) " +
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
        throw new SQLException("No se encontró tasa de cambio para el país: " + idPais);
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
        throw new SQLException("No se encontró arancel para el país y producto: " + idPais + idProducto);
    }

    public static List<VolumenExportacionPorPais> obtenerVolumenPorPais(Connection conn) {
        List<VolumenExportacionPorPais> lista = new ArrayList<>();

        String sql = "SELECT p.nombre AS pais, SUM(e.cantidad) AS volumen " +
                "FROM exportacion e " +
                "JOIN pais p ON e.fk_pais = p.id_pais " +
                "GROUP BY p.nombre";

        try (PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                String pais = rs.getString("pais");
                int volumen = rs.getInt("volumen");
                lista.add(new VolumenExportacionPorPais(pais, volumen));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return lista;
    }

    public List<ExportacionRep> obtenerHistorialExportaciones(int usuarioId) {
        List<ExportacionRep> exportaciones = new ArrayList<>();
        String sql = "SELECT e.id_exportacion, e.cantidad, e.fecha_exp, e.valor_unitario, e.tasa_cambio, e.total, e.total_moneda_destino, e.arancel_cobrado, e.estado_exportacion, p.nombre AS producto, pa.nombre AS pais " +
                "FROM exportacion e " +
                "JOIN producto p ON e.fk_producto = p.id_producto " +
                "JOIN pais pa ON e.fk_pais = pa.id_pais " +
                "JOIN empresa emp ON e.fk_empresa = emp.id_empresa " +
                "WHERE emp.fk_usuario = ? " +
                "ORDER BY e.fecha_exp DESC";

        try (Connection conn = ConectorBaseDatos.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, usuarioId);  // Filtrar por el usuario
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                ExportacionRep exportacion = new ExportacionRep();
                exportacion.setIdExportacion(rs.getInt("id_exportacion"));
                exportacion.setCantidad(rs.getInt("cantidad"));
                exportacion.setFechaExp(rs.getDate("fecha_exp"));
                exportacion.setValorUnitario(rs.getBigDecimal("valor_unitario"));
                exportacion.setTasaCambio(rs.getBigDecimal("tasa_cambio"));
                exportacion.setTotal(rs.getBigDecimal("total"));
                exportacion.setTotalMonedaDestino(rs.getBigDecimal("total_moneda_destino"));
                exportacion.setArancelCobrado(rs.getBigDecimal("arancel_cobrado"));
                exportacion.setEstadoExportacion(rs.getString("estado_exportacion"));
                exportacion.setProducto(rs.getString("producto"));
                exportacion.setPais(rs.getString("pais"));
                exportaciones.add(exportacion);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return exportaciones;
    }

}

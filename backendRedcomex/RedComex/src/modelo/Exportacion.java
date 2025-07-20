package modelo;

import java.math.BigDecimal;
import java.sql.Date;

public class Exportacion {
    private int idExportacion;
    private int cantidad;
    private String fechaExp;
    private BigDecimal valorUnitario;
    private BigDecimal tasaCambio;
    private BigDecimal total;
    private BigDecimal totalMonedaDestino;
    private BigDecimal costoArancel;
    private String estadoExportacion;
    private int fkEmpresa;
    private int fkProducto;
    private int fkPais;

    // Constructor vacío (requerido por Gson)
    public Exportacion() {}

    // Constructor completo
    public Exportacion(int cantidad, String fechaExp, BigDecimal valorUnitario,
                       BigDecimal tasaCambio, BigDecimal total, BigDecimal totalMonedaDestino,
                       BigDecimal costoArancel, String estadoExportacion,
                       int fkEmpresa, int fkProducto, int fkPais) {
        this.cantidad = cantidad;
        this.fechaExp = fechaExp;
        this.valorUnitario = valorUnitario;
        this.tasaCambio = tasaCambio;
        this.total = total;
        this.totalMonedaDestino = totalMonedaDestino;
        this.costoArancel = costoArancel;
        this.estadoExportacion = estadoExportacion;
        this.fkEmpresa = fkEmpresa;
        this.fkProducto = fkProducto;
        this.fkPais = fkPais;
    }

    // Getters
    public int getIdExportacion() { return idExportacion; }
    public int getCantidad() { return cantidad; }
    public String getFechaExp() { return fechaExp; }
    public BigDecimal getValorUnitario() { return valorUnitario; }
    public BigDecimal getTasaCambio() { return tasaCambio; }
    public BigDecimal getTotal() { return total; }
    public BigDecimal getTotalMonedaDestino() { return totalMonedaDestino; }
    public BigDecimal getCostoArancel() { return costoArancel; }
    public String getEstadoExportacion() { return estadoExportacion; }
    public int getFkEmpresa() { return fkEmpresa; }
    public int getFkProducto() { return fkProducto; }
    public int getFkPais() { return fkPais; }

    // Setters (opcional, si se requiere actualizar valores)
    public void setIdExportacion(int idExportacion) { this.idExportacion = idExportacion; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }
    public void setFechaExp(String fechaExp) { this.fechaExp = fechaExp; }
    public void setValorUnitario(BigDecimal valorUnitario) { this.valorUnitario = valorUnitario; }
    public void setTasaCambio(BigDecimal tasaCambio) { this.tasaCambio = tasaCambio; }
    public void setTotal(BigDecimal total) { this.total = total; }
    public void setTotalMonedaDestino(BigDecimal totalMonedaDestino) { this.totalMonedaDestino = totalMonedaDestino; }
    public void setCostoArancel(BigDecimal costoArancel) { this.costoArancel = costoArancel; }
    public void setEstadoExportacion(String estadoExportacion) { this.estadoExportacion = estadoExportacion; }
    public void setFkEmpresa(int fkEmpresa) { this.fkEmpresa = fkEmpresa; }
    public void setFkProducto(int fkProducto) { this.fkProducto = fkProducto; }
    public void setFkPais(int fkPais) { this.fkPais = fkPais; }
}

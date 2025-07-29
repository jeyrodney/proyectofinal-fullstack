package modelo;

import java.math.BigDecimal;
import java.util.Date;

public class ExportacionRep {

    private int idExportacion;
    private int cantidad;
    private Date fechaExp;
    private BigDecimal valorUnitario;
    private BigDecimal tasaCambio;
    private BigDecimal total;
    private BigDecimal totalMonedaDestino;
    private BigDecimal arancelCobrado;
    private String estadoExportacion;
    private String producto;
    private String pais;

    // Getters y setters
    public int getIdExportacion() { return idExportacion; }
    public void setIdExportacion(int idExportacion) { this.idExportacion = idExportacion; }

    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }

    public Date getFechaExp() { return fechaExp; }
    public void setFechaExp(Date fechaExp) { this.fechaExp = fechaExp; }

    public BigDecimal getValorUnitario() { return valorUnitario; }
    public void setValorUnitario(BigDecimal valorUnitario) { this.valorUnitario = valorUnitario; }

    public BigDecimal getTasaCambio() { return tasaCambio; }
    public void setTasaCambio(BigDecimal tasaCambio) { this.tasaCambio = tasaCambio; }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }

    public BigDecimal getTotalMonedaDestino() { return totalMonedaDestino; }
    public void setTotalMonedaDestino(BigDecimal totalMonedaDestino) { this.totalMonedaDestino = totalMonedaDestino; }

    public BigDecimal getArancelCobrado() { return arancelCobrado; }
    public void setArancelCobrado(BigDecimal arancelCobrado) { this.arancelCobrado = arancelCobrado; }

    public String getEstadoExportacion() { return estadoExportacion; }
    public void setEstadoExportacion(String estadoExportacion) { this.estadoExportacion = estadoExportacion; }

    public String getProducto() { return producto; }
    public void setProducto(String producto) { this.producto = producto; }

    public String getPais() { return pais; }
    public void setPais(String pais) { this.pais = pais; }
}

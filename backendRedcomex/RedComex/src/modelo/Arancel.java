package modelo;

import java.math.BigDecimal;

public class Arancel {
    private int idArancel;
    private BigDecimal tasaArancel;
    private int idPais;
    private int idProducto;

    public Arancel() {
        // Constructor vacío requerido por Gson
    }

    public Arancel(int idArancel, BigDecimal tasaArancel, int idPais, int idProducto) {
        this.idArancel = idArancel;
        this.tasaArancel = tasaArancel;
        this.idPais = idPais;
        this.idProducto = idProducto;
    }

    public Arancel(BigDecimal tasaArancel, int idPais, int idProducto) {
        this.tasaArancel = tasaArancel;
        this.idPais = idPais;
        this.idProducto = idProducto;
    }

    public int getIdArancel() { return idArancel; }
    public void setIdArancel(int idArancel) { this.idArancel = idArancel; }

    public BigDecimal getTasaArancel() { return tasaArancel; }
    public void setTasaArancel(BigDecimal tasaArancel) { this.tasaArancel = tasaArancel; }

    public int getIdPais() { return idPais; }
    public void setIdPais(int idPais) { this.idPais = idPais; }

    public int getIdProducto() { return idProducto; }
    public void setIdProducto(int idProducto) { this.idProducto = idProducto; }
}

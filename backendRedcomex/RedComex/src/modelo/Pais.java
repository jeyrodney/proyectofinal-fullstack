package modelo;

import java.math.BigDecimal;

public class Pais {
    private int idPais;
    private String nombre;
    private String codigoIso;
    private String monedaNombre;
    private String monedaCodigoIso;
    private BigDecimal tasaCambio;

    public Pais() {
        // Constructor vacío requerido por Gson
    }

    public Pais(int idPais, String nombre, BigDecimal tasaCambio) {
        this.idPais = idPais;
        this.nombre = nombre;
        this.tasaCambio = tasaCambio;
    }

    public Pais(int idPais, String nombre, String codigoIso, String monedaNombre, String monedaCodigoIso){
        this.idPais = idPais;
        this.nombre = nombre;
        this.codigoIso = codigoIso;
        this.monedaNombre = monedaNombre;
        this.monedaCodigoIso = monedaCodigoIso;
    }

    // Constructor requerido por el DAO
    public Pais(int idPais, String nombre) {
        this.idPais = idPais;
        this.nombre = nombre;
    }

    public int getIdPais(){return idPais;}
    public String getNombre(){return nombre;}
    public String getCodigoIso(){return codigoIso;}
    public String getMonedaNombre(){return monedaNombre;}
    public String getMonedaCodigoIso(){return monedaCodigoIso;}
    public BigDecimal getTasaCambio(){return tasaCambio;}




}

package modelo;

public class VolumenExportacionPorPais {
    private String pais;
    private int volumen;

    public VolumenExportacionPorPais(String pais, int volumen) {
        this.pais = pais;
        this.volumen = volumen;
    }

    public String getPais() {
        return pais;
    }

    public int getVolumen() {
        return volumen;
    }
}

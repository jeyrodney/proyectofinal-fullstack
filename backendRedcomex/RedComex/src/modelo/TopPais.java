package modelo;

public class TopPais {
    private String paisNombre;
    private double totalExportaciones;

    public TopPais(String paisNombre, double totalExportaciones) {
        this.paisNombre = paisNombre;
        this.totalExportaciones = totalExportaciones;
    }

    // Getters y setters
    public String getPaisNombre(){ return paisNombre; }
    public double getTotalExportaciones(){ return totalExportaciones; }

    public void setPaisNombre(String paisNombre) { this.paisNombre = paisNombre; }
    public void setTotalExportaciones(double totalExportaciones){ this.totalExportaciones = totalExportaciones; }
}
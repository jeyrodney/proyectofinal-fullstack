package modelo;

public class TopEmpresa {

    private String empresaNombre;
    private double totalExportaciones;

    public TopEmpresa(String empresaNombre, double totalExportaciones) {
        this.empresaNombre = empresaNombre;
        this.totalExportaciones = totalExportaciones;
    }

    public String getEmpresaNombre(){ return empresaNombre; }
    public double getTotalExportaciones(){ return totalExportaciones; }

    public void setEmpresaNombrel(String empresaNombre) { this.empresaNombre = empresaNombre; }
    public void setTotalExportaciones(double totalExportaciones){ this.totalExportaciones = totalExportaciones; }


}

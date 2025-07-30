package modelo;

public class TopArancel {
    private String productoNombre;
    private String paisNombre;
    private double tasaArancel;

    public TopArancel(String productoNombre, String paisNombre, double tasaArancel) {
        this.productoNombre = productoNombre;
        this.paisNombre = paisNombre;
        this.tasaArancel = tasaArancel;
    }

    public String getProductoNombre(){ return productoNombre; }
    public String getPaisNombre(){ return paisNombre; }
    public double getTasaArancel(){ return tasaArancel; }

    public void setProductoNombre(String productoNombre){ this.productoNombre = productoNombre; }
    public void setPaisNombre(String paisNombre){ this.paisNombre = paisNombre; }
    public void setTasaArancel(double tasaArancel){ this.tasaArancel = tasaArancel; }
}

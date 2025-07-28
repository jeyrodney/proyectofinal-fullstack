package reportes;

// DTO para productos por país
public class ProductoPorPaisDTO {
    private String pais;
    private String producto;
    private int volumen;

    public ProductoPorPaisDTO(String pais, String producto, int volumen) {
        this.pais = pais;
        this.producto = producto;
        this.volumen = volumen;
    }

    public String getPais() { return pais; }
    public String getProducto() { return producto; }
    public int getVolumen() { return volumen; }
}
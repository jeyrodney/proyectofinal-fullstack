package modelo;

public class Producto {
    private int idProducto ;
    private String nombre;
    private String codigoHS;
    private String unidadMedida;


    public Producto(int idProducto, String nombre, String codigoHS, String unidadMedida){
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.codigoHS = codigoHS;
        this.unidadMedida = unidadMedida;
    }

    // Constructor requerido por el DAO
    public Producto(int idProducto, String nombre){
        this.idProducto = idProducto;
        this.nombre = nombre;
    }

    public int getIdPais(){return idProducto;}
    public String getNombre(){return nombre;}
    public String getCodigoIso(){return codigoHS;}
    public String getMonedaNombre(){return unidadMedida;}

}
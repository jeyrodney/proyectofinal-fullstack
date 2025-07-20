package modelo;

public class Empresa {
    private int idEmpresa;
    private String nit;
    private String nombre;
    private String descripcion;
    private int fk_usuario;

    public Empresa() {}

    public Empresa(String nit, String nombre, String descripcion, int fk_usuario) {
        this.nit = nit;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fk_usuario = fk_usuario;
    }

    public Empresa(int idEmpresa, String nombre) {
        this.idEmpresa = idEmpresa;
        this.nombre = nombre;
    }

    public String getNit() { return nit; }
    public String getNombre() { return nombre; }
    public String getDescripcion() { return descripcion; }
    public int getFk_usuario() { return fk_usuario; }
}
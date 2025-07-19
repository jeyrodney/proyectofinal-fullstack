package modelo;

public class Usuario {
    private String tipoDocumento;
    private String numDocumento;
    private String nombre;
    private String correo;
    private String celular;
    private String passwordUser;
    private int rol;

    public Usuario(String tipoDocumento, String numDocumento, String nombre, String correo, String celular, String passwordUser, int rol){

        this.tipoDocumento = tipoDocumento;
        this.numDocumento = numDocumento;
        this.nombre = nombre;
        this.correo = correo;
        this.celular = celular;
        this.passwordUser = passwordUser;
        this.rol = rol;
    }

    public String getTipoDocumento(){return tipoDocumento;}
    public String getNumDocumento(){return numDocumento;}
    public String getNombre(){return nombre;}
    public String getCorreo(){return correo;}
    public String getCelular(){return celular;}
    public String getPasswordUser(){return passwordUser;}
    public int getRol(){return rol;}

    public void setPasswordUser(String passwordUser){
        this.passwordUser = passwordUser;
    }

    public void mostrarDatos(){
        System.out.println("Documento: " + tipoDocumento + " - " + numDocumento);
        System.out.println("Nombre: " + nombre);
        System.out.println("Correo: " + correo);
        System.out.println("Celular: " + celular);
    }



}

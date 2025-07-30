package modelo;

public class Usuario {
    private int usuarioId;
    private String tipoDocumento;
    private String numDocumento;
    private String nombre;
    private String correo;
    private String celular;
    private String passwordUser;
    private int rol;
    private String nombreRol;

    public Usuario(){

    }

    public Usuario(int usuarioId, String tipoDocumento, String numDocumento, String nombre, String correo, String celular, String passwordUser, int rol){
        this.usuarioId = usuarioId;
        this.tipoDocumento = tipoDocumento;
        this.numDocumento = numDocumento;
        this.nombre = nombre;
        this.correo = correo;
        this.celular = celular;
        this.passwordUser = passwordUser;
        this.rol = rol;
    }

    public int getUsuarioId() {return usuarioId;}
    public String getTipoDocumento(){return tipoDocumento;}
    public String getNumDocumento(){return numDocumento;}
    public String getNombre(){return nombre;}
    public String getCorreo(){return correo;}
    public String getCelular(){return celular;}
    public String getPasswordUser(){return passwordUser;}
    public int getRol(){return rol;}

    public void setRol(int rol) { this.rol = rol; }
    public void setPasswordUser(String passwordUser){
        this.passwordUser = passwordUser;
    }

    public void setUsuarioId(int usuarioId){ this.usuarioId = usuarioId; }
    public void setNombre(String nombre){ this.nombre = nombre; }
    public void setCorreo(String correo) { this.correo = correo; }
    public void setNombreRol(String nombreRol){ this.nombreRol = nombreRol; }
    public void setNumDocumento(String numDocumento){ this.numDocumento = numDocumento; }
    public void setCelular(String celular){ this.celular = celular; }

    public void mostrarDatos(){
        System.out.println("Documento: " + tipoDocumento + " - " + numDocumento);
        System.out.println("Nombre: " + nombre);
        System.out.println("Correo: " + correo);
        System.out.println("Celular: " + celular);
    }



}

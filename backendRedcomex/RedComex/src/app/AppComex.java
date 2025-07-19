package app;

import modelo.Usuario;

import java.util.Scanner;

public class AppComex {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        System.out.println("\n 1. Ingresar a su cuenta\n 2. Crear nueva cuenta\n Elija la opción:");
        int tipoIngreso = Integer.parseInt(sc.nextLine());

        if(tipoIngreso == 1){
            System.out.println("Correo: ");
            String correo = sc.nextLine();
            System.out.println("Contraseña: ");
            String password = sc.nextLine();
            Login login = new Login(); //creo un objeto app.Login
            Usuario usuario = login.login(correo,password); //con el objeto app.Login, voy al metodo login que devuelve los datos del usuario si lo encuentra en BD
            if(usuario != null){ //si encontró el usuario (no es null el objeto usuario)
                System.out.println("\nPresione enter para ver el Menú");
                sc.nextLine();
                System.out.println("\n##############" +
                        "\n#### MENÚ ADMIN ####" +
                        "\n##############\n" +
                        "\n1. Agregar Administrador" +
                        "\n2. Modificar Aranceles" +
                        "\n3. Agregar País" +
                        "\n4. Generar Reporte");

            } else { //si no encontró el usuario, que vuelva a reiniciar el metodo main
                main(args);
            }

        }

        if(tipoIngreso == 2){
            System.out.println("\nTipo de Documento:\n" +
                    "1: Cédula\n" +
                    "2: Pasaporte\n" +
                    "Elija la opción:");
            String tipoDocumento = sc.nextLine();
            if(tipoDocumento.equals("1")){tipoDocumento = "Cédula";}else {tipoDocumento = "Pasaporte";}

            System.out.println("Número Documento:");
            String numDocumento = sc.nextLine();

            System.out.println("Nombre Completo:");
            String nombre = sc.nextLine();

            System.out.println("Correo");
            String correo = sc.nextLine();

            System.out.println("Celular:");
            String celular = sc.nextLine();

            System.out.println("Contraseña:");
            String passwordUser = sc.nextLine();

            Usuario usuario = new Usuario(tipoDocumento, numDocumento, nombre, correo, celular, passwordUser, 2);

            RegistroUsuario registroUsuario = new RegistroUsuario();
            boolean regExitoso = registroUsuario.registro(usuario);

            if(regExitoso){
                Login login = new Login(); //creo un objeto app.Login
                usuario = login.login(usuario.getCorreo(),usuario.getPasswordUser()); //con el objeto app.Login, voy al metodo login que devuelve los datos del usuario si lo encuentra en BD
                if(usuario != null){ //si encontró el usuario (no es null el objeto usuario)
                    System.out.println("\nPresione enter para ver el Menú");
                    sc.nextLine();
                    System.out.println("\n##############" +
                            "\n#### MENÚ USUARIO ####" +
                            "\n##############\n" +
                            "\n1. Agregar Empresa" +
                            "\n2. Agregar exportación " +
                            "\n3. Generar Reporte");

                } else { //si no encontró el usuario, que vuelva a reiniciar el metodo main
                    main(args);
                }
            } else { //si el registro no fue exitoso, se termina el programa
                System.out.println("Saliendo del programa desde main...");
                System.exit(0);
            }
        }
    sc.close();
    }
}

package util;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class ConectorBaseDatos {

    // Credenciales de la base de datos (pueden ser final si no cambian)
    private static  String url;
    private static  String user;
    private static String password;
    private static String driver;

    //Constructor privado para evitar instanciación externa si la clase es solo para métodos estáticos.
    private void DatabaseConnection() {
        // Constructor vacío
    }
    static{
        try{

            InputStream input = ConectorBaseDatos.class.getClassLoader().getResourceAsStream("db.properties");

            Properties props = new Properties();
            System.out.println("antes del props.load\n");
            props.load(input);


            url=props.getProperty("db.url");
            user = props.getProperty("db.user");
            password = props.getProperty("db.password");
            driver = props.getProperty("db.driver");

            Class.forName(driver);

        } catch (Exception e) {
            System.err.println("error cargando configuración de las base de datos: "+ e.getMessage());
        }
    }

     /*** Establece y devuelve una conexión a la base de datos MySQL.
     Retorna un objeto Connection si la conexión es exitosa, o null en caso de error.
    public static Connection getConnection() {
        Connection connection = null;
        try {
            System.out.println("Intentando conectar a la base de datos...");
            connection = DriverManager.getConnection(DB_URL, USER, PASS);
            System.out.println("Conexión exitosa."); //linea para los logs
        } catch (SQLException e) {
            System.err.println("Error al conectar a la base de datos:");
            e.printStackTrace();
        }
        return connection;
    }
      ***/
     public static Connection getConnection() throws SQLException {
         return DriverManager.getConnection(url,user,password);
     }

    /**
     * Cierra una conexión a la base de datos, un Statement y un ResultSet de forma segura.
     * El objeto Connection a cerrar.
     * El objeto Statement a cerrar (puede ser null).
     * El objeto ResultSet a cerrar (puede ser null).
     */
    public static void closeResources(Connection connection, java.sql.Statement statement, java.sql.ResultSet resultSet) {
        try {
            if (resultSet != null) resultSet.close();
        } catch (SQLException e) {
            System.err.println("Error al cerrar ResultSet: " + e.getMessage());
        }
        try {
            if (statement != null) statement.close();
        } catch (SQLException e) {
            System.err.println("Error al cerrar Statement: " + e.getMessage());
        }
        try {
            if (connection != null) connection.close();
            //System.out.println("Conexión cerrada."); //Linea para los logs
        } catch (SQLException e) {
            System.err.println("Error al cerrar Connection: " + e.getMessage());
        }
    }

}

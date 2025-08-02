# Usa una imagen base de OpenJDK para una JVM ligera
FROM openjdk:24-jdk-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo JAR de tu aplicación al directorio de trabajo
# Asegúrate de que el path './backend/RedComexAct.jar' es correcto
# en relación a donde ejecutes docker-compose.yml
COPY RedComexAct.jar /app/app.jar

# Expone el puerto en el que tu aplicación Spark escucha (por defecto 4567)
# Este puerto solo estará disponible internamente dentro de la red Docker
EXPOSE 4567

# Comando para ejecutar la aplicación JAR cuando se inicia el contenedor
CMD ["java", "-jar", "app.jar"]

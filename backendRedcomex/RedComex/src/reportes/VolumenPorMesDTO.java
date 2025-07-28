package reportes;

// DTO para volumen por mes
public class VolumenPorMesDTO {
    private String mes;
    private int volumen;

    public VolumenPorMesDTO(String mes, int volumen) {
        this.mes = mes;
        this.volumen = volumen;
    }

    public String getMes() { return mes; }
    public int getVolumen() { return volumen; }
}
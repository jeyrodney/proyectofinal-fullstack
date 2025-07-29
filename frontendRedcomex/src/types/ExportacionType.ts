export interface Exportacion {
  idExportacion: number;
  cantidad: number;
  fechaExp: string;  // Usamos 'fechaExp' para coincidir con el backend
  valorUnitario: number;
  tasaCambio: number;
  total: number;
  totalMonedaDestino: number;
  arancelCobrado: number;
  estadoExportacion: string;
  producto: string;
  pais: string;
}
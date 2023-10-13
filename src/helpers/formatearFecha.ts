type FormatoFecha = "dd/mm/yyyy" | "texto largo";

export const formatearFecha = (
  fecha: Date | string,
  formato: FormatoFecha
): string => {
  const fecha2 = typeof fecha === "string" ? new Date(fecha) : fecha;

  // Usando métodos UTC para obtener la fecha y hora en formato UTC
  const dia = fecha2.getUTCDate().toString().padStart(2, "0");
  const mes = (fecha2.getUTCMonth() + 1).toString().padStart(2, "0");
  const ano = fecha2.getUTCFullYear();

  const nombresMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  switch (formato) {
    case "dd/mm/yyyy":
      return `${dia}/${mes}/${ano}`;
    case "texto largo":
      const nombreMes = nombresMeses[parseInt(mes) - 1];
      return `${dia} de ${nombreMes} de ${ano}`;
    default:
      return fecha2.toISOString();
  }
};

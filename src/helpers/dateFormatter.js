/**
 * Formatea una fecha en un formato de cadena legible según el estándar británico (dd/mm/yyyy hh:mm).
 *
 * @function dateFormatter
 * @param {string} dateString - El objeto de fecha a formatear.
 * @returns {string} La fecha formateada en formato "dd/mm/yyyy hh:mm:ss" (24 horas).
 */
export const dateFormatter = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

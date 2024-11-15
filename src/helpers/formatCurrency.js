/**
 * Formatea un número como moneda chilena (CLP).
 *
 * Esta función utiliza el método `toLocaleString` para convertir un número
 * en una cadena con formato de moneda chilena, incluyendo el símbolo "$"
 * y los separadores adecuados para miles y decimales.
 *
 * @function formatCurrency
 * @param {number} value - El número a formatear como moneda.
 * @returns {string} Una cadena con el número formateado como moneda en CLP.
 *
 * @example
 * const formattedValue = formatCurrency(1234567);
 * console.log(formattedValue); // "$1.234.567"
 */
export default function fromatCurrency(value) {
  return value.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
}

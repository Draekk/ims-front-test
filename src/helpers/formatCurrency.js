export default function fromatCurrency(value) {
  return value.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
}

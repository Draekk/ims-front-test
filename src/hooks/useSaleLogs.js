import { useEffect, useState } from "react";

/**
 * Custom hook para gestionar los registros de ventas.
 *
 * Este hook permite filtrar las ventas según un rango de fechas, manejar el estado de las ventas,
 * y controlar la visibilidad de un modal de búsqueda. También obtiene las ventas desde una API.
 *
 * @returns {Object} El hook devuelve un objeto con los siguientes estados, funciones y configuraciones:
 *
 * @returns {Array} sales - Lista de ventas filtradas según el rango de fechas.
 * @returns {Object} dateRange - El rango de fechas actual, con las propiedades `initDate` y `finalDate`.
 * @returns {boolean} searchModal - Estado que indica si el modal de búsqueda está activo o no.
 * @returns {Function} toggleModal - Función para alternar la visibilidad del modal de búsqueda.
 * @returns {Function} dateFactory - Función para actualizar las fechas del rango.
 * @returns {Function} filterSales - Función para filtrar las ventas según el rango de fechas.
 * @returns {Function} resetSales - Función para resetear las ventas al estado original.
 *
 * @example
 * const { sales, filterSales, toggleModal } = useSaleLogs();
 *
 * // Filtrar ventas por fecha
 * filterSales();
 *
 * // Alternar la visibilidad del modal
 * toggleModal();
 */
function useSaleLogs() {
  /**
   * Genera una fecha por defecto, con la hora establecida a 00:00:00 para el día de hoy.
   *
   * @returns {Object} Un objeto con las propiedades `initDate` y `finalDate`, ambas configuradas con la fecha de hoy.
   */
  const defaultDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return {
      initDate: today.getTime(),
      finalDate: today.getTime(),
    };
  };

  const [sales, setSales] = useState([]);
  const [allSales, setAllSales] = useState([]);
  const [searchModal, setSearchModal] = useState(false);
  const [dateRange, setDateRange] = useState(defaultDate);

  const API = "http://localhost:3000/api/sale";

  //--------------------------UI FUNCTIONS

  /**
   * Alterna la visibilidad del modal de búsqueda de ventas.
   */
  function toggleModal() {
    setSearchModal(!searchModal);
  }

  /**
   * Actualiza el estado `dateRange` cuando el usuario cambia las fechas en el formulario.
   *
   * @param {Object} e - El evento del formulario.
   * @param {string} e.target.name - El nombre del campo (initDate o finalDate).
   * @param {string} e.target.value - El valor de la fecha seleccionada.
   */
  function dateFactory(e) {
    const { name, value } = e.target;
    setDateRange({
      ...dateRange,
      [name]: new Date(value).getTime(),
    });
  }

  //--------------------------LOGIC

  /**
   * Filtra las ventas según el rango de fechas establecido en `dateRange`.
   * Las ventas se filtran comparando las fechas de creación con el rango de fechas inicial y final.
   */
  function filterSales() {
    const filteredSales = allSales.filter((s) => {
      const saleDate = new Date(s.createdAt).getTime();
      const DAY = 86400000;
      return (
        saleDate >= dateRange.initDate && saleDate <= dateRange.finalDate + DAY
      );
    });

    setSales(filteredSales);
    setDateRange(defaultDate);
  }

  /**
   * Resetea el filtro de ventas, mostrando todas las ventas almacenadas en `allSales`.
   */
  function resetSales() {
    setSales([...allSales]);
  }

  //--------------------------NON EXPORTABLE FUNCTIONS

  /**
   * Obtiene todas las ventas desde la API y actualiza los estados `allSales` y `sales`.
   *
   * @async
   * @throws {Error} Si ocurre un error al obtener las ventas de la API.
   */
  async function getSales() {
    try {
      const res = await fetch(`${API}/find/all/1`);
      const data = await res.json();

      setAllSales(data.data);
      setSales(data.data);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function deleteSale(id) {
    try {
      const res = await fetch(`${API}/delete/id/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        getSales();
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getSales();
  }, []);

  return {
    sales,
    dateRange,
    searchModal,
    toggleModal,
    dateFactory,
    filterSales,
    resetSales,
    deleteSale,
  };
}

export default useSaleLogs;

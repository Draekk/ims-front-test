import { useEffect, useState } from "react";

/**
 * Custom hook que gestiona el estado de una alerta en la interfaz de usuario.
 *
 * Este hook proporciona el estado y las funciones necesarias para mostrar una alerta
 * temporal en la interfaz, controlando su visibilidad, opacidad, y márgenes. La alerta
 * se oculta automáticamente después de 5 segundos de ser activada.
 *
 * @returns {Object} El hook devuelve un objeto con los siguientes estados y funciones:
 *
 * @returns {boolean} activeAlert - Estado que indica si la alerta está activa o no.
 * @returns {Function} setActiveAlert - Función para activar o desactivar la alerta.
 * @returns {string} opacity - Estado de la opacidad de la alerta.
 * @returns {Function} setOpacity - Función para actualizar la opacidad de la alerta.
 * @returns {string} marginTop - Estado del margen superior de la alerta.
 * @returns {Function} setMarginTop - Función para actualizar el margen superior de la alerta.
 * @returns {Object} alertData - Estado que contiene los datos de la alerta.
 * @returns {boolean} alertData.error - Indica si la alerta es de error o no.
 * @returns {string} alertData.message - El mensaje que se muestra en la alerta.
 * @returns {Function} setAlertData - Función para actualizar los datos de la alerta.
 *
 * @example
 * const {
 *   activeAlert,
 *   setActiveAlert,
 *   opacity,
 *   setOpacity,
 *   marginTop,
 *   setMarginTop,
 *   alertData,
 *   setAlertData
 * } = useAlertUI();
 *
 * // Activar alerta con mensaje de error
 * setAlertData({ error: true, message: "Ha ocurrido un error." });
 * setActiveAlert(true);
 *
 * // Desactivar alerta
 * setActiveAlert(false);
 */
function useAlertUI() {
  const [activeAlert, setActiveAlert] = useState(false);
  const [opacity, setOpacity] = useState("1");
  const [marginTop, setMarginTop] = useState("10vh");
  const [alertData, setAlertData] = useState({ error: false, message: "" });

  useEffect(() => {
    if (activeAlert) {
      setTimeout(() => {
        setActiveAlert(false);
      }, 5000);
    }
  }, [activeAlert]);

  return {
    activeAlert,
    setActiveAlert,
    opacity,
    setOpacity,
    marginTop,
    setMarginTop,
    alertData,
    setAlertData,
  };
}

export default useAlertUI;

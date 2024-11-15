import { useEffect, useState } from "react";

/**
 * Custom hook que gestiona el estado de los botones de la cabecera (header).
 *
 * Este hook permite controlar el estado de tres interruptores (switches) en la interfaz de usuario.
 * Cada interruptor se puede activar o desactivar, y solo uno puede estar activo a la vez.
 * La función `toggleSwitches` permite activar un interruptor específico y desactivar los demás.
 *
 * @returns {Object} El hook devuelve un objeto con los siguientes estados y funciones:
 *
 * @returns {Object} switches - Objeto que contiene el estado de los tres interruptores.
 * @returns {boolean} switches.s1 - Estado del primer interruptor.
 * @returns {boolean} switches.s2 - Estado del segundo interruptor.
 * @returns {boolean} switches.s3 - Estado del tercer interruptor.
 * @returns {Function} toggleSwitches - Función para activar un interruptor y desactivar los demás.
 *
 * @example
 * const { switches, toggleSwitches } = useHeaderButtons();
 *
 * // Activar el interruptor 2
 * toggleSwitches("s2");
 *
 * // El estado de los interruptores ahora será:
 * // { s1: false, s2: true, s3: false }
 *
 * // Activar el interruptor 3
 * toggleSwitches("s3");
 *
 * // El estado de los interruptores ahora será:
 * // { s1: false, s2: false, s3: true }
 */
export default function useHeaderButtons() {
  const [switches, setSwitches] = useState({
    s1: true,
    s2: false,
    s3: false,
  });

  const toggleSwitches = (toActivate) => {
    setSwitches({
      s1: false,
      s2: false,
      s3: false,
      [toActivate]: true,
    });
  };

  return { switches, toggleSwitches };
}

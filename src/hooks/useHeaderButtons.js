import { useEffect, useState } from "react";

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

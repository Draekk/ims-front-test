import { useEffect, useState } from "react";

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

import React, { useEffect, useState } from "react";
import useAlertUI from "../hooks/useAlertUI";

function Alert({ textMessage, activeAlert, error = false }) {
  const { opacity, setOpacity, marginTop, setMarginTop } = useAlertUI();

  useEffect(() => {
    setTimeout(() => {
      setOpacity("0");
      setMarginTop("17vh");
    }, 1000);
  }, [activeAlert]);

  return (
    <p
      className={`${
        error ? "bg-red-500" : "bg-green-500"
      } absolute top-0 p-5 rounded-[10px] mt-[10vh] text-xl transition-all duration-[6000ms] shadow-md`}
      style={{
        opacity: opacity,
        marginTop: marginTop,
      }}
    >
      {textMessage}
    </p>
  );
}

export default Alert;

import { useEffect, useState } from "react";

export const useToast = () => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (!alert) return;

    const timer = setTimeout(() => {
      setAlert(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [alert]);

  return {
    alert,
    setAlert,
  };
};

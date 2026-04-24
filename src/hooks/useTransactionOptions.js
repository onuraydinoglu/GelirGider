import { useLocalStorage } from "./useLocalStorage";

const defaultOptions = {
  income: ["Maaş", "Freelance", "Ek Gelir"],
  expense: ["Kira", "Market", "Fatura", "Ulaşım"],
  investment: ["Altın", "Döviz", "Borsa", "Kripto"],
};

export const useTransactionOptions = () => {
  const [options, setOptions] = useLocalStorage(
    "finance_transaction_options",
    defaultOptions,
  );

  const addOption = (type, value) => {
    const cleanValue = value.trim();

    if (!cleanValue) {
      return {
        success: false,
        message: "Alan adı boş olamaz.",
      };
    }

    const currentOptions = options[type] || [];

    const exists = currentOptions.some(
      (item) => item.toLowerCase() === cleanValue.toLowerCase(),
    );

    if (exists) {
      return {
        success: false,
        message: "Bu alan zaten mevcut.",
      };
    }

    setOptions((prev) => ({
      ...prev,
      [type]: [...(prev[type] || []), cleanValue],
    }));

    return {
      success: true,
      message: "Yeni alan başarıyla eklendi.",
    };
  };

  const deleteOption = (type, value) => {
    setOptions((prev) => ({
      ...prev,
      [type]: (prev[type] || []).filter((item) => item !== value),
    }));

    return {
      success: true,
      message: "Alan silindi.",
    };
  };

  return {
    options,
    addOption,
    deleteOption,
  };
};

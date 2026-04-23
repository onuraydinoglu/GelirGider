const APP_NAME = "finance-tracker";
const BACKUP_VERSION = 1;

export const createBackupPayload = (transactions) => {
  return {
    app: APP_NAME,
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    transactions,
  };
};

export const downloadBackupFile = (transactions) => {
  const payload = createBackupPayload(transactions);
  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const date = new Date().toISOString().split("T")[0];
  const link = document.createElement("a");
  link.href = url;
  link.download = `finance-tracker-backup-${date}.json`;
  link.click();

  URL.revokeObjectURL(url);
};

export const validateBackupFile = (data) => {
  if (!data || typeof data !== "object") {
    return {
      valid: false,
      message: "Geçersiz dosya yapısı.",
    };
  }

  if (data.app !== APP_NAME) {
    return {
      valid: false,
      message: "Bu dosya finance-tracker yedeği değil.",
    };
  }

  if (!Array.isArray(data.transactions)) {
    return {
      valid: false,
      message: "Yedek dosyasında işlem listesi bulunamadı.",
    };
  }

  for (const item of data.transactions) {
    if (
      !item ||
      typeof item !== "object" ||
      !["income", "expense"].includes(item.type) ||
      typeof item.title !== "string"
    ) {
      return {
        valid: false,
        message: "Yedek dosyasındaki kayıt yapısı hatalı.",
      };
    }
  }

  return {
    valid: true,
    message: "Dosya geçerli.",
  };
};

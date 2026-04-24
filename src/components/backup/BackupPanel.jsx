import { useRef } from "react";
import {
  HiOutlineArrowDownTray,
  HiOutlineArrowUpTray,
  HiOutlineTrash,
} from "react-icons/hi2";
import { downloadBackupFile } from "../../utils/backup";

const BackupPanel = ({
  transactions,
  options,
  onImport,
  onAskClearAll,
  setAlert,
}) => {
  const fileInputRef = useRef(null);

  const handleBackup = () => {
    downloadBackupFile(transactions, options);

    setAlert({
      type: "success",
      message: "Yedek dosyası indirildi.",
    });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsedData = JSON.parse(text);
      const result = onImport(parsedData);

      setAlert({
        type: result.valid ? "success" : "error",
        message: result.message,
      });
    } catch {
      setAlert({
        type: "error",
        message: "Dosya okunamadı ya da JSON formatı bozuk.",
      });
    } finally {
      event.target.value = "";
    }
  };

  return (
    <div className="glass-card mb-6 p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Yedekleme Alanı
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <button
            onClick={handleBackup}
            className="btn h-12 rounded-2xl border border-white/10 bg-white/5 text-slate-200 hover:border-violet-400/30 hover:bg-violet-500/10"
          >
            <HiOutlineArrowDownTray className="text-lg" />
            Yedek Al
          </button>

          <button
            onClick={handleImportClick}
            className="btn h-12 rounded-2xl border-0 bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400"
          >
            <HiOutlineArrowUpTray className="text-lg" />
            İçe Aktar
          </button>

          <button
            onClick={onAskClearAll}
            className="btn h-12 rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
          >
            <HiOutlineTrash className="text-lg" />
            Tümünü Temizle
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default BackupPanel;